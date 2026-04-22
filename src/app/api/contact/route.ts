import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const TO = "info@club-garage-prag.cz";
const FROM = "web@club-garage-prag.cz";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "invalid_body" }, { status: 400 });

  const { name, email, date, size, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Poptávka privátní akce — ${name}`,
    text: [
      `Jméno: ${name}`,
      `E-mail: ${email}`,
      date ? `Termín: ${date}` : null,
      size ? `Velikost skupiny: ${size}` : null,
      `\nZpráva:\n${message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
