import axios from "axios";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import { Link, useNavigate } from "react-router-dom";
const Sessions = () => {
  const [seances, setSeances] = useState<any[]>([]);
  const [modifier, setModifier] = useState(false);
  const [ajouter, setAjouter] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [idSeanceASupprimer, setIdSeanceASupprimer] = useState(0);
  const [messageSuccess, setMessageSuccess] = useState("");
  const [seanceAModifier, setSeanceAModifier] = useState(0);
  const navigate = useNavigate();

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

  const openPopup = (identifiant: number) => {
    setIdSeanceASupprimer(identifiant);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const supprimerSeance = (identifiant: number) => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id && token) {
      const idObj = JSON.parse(id);
      const tokenObj = JSON.parse(token);

      console.log(identifiant);
      console.log(idObj);
      console.log(tokenObj);

      axios
        .delete(
          `https://projetfinaledev3-api.onrender.com/fitness/supprimerSeance/${identifiant}/${idObj}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenObj}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);

          setMessageSuccess("Séance supprimée");
        })
        .catch((error) => {
          console.error("Error fetching seances:", error);
        })
        .finally(() => {
          window.location.reload();
        });
    }
  };

  return (
    <div className="text-center bg-white p-8 rounded shadow">
      <div className="bg-white p-4 mb-4 rounded shadow mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <FormattedMessage
            id="accueil.sous-titre"
            defaultMessage="Vos séances"
          />
        </h1>
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
        <h3>{messageSuccess}</h3>

        {seances.length === 0 ? (
          <p className="text-center text-gray-500">
            <FormattedMessage
              id="accueil.messageErreur"
              defaultMessage="Aucune séance trouvée"
            />
          </p>
        ) : (
          seances.map((seance) => (
            <div
              key={seance._id}
              className="bg-white p-6 mb-6 rounded-lg shadow-lg transition-transform transform hover:shadow-xl"
            >
              <div>
                <div className="flex justify-between flex-col md:flex-row md:items-center">
                  <Link
                    to={`/modifier`}
                    state={{ seance }}
                    className="bg-yellow-500 text-white py-2 px-4 rounded w-full  mb-2 md:w-auto hover:bg-yellow-600 transition-transform transform hover:scale-105"
                  >
                    <FormattedMessage
                      id="seance.modifier"
                      defaultMessage="Modifier"
                    />
                  </Link>

                  <button
                    onClick={() => openPopup(seance.identifiant)}
                    className="bg-red-500 text-white py-2 px-4 rounded w-full md:w-auto hover:bg-red-600 transition-transform transform hover:scale-105"
                  >
                    <FormattedMessage
                      id="seance.supprimer"
                      defaultMessage="Supprimer"
                    />
                  </button>
                </div>
              </div>

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
              {popupVisible && idSeanceASupprimer === seance.identifiant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-4 sm:p-8 rounded shadow text-center w-full max-w-md mx-4">
                    <h2 className="text-lg font-bold mb-4">
                      <FormattedMessage
                        id="popup.titre"
                        defaultMessage="Confirmation de suppression"
                      />
                    </h2>
                    <p className="text-gray-700">
                      <FormattedMessage
                        id="popup.message"
                        defaultMessage="Êtes-vous sûr de vouloir supprimer cette séance ?"
                      />
                    </p>
                    <div className="mt-6 flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                      <button
                        onClick={() => supprimerSeance(seance.identifiant)}
                        className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors duration-300 sm:mr-4"
                        aria-label="Confirmer la suppression"
                      >
                        <FormattedMessage
                          id="popup.confirmation"
                          defaultMessage="Confirmer"
                        />
                      </button>
                      <button
                        onClick={closePopup}
                        className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors duration-300"
                        aria-label="Annuler la suppression"
                      >
                        <FormattedMessage
                          id="popup.cancelation"
                          defaultMessage="Annuler"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Sessions;
