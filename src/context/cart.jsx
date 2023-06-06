import React, { createContext, useContext, useEffect, useState } from "react";
import cartService from "../service/cart.service";
import { useAuthContext } from "./auth";

const initialCartDetails = {
  cartData: [],
  updateCart: () => {},
  emptyCart: () => {},
};

const cartContext = createContext(initialCartDetails);

export const CartWrapper = ({ children }) => {
  const authContext = useAuthContext();
  const [cartData, setCartData] = useState([]);
  const [temp,setTemp]=useState("initial")
  const emptyCart = () => {
    setCartData([]);
  };

  const updateCart = (updatedCartList) => {
    if (updatedCartList) {
      setCartData(updatedCartList);
    } else if (authContext.user.id) {
      cartService.getList(authContext.user.id).then((res) => setCartData(res));
    }
  };

  useEffect(() => {
    updateCart();
    emptyCart();
  }, [authContext.user.id]);

  const value = {
    cartData,
    emptyCart,
    updateCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(cartContext);
};
