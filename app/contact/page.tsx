"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      const name = (payload.name as string) || "";
      setStatus(`Thanks${name ? ", " + name : ""}! Your message has been sent.`);
      form.reset();
    } catch (err: any) {
      setStatus(err?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="text-muted-foreground mt-2">Let's build something great together.</p>
      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <input name="name" placeholder="Your name" required className="border rounded-md px-3 py-2" />
        <input name="email" placeholder="Email" type="email" required className="border rounded-md px-3 py-2" />
        <textarea name="message" placeholder="Message" rows={5} required className="border rounded-md px-3 py-2" />
        <button disabled={loading} className="rounded-md border px-4 py-2 hover:bg-foreground hover:text-background transition-colors disabled:opacity-60">
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
      {status ? <p className="mt-4 text-sm text-muted-foreground">{status}</p> : null}
    </div>
  );
}

