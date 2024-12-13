import "./App.css";
import Home from "./Components/Home.components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar.components";
import Sessions from "./Components/Session.components";
import Profile from "./Components/Profile.components";
import Footer from "./Components/Footer.components";
import FormulaireConnexion from "./Components/FormulaireConnexion.components";
import FormulaireAuthentification from "./Components/FormulaireAuthentification.components";

import FormulaireDAjouterSeance from "./Components/FormulaireAjout.components";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center flex-col pt-20">
        <Navbar />

        <div className="flex-grow pb-8 md:w-3/4 lg:w-1/2">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/connexion" element={<FormulaireConnexion />} />
            <Route path="/ajouter" element={<FormulaireDAjouterSeance />} />
            <Route path="/modifier" element={<FormulaireDAjouterSeance />} />
            <Route
              path="/inscription"
              element={<FormulaireAuthentification />}
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
