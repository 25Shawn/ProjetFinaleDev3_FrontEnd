const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-lg font-bold hover:text-blue-200">
            FitTrack
          </a>

          {/* Hamburger Menu (Mobile/Tablet) */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-white focus:outline-none focus:ring-2 focus:ring-blue-300"
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

          {/* Navigation Links (PC/Tablette) */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-blue-200">
              Accueil
            </a>
            <a href="/sessions" className="hover:text-blue-200">
              Mes séances
            </a>
            <a href="/profil" className="hover:text-blue-200">
              Mon profil
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
