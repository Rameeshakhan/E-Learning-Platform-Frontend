import { useState } from 'react';
import styles from "../../assets/css/dashboard.module.css"
import CreateRequest from "./Requests-A-Tutor/CreateRequest"
import RequestList from "./Requests-A-Tutor/RequestList"
import Proposal from './Proposal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { proposalActions } from "../../redux/slices/ProposalSlice";

const DashBoard = () => {
  const [activeOption, setActiveOption] = useState("submitted"); // State to track the active button
  const dispatch = useDispatch();
  const storedData = localStorage.getItem('proposalData');
  const parsedData = JSON.parse(storedData);
  const rId = parsedData ? parsedData.requestId : '';
  const proposalData = useSelector((state) => state.proposal.proposalData);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };


  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("role")
    navigate("/login")
  }

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
            Submitted Request
          </button>
          <button
            className={`${styles.dashBoardOptions} ${activeOption === "classrooms" && styles.active}`}
            onClick={() => handleOptionClick("classrooms")}
          >
            Proposals
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
        {activeOption === "classrooms" && <Proposal />}
        {activeOption === "createRequest" && <CreateRequest />}
      </div>
    </div>
  );
};

export default DashBoard;
