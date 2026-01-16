import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    await resend.emails.send({
      from: "TM Studios <onboarding@resend.dev>",
      to: "naveenrsk.dev@gmail.com",
      subject: "New Enquiry",
      html: `
      <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 40px;">
        <div style="
          max-width: 600px; 
          margin: auto; 
          background: #ffffff; 
          border-radius: 16px; 
          overflow: hidden; 
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        ">
          
          <!-- Header -->
          <div style="
            background: linear-gradient(90deg, #db2777, #e11d48); 
            padding: 28px 40px; 
            text-align: center;
          ">
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; letter-spacing: 1px;">
              TM Studios
            </h1>
            <p style="color: #ffe4ec; margin: 8px 0 0; font-size: 14px;">
              Capturing Timeless Moments ✦ Weddings · Maternity · Events
            </p>
          </div>

          <!-- Body -->
          <div style="padding: 40px;">
            <h2 style="color: #333333; font-size: 22px; margin: 0 0 20px;">
            New Enquiry
            </h2>

            <p style="color: #555555; font-size: 16px; line-height: 1.6;">
              You have received a new enquiry from your website. Details are below:
            </p>

            <table style="width: 100%; margin-top: 25px; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Name</td>
                <td style="padding: 10px 0; color: #444;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Email</td>
                <td style="padding: 10px 0; color: #444;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Phone</td>
                <td style="padding: 10px 0; color: #444;">${data.phone}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">City</td>
                <td style="padding: 10px 0; color: #444;">${data.city}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Event Type</td>
                <td style="padding: 10px 0; color: #444;">${data.selectevent}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Event Date</td>
                <td style="padding: 10px 0; color: #444;">${data.date || "Not Provided"}</td>
              </tr>
            </table>

            <hr style="margin: 35px 0; border: none; border-top: 1px solid #eee;" />

            <p style="color: #777; font-size: 14px;">
              Please reach out to them as soon as possible for booking confirmation.
            </p>
          </div>

          <!-- Footer -->
          <div style="background: #fafafa; padding: 25px 40px; text-align: center;">
            <p style="margin: 0; color: #888; font-size: 13px;">
              © TM Studios · Capturing Memories Worldwide
            </p>
            <p style="margin: 6px 0 0; color: #e11d48; font-size: 13px; font-weight: bold;">
              www.tmstudios.photography
            </p>
          </div>

        </div>
      </div>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("RESEND ERROR:", error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
