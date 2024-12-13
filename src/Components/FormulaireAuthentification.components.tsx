import { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";

const FormulaireAuthentification = () => {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [estExcecuter, setEstExcecuter] = useState(false);
  const navigate = useNavigate();
  const VerificationDonnees = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nomUtilisateur.trim() === "" || motDePasse.trim() === "") {
      setErreur("Veuillez entrer des informations de connexion valides.");
      return;
    }

    const data = {
      utilisateur: {
        username: nomUtilisateur,
        password: motDePasse,
      },
    };

    axios
      .post(
        "https://projetfinaledev3-api.onrender.com/fitness/AjouterUtilisateur",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        setEstExcecuter(true);

        setTimeout(() => {
          setEstExcecuter(false);
          setErreur("");
          setNomUtilisateur("");
          setMotDePasse("");
          navigate("/connexion");
        }, 4000);
      })
      .catch((error) => {
        console.error("Erreur lors de la connexion:", error.response);
        setErreur("Une erreur est survenue lors de la connexion.");
      });
  };

  return (
    <div className="text-center bg-white p-8 rounded shadow">
      {estExcecuter && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md mb-4 shadow-lg animate-fade-in"
          role="alert"
        >
          <p className="text-sm">
            <FormattedMessage
              id="formulaireAuthentification.notification"
              defaultMessage="Inscription reussie !"
            />
          </p>
          <p>
            <FormattedMessage
              id="formulaireAuthentification.notification2"
              defaultMessage="Redirection vers la page de connexion..."
            />
          </p>
        </div>
      )}
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">
        <FormattedMessage
          id="formulaireAuthentification.titre"
          defaultMessage="Formulaire d'inscription"
        />
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        <FormattedMessage
          id="formulaireAuthentification.descriptionInscription"
          defaultMessage="Veuillez entrer vos informations de connexion."
        />
      </p>

      {erreur && (
        <div className="text-red-500 mb-4">
          <p>{erreur}</p>
        </div>
      )}

      <form className="space-y-4" onSubmit={VerificationDonnees}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            <FormattedMessage
              id="formulaireAuthentification.nomUtilisateur"
              defaultMessage="Nom d'utilisateur *:"
            />
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setNomUtilisateur(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            <FormattedMessage
              id="formulaireAuthentification.motDePasse"
              defaultMessage="Mot de passe *:"
            />
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setMotDePasse(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
        >
          <FormattedMessage
            id="formulaireAuthentification.connexion"
            defaultMessage="Se connecter"
          />
        </button>
      </form>
    </div>
  );
};

export default FormulaireAuthentification;
