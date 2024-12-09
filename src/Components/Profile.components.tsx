import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormulaireAuthentification from "./FormulaireAuthentification.components";
import FormulaireConnexion from "./FormulaireConnexion.components";
import { FormattedMessage } from "react-intl";

const Profile = () => {
  const [estAuthentifie, setEstAuthentifie] = useState(false);
  const [estConnecte, setEstConnecte] = useState(false);
  const [AUnCompte, setAUnCompte] = useState(false);
  const [utilisateur, setUtilisateur] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const utilisateurStocke = localStorage.getItem("utilisateur");
    if (utilisateurStocke) {
      const utilisateurObj = JSON.parse(utilisateurStocke);
      setUtilisateur(utilisateurObj);
      setEstAuthentifie(true);
    }
  }, []);

  const handleSeDeconnecter = () => {
    setEstAuthentifie(false);
    setUtilisateur(null);
    localStorage.removeItem("utilisateur");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/profil");
  };

  if (estConnecte) {
    return (
      <div>
        <FormulaireConnexion />
      </div>
    );
  }

  if (AUnCompte) {
    return (
      <div>
        <FormulaireAuthentification />
      </div>
    );
  }

  return (
    <div className="text-center bg-white p-8 rounded shadow">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        <FormattedMessage id="profil.titre" defaultMessage="Mon Profil" />
      </h1>
      <h3 className="text-2xl md:text-3xl font-semibold mb-4">
        {utilisateur ? `Bonjour, ${utilisateur}` : "Bienvenue sur votre profil"}
      </h3>
      <div className="mb-6">
        <p className="text-lg text-gray-600">
          {estAuthentifie ? (
            <span className="text-green-500 font-semibold">
              <FormattedMessage
                id="profil.estConnecte"
                defaultMessage="Vous êtes connecté"
              />
            </span>
          ) : (
            <span className="font-semibold">
              <FormattedMessage
                id="profil.estDeconnecte"
                defaultMessage="Connectez-vous pour accéder à votre profil."
              />
            </span>
          )}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-500 transition-all duration-300 ease-in-out"
          onClick={
            estAuthentifie ? handleSeDeconnecter : () => setEstConnecte(true)
          }
        >
          {estAuthentifie ? (
            <FormattedMessage
              id="profil.seDeconnecter"
              defaultMessage="Se d&eacute;connecter"
            />
          ) : (
            <FormattedMessage
              id="profil.seConnecter"
              defaultMessage="Se connecter"
            />
          )}
        </button>
      </div>

      {!AUnCompte && !estAuthentifie && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <p className="text-sm text-gray-700">
            <FormattedMessage
              id="profil.pasDeCompte"
              defaultMessage="Vous n'avez pas de compte ?"
            />
          </p>
          <button
            className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-500 transition-all duration-300 ease-in-out"
            onClick={() => setAUnCompte(true)}
          >
            <FormattedMessage
              id="profil.sinscrire"
              defaultMessage="S'inscrire"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
