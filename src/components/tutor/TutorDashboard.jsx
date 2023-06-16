import { useState } from 'react';
import styles from "../../assets/css/dashboard.module.css"
import Classroom from "./Classroom"
import CreateProposal from './Submit-A-Proposal/CreateProposal';
import ProposalList from './Submit-A-Proposal/ProposalList';

const TutorDashBoard = () => {
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
          Submitted Proposals
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
          Create Proposal
        </button>
      </span>
      <hr style={{color: "#770043"}} />
      
      {activeOption === "submitted" && <ProposalList/>}
      {activeOption === "classrooms" && <Classroom />}
      {activeOption === "createRequest" && <CreateProposal />}
    </div>
    </div>
  );
};

export default TutorDashBoard;
