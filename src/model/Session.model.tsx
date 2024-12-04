export type ISession = {
  identifiant: number; // Identifiant unique de la session
  date: string; // Date de la session, sous forme de chaîne (peut être formatée en ISO)
  typeExercice:
    | "Course"
    | "Musculation"
    | "Cyclisme"
    | "Natation"
    | "Yoga"
    | "Autre"; // Type d'exercice
  duration: string; // Durée de la session (par exemple "45 minutes")
  caloriesBrulees: number; // Nombre de calories brûlées pendant la session
  distance: string | null; // Distance parcourue, ou null si non applicable
  objectifSession: string; // Objectif de la session (ex: "Développer la force musculaire")
  niveauIntensite: "Légère" | "Modérée" | "Intense"; // Niveau d'intensité de la session
  completer: boolean; // Indique si la session a été complétée ou non
  commentaire: string[]; // Tableau de commentaires
};
