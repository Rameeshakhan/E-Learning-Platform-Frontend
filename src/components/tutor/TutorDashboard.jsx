import { useState } from 'react';
import styles from "../../assets/css/dashboard.module.css"
import Requests from "./Requests"
import CreateProposal from './Submit-A-Proposal/CreateProposal';
import ProposalList from './Submit-A-Proposal/ProposalList';
import { useNavigate } from 'react-router-dom';


const TutorDashBoard = () => {

  const navigate = useNavigate()
  const [activeOption, setActiveOption] = useState("submitted"); // State to track the active button

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const getAmount = 1200

  return (
    <div className={styles.upperContainer}>
      <div className={styles.header}>
        <h3>Dashboard</h3>
        <button className={styles.logoutBtn} onClick={handleLogout}>Logout</button>
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
          Requests
        </button>
        <button
          className={`${styles.dashBoardOptions} ${activeOption === "createRequest" && styles.active}`}
          onClick={() => handleOptionClick("createRequest")}
        >
          Create Proposal
        </button>
        <h5 style={{float: "right", margin: "50px 10px 0px 0px"}}>Amount: {getAmount}$</h5>
      </span>
      <hr style={{color: "#770043"}} />
      
      {activeOption === "submitted" && <ProposalList/>}
      {activeOption === "classrooms" && <Requests />}
      {activeOption === "createRequest" && <CreateProposal />}
    </div>
    </div>
  );
};

export default TutorDashBoard;
