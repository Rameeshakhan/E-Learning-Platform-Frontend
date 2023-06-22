import { useState } from "react";
import GeneralClassroom from "../classrooms/GeneralClassroom";
import styles from "../../assets/css/classroom.module.css"
import { useNavigate } from "react-router-dom";

const Proposal = () => {
  const navigate = useNavigate()
  const acceptedRequestData = [
    {
      subject: "Math",
      description:
        "Mathematics is the study of numbers, shapes, and patterns. It encompasses various branches such as algebra, geometry, and calculus. Science, on the other hand, is the systematic study of the natural world through observation and experimentation, including disciplines like physics, chemistry, and biology.",
      status: "accepted",
    },
    {
      subject: "Science",
      description:
        "Sports refer to physical activities involving competitive games, exercises, and challenges. They promote physical fitness, teamwork, and skill development. Fitness encompasses a broader concept of overall health and well-being, including activities like exercise, nutrition, and lifestyle choices to maintain optimal physical and mental condition.",
      status: "accepted",
    },
  ];

  const handleClassroomBtn = () => {
    navigate("/classroom")
  };

  return (
    <div>
      <h4 className={styles.heading}> Proposals</h4>
      <div>
        {acceptedRequestData.map((data) => (
          <div className={styles.contaier} key={data.subject}>
            <h5>{data.subject}</h5>
            <button className={styles.button} onClick={handleClassroomBtn}>Go To Classroom</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proposal;
