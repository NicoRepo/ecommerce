import { Outlet } from "react-router-dom";
import { Provider } from "../../Context";
import { NavBar } from "../NavBar/NavBar";
import { Body } from "../Body/Body";

export const Layout = () => {
  return (
    <Provider>
      <div>
        <NavBar />
        <Body>
          <Outlet />
        </Body>
      </div>
    </Provider>
  );
};

