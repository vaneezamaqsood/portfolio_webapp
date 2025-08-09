"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    const name = formData.get("name");
    setStatus(`Thanks${name ? ", " + String(name) : ""}! I’ll get back to you soon.`);
  }

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="text-muted-foreground mt-2">Let's build something great together.</p>
      <form action={onSubmit} className="mt-8 grid gap-4">
        <input name="name" placeholder="Your name" className="border rounded-md px-3 py-2" />
        <input name="email" placeholder="Email" type="email" className="border rounded-md px-3 py-2" />
        <textarea name="message" placeholder="Message" rows={5} className="border rounded-md px-3 py-2" />
        <button className="rounded-md border px-4 py-2 hover:bg-foreground hover:text-background transition-colors">Send</button>
      </form>
      {status ? <p className="mt-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}

