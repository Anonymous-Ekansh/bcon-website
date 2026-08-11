import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import fs from "fs";
import path from "path";
import { type MailAttachment } from "~/server/mail";
import {
  sendTicketApprovalMail,
  sendTicketRejectionMail,
} from "~/server/mail";

function readPdfAsBuffer(pdfPath: string): Buffer {
  try {
    // Read the PDF file as a buffer
    const pdfBuffer = fs.readFileSync(path.resolve(pdfPath));
    return pdfBuffer;
  } catch (error) {
    console.error("Error reading PDF file:", error);
    throw error;
  }
}

export const adminBookingRouter = createTRPCRouter({
  getAllBookings: protectedProcedure.query(async ({ ctx }) => {
    const pendingBookings = await ctx.prisma.booking.findMany({
      where: { status: "pending" },
      include: {
        User: true,
        Ticket: true,
      },
    });

    const pendingBookingsWithTickets = pendingBookings.filter(
      (booking) => booking.Ticket.length !== 0
    );

    await Promise.all(
      pendingBookingsWithTickets.map(async (booking) => {
        const existingBooking = await ctx.prisma.booking.findFirst({
          where: {
            userId: booking.User?.id ?? undefined,
            transactionId: {
              not: null,
            },
          },
        });
        if (existingBooking?.transactionId) {
          await ctx.prisma.booking.update({
            where: {
              id: booking.id, // Update the current pending booking
            },
            data: {
              transactionId: existingBooking.transactionId,
            },
          });
        } else {
          await ctx.prisma.booking.update({
            where: {
              id: booking.id,
            },
            data: {
              transactionId: "not provided",
            },
          });
        }
      })
    );

    const approvedBookings = await ctx.prisma.booking.findMany({
      where: {
        status: "approved",
      },
      include: {
        User: true,
        Ticket: true,
      },
    });

    const approvedBookingsWithTicket = approvedBookings.filter(
      (booking) => booking.Ticket.length !== 0
    );
    console.log(approvedBookingsWithTicket);

    const rejectedBookings = await ctx.prisma.booking.findMany({
      where: {
        AND: {
          status: "rejected",
          User: { name: { not: "" } },
        },
      },
      include: {
        User: true,
      },
    });

    return {
      pendingBookingsWithTickets,
      approvedBookingsWithTicket,
      rejectedBookings,
    };
  }),

  updateBooking: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
        newStatus: z.enum(["approved", "rejected"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookingId, newStatus } = input;

      if (!bookingId) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "bookingId is empty",
        });
      }

      if (!newStatus) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "newStatus is empty",
        });
      }

      const booking = await ctx.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          User: true,
          Ticket: true,
        },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "bookingId does not exist",
        });
      }

      const updatedBooking = await ctx.prisma.booking.update({
        where: { id: bookingId },
        data: { status: newStatus },
      });

      if (booking?.User?.email) {
        if (newStatus === "approved") {
          booking.Ticket.forEach((ticket) => {
            const sendTicket = async () => {
              const ticketSrc: string = ticket.id
                ? `https://businessconclave.in/ticket/view?bookingId=${String(
                    ticket.id
                  )}&name=${encodeURIComponent(String(ticket.name ?? ""))}`
                : "";

              try {
                // Specify responseType as ArrayBuffer to ensure type safety with Buffer.from
                const response = await axios.get<ArrayBuffer>(ticketSrc, {
                  responseType: "arraybuffer",
                });

                const imageBuffer = Buffer.from(response.data); // This should now be safe
                const docBuffer = readPdfAsBuffer(
                  // "/Users/unnatdluffy/Desktop/bcon/bcon-website/src/server/api/routers/itenerary.pdf"
                  "/home/ubuntu/code/bcon-website/src/server/api/routers/itenerary.pdf"
                );
                const attachments: MailAttachment[] = [
                  {
                    filename: "ticket.jpg",
                    content: imageBuffer, // Add the image buffer directly
                  },
                  {
                    filename: "itinerary.pdf",
                    content: docBuffer,
                  },
                ];

                await sendTicketApprovalMail(
                  ticket.email ?? "",
                  ticket.name ?? "",
                  attachments
                );
              } catch (error) {
                console.error("Error downloading image:", error);
              }
            };

            sendTicket().catch(console.error);
          });
        } else if (newStatus === "rejected") {
          void sendTicketRejectionMail(booking.User.email, booking.User.name);
        }
      }

      return { updatedBooking };
    }),

  getBookingDetails: protectedProcedure
    .input(z.object({ bookingId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { bookingId } = input;

      const booking = await ctx.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          User: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          Ticket: true,
        },
      });

      if (!booking) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found",
        });
      }

      return booking;
    }),

  scanTicket: protectedProcedure
    .input(
      z.object({
        ticketID: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currTicket = await ctx.prisma.ticket.findUnique({
        where: {
          id: input.ticketID,
          inCampus: false,
        },
        include: {
          booking: true,
        },
      });

      console.log(currTicket);
      await ctx.prisma.ticket.update({
        where: {
          id: currTicket?.id, // Update the current pending booking
        },
        data: {
          inCampus: true,
        },
      });

      const usrDetails = {
        name: currTicket?.name,
        email: currTicket?.email,
      };

      console.log(usrDetails);
      return usrDetails;
    }),

  // Fetch ticket details based on ticket ID (without updating inCampus status)
  // Fetch ticket details based on ticket ID (without updating inCampus status)
  fetchTicketDetails: protectedProcedure
    .input(z.object({ ticketID: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ticket = await ctx.prisma.ticket.findUnique({
        where: { id: input.ticketID },
        include: {
          booking: true, // Only include booking for the status if needed
        },
      });

      if (!ticket) {
        return { valid: false, data: input.ticketID }; // Invalid ticket
      }

      return {
        valid: true,
        data: {
          id: ticket.id,
          name: ticket.name,
          email: ticket.email,
          phone: ticket.phone, // Directly include phone from ticket
          status: ticket.booking?.status,
          inCampus: ticket.inCampus,
        },
      };
    }),

  // Toggle inCampus status for a specific ticket
  toggleInCampusStatus: protectedProcedure
    .input(z.object({ ticketID: z.string(), inCampus: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const updatedTicket = await ctx.prisma.ticket.update({
        where: { id: input.ticketID },
        data: { inCampus: input.inCampus },
      });

      if (!updatedTicket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Ticket not found",
        });
      }

      return { success: true, inCampus: updatedTicket.inCampus };
    }),
});
