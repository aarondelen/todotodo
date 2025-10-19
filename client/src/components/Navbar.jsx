import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white px-[10rem]">
      <Link to="/" className="font-bold text-lg">
        📝 TodoApp
      </Link>

      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "underline text-blue-300" : "hover:text-blue-300"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "underline text-blue-300" : "hover:text-blue-300"
          }
        >
          Add Todo
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
