import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";

interface FormulaireDAjouterSeanceProps {
  seance: any;
}

const FormulaireDAjouterSeance = () => {
  const location = useLocation();
  const { seance } = location.state || {};

  const [date, setDate] = useState(Date());
  const [typeExercice, setTypeExercice] = useState("");
  const [duree, setDuree] = useState("");
  const [caloriesBrulees, setCaloriesBrulees] = useState(0);
  const [distance, setDistance] = useState("");
  const [Objectif, setObjectif] = useState("");
  const [niveauIntensite, setNiveauIntensite] = useState("");
  const [completer, setCompleter] = useState(false);
  const [commentaire, setCommentaire] = useState([""]);
  const [erreur, setErreur] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (seance) {
      setDate(seance.date || Date());
      setTypeExercice(seance.typeExercice || "");
      setDuree(seance.duration || "");
      setCaloriesBrulees(seance.caloriesBrulees || 0);
      setDistance(seance.distance || "");
      setObjectif(seance.objectifSession || "");
      setNiveauIntensite(seance.niveauIntensite || "");
      setCompleter(seance.completer || false);
      setCommentaire(seance.commentaire || [""]);
    }
  }, [seance]);

  const ChangementLigneCommentaire = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const lines = e.target.value.split("\n");
    setCommentaire(lines);
  };

  const VerificationDonnees = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id && token && seance === null) {
      const idObj = JSON.parse(id);
      const tokenObj = JSON.parse(token);

      console.log("ID:", idObj);
      console.log("Token:", tokenObj);

      if (
        date === "" ||
        typeExercice === "" ||
        duree === "" ||
        caloriesBrulees === 0 ||
        distance === "" ||
        Objectif === "" ||
        niveauIntensite === ""
      ) {
        setErreur("Veuillez remplir tous les champs obligatoires");
        return;
      }

      const data = {
        seance: {
          date: date,
          typeExercice: typeExercice,
          duration: duree,
          caloriesBrulees: caloriesBrulees,
          distance: distance,
          objectifSession: Objectif,
          niveauIntensite: niveauIntensite,
          completer: completer,
          commentaire: commentaire,
        },
      };

      axios
        .post(
          `https://projetfinaledev3-api.onrender.com/fitness/AjouterSeance/${idObj}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenObj}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSuccess("Séance ajoutée avec succès");

          navigate("/");
        })
        .catch((error) => {
          console.error(error);
          if (error.response) {
            setErreur(error.response.data.message);
          }
          setErreur("Une erreur s'est produite lors de l'ajout de la séance.");
        });

      console.log(data);
    } else if (id && token && seance !== null) {
      const idObj = JSON.parse(id);
      const tokenObj = JSON.parse(token);

      console.log("ID:", idObj);
      console.log("Token:", tokenObj);

      const dataModifier = {
        seance: {
          identifiant: seance.identifiant,
          idUtilisateur: idObj,
          date: date,
          typeExercice: typeExercice,
          duration: duree,
          caloriesBrulees: caloriesBrulees,
          distance: distance,
          objectifSession: Objectif,
          niveauIntensite: niveauIntensite,
          completer: completer,
          commentaire: commentaire,
        },
      };
      console.log(dataModifier);

      axios
        .put(
          `https://projetfinaledev3-api.onrender.com/fitness/ModifierSeance`,
          dataModifier,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenObj}`,
            },
          }
        )
        .then((response) => {
          console.log("Response:", response.data);
          setSuccess("Séance modifiée avec succès");
          window.location.href = "/sessions";
        })
        .catch((error) => {
          if (error.response) {
            console.error("Erreur réponse API :", error.response.data.message);
            setErreur(error.response.data.message);
          } else if (error.request) {
            console.error("Erreur requête :", error.request.message);
          } else {
            console.error("Erreur inattendue :", error.message);
            setErreur(
              "Une erreur s'est produite lors de la modification de la séance."
            );
          }
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-indigo-600 text-center mb-6">
        {seance === null ? (
          <FormattedMessage
            id="formulaireAjout.titre"
            defaultMessage={"Ajouter une nouvelle séance"}
          />
        ) : (
          <FormattedMessage
            id="formulaireModifier.titre"
            defaultMessage={"Modifier une séance"}
          />
        )}
      </h2>

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
          <p>{success}</p>
        </div>
      )}

      {erreur && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
          <p>{erreur}</p>
        </div>
      )}

      <form className="space-y-6" onSubmit={VerificationDonnees}>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.date"
                defaultMessage={"Date *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.date"
                defaultMessage={"Date :"}
              />
            )}
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="typeExercice"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.typeExercice"
                defaultMessage={"Type d'exercice *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.typeExercice"
                defaultMessage={"Type d'exercice :"}
              />
            )}
          </label>
          <input
            type="text"
            name="typeExercice"
            id="typeExercice"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setTypeExercice(e.target.value)}
            placeholder="Ex: Course, Musculation, Cyclisme, Natation, Yoga, Autre"
          />
        </div>

        <div>
          <label
            htmlFor="duree"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.duree"
                defaultMessage={"Duree *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.duree"
                defaultMessage={"Duree :"}
              />
            )}
          </label>
          <input
            type="text"
            name="duree"
            id="duree"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setDuree(e.target.value)}
            placeholder="Ex: 30 minutes, 1 heure, 2 heures"
          />
        </div>

        <div>
          <label
            htmlFor="caloriesBrulees"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.caloriesBrulees"
                defaultMessage={"Calories brulees *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.caloriesBrulees"
                defaultMessage={"Calories brulees :"}
              />
            )}
          </label>
          <input
            type="number"
            name="caloriesBrulees"
            id="caloriesBrulees"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setCaloriesBrulees(Number(e.target.value))}
            placeholder="Ex: 500, 1000, 1500"
          />
        </div>

        <div>
          <label
            htmlFor="distance"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.distance"
                defaultMessage={"Distance *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.distance"
                defaultMessage={"Distance :"}
              />
            )}
          </label>
          <input
            type="text"
            name="distance"
            id="distance"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Ex: 5 km, 10 km, 15 km ou aucune"
          />
        </div>

        <div>
          <label
            htmlFor="objectif"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.objectif"
                defaultMessage={"Objectif *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.objectif"
                defaultMessage={"Objectif :"}
              />
            )}
          </label>
          <input
            type="text"
            name="objectif"
            id="objectif"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setObjectif(e.target.value)}
            placeholder="Ex: Gagner du poids, Perdre du poids, Maintenir le poids"
          />
        </div>

        <div>
          <label
            htmlFor="niveauIntensite"
            className="block text-sm font-medium text-gray-700"
          >
            {seance === null ? (
              <FormattedMessage
                id="formulaireAjout.niveauIntensite"
                defaultMessage={"Niveau d'intensité *:"}
              />
            ) : (
              <FormattedMessage
                id="formulaireModifier.niveauIntensite"
                defaultMessage={"Niveau d'intensité :"}
              />
            )}
          </label>
          <select
            name="niveauIntensite"
            id="niveauIntensite"
            className="mt-1 block w-full h-12 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={(e) => setNiveauIntensite(e.target.value)}
          >
            <option value="">
              <FormattedMessage
                id="formulaireAjout.selectionner"
                defaultMessage={"Sélectionner"}
              />
            </option>
            <option value="Faible">
              <FormattedMessage
                id="formulaireAjout.faible"
                defaultMessage={"Faible"}
              />
            </option>
            <option value="Moderee">
              <FormattedMessage
                id="formulaireAjout.moderee"
                defaultMessage={"Moderee"}
              />
            </option>
            <option value="Elevee">
              <FormattedMessage
                id="formulaireAjout.elevee"
                defaultMessage={"Elevee"}
              />
            </option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="completer"
            id="completer"
            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
            onChange={(e) => setCompleter(e.target.checked)}
          />
          <label
            htmlFor="completer"
            className="text-sm font-medium text-gray-700"
          >
            <FormattedMessage
              id="formulaireAjout.completer"
              defaultMessage={"Séance complétée ?"}
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="commentaire"
            className="block text-sm font-medium text-gray-700"
          >
            <FormattedMessage
              id="formulaireAjout.commentaire"
              defaultMessage={"Commentaire :"}
            />
          </label>
          <textarea
            name="commentaire"
            id="commentaire"
            className="mt-1 block w-full h-24 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 shadow-sm sm:text-sm"
            onChange={ChangementLigneCommentaire}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md mt-6"
        >
          {seance ? (
            <FormattedMessage
              id="formulaireModifier.modifier"
              defaultMessage={"Modifier la séance"}
            />
          ) : (
            <FormattedMessage
              id="formulaireAjout.ajouter"
              defaultMessage={"Ajouter la séance"}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default FormulaireDAjouterSeance;
