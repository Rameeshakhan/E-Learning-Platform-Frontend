import background from "../assets/images/Background.png";
import styles from "../assets/css/index.module.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}> {/* Add the "container" class */}
      <div className={styles.columnStyles}>
        <div className={styles.leftSide}>
          <h2>Digital Learning Platform</h2>
          <p>
            Discover the convenience and effectiveness of online tutoring with our website. Whether you are looking for academic support or want to learn new skills, our platform connects you with qualified tutors who offer personalized guidance and engaging lessons. Join us today and unlock the power of online learning with our dedicated tutors.
          </p>
          <button className={styles.button} onClick={()=> navigate("/login")}>Login Here</button>
        </div>
        <div className={styles.rightSide}>
          <img className={styles.image}src={background} alt="Wallpaper" />
        </div>
      </div>
    </div>
  );
};

export default Index;
