import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type EarlyBirdPayload = {
  name: string;
  email: string;
  phone?: string;
  question?: string;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EarlyBirdPayload>;

    if (!isNonEmptyString(body.name) || !isNonEmptyString(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email" },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const mailTo = process.env.MAIL_TO || "awaiveera@navafit.sg";

    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Email not configured on server. Set GMAIL_USER and GMAIL_APP_PASSWORD.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const subject = `🌅 NavaFit Rise-At-Dawn Lead: ${body.name.trim()}`;
    const text = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone || ""}`,
      `Question: ${body.question || ""}`,
    ].join("\n");

    await transporter.sendMail({
      from: `"NavaFit Early Bird" <${gmailUser}>`,
      to: mailTo,
      replyTo: body.email,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}


