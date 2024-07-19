import { createBrowserRouter } from "react-router-dom";
import LayoutInicio from "./Layout/LayoutInicio";
import Home from "./Home/Home";
import About from "./pages/About";
import ProcesesFiles from "./pages/ProcesesFiles";
import UserActionPanel from "./pages/UserActionPanel";

const App = createBrowserRouter([
  {
    path: "/",
    element: <LayoutInicio />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/upload/:id",
        element: <ProcesesFiles />,
      },
      {
        path: "/action-panel/:id",
        element: <UserActionPanel />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default App;
