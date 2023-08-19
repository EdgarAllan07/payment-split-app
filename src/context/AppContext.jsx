"use client";
import { useContext, useState, createContext } from "react";
import { SendPayment, ChargeQR, ConsultarQR } from "@/app/api/zbd.api";
const AppProvider = createContext();

export const useApp = () => {
  const context = useContext(AppProvider);
  if (!context) {
    throw new Error("The context doesnt exit");
  }
  return context;
};

function AppContext({ children, API_KEY }) {
  const [data, setData] = useState({
    amount: "",
    address1: "",
    address2: "",
  });

  async function sendPay(amount, address) {
    const key = API_KEY;
    const res = await SendPayment(amount, address, key);
    return res;
  }

  async function charge(amount) {
    const key = API_KEY;
    const res = await ChargeQR(amount, key);
    return res;
  }

  async function consult(id) {
    const key = API_KEY;
    const res = await ConsultarQR(id, key);
    return res;
  }

  return (
    <div>
      <AppProvider.Provider
        value={{
          setData,
          data,
          sendPay,
          charge,
          consult,
        }}
      >
        {children}
      </AppProvider.Provider>
    </div>
  );
}

export default AppContext;
