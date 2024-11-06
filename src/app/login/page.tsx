"use client";
import { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { axios } from "@/http/axios";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    const res = await axios.post("/api/login", { email });
    const data = res.data;
    const attResp = await startAuthentication({
      optionsJSON: data,
    });
    await axios.post("/api/login-verify", { attResp, email });
  }

  return (
    <div className="m-20">
      <form
        onSubmit={handleLogin}
        className="flex  flex-col items-center space-y-2"
      >
        <h1 className="text-3xl mb-12" >
          Passkey Auth
        </h1>
        <p>
          Enter your email
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
          required
        />
        <button
          type="submit"
          className="w-[300px] py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
        >
          Login
        </button>
        <p className="text-gray-500 text-sm">or</p>
        <Link href="/register" className="text-blue-600 text-sm hover:underline"  >
          register
        </Link>
      </form>
    </div>
  );
}
