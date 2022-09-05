import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import ProductItem from "../../components/Product";
import useShop from "../../hooks/useShop";
import { cartSelector } from "../../reducers/shopReducer";

const Checkout: React.FC = (): React.ReactElement => {
  const cart = useSelector(cartSelector);
  const [addProduct, removeProduct] = useShop();

  return (
    <div className="flex w-full h-5/6 justify-center flex-wrap mt-32">
      <div className="bg-white rounded-md p-6 shadow-md w-11/12 lg:w-9/12 mb-6">
        <div className="flex flex-col h-full justify-between">
          <div className="w-full flex justify-between">
            <Link className="text-lg text-emerald-400" to="/">
              GO TO SHOP
            </Link>
            <h1 className="text-xl">Checkout</h1>
            <h1 className="text-lg">Total price: {cart.totalPrice}$</h1>
          </div>
          <div className="flex w-full items-center flex-wrap justify-center">
            {cart.products.length === 0 ? (
              <p className="text-lg">Empty cart</p>
            ) : (
              <>
                {cart.products.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onAddProduct={() => addProduct(product)}
                    onRemoveProduct={() => removeProduct(product)}
                    isShop={false}
                  />
                ))}
              </>
            )}
          </div>
          <Button label="Proceed with payment (Coming soon)" disabled />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
