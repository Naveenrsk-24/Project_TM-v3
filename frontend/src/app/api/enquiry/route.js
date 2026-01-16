import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Google Sheets Webhook
const GOOGLE_SHEETS_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx2WrNJ7nyXgI4bk6Co5yGs6QFkRvG4RI_xddrvCCoelAKVG7F3ECjGA3jagUM5DJDQ/exec";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing");
    }

    /* ----------------------------------------------------
       1️⃣ ADMIN EMAIL (TM Studios)
    ---------------------------------------------------- */
    await resend.emails.send({
      from: "TM Studios Photography <subalesh@tmstudios.photography>",
      to: "naveenrsk.dev@gmail.com",
      reply_to: "subalesh@tmstudios.photography",
      subject: "New Enquiry Received",
      html: `
      <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:40px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;
          box-shadow:0 8px 20px rgba(0,0,0,0.08);">

          <div style="background:linear-gradient(90deg,#db2777,#e11d48);padding:28px 40px;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:26px;">TM Studios</h1>
            <p style="color:#ffe4ec;margin-top:6px;">
              Weddings · Maternity · Baby Shoots
            </p>
          </div>

          <div style="padding:40px;">
            <h2 style="margin-bottom:20px;">New Enquiry</h2>

            <table style="width:100%;line-height:1.8;">
              <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
              <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
              <tr><td><strong>City</strong></td><td>${data.city}</td></tr>
              <tr><td><strong>Event</strong></td><td>${data.selectevent}</td></tr>
              <tr><td><strong>Date</strong></td><td>${data.date || "Not Provided"}</td></tr>
            </table>
          </div>

          <div style="background:#fafafa;padding:20px;text-align:center;color:#888;">
            © TM Studios · www.tmstudios.photography
          </div>
        </div>
      </div>
      `,
    });

    /* ----------------------------------------------------
       2️⃣ AUTO-REPLY EMAIL (CLIENT)
    ---------------------------------------------------- */
    await resend.emails.send({
      from: "TM Studios Photography <hello@tmstudios.photography>",
      to: data.email,
      reply_to: "subalesh@tmstudios.photography",
      subject: "Thank you for contacting TM Studios",
      html: `
      <div style="font-family:Arial,sans-serif;background:#f7f7f7;padding:40px;">
        <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;
          box-shadow:0 8px 20px rgba(0,0,0,0.08);overflow:hidden;">

          <div style="background:linear-gradient(90deg,#db2777,#e11d48);padding:28px;text-align:center;">
            <h1 style="color:#fff;margin:0;">TM Studios Photography</h1>
          </div>

          <div style="padding:40px;">
            <p style="font-size:16px;color:#444;">
              Hi <strong>${data.name}</strong>,
            </p>

            <p style="font-size:16px;color:#555;line-height:1.6;">
              Thank you for reaching out to <strong>TM Studios</strong>.
              We’ve received your enquiry and will contact you shortly to
              discuss your <strong>${data.selectevent}</strong>.
            </p>

            <p style="margin-top:24px;font-size:16px;color:#555;">
              Looking forward to capturing your special moments ✨
            </p>

            <p style="margin-top:30px;">
              — TM Studios Team
            </p>
          </div>

          <div style="background:#fafafa;padding:20px;text-align:center;color:#888;">
            © TM Studios Photography
          </div>
        </div>
      </div>
      `,
    });

    /* ----------------------------------------------------
       3️⃣ SAVE TO GOOGLE SHEETS
    ---------------------------------------------------- */
    await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("ENQUIRY ERROR:", error);
    return Response.json(
      { error: "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
