import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {

  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (

    <div className="w-full bg-gray-100 shadow px-4 py-3">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

    <h1 className="text-lg md:text-2xl font-bold text-center md:text-left">
      HTMS Task Hierarchy
    </h1>

    <div className="flex items-center justify-center md:justify-end gap-3">

      {user && (
        <div className="text-center md:text-left text-sm md:text-base">
          <span className="font-semibold">
            {user.name}
          </span>
          {" "}
          ({user.role})
        </div>
      )}

      {/* Desktop only */}
      <button
        onClick={handleLogout}
        className="
          hidden md:block
          bg-red-500 hover:bg-red-600
          text-white
          px-4 py-2
          rounded
        "
      >
        Logout
      </button>

    </div>

  </div>

</div>

  );

}