"use client";
import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";

export default function Home() {
  const [email, setEmail] = useState("");

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    const attResp = await startRegistration({
      optionsJSON: data,
    });

    await fetch("/api/register-verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attResp, email }),
    });
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
