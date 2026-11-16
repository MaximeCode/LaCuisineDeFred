import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  EMPTY_DONNEES_LEGALES,
  getDonneesLegales,
  type DonneesLegales,
} from '../../api/donneesLegales';

const DonneesLegalesContext = createContext<DonneesLegales>(EMPTY_DONNEES_LEGALES);

export function DonneesLegalesProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DonneesLegales>(EMPTY_DONNEES_LEGALES);

  useEffect(() => {
    let cancelled = false;
    getDonneesLegales().then((result) => {
      if (!cancelled) setData(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DonneesLegalesContext.Provider value={data}>{children}</DonneesLegalesContext.Provider>
  );
}

export function useDonneesLegales(): DonneesLegales {
  return useContext(DonneesLegalesContext);
}
