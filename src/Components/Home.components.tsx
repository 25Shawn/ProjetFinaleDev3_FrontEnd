import { useEffect, useState } from "react";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const Home = () => {
  const [seances, setSeances] = useState<any[]>([]);
  const [typeSelectionne, setTypeSelectionne] = useState("");
  const [intensiteSelectionne, setIntensiteSelectionne] = useState("");
  const [tableauType] = useState<string[]>([]);
  const [tableauIntensite] = useState<string[]>([]);
  const [moyenne, setMoyenne] = useState(0);
  const [filtreExecuter, setFiltreExecuter] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id && token) {
      const idObj = JSON.parse(id);
      const tokenObj = JSON.parse(token);

      axios
        .get(
          `https://projetfinaledev3-api.onrender.com/fitness/TousLesSeances/${idObj}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenObj}`,
            },
          }
        )
        .then((response) => {
          setSeances(response.data.Seance);
        })
        .catch((error) => {
          console.error("Error fetching seances:", error);
        });
    }
  }, []);

  if (seances.length !== 0) {
    seances.forEach((seance) => {
      if (!tableauType.includes(seance.typeExercice)) {
        tableauType.push(seance.typeExercice);
      }

      if (!tableauIntensite.includes(seance.niveauIntensite)) {
        tableauIntensite.push(seance.niveauIntensite);
      }
    });
  }
  const filtreType = (type: string) => {
    if (type === "TousLesTypes") {
      window.location.reload();
    }
    setTypeSelectionne(type);
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id && token && type !== "") {
      const idObj = JSON.parse(id);
      const tokenObj = JSON.parse(token);

      console.log("ID:", idObj);
      console.log("Token:", tokenObj);

      console.log(typeSelectionne);
      axios
        .get(
          `https://projetfinaledev3-api.onrender.com/fitness/TypeEntrainement/${type}/${idObj}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenObj}`,
            },
          }
        )
        .then((response) => {
          setSeances(response.data.Seance);
        })
        .catch((error) => {
          console.error("Error fetching seances:", error);
        });
    }
  };

  const GestionIntensite = (intensite: string) => {
    if (intensite === "NiveauIntensite") {
      window.location.reload();
    }
    setIntensiteSelectionne(intensite);
  };

  const GestionType = (type: string) => {
    if (type === "TousLesTypes") {
      window.location.reload();
    }
    setTypeSelectionne(type);
  };
  const filtreMoyenneTypeIntensite = () => {
    const type = typeSelectionne;
    const intensite = intensiteSelectionne;
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id && token && type !== "" && intensite !== "") {
      const idObj = JSON.parse(id);
      const tokenObj = JSON.parse(token);

      const identifiant = parseInt(idObj);

      console.log("ID:", idObj);
      console.log("Token:", tokenObj);

      console.log(typeSelectionne);
      console.log(intensite);
      axios
        .get(
          `https://projetfinaledev3-api.onrender.com/fitness/MoyenneTempsIntensite/${type}/${intensite}/${identifiant}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenObj}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          const moyenneArrondie = Math.round(response.data.moyenne);
          setMoyenne(moyenneArrondie);
          setFiltreExecuter(true);
        })
        .catch((error) => {
          console.log(error.response);
          console.error("Error fetching seances:", error);
        });
    }
  };

  return (
    <>
      <div>
        <div className="text-center bg-white p-8 rounded shadow">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <FormattedMessage
              id="accueil.titre"
              defaultMessage="Bienvenue sur votre application de suivi de fitness"
            />
          </h1>
          <p className="text-gray-600 text-sm md:text-base lg:text-lg">
            <FormattedMessage
              id="accueil.description"
              defaultMessage="Suivez vos séances, atteignez vos objectifs et restez motivé !"
            />
          </p>
        </div>
      </div>

      <div className="bg-white p-4 mb-4 rounded shadow mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <FormattedMessage
            id="accueil.sous-titre"
            defaultMessage="Vos séances"
          />
        </h1>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <h2 className="text-lg font-semibold mb-2">
              <FormattedMessage
                id="accueil.filtreType"
                defaultMessage="Filtrer par type d'exercice :"
              />
            </h2>
            <select
              className="bg-gray-200 p-2 rounded"
              onChange={(e) => filtreType(e.target.value)}
            >
              <option value="TousLesTypes">
                <FormattedMessage
                  id="accueil.tousLesTypes"
                  defaultMessage="Tous les types"
                />
              </option>
              {tableauType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">
              <FormattedMessage
                id="accueil.filtreMoyenneTypeIntensite"
                defaultMessage="Filtrer moyenne de temps par type d'exercice et l'intensité :"
              />
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <select
                className="bg-gray-200 p-2 rounded"
                onChange={(e) => GestionIntensite(e.target.value)}
              >
                <option value="NiveauIntensite">
                  <FormattedMessage
                    id="accueil.NiveauIntensite"
                    defaultMessage="Tous les niveaux d'intensité"
                  />
                </option>
                {tableauIntensite.map((intensite, index) => (
                  <option key={index} value={intensite}>
                    {intensite}
                  </option>
                ))}
              </select>

              <select
                className="bg-gray-200 p-2 rounded"
                onChange={(e) => GestionType(e.target.value)}
              >
                <option value="TousLesTypes">
                  <FormattedMessage
                    id="accueil.tousLesTypes"
                    defaultMessage="Tous les types"
                  />
                </option>
                {tableauType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                filtreMoyenneTypeIntensite();
              }}
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300 mt-4 mb-4 "
            >
              <FormattedMessage id="accueil.filtre" defaultMessage="Filtrer" />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to="/ajouter"
            state={{ seance: null }}
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300 mb-4 "
          >
            <FormattedMessage
              id="accueil.ajouter"
              defaultMessage="Ajouter une séance"
            />
          </Link>
        </div>

        {filtreExecuter && (
          <p className="text-gray-700 mb-4">
            <strong className="text-yellow-700">
              <FormattedMessage
                id="accueil.moyenneTypeIntensiteP1"
                defaultMessage="Moyenne de temps par "
              />
              {typeSelectionne}
              <FormattedMessage
                id="accueil.moyenneTypeIntensiteP2"
                defaultMessage=" et l'intensité "
              />
              {intensiteSelectionne}:{" "}
            </strong>
            <span className="text-gray-500"> {moyenne} min</span>
          </p>
        )}

        {seances.length === 0 ? (
          <p className="text-center text-gray-500 ">
            <FormattedMessage
              id="accueil.messageErreur"
              defaultMessage="Aucune séance trouvée"
            />

            <br />
            <FormattedMessage
              id="accueil.messageErreur2"
              defaultMessage="Si sa ne marche pas après une 30 secondes, reconnectez-vous à votre compte et essayez de nouveau."
            />
          </p>
        ) : (
          seances.map((seance) => (
            <div
              key={seance._id}
              className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-transform transform hover:shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                {seance.typeExercice}
              </h2>

              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage id="seance.date" defaultMessage="Date:" />
                  </strong>
                  <span className="text-gray-500">
                    {new Date(seance.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.duree"
                      defaultMessage="Duree:"
                    />
                  </strong>
                  <span className="text-gray-500">{seance.duration}</span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.calories"
                      defaultMessage="Calories:"
                    />
                  </strong>
                  <span className="text-gray-500">
                    {seance.caloriesBrulees} kcal
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.distance"
                      defaultMessage="Distance:"
                    />
                  </strong>
                  <span className="text-gray-500">{seance.distance}</span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.objectif"
                      defaultMessage="Objectif:"
                    />
                  </strong>
                  <span className="text-gray-500">
                    {seance.objectifSession}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.intensite"
                      defaultMessage="Intensité:"
                    />
                  </strong>
                  <span className="text-gray-500">
                    {seance.niveauIntensite}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.commentaires"
                      defaultMessage="Commentaires:"
                    />
                  </strong>
                  <span className="text-gray-500">
                    {seance.commentaire.join(", ")}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>
                    <FormattedMessage
                      id="seance.completer"
                      defaultMessage="Complété:"
                    />
                  </strong>
                  <span
                    className={`font-bold ${
                      seance.completer ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {seance.completer ? (
                      <FormattedMessage
                        id="seance.estComplet"
                        defaultMessage="Complété"
                      />
                    ) : (
                      <FormattedMessage
                        id="seance.noncomplet"
                        defaultMessage="Non Complété"
                      />
                    )}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Home;
