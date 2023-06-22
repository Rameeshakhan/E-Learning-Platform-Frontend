import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { proposalActions } from "../../../redux/slices/ProposalSlice";
import styles from "../../../assets/css/dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CreateProposal = () => {
  const dispatch = useDispatch();

  const storedData = localStorage.getItem('proposalData');
  const proposalData = JSON.parse(storedData);
  const uId = proposalData ? proposalData.userId : '';
  const rId = proposalData ? proposalData.requestId : '';

  const formik = useFormik({
    initialValues: {
      amount: "",
      description: "",
      userID: uId,
      reqID: rId
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Amount per month is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(proposalActions.createProposal(values));
      toast.success("Created Proposal successfully!");
      resetForm();
    },
    
  });

  return (
    <div>
      <div>
        <form className={styles.requestForm} onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Enter Amount Per Month</label>
            <input
              type="number"
              className="form-control"
              min="0"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="error">{formik.errors.amount}</div>
            ) : null}
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="error">{formik.errors.description}</div>
            ) : null}
          </div>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProposal;
