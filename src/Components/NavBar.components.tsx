import { useState } from "react";
import { FormattedMessage } from "react-intl";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const afficherMenuDeroulant = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-lg font-bold hover:text-blue-200">
            <FormattedMessage
              id="navbar.titre"
              defaultMessage="Shawn Fitness"
            />
          </a>

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
            <a href="/" className="hover:text-blue-200">
              <FormattedMessage id="navbar.accueil" defaultMessage="Accueil" />
            </a>
            <a href="/sessions" className="hover:text-blue-200">
              <FormattedMessage
                id="navbar.seances"
                defaultMessage="Mes séances"
              />
            </a>
            <a href="/profil" className="hover:text-blue-200">
              <FormattedMessage
                id="navbar.profil"
                defaultMessage="Mon profil"
              />
            </a>
          </div>
        </div>

        {menuVisible && (
          <div className="md:hidden bg-blue-500 text-white">
            <a href="/" className="block px-4 py-2 hover:bg-blue-700">
              <FormattedMessage id="navbar.accueil" defaultMessage="Accueil" />
            </a>
            <a href="/sessions" className="block px-4 py-2 hover:bg-blue-700">
              <FormattedMessage
                id="navbar.seances"
                defaultMessage="Mes séances"
              />
            </a>
            <a href="/profil" className="block px-4 py-2 hover:bg-blue-700">
              <FormattedMessage
                id="navbar.profil"
                defaultMessage="Mon profil"
              />
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
