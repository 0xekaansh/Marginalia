import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Input from "./Input";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function AuthForm({ isRegister = false }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRegister) {
      if (!formData.username.trim())
        newErrors.username = "Username is required.";

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const endpoint = isRegister ? "/register" : "/login";

    const payload = isRegister
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        payload,
      );
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (err) {
      setErrors({
        form: err.response?.data?.message || "Action failed, try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isRegister ? "Register" : "Login"}</h1>
      {errors.form && <div>{errors.form}</div>}
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <Input
            label="Username"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
        )}
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <div>
          <Input
            label="Password"
            type={!showPassword ? "password" : "text"}
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </button>
        </div>
        {isRegister && (
          <div>
            <Input
              label="Confirm Password"
              type={!showConfirmPassword ? "password" : "text"}
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {isRegister ? "Register" : "Log In"}
        </button>
      </form>

      <div>
        {isRegister ? (
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
