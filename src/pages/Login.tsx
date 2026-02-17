import { useState } from "react";
import {
  signInWithGoogle,
  signInWithEmailLink,
  signInWithEmailPassword,
  signInWithPhoneOtp,
} from "../services/SupabaseAuth";
import "./Login.css";

type Method = "email" | "password" | "mobile" | "google";

export default function Login() {
  const [method, setMethod] = useState<Method>("google");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailLink = async () => {
    setMessage("");
    const value = email.trim();
    if (!value) {
      setMessage("Enter your email address.");
      return;
    }
    const { error } = await signInWithEmailLink(value);
    setMessage(error ? error.message : "Magic link sent. Check your inbox.");
  };

  const handleEmailPassword = async () => {
    setMessage("");
    if (!email.trim() || !password) {
      setMessage("Enter both email and password.");
      return;
    }
    const { error } = await signInWithEmailPassword(email.trim(), password);
    if (error) setMessage(error.message);
  };

  const handlePhoneOtp = async () => {
    setMessage("");
    const value = phone.trim();
    if (!value) {
      setMessage("Enter your mobile number.");
      return;
    }
    const { error } = await signInWithPhoneOtp(value);
    setMessage(error ? error.message : "OTP sent to your phone.");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="brand">
          <h1>Retro App</h1>
          <p>A fast & secure way to manage your learning platform.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2 className="auth-title">Welcome to Retro App</h2>
          <p className="auth-sub">Choose a login method</p>

          <div className="auth-methods">
            <button
              className={method === "google" ? "active" : ""}
              onClick={() => setMethod("google")}
            >
              Google
            </button>
            <button
              className={method === "email" ? "active" : ""}
              onClick={() => setMethod("email")}
            >
              Email Link
            </button>
            <button
              className={method === "password" ? "active" : ""}
              onClick={() => setMethod("password")}
            >
              Email + Password
            </button>
            <button
              className={method === "mobile" ? "active" : ""}
              onClick={() => setMethod("mobile")}
            >
              Mobile
            </button>
          </div>

          <div className="auth-body">
            {method === "google" && (
              <button className="auth-google-btn" onClick={signInWithGoogle}>
                Continue with Google
              </button>
            )}

            {method === "email" && (
              <>
                <input
                  className="auth-input"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="auth-btn-primary" onClick={handleEmailLink}>
                  Send Magic Link
                </button>
              </>
            )}

            {method === "password" && (
              <>
                <input
                  className="auth-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="auth-input"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="auth-btn-primary"
                  onClick={handleEmailPassword}
                >
                  Login
                </button>
              </>
            )}

            {method === "mobile" && (
              <>
                <input
                  className="auth-input"
                  placeholder="Mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button className="auth-btn-primary" onClick={handlePhoneOtp}>
                  Send OTP
                </button>
              </>
            )}
            {message && <p className="auth-footer">{message}</p>}
          </div>

          <p className="auth-footer">
            Don't have an account? <span>Create one</span>
          </p>
        </div>
      </div>
    </div>
  );
}
