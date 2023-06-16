import { useNavigate } from "react-router-dom"
import styles from "../assets/css/login.module.css"
import login from "../assets/images/login.png"

const Login = () => {

  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/dashboard")
  }
  
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img className={styles.loginIcon} src={login} alt="Login" />
        </div>
        <form className={styles.loginForm}>
          <h3 className={styles.loginHeading}> Login</h3>
          <hr />
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <p className={styles.frgtPass}>Forgot Password?</p>
          <button 
          className={styles.lgnBtn}
          onClick={handleLogin}
          >Login</button>
          <p
            onClick={() => navigate('/signup')}
            className={styles.registerOption}
          >Or Create Account here</p>
        </form>
      </div>
    </div>
  )
}

export default Login
