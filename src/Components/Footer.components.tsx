import { FormattedMessage } from "react-intl";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-20">
      <div className="container mx-auto text-center">
        <p>
          &copy;{" "}
          <FormattedMessage
            id="footer.titre"
            defaultMessage="2024 Mon Application de Suivi de Fitness. Tous droits reservé."
          />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
