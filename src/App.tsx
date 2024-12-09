import "./App.css";
import Home from "./Components/Home.components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar.components";
import Sessions from "./Components/Session.components";
import Profile from "./Components/Profile.components";
import Footer from "./Components/Footer.components";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center flex-col pt-20">
        {/* Navbar toujours visible en haut */}
        <Navbar />

        {/* Contenu principal */}
        <div className="flex-grow pb-8 w-1/2">
          {/* Ajoutez un padding-bottom ici pour espacer le footer */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/profil" element={<Profile />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
