import { Link } from "react-router-dom";
const NavbarInicio = () => {
  return (
    <>
      <header className=" relative z-20 grid w-full h-12 text-black grid-cols-3 grid-rows-1 capitalize border-b border-solid border-b-[#232b48] bg-[#111422] dark">
        <Link
          to={"/"}
          className="col-start-1 col-end-3 self-center flex justify-start ml-7 sm:ml-12"
        >
          <h1 className=" text-xl font-bold text-white">ChatVis</h1>
        </Link>
        <Link
          className=" col-start-3 col-end-4 self-center justify-end flex"
          to={"/about"}
        >
          <h1 className="text-xl font-bold text-white flex justify-center sm:mr-12 mr-7">
            About
          </h1>
        </Link>
      </header>
    </>
  );
};

export default NavbarInicio;
