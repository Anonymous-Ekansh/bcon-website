import nodemailer from "nodemailer";
import { env } from "~/env";
import type { Booking, Ticket} from "@prisma/client";
import { prisma } from "~/server/db";
import axios from "axios";
export type MailAttachment = {
  filename: string,
  content: Buffer,
};

// Setup transporter with Gmail credentials from environment
const transporter = nodemailer.createTransport({
  host: env.EMAIL_SERVER_HOST,
  port: parseInt(env.EMAIL_SERVER_PORT, 10),
  secure: env.EMAIL_SERVER_PORT === "465", // true for 465, false for 587
  auth: {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD,
  },
});

// Generic function to send email
export async function sendMail(to: string, subject: string, html?: string, attachments?:MailAttachment[]) {
  try {
    console.log(`Attempting to send email to: ${to}`);
    console.log(`Email subject: ${subject}`);
    console.log(`Email server configuration:`, {
      host: env.EMAIL_SERVER_HOST,
      port: env.EMAIL_SERVER_PORT,
      user: env.EMAIL_SERVER_USER,
    });

    const info = await transporter.sendMail({
      from: `"Business Conclave 2024" <${env.EMAIL_FROM}>`,
      to,
      subject,
      html: html ?? "",
      attachments: attachments ?? []
    });

    console.log("Message sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

// Ticket Approval Email Template
export async function sendTicketApprovalMail(to: string, name: string | null, attachments: MailAttachment[]) {
  const subject = `Your Ticket for Business Conclave 2024 is Confirmed!`;

  const html = `
    <div style="font-size: 16px; font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #ED8936;">Business Conclave 2024</h2>

      <p>Hi ${name?.split(" ")[0] ?? "Valued Customer"},</p>

      <p>We are pleased to inform you that your ticket for the Business Conclave at Shiv Nadar University has been successfully approved.</p>
      <p>
        This year’s theme, <b>Charting New Horizons</b> celebrates the spirit of innovation, bringing together industry leaders, academic experts, and entrepreneurs to explore the evolving world of non-traditional and emerging occupations. Join us for a unique opportunity to gain insights from pioneers shaping the <i>New Era of Occupations</i> and to expand your professional network.
      </p>

      <p>Please find attached your ticket and the event itinerary for your reference. Should you have any questions, feel free to reach out. We look forward to welcoming you and sharing this inspiring experience.</p>

      <p>
        <div>Best regards,</div>
        <div>Business Conclave 2024 Team</div>
      </p>
    </div>
  `;

  return await sendMail(to, subject, html, attachments);
}

// Booking Rejection Email Template
export async function sendTicketRejectionMail(to: string, name: string) {
  const subject = `Booking Rejected - Business Conclave 2024`;

  const html = `
    <div style="font-size: 16px; font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #ED8936;">Business Conclave 2024</h2>

      <p>Hi ${name.split(" ")[0] ?? "Valued Customer"},</p>

      <p>Thank you for your interest in attending the Business Conclave at Shiv Nadar University. We regret to inform you that your ticket request has not been approved at this time.</p>

      <p>If you would still like to attend, you are welcome to book a new ticket by visiting our official website at businessconclave.in. Please feel free to reach out to us at this email address if you believe there has been a misunderstanding, and we will be happy to assist you.

</p>

      <p>We appreciate your enthusiasm for the event, and we hope to see you at future editions of the Business Conclave.</p>

      <h3> Please don't forget to join our Whatsapp Group for all the updates <b><a href="https://chat.whatsapp.com/DI4HGXiUaTq92F2iYwf7xn">JOIN NOW</a></b>

      <p>
        <div>Best regards,</div>
        <div>Business Conclave 2024 Team</div>
      </p>
    </div>
  `;

  return await sendMail(to, subject, html);
}

// Test function to verify email configuration
export async function testEmailConfiguration() {
  const testResult = await sendMail(
    env.EMAIL_SERVER_USER,
    "Test Email Configuration",
    "<p>This is a test email to verify the email configuration.</p>"
  );
  console.log("Test email result:", testResult);
  return testResult;
}



