import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartImg from "../../assets/img/cart.png";
import Logo from "../../assets/img/amiibo-logo.png";
import { cartSelector } from "../../reducers/shopReducer";
import Button from "../Button";
import CartProduct from "../CartProduct";
import useShop from "../../hooks/useShop";

const Header: React.FC = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const cart = useSelector(cartSelector);
  const [addProduct, removeProduct] = useShop();

  const onMouseEnter = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="h-28 w-full bg-white shadow-inner py-4 px-8 fixed top-0 flex items-center justify-between">
      <Link to="/">
        <img src={Logo} className="h-10" alt="logo" />
      </Link>
      <div className="relative">
        <img
          src={CartImg}
          className="w-12 h-12 cursor-pointer"
          onMouseEnter={onMouseEnter}
          alt="cart"
        />
        {cart.products.length > 0 && (
          <span className="absolute text-white -top-1 right-0 bg-red-600 rounded-full">
            <div className="px-1">{cart.products.length}</div>
          </span>
        )}
        {isOpen && (
          <div
            className="absolute bg-white w-72 top-14 right-0 max-h-96 overflow-y-auto shadow-md rounded-md p-6 space-y-4 scroller"
            onMouseLeave={onMouseLeave}
          >
            {cart.products.length === 0 ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-lg">Empty Cart</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <p className="text-lg">Cart</p>
                {cart.products.map((product) => (
                  <CartProduct
                    key={product.id}
                    product={product}
                    onAddProduct={() => addProduct(product)}
                    onRemoveProduct={() => removeProduct(product)}
                  />
                ))}
                <p className="text-lg mb-4">Total price: {cart.totalPrice}$</p>
                <Link to="/checkout">
                  <Button label="Checkout" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
