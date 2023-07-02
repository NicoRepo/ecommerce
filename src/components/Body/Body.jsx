import bgImage from "../../assets/img/bg.jpg";

const bgImageStyle = {
  backgroundImage: `url(${bgImage})`,
  height: "100vh",
  width: "100vw",
  objectFit: "cover",
};

const mainBodyStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  backgroundColor: "rgba(0,0,0,.4)",
};

const Body = ({ children }) => {
  return (
    <div style={bgImageStyle}>
      <div className="d-flex flex-column" style={mainBodyStyle}>
        <div className="py-5">{children}</div>
      </div>
    </div>
  );
};

export default Body;
