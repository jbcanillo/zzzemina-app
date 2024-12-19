import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SeminarForm = ({ seminar, onSave, onCancel }) => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      timeFrame: { from: "", to: "" }, // Ensure this is initialized
      venue: "",
      speaker: { name: "", image: "", linkedin: "" },
      fee: 0,
      slotsAvailable: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      date: Yup.string().required("Date is required"),
      timeFrame: Yup.object({
        from: Yup.string().required("Start time is required"),
        to: Yup.string().required("End time is required"),
      }),
      venue: Yup.string().required("Venue is required"),
      speaker: Yup.object({
        name: Yup.string().required("Speaker name is required"),
        image: Yup.string().url("Invalid URL").required("Speaker image is required"),
        linkedin: Yup.string().url("Invalid LinkedIn URL").required("Speaker LinkedIn is required"),
      }),
      fee: Yup.number().required("Fee is required").min(0, "Fee cannot be negative"),
      slotsAvailable: Yup.number().required("Slots Available is required").min(1, "At least one slot required"),
    }),
    onSubmit: (values) => {
      onSave(values); // Trigger onSave when the form is submitted
    },
  });

  // Pre-fill form if editing a seminar
  useEffect(() => {
    if (seminar && seminar.timeFrame) {
      const formattedDate = new Date(seminar.date).toISOString().split('T')[0];
      formik.setValues({
        ...seminar,
        date: formattedDate,
        timeFrame: seminar.timeFrame || { from: "", to: "" }, // Ensure timeFrame is set properly
      });
    }
  }, [seminar]);

  return (
    <div className="card card-compact">
      <div className="form-container">
        <h2 className="card-title pt-5 pl-5">
          {seminar ? "Update Seminar" : "Create New Seminar"}
        </h2>
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            {/* Title */}
            <label>Title*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="Seminar Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500">{formik.errors.title}</div>
            )}

            {/* Description */}
            <label>Description*</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Seminar Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500">{formik.errors.description}</div>
            )}

            {/* Date */}
            <label>Date*</label>
            <input
              className="input input-bordered w-full"
              type="date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.date && formik.errors.date && (
              <div className="text-red-500">{formik.errors.date}</div>
            )}

            {/* Time From */}
            <label>Time From*</label>
            <input
              className="input input-bordered w-full"
              type="time"
              name="timeFrame.from"
              value={formik.values.timeFrame.from}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.timeFrame?.from && formik.errors.timeFrame?.from && (
              <div className="text-red-500">{formik.errors.timeFrame?.from}</div>
            )}

            {/* Time To */}
            <label>Time To*</label>
            <input
              className="input input-bordered w-full"
              type="time"
              name="timeFrame.to"
              value={formik.values.timeFrame.to}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.timeFrame?.to && formik.errors.timeFrame?.to && (
              <div className="text-red-500">{formik.errors.timeFrame?.to}</div>
            )}

            {/* Venue */}
            <label>Venue*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              name="venue"
              value={formik.values.venue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.venue && formik.errors.venue && (
              <div className="text-red-500">{formik.errors.venue}</div>
            )}

            {/* Speaker Name */}
            <label>Speaker Name*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              name="speaker.name"
              value={formik.values.speaker.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.speaker?.name && formik.errors.speaker?.name && (
              <div className="text-red-500">{formik.errors.speaker?.name}</div>
            )}

            {/* Speaker Image URL */}
            <label>Speaker Image URL*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              name="speaker.image"
              value={formik.values.speaker.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.speaker?.image && formik.errors.speaker?.image && (
              <div className="text-red-500">{formik.errors.speaker?.image}</div>
            )}

            {/* Speaker LinkedIn URL */}
            <label>Speaker LinkedIn*</label>
            <input
              className="input input-bordered w-full"
              type="text"
              name="speaker.linkedin"
              value={formik.values.speaker.linkedin}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.speaker?.linkedin && formik.errors.speaker?.linkedin && (
              <div className="text-red-500">{formik.errors.speaker?.linkedin}</div>
            )}

            {/* Fee */}
            <label>Fee*</label>
            <input
              className="input input-bordered w-full"
              type="number"
              name="fee"
              value={formik.values.fee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.fee && formik.errors.fee && (
              <div className="text-red-500">{formik.errors.fee}</div>
            )}

            {/* Slots Available */}
            <label>Slots Available*</label>
            <input
              className="input input-bordered w-full"
              type="number"
              name="slotsAvailable"
              value={formik.values.slotsAvailable}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.slotsAvailable && formik.errors.slotsAvailable && (
              <div className="text-red-500">{formik.errors.slotsAvailable}</div>
            )}

            <div className="card-actions justify-end mt-5">
              <button type="submit" className="btn btn-success btn-sm">
                Save
              </button>
              <button
                type="button"
                className="btn btn-default btn-sm"
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

export default SeminarForm;
