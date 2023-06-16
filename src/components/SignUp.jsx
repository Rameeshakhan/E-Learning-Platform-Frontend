import { useNavigate } from "react-router-dom";
import styles from "../assets/css/signup.module.css"
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
            <FaArrowLeft onClick={() => navigate("/login")} />
            <h2 style={{ display: "inline-block", paddingLeft: "20px" }}>Create Account</h2>
        </div>
        <div className={styles.signupBody}>
          <form>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select">
                <option disabled selected>Select your Role</option>
                <option value="1">Student</option>
                <option value="2">Tutor</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" />
            </div>
            <button className={styles.registerBtn}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
