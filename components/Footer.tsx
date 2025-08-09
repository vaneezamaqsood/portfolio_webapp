import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold">Let's collaborate</h3>
          <p className="text-muted-foreground mt-2 max-w-prose">
            I design and build intuitive experiences. Open to freelance and full-time roles.
          </p>
        </div>
        <div className="flex items-center gap-4 sm:justify-end">
          <Link className="hover:underline" href="/contact">
            Contact
          </Link>
          <a className="hover:underline" href="mailto:vaneeza@example.com">
            Email
          </a>
          <a className="hover:underline" href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="hover:underline" href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Vaneeza M. All rights reserved.
      </div>
    </footer>
  );
}


