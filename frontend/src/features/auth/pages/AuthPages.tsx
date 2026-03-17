import { useState } from "react";
import { apiFetch } from "../../../services/apiClient";

export function AuthPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    await apiFetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    setMessage("Account created. Verify email before login.");
  }

  async function handleLogin() {
    await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    setMessage("Logged in.");
  }

  return (
    <section>
      <h1>QA Hotel Auth</h1>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleSignup}>Sign up</button>
      <button onClick={handleLogin}>Log in</button>
      <p>{message}</p>
    </section>
  );
}
