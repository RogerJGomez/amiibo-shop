import React from "react";
import { Product } from "../../reducers/shopReducer";
import Button from "../Button";

interface Props {
  product: Product;
  onAddProduct?(): void;
  onRemoveProduct?(): void;
  isShop?: boolean;
}

const ProductItem: React.FC<Props> = ({
  product,
  onAddProduct,
  onRemoveProduct,
  isShop = true,
}: Props): React.ReactElement => {
  const { image, name, price, type, quantity, maxStock } = product;

  return (
    <div className="flex rounded-md shadow-md w-96 h-96 bg-white m-3 p-4 justify-center">
      <div className="flex flex-col items-center">
        <div className="p-2 mb-6">
          <img src={image} alt="product-img" className="h-40" />
        </div>
        <h3 className="text-xl">{name}</h3>
        <p className="text-base text-gray-500">{`${price}$ - ${type}`}</p>
        <p className="text-base text-gray-500 mb-4">{`Stock: ${quantity}`}</p>
        {isShop ? (
          <Button
            label="Add to Cart"
            onClick={onAddProduct}
            disabled={quantity === 0}
          />
        ) : (
          <div className="flex w-full space-x-6 justify-center">
            <Button label="-" onClick={onRemoveProduct} />
            <Button
              label="+"
              onClick={onAddProduct}
              disabled={quantity === maxStock}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
