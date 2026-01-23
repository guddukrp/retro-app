import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, useSession } from "../services/SupabaseAuth";
import { PAGES } from "../common/constant";
import "./Login.css";

type Method = "email" | "password" | "mobile" | "google";

export default function Login() {
  const [method, setMethod] = useState<Method>("google");
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("session",session);
    if (session) {
      navigate(PAGES.HOME, { replace: true });
    }
  }, [session, navigate]);

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
            <button className={method === "google" ? "active" : ""} onClick={() => setMethod("google")}>Google</button>
            <button className={method === "email" ? "active" : ""} onClick={() => setMethod("email")}>Email Link</button>
            <button className={method === "password" ? "active" : ""} onClick={() => setMethod("password")}>Email + Password</button>
            <button className={method === "mobile" ? "active" : ""} onClick={() => setMethod("mobile")}>Mobile</button>
          </div>

          <div className="auth-body">

            {method === "google" && (
              <button className="auth-google-btn" onClick={signInWithGoogle}>
                Continue with Google
              </button>
            )}

            {method === "email" && (
              <>
                <input className="auth-input" placeholder="Email address" />
                <button className="auth-btn-primary">Send Magic Link</button>
              </>
            )}

            {method === "password" && (
              <>
                <input className="auth-input" placeholder="Email" />
                <input className="auth-input" placeholder="Password" type="password" />
                <button className="auth-btn-primary">Login</button>
              </>
            )}

            {method === "mobile" && (
              <>
                <input className="auth-input" placeholder="Mobile number" />
                <button className="auth-btn-primary">Send OTP</button>
              </>
            )}

          </div>

          <p className="auth-footer">
            Don't have an account? <span>Create one</span>
          </p>
        </div>
      </div>

    </div>
  );
}
