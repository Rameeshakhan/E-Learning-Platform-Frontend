import React from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../assets/css/dashboard.module.css";
import { createRequest } from "../../../redux/slices/RequestsSlice";

const CreateRequest = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    const userId = localStorage.getItem("user");
    const parsedUser = JSON.parse(userId);
    const id = parsedUser.id;
  
    const requestValues = {
      ...values,
      userId: id,
    };
  
    try {
      await dispatch(createRequest(requestValues));
      toast.success("Request created successfully");
      resetForm();
    } catch (error) {
      toast.error("Error creating request");
    }
  };
  
  const validationSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  return (
    <div>
      <div>
        <Formik
          initialValues={{
            subject: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Enter Subject</label>
                <Field
                  type="text"
                  className={`form-control ${
                    errors.subject && touched.subject ? "is-invalid" : ""
                  }`}
                  name="subject"
                />
                {errors.subject && touched.subject && (
                  <div className="invalid-feedback">{errors.subject}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <Field
                  as="textarea"
                  className={`form-control ${
                    errors.description && touched.description
                      ? "is-invalid"
                      : ""
                  }`}
                  name="description"
                  rows={3}
                />
                {errors.description && touched.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateRequest;
