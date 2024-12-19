import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Define validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://zzzemina-api.vercel.app/api/auth/login",
          values,
          { withCredentials: true } // Important: Include withCredentials to handle cookies
        );

        if (response.status === 200) {
          const userData = response.data;
          login(userData); // Assuming login function stores user info in context
          if (userData.user.role === "admin") {
            navigate("/manage_bookings");
          } else {
            navigate("/my_bookings");
          }
        }
      } catch (error) {
        console.error("Login error", error);
        formik.setErrors({
          general: "Invalid email and/or password. Please try again.",
        });
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card shadow-xl w-full bg-base-300 sm:w-96 card-bordered card-compact border-gray-800">
        <div className="card-title items-center justify-center">
          <h1 className="text-5xl font-bold m-5">Zzzemina</h1>
        </div>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered w-full"
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="input input-bordered w-full"
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <Link to="/forgot_password">Forgot Password?</Link>
            </div>
            {/* Display general error message */}
            {formik.errors.general && (
              <div className="text-red-500">{formik.errors.general}</div>
            )}
            <button type="submit" className="btn btn-secondary w-full">
              Login
            </button>
          </form>
          <div className="flex w-full flex-col border-opacity-50">
            <div className="divider">Or no account yet?</div>
              <Link className="btn btn-neutral w-full" to="/register">
                Register
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
