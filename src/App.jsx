import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Routes";
const _router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={_router} />;
}

export default App;
