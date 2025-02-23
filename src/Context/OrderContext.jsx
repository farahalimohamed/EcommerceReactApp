import axios from "axios";
import { createContext } from "react";

export const OrderContext= createContext();

export default function OrderContextProvider({ children }) {
    async function getUserOrders(userId) {
        return await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        );
    }
  return (
    <OrderContext.Provider value={{ getUserOrders }}>
      {children}
    </OrderContext.Provider>
  );
}