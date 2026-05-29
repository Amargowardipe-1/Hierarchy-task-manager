import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function NotFound() {

  return (
    <>

    <Sidebar />
<div className="ml-64">
    <Navbar />
    </div>
    
    <div className="h-screen flex flex-col items-center justify-center bg-white">

      <h1 className="text-6xl font-bold text-red-500">
        404
      </h1>

      <p className="text-2xl mt-4">
        Page Not Found
      </p>

      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>

      
    </div>
    </>

  );

}


export default NotFound;