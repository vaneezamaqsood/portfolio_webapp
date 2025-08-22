import { NextResponse } from "next/server";

// Ensure Node.js runtime on Vercel (required for nodemailer)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import nodemailer from "nodemailer";

function missingEnv(keys: string[]): string[] {
  return keys.filter((k) => {
    const v = process.env[k];
    return !v || String(v).trim() === "";
  });
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

    const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL"];
    const missing = missingEnv(required);
    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing environment variables: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    const host = String(process.env.SMTP_HOST);
    const port = Number(process.env.SMTP_PORT || "587");
    const user = String(process.env.SMTP_USER);
    const pass = String(process.env.SMTP_PASS);
    const to = String(process.env.CONTACT_TO_EMAIL);
    const from = String(process.env.CONTACT_FROM_EMAIL || user);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Verify SMTP connectivity and credentials to surface clearer errors
    try {
      await transporter.verify();
    } catch (verifyErr: any) {
      return NextResponse.json(
        { ok: false, error: `SMTP verify failed: ${verifyErr?.message || String(verifyErr)}` },
        { status: 500 }
      );
    }

    const subject = `Portfolio contact: ${name}`;
    const text = `From: ${name} <${email}>
\nMessage:\n${message}`;

    await transporter.sendMail({ from, to, replyTo: email, subject, text });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("/api/contact error", err);
    return NextResponse.json({ ok: false, error: err?.message || "Failed to send message" }, { status: 500 });
  }
}


