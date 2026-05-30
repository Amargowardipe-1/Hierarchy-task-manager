import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

function NotFound() {

  return (
    <>

    <>
  <SideBar />

  <div className="md:ml-64">
    <NavBar />

    <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center bg-white px-4 text-center">

      <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-red-500">
        404
      </h1>

      <p className="text-xl sm:text-2xl md:text-3xl mt-4 font-semibold">
        Page Not Found
      </p>

      <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg max-w-md">
        The page you are looking for does not exist.
      </p>

    </div>
  </div>
</>
    </>

  );

}


export default NotFound;