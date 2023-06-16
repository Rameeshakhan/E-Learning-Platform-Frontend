import Notfound from "../assets/images/Notfound.png"
const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <img 
      src={Notfound} 
      alt="Not Found" 
      height="600px"
      width="700px"
      />
    </div>
  );
};

export default NotFound;

