import { FaCheckCircle, FaClock } from "react-icons/fa";
import styles from "../../../assets/css/request.module.css";

const RequestList = () => {
  const DummyData = [
    {
      subject: ["Math", "Science"],
      description:
        "Mathematics is the study of numbers, shapes, and patterns. It encompasses various branches such as algebra, geometry, and calculus. Science, on the other hand, is the systematic study of the natural world through observation and experimentation, including disciplines like physics, chemistry, and biology.",
      status: "pending",
    },
    {
      subject: ["History", "Geography"],
      description:
        "History is the examination and interpretation of past events, cultures, and civilizations. It involves the analysis of sources and evidence to understand the development of societies over time. Geography studies the Earth's physical features, climate, and human populations, exploring the relationships between people and their environments.",
      status: "pending",
    },
    {
      subject: ["Art", "Music"],
      description:
        "Art is a diverse range of creative expressions, encompassing various forms like painting, sculpture, and photography. It allows artists to convey emotions, ideas, and perspectives. Music, on the other hand, is an art form that involves combining sounds and rhythms to create harmonious compositions, evoking different moods and emotions.",
      status: "accepted",
    },
    {
      subject: ["Sports", "Fitness"],
      description:
        "Sports refer to physical activities involving competitive games, exercises, and challenges. They promote physical fitness, teamwork, and skill development. Fitness encompasses a broader concept of overall health and well-being, including activities like exercise, nutrition, and lifestyle choices to maintain optimal physical and mental condition.",
      status: "accepted",
    },
  ];

  const getStatusColor = (status) => {
    return status === "pending" ? styles.pending : styles.accepted;
  };

  const getStatusIcon = (status) => {
    return status === "pending" ? <FaClock /> : <FaCheckCircle />;
  };

  return (
    <div className={styles.requestInfo}>
      {DummyData.map((data) => (
        <div className={styles.requestDataContainer} key={data.subject}>
          <div className={styles.requestInfo}>
            <h6>{data.subject.join(" , ")}</h6>
            <p>{data.description}</p>
          </div>
          <div className={ getStatusColor(data.status)}>
            {getStatusIcon(data.status)}
            {data.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
