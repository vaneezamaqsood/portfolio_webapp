import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function getEnv(key: string, fallback?: string): string {
  const v = process.env[key] ?? fallback;
  if (!v) throw new Error(`Missing env: ${key}`);
  return v;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "All fields are required" }, { status: 400 });
    }

    const host = getEnv("SMTP_HOST");
    const port = Number(getEnv("SMTP_PORT", "587"));
    const user = getEnv("SMTP_USER");
    const pass = getEnv("SMTP_PASS");
    const to = getEnv("CONTACT_TO_EMAIL");
    const from = getEnv("CONTACT_FROM_EMAIL", user);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `Portfolio contact: ${name}`;
    const text = `From: ${name} <${email}>
\nMessage:\n${message}`;

    await transporter.sendMail({ from, to, replyTo: email, subject, text });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, error: "Failed to send message" }, { status: 500 });
  }
}


