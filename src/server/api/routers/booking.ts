import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";
import { getPresignedUrl } from "~/server/r2";


export const bookingRouter = createTRPCRouter({
  createBooking: protectedProcedure
    .input(
      z.object({
        transactionId: z.string().length(12).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not logged in.",
        });
      }

      try {
        // Fetch the user to ensure it exists
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (!user) {
          console.error(`User not found for ID: ${userId}`);
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `User not found for ID: ${userId}`,
          });
        }

        // Create the booking and link it to the user
        const booking = await prisma.booking.create({
          data: {
            User: {
              connect: { id: user.id },
            },
            transactionId: input.transactionId ?? null, // Initialize with null transaction ID
            status: "pending",
          },
        });

        console.log("Booking created:", booking);
        return { bookingId: booking.id };
      } catch (error) {
        console.error("Error creating booking:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create booking.",
        });
      }
    }),

  uploadBookingForm: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
        ticketOwnerDetails: z.object({
          memberName: z.string(),
          memberPhone: z.string().length(10),
          memberEmail: z.string().email(),
          fileName: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { bookingId, ticketOwnerDetails } = input;
      const { memberName, memberPhone, memberEmail, fileName } =
        ticketOwnerDetails;

      const userId = ctx.session?.user?.id;

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User is not logged in.",
        });
      }

      // Ensure the booking exists and belongs to the current user
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          userId,
        },
      });

      if (!booking) {
        console.error(
          `Booking not found for ID: ${bookingId} and User ID: ${userId}`
        );
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booking not found for the user.",
        });
      }

      const aadharKey = `aadhar/${booking.id}/${fileName}`;
      const signedUrl = await getPresignedUrl(aadharKey);

      // Create a ticket linked to the booking
      const ticket = await prisma.ticket.create({
        data: {
          booking: {
            connect: { id: booking.id },
          },
          name: memberName,
          email: memberEmail,
          phone: memberPhone,
          uploadUrl: signedUrl,
          fileName,
        },
      });

      console.log("Ticket created:", ticket);
      return ticket;
    }),

  getTicketDetails: protectedProcedure.query(async ({ ctx }) => {
    const userID = ctx?.session?.user?.id;

    if (!userID) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "User is not logged in.",
      });
    }

    try {
      const userBookings = await ctx.prisma.booking.findMany({
        where: {
          userId: userID,
        },
        include: {
          Ticket: true,
        },
      });
      if (!userBookings) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No bookings found for this user.",
        });
      }
      return userBookings;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "unable to fetch ticket details",
      });
    }
  }),
});
