import { useState } from "react";
import GeneralClassroom from "../classrooms/GeneralClassroom";
import styles from "../../assets/css/classroom.module.css"
import { useNavigate } from "react-router-dom";

const Proposal = () => {
  const navigate = useNavigate()

  const handleClassroomBtn = () => {
    navigate("/classroom")
  };

  return (
    <div>
      <h4 className={styles.heading}> Proposals</h4>
      <div>
       Accepted Proposals
      </div>
    </div>
  );
};

export default Proposal;
