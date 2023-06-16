import { useState } from 'react';
import styles from "../../assets/css/dashboard.module.css"
import ClassRoom from "./ClassRoom"
import CreateRequest from "./Requests-A-Tutor/CreateRequest"
import RequestList from "./Requests-A-Tutor/RequestList"

const DashBoard = () => {
  const [activeOption, setActiveOption] = useState("submitted"); // State to track the active button

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <div className={styles.upperContainer}>
      <div className={styles.header}>
        <h2>Dashboard</h2>
        <button className={styles.logoutBtn}>Logout</button>
      </div>
    <div className={styles.container}>
      <span className={styles.navOptions}>
        <button
          className={`${styles.dashBoardOptions} ${activeOption === "submitted" && styles.active}`}
          onClick={() => handleOptionClick("submitted")}
        >
          Submitted Request
        </button>
        <button
          className={`${styles.dashBoardOptions} ${activeOption === "classrooms" && styles.active}`}
          onClick={() => handleOptionClick("classrooms")}
        >
          Classrooms
        </button>
        <button
          className={`${styles.dashBoardOptions} ${activeOption === "createRequest" && styles.active}`}
          onClick={() => handleOptionClick("createRequest")}
        >
          Create Request
        </button>
      </span>
      <hr style={{color: "#770043"}} />
      
      {activeOption === "submitted" && <RequestList />}
      {activeOption === "classrooms" && <ClassRoom />}
      {activeOption === "createRequest" && <CreateRequest />}
    </div>
    </div>
  );
};

export default DashBoard;
