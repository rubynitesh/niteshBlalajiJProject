
import React, { useState } from "react";
import { loginUser } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= JWT LOGIN =================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const payload = {
      usernameOrEmail: email.trim(),
      password: password,
    };

    try {
      const data = await loginUser(payload);

      console.log("Login Response:", data);

      if (!data?.accessToken || !data?.role) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name || "");

      toast.success("Login Successful 🎉");

      switch (data.role) {
        case "ROLE_ADMIN":
          navigate("/admin/dashboard");
          break;

        case "ROLE_STAFF":
          navigate("/user/dashboard");
          break;

        case "ROLE_SHOP_OWNER":
          navigate("/shop-owner/dashboard");
          break;

        case "ROLE_SUPER_ADMIN":
          navigate("/super-admin/dashboard");
          break;

        default:
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("name");
          toast.error("Invalid user role");
      }

    } catch (error) {
      console.error("Login Error:", error);

      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Invalid Credentials";

      toast.error(errorMsg);

    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================

  const handleGoogleLogin = () => {
    const API_BASE_URL =
      import.meta.env.VITE_API_BASE_URL ||
      "http://localhost:3030";

    window.location.href =
      `${API_BASE_URL}/oauth2/authorization/google`;
  };

  // ================= UI =================

  return (
    <main className="luxury-login">

      {/* LEFT BRANDING PANEL */}

      <section className="brand-section">

        <div className="brand-frame">

          <div className="brand-content">

            <div className="brand-logo">
              <span className="logo-symbol">✦</span>
              <span className="logo-letters">BJ</span>
            </div>

            <p className="brand-eyebrow">
              WELCOME TO
            </p>

            <h1 className="brand-title">
              SHREE BALA JI
              <span>JEWELLERY</span>
            </h1>

            <div className="gold-divider">
              <span>✦</span>
            </div>

            <p className="brand-description">
              Where Tradition Meets Elegance.
              <br />
              Celebrating Every Precious Moment
              <br />
              With Timeless Jewellery.
            </p>

            <div className="brand-tagline">
              <span>PURE ELEGANCE</span>
              <i></i>
              <span>TIMELESS BEAUTY</span>
            </div>

          </div>

          <p className="brand-copyright">
            © 2026 Shree Bala Ji Jewellery.
            All Rights Reserved.
          </p>

        </div>

      </section>

      {/* RIGHT LOGIN PANEL */}

      <section className="login-section">

        <div className="login-wrapper">

          {/* MOBILE BRAND */}

          <div className="mobile-brand">
            <span>✦</span>
            SHREE BALA JI JEWELLERY
          </div>

          {/* LOGIN HEADING */}

          <div className="login-heading">

            <div className="welcome-icon">
              ✦
            </div>

            <h2>Welcome Back!</h2>

            <p>
              Sign in to access your jewellery
              billing dashboard.
            </p>

          </div>

          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email Address / Username
              </label>

              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
                autoComplete="username"
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="form-group">

              <div className="password-label">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            {/* SIGN IN BUTTON */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}

              {!loading && <span> →</span>}
            </button>

          </form>

          {/* DIVIDER */}

          <div className="or-divider">
            <span></span>
            <p>OR CONTINUE WITH</p>
            <span></span>
          </div>

          {/* GOOGLE LOGIN */}

          <button
            type="button"
            className="google-login"
            onClick={handleGoogleLogin}
          >

            <svg
              width="21"
              height="21"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />

              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.02 46.98 31.89 46.98 24.55z"
              />

              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
              />

              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.14 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            Continue with Google

          </button>

          {/* SECURITY MESSAGE */}

          <div className="security-note">
            <span>🔒</span>

            <p>
              Your account and business data
              are securely protected.
            </p>
          </div>

          {/* FOOTER */}

          <p className="login-footer">
            SHREE BALA JI JEWELLERY BILLING SYSTEM
          </p>

        </div>

      </section>

    </main>
  );
}

export default Login;
