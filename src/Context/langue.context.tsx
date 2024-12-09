import React, { useState, useEffect, ReactNode } from "react";

interface ILangue {
  locale: string;
  label: string;
}

export type LangueContextType = {
  langue: ILangue;
  setLangue: (langue: ILangue) => void;
};

export const LangueContext = React.createContext<LangueContextType | null>(
  null
);

export default function LangueProvider({ children }: { children: ReactNode }) {
  const langues: ILangue[] = [
    { locale: "en", label: "English" },
    { locale: "fr", label: "Français" },
  ];

  const getInitialLangue = (): ILangue => {
    const storedLocale = localStorage.getItem("langue");
    return (
      langues.find((langue) => langue.locale === storedLocale) || {
        locale: "fr",
        label: "Français",
      }
    );
  };

  const [langue, setLangue] = useState<ILangue>(getInitialLangue);

  const handleLangueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value;
    const selectedLangue = langues.find(
      (langue) => langue.locale === selectedLocale
    );
    if (selectedLangue) {
      setLangue(selectedLangue);
      localStorage.setItem("langue", selectedLocale);
    }
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem("langue");
    if (storedLocale) {
      const storedLangue = langues.find(
        (langue) => langue.locale === storedLocale
      );

      if (storedLangue && storedLangue.locale !== langue.locale) {
        setLangue(storedLangue);
      }
    }
  }, [langue, langues]);

  return (
    <LangueContext.Provider value={{ langue, setLangue }}>
      <div className="text-center bg-white rounded shadow mt-20 w-1/2 mx-auto">
        <select
          className="p-2 w-full"
          value={langue.locale}
          onChange={handleLangueChange}
        >
          {langues.map((langueOption) => (
            <option key={langueOption.locale} value={langueOption.locale}>
              {langueOption.label}
            </option>
          ))}
        </select>
      </div>
      {children}
    </LangueContext.Provider>
  );
}
