import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getProductsSuccess,
  Product,
  startGetProducts,
} from "../reducers/shopReducer";
import { getRandomNumber } from "../utils";

export const getProducts = () => (dispatch: Dispatch) => {
  dispatch(startGetProducts());
  axios
    .get("https://www.amiiboapi.com/api/amiibo")
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const products = res.data.amiibo?.map(
          (amiibo: Product, index: number) => ({
            ...amiibo,
            quantity: 10,
            price: getRandomNumber(10, 61),
            id: `${amiibo.image}-${index}`,
            maxStock: 10,
          })
        );
        dispatch(getProductsSuccess(products));
      } else throw new Error();
    })
    .catch((err) => {
      console.warn(err);
    });
};
