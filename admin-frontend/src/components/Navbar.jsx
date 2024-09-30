import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed h-screen w-64 bg-gray-800 text-white flex flex-col">
      {/* Logo */}
      <div className="text-2xl font-bold p-4 border-b border-gray-700">
        Admin Panel
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-4">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/banner"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }
            >
              Home Banner
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }
            >
              Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/offers"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "text-white hover:text-blue-400"
              }
            >
              Offers
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
