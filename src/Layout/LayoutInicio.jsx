import { Outlet, useLocation, useParams } from "react-router-dom";
import NavbarInicio from "../components/NavbarInicio";
import Footer from "../components/Footer";
import useStoreApi from "../Store/useApi";
import { useEffect } from "react";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const LayoutInicio = () => {
  const { setIsLoad, getDataApi } = useStoreApi();
  const { id } = useParams();

  const query = useQuery();
  const option = query.get("processing_option");

  useEffect(() => {
    const getData = async () => {
      setIsLoad(false);
      await getDataApi(id);
      setIsLoad(true);
    };
    if (option && option !== "browser") {
      getData();
    }
  }, []);
  return (
    <>
      <NavbarInicio />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutInicio;
