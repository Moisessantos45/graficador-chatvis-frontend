import { Outlet } from "react-router-dom"
import NavbarInicio from "../components/NavbarInicio"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
const LayoutInicio = () => {
  return (
    <>
    <NavbarInicio/>
    {/* <Navbar/> */}
    <Outlet/>
    <Footer/>
    </>
  )
}

export default LayoutInicio