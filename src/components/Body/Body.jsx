import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Body = ({ children }) => {
  return (
    <Container className="py-5">
      <div className="d-flex justify-content-center">{children}</div>
      {/* Toast Container must be at the bottom of the visible DOM */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};
