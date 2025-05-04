import nodemailer from "nodemailer";

export async function POST(req) {
    const { name, email, problem } = await req.json();

    if (!problem) {
      return new Response(
        JSON.stringify({ error: "Problem statement is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  


    await Promise.all(mailOptions.map((options) => transporter.sendMail(options)));
    
    console.error("Email sending failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  
}
