import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const afficherMenuDeroulant = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-lg font-bold hover:text-blue-200">
            <FormattedMessage
              id="navbar.titre"
              defaultMessage="Shawn Fitness"
            />
          </Link>

          <div className="md:hidden">
            <button
              type="button"
              className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={afficherMenuDeroulant}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200">
              <FormattedMessage id="navbar.accueil" defaultMessage="Accueil" />
            </Link>
            <Link to="/sessions" className="hover:text-blue-200">
              <FormattedMessage
                id="navbar.seances"
                defaultMessage="Mes séances"
              />
            </Link>
            <Link to="/profil" className="hover:text-blue-200">
              <FormattedMessage
                id="navbar.profil"
                defaultMessage="Mon profil"
              />
            </Link>
          </div>
        </div>

        {menuVisible && (
          <div className="md:hidden bg-blue-500 text-white">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-blue-700"
              onClick={afficherMenuDeroulant}
            >
              <FormattedMessage id="navbar.accueil" defaultMessage="Accueil" />
            </Link>
            <Link
              to="/sessions"
              className="block px-4 py-2 hover:bg-blue-700"
              onClick={afficherMenuDeroulant}
            >
              <FormattedMessage
                id="navbar.seances"
                defaultMessage="Mes séances"
              />
            </Link>
            <Link
              to="/profil"
              className="block px-4 py-2 hover:bg-blue-700"
              onClick={afficherMenuDeroulant}
            >
              <FormattedMessage
                id="navbar.profil"
                defaultMessage="Mon profil"
              />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
