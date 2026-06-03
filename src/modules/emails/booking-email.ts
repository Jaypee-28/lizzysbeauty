import { sendEmail } from "@/lib/resend";
import { Booking, Service } from "@/generated/prisma";

export async function sendBookingConfirmationEmail(booking: Booking, service: Service): Promise<void> {
  try {
    const html = `
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; font-family: 'Inter', sans-serif;">
        <div style="background: linear-gradient(135deg, #FF4D8D, #FF80AC); padding: 40px 32px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Booking Confirmed ✨</h1>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">We can't wait to see you at Lizzy's Beauty Studio</p>
        </div>
        
        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #111827; margin: 0 0 4px;">Hi <strong>${booking.name}</strong>,</p>
          <p style="font-size: 14px; color: #6b7280; margin: 0 0 24px;">Your appointment is confirmed. Here's your booking summary:</p>
          
          <div style="background: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Service</p>
            <p style="margin: 4px 0 0; font-size: 16px; color: #111827; font-weight: 800;">${service.name}</p>
          </div>

          <div style="display: flex; gap: 16px; margin-bottom: 24px;">
            <div style="background: #f9fafb; border-radius: 12px; padding: 16px; flex: 1;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Date</p>
              <p style="margin: 4px 0 0; font-size: 16px; color: #111827; font-weight: 800;">${booking.preferredDate.toLocaleDateString()}</p>
            </div>
            <div style="background: #f9fafb; border-radius: 12px; padding: 16px; flex: 1;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Time</p>
              <p style="margin: 4px 0 0; font-size: 16px; color: #111827; font-weight: 800;">${booking.preferredTime}</p>
            </div>
          </div>

          <div style="border-top: 2px solid #f3f4f6; padding-top: 16px; margin-bottom: 24px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; color: #6b7280;">Full Price</span>
              <span style="font-size: 14px; color: #374151; font-weight: 600;">$${Number(booking.fullPrice || 0).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 14px; color: #6b7280;">Deposit Paid</span>
              <span style="font-size: 14px; color: #16a34a; font-weight: 600;">$${Number(booking.depositPaid || 0).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 2px solid #111827;">
              <span style="font-size: 16px; color: #111827; font-weight: 800;">Balance Due at Salon</span>
              <span style="font-size: 16px; color: #111827; font-weight: 800;">$${Number(booking.outstandingBalance || 0).toFixed(2)}</span>
            </div>
          </div>

          <p style="font-size: 13px; color: #9ca3af; text-align: center; margin: 32px 0 0;">Lizzy's Beauty Studio — Premium Hair & Beauty</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: booking.email,
      subject: `Booking Confirmed: ${service.name} at Lizzy's Beauty Studio`,
      html,
    });

    console.log(`[Email] Booking confirmation sent to ${booking.email} for booking ${booking.id}`);
  } catch (error) {
    console.error(`[Email] Failed to send booking confirmation to ${booking.email}:`, error);
  }
}
