import { Product } from "../reducers/shopReducer";

export enum UpdateType {
  Add = "Add",
  Remove = "Remove",
}

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getTotalPrice = (products: Product[]): number => {
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return totalPrice;
};

export const sortById = (products: Product[]): Product[] => {
  return products.sort((productA, productB) =>
    productA.id < productB.id ? -1 : productA.id > productB.id ? 1 : 0
  );
};

export const updateProduct = (
  products: Product[],
  product: Product,
  type: UpdateType
): Product[] => {
  return sortById(
    products.map((prod) => {
      if (prod.id === product.id) {
        return {
          ...prod,
          quantity:
            type === UpdateType.Add ? prod.quantity + 1 : prod.quantity - 1,
        };
      } else return prod;
    })
  );
};

export const productIsInTheCart = (
  products: Product[],
  product: Product
): boolean => {
  const productFound = products.find((prod) => prod.id === product.id);
  return productFound !== undefined;
};

export const addProduct = (
  products: Product[],
  product: Product
): Product[] => {
  return [...products, { ...product, quantity: 1 }];
};

export const removeProduct = (
  products: Product[],
  product: Product
): Product[] => {
  if (product.quantity === 1) {
    return products.filter((prod) => prod.id !== product.id);
  } else {
    return updateProduct(products, product, UpdateType.Remove);
  }
};
