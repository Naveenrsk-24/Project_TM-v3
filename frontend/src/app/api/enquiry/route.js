import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Google Sheets webhook
const GOOGLE_SHEETS_WEBHOOK =
  "https://script.google.com/macros/s/AKfycbx2WrNJ7nyXgI4bk6Co5yGs6QFkRvG4RI_xddrvCCoelAKVG7F3ECjGA3jagUM5DJDQ/exec";

export async function POST(req) {
  try {
    const data = await req.json();

    // ----------------------------------------------------
    // 1️⃣ ADMIN EMAIL (You)
    // ----------------------------------------------------
    await resend.emails.send({
      from: "TM Studios <onboarding@resend.dev>",
      to: "naveenrsk.dev@gmail.com",
      subject: "New Enquiry Received",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 40px;">
        <div style="max-width: 600px;margin: auto;background: #ffffff;border-radius: 16px;overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);">
          
          <div style="background: linear-gradient(90deg, #db2777, #e11d48); padding: 28px 40px;text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 1px;">
              TM Studios
            </h1>
            <p style="color: #ffe4ec; margin: 8px 0 0; font-size: 14px;">
              Capturing Timeless Moments ✦ Weddings · Maternitys · Baby Shoots
            </p>
          </div>

          <div style="padding: 40px;">
            <h2 style="color: #333333; font-size: 22px; margin: 0 0 20px;">
              New Enquiry Received
            </h2>

            <table style="width: 100%; margin-top: 25px;">
              <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
              <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${data.phone}</td></tr>
              <tr><td><strong>City</strong></td><td>${data.city}</td></tr>
              <tr><td><strong>Event</strong></td><td>${data.selectevent}</td></tr>
              <tr><td><strong>Date</strong></td><td>${data.date || "Not Provided"}</td></tr>
            </table>
          </div>

          <div style="background: #fafafa; padding: 25px 40px; text-align: center;">
            <p style="margin: 0; color: #888;">© TM Studios · Capturing Memories Worldwide</p>
            <p style="margin-top: 6px; color: #e11d48; font-weight: bold;">www.tmstudios.photography</p>
          </div>
        </div>
      </div>
      `,
    });

    // ----------------------------------------------------
    // 2️⃣ AUTO-REPLY EMAIL (Client)
    // ----------------------------------------------------
    await resend.emails.send({
      from: "TM Studios Photography <onboarding@resend.dev>",
      to: data.email,
      subject: "We Received Your Enquiry — TM Studios",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 40px;">
        <div style="max-width: 600px;margin: auto;background: #ffffff;border-radius: 16px;overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);">

          <div style="background: linear-gradient(90deg, #db2777, #e11d48); padding: 28px 40px;text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">TM Studios Photography</h1>
          </div>

          <div style="padding: 40px; text-align: left;">
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            <p style="color: #555; font-size: 16px; line-height: 1.6;">
              Hi <strong>${data.name}</strong>,<br/><br/>
              We’ve received your enquiry and our team will get in touch with you shortly.
              We look forward to capturing your special moments!
            </p>
          </div>

          <div style="background: #fafafa; padding: 25px 40px; text-align: center;">
            <p style="margin:0;color:#888;font-size:13px;">© TM Studios Photography</p>
          </div>

        </div>
      </div>
      `,
    });

    // ----------------------------------------------------
    // 3️⃣ SAVE TO GOOGLE SHEETS
    // ----------------------------------------------------
    await fetch(GOOGLE_SHEETS_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("ERROR:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
