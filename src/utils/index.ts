import { Product } from '../reducers/shopReducer'

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getTotalPrice = (products: Product[]): number => {
  const totalPrice = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  )

  return totalPrice
}

export const sortById = (products: Product[]): Product[] => {
  return products.sort((productA, productB) =>
    productA.id < productB.id ? -1 : productA.id > productB.id ? 1 : 0,
  )
}
