import { useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
const FormulaireConnexion = () => {
  const [nomUtilisateur, setNomUtilisateur] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const VerificationDonnees = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nomUtilisateur.trim() === "" || motDePasse.trim() === "") {
      setErreur("Veuillez entrer des informations de connexion valides.");
      return;
    }

    console.log("Nom d'utilisateur:", nomUtilisateur);
    console.log("Mot de passe:", motDePasse);

    const data = {
      utilisateur: {
        username: nomUtilisateur,
        password: motDePasse,
      },
    };

    axios
      .post(
        "https://projetfinaledev3-api.onrender.com/fitness/generatetoken",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);

        console.log(response.data.token.username);
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.token.token)
        );
        localStorage.setItem("id", JSON.stringify(response.data.token.id));
        localStorage.setItem(
          "utilisateur",
          JSON.stringify(response.data.token.username)
        );
        setErreur("");
        navigate("/profil");
      })
      .catch((error) => {
        console.error(error);
        setErreur("Nom d'utilisateur ou mot de passe incorrect.");
      });
  };

  return (
    <div className="text-center bg-white p-8 rounded shadow">
      <h2 className="text-2xl text-gray-800 font-semibold mb-4">
        <FormattedMessage
          id="formulaireConnexion.titre"
          defaultMessage="Formulaire de Connexion"
        />
      </h2>

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
            defaultMessage="Log in"
          />
        </button>
      </form>
    </div>
  );
};

export default FormulaireConnexion;
