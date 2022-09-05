import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductToCart,
  cartSelector,
  Product,
  productsSelector,
} from "../reducers/shopReducer";
import {
  productIsInTheCart,
  updateProduct,
  UpdateType,
  addProduct,
  getTotalPrice,
  removeProduct,
} from "../utils";

const useShop = () => {
  const cart = useSelector(cartSelector);
  const products = useSelector(productsSelector);

  const dispatch = useDispatch();

  const addToCart = useCallback(
    (product: Product): void => {
      const cartProducts = productIsInTheCart(cart.products, product)
        ? updateProduct(cart.products, product, UpdateType.Add)
        : addProduct(cart.products, product);

      dispatch(
        addProductToCart({
          products: updateProduct(products, product, UpdateType.Remove),
          cart: {
            products: cartProducts,
            totalPrice: getTotalPrice(cartProducts),
          },
        })
      );
    },
    [cart, dispatch, products]
  );

  const removeFromCart = useCallback(
    (product: Product): void => {
      const cartProducts = removeProduct(cart.products, product);
      dispatch(
        addProductToCart({
          products: updateProduct(products, product, UpdateType.Add),
          cart: {
            products: cartProducts,
            totalPrice: getTotalPrice(cartProducts),
          },
        })
      );
    },
    [cart, dispatch, products]
  );
  return [addToCart, removeFromCart];
};

export default useShop;
