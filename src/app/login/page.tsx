"use client";
import { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { toast } from "sonner";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      const attResp = await startAuthentication({
        optionsJSON: data,
      });

      await fetch("/api/login-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attResp, email }),
      });
    } catch (error) {
      console.error("An unexpected error happened:", error);
      toast.error(error.message);
    }
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
