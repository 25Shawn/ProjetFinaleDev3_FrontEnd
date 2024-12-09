import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { IntlProvider } from "react-intl";
import Francais from "./lang/fr.json";
import English from "./lang/en.json";
import LangueProvider, {
  LangueContext,
  LangueContextType,
} from "./Context/langue.context.tsx";

const messageMap: Record<string, Record<string, string>> = {
  fr: Francais,
  en: English,
};

function RootApp() {
  const { langue } = useContext(LangueContext) as LangueContextType;
  const locale = langue.locale;
  const messages = messageMap[locale] || Francais;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LangueProvider>
      <RootApp />
    </LangueProvider>
  </StrictMode>
);
