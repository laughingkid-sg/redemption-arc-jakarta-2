// contexts/WalletContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface Note {
  value: number;
  isUsed: boolean;
}

interface Wallet {
  name: string;
  id: string;
  notes: Note[];
}

interface WalletContextType {
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      name: "Shopping",
      id: "8776cf98-6950-45c7-870e-8c8608ddb62b",
      notes: [
        { value: 1000, isUsed: false },
        { value: 2000, isUsed: false },
        { value: 5000, isUsed: false },
        { value: 5000, isUsed: false },
        { value: 50000, isUsed: false },
        { value: 50000, isUsed: false },
      ],
    },
    {
      name: "Groceries",
      id: "a804c492-e114-467a-803c-646a01dba7fd",
      notes: [
        { value: 1000, isUsed: false },
        { value: 2000, isUsed: false },
        { value: 5000, isUsed: false },
        { value: 50000, isUsed: false },
        { value: 100000, isUsed: false },
      ],
    },
  ]);

  return (
    <WalletContext.Provider value={{ wallets, setWallets }}>{children}</WalletContext.Provider>
  );
};

const useWallets = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallets must be used within a WalletProvider");
  }
  return context;
};

export { WalletProvider, useWallets };
