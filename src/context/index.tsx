import React, { useState } from "react";

type CityNameContextType = {
  cityName: string;
  setCityName: (_cityName: string) => void;
};

export const CityNameContext = React.createContext<CityNameContextType>(
  {} as CityNameContextType
);

interface Props {
  children: React.ReactNode;
}

export const CityNameProvider: React.FC<Props> = ({ children }) => {
  const [cityName, setCityName] = useState("Kyiv");

  return (
    <CityNameContext.Provider
      value={{ cityName, setCityName } as CityNameContextType}
    >
      {children}
    </CityNameContext.Provider>
  );
};
