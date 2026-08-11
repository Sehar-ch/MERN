import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { registerUser } from "../api/api";

function Login() {
  const { login } = useAuth();

  const [mode, setMode] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        // Register, then log in immediately with the same credentials
        await registerUser({ name, email, password });
        await login(email, password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Student Records</h1>
        <p className="subtitle">{mode === "login" ? "Log in to continue" : "Create an account"}</p>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>

          {/* Error state */}
          {error && <p className="error-banner">{error}</p>}

          {/* Loading state — button is disabled and shows different text while a request is in flight */}
          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Log In" : "Register"}
          </button>
        </form>

        <p className="toggle-mode">
          {mode === "login" ? (
            <>Don't have an account?{" "}
              <button type="button" className="link-btn" onClick={() => { setMode("register"); setError(""); }}>
                Register
              </button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button type="button" className="link-btn" onClick={() => { setMode("login"); setError(""); }}>
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;