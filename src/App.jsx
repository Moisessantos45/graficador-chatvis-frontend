import { createBrowserRouter } from "react-router-dom"
import LayoutInicio from "./Layout/LayoutInicio"
import Home from "./pages/Home"
import About from "./pages/About"

const App =createBrowserRouter([
  {
    path:"/",
    element:<LayoutInicio/>,
    children:[
      {
        index: true,
        element:<Home/>
      }, {
        path:"/about",
        element:<About/>
      }
    ]
  }
])

export default App
