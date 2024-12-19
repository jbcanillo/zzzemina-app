import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ user, onSave, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "user",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      role: Yup.string()
        .oneOf(["user", "admin"], "Invalid role")
        .required("Role is required"),
    }),
    onSubmit: (values) => {
      onSave(values); // Pass the form data for updating
    },
  });

  // Pre-fill form if editing a user
  useEffect(() => {
    if (user) {
      formik.setValues({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  return (
    <div className="card card-compact">
      <div className="form-container">
        <h2 className="card-title pt-5 pl-5">
          {user ? "Update User" : "Create New User"}
        </h2>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <label>Firstname*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500">{formik.errors.firstName}</div>
            )}

            <label>Lastname*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="text-red-500">{formik.errors.lastName}</div>
            )}

            <label>Email*</label>
            <input
              className="input input-bordered w-full"
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}

            <label>Role*</label>
            <select
              className="select select-bordered w-full"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500">{formik.errors.role}</div>
            )}

            <div className="card-actions justify-end mt-5">
              <button className="btn btn-success btn-sm" type="submit">
                {user ? "Update" : "Create"}
              </button>
              <button
                className="btn btn-default btn-sm"
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
