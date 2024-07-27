// contexts/WalletContext.tsx
import { Wallet } from "@/app/page";
import { createContext, useContext, useState, ReactNode } from "react";

interface WalletContextType {
  wallets: Wallet[];
  setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      name: "Sedaap Noodles",
      id: "8776cf98-6950-45c7-870e-8c8608ddb62b",
      img: "/food-1.jpg",
      isActive: false,
      notes: [
        { value: 5000, isUsed: true, orderId: "6c092193-e8ec-4e2a-b9a2-edb3313b25ad" },
        { value: 5000, isUsed: true, orderId: "7d1e845f-0b9e-4d7d-8b80-8a0d9e7e073f" },
        { value: 5000, isUsed: true, orderId: "8e2f953c-d046-45d6-bad1-1b0a5469de03" },
        { value: 5000, isUsed: true, orderId: "9f3c62d5-b5d3-43e3-9b47-9a0e5b0f79d4" },
        { value: 5000, isUsed: false, orderId: "a10d7e4b-3cb4-4c5b-80f5-2d6237cb3176" },
        { value: 5000, isUsed: false, orderId: "b21e8d3c-1a53-4b64-b8dd-3c7348b1237e" },
      ],
    },
    {
      name: "Favorite Fried Rice",
      id: "a804c492-e114-467a-803c-646a01dba7fd",
      img: "./food-2.jpeg",
      isActive: false,
      notes: [
        { value: 6000, isUsed: true, orderId: "c32fdb0e-2b93-43a3-bd65-2b6b7d897458" },
        { value: 6000, isUsed: true, orderId: "d43fe2b7-3d6c-4e64-8981-3c7c6d929b7d" },
        { value: 6000, isUsed: true, orderId: "e54fd3c8-4e7d-4f75-96b0-4d8d8d0e9e9c" },
        { value: 6000, isUsed: true, orderId: "f65e3d9d-5f8e-5e86-a7c0-5e9e9e1f0fa1" },
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
