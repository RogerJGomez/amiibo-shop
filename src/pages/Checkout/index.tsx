import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import ProductItem from '../../components/Product'
import {
  addProductToCart,
  cartSelector,
  Product,
  productsSelector,
} from '../../reducers/shopReducer'
import { getTotalPrice, sortById } from '../../utils'

const Checkout: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  const products = useSelector(productsSelector)
  const cart = useSelector(cartSelector)

  const addProduct = useCallback(
    (product: Product): void => {
      const newShop = products.map(prod => {
        if (prod.id === product.id) {
          return { ...prod, quantity: prod.quantity - 1 }
        }
        return prod
      })

      const foundProduct = cart.products.find(prod => prod.id === product.id)

      if (foundProduct) {
        const newCartProducts = cart.products.filter(
          prod => prod.id !== product.id,
        )
        const newCart = {
          ...cart,
          products: [
            ...newCartProducts,
            { ...foundProduct, quantity: foundProduct.quantity + 1 },
          ],
        }

        dispatch(
          addProductToCart({
            products: newShop,
            cart: {
              products: sortById(newCart.products),
              totalPrice: newCart.totalPrice + product.price,
            },
          }),
        )
      } else {
        const newCartProducts = [...cart.products, { ...product, quantity: 1 }]
        dispatch(
          addProductToCart({
            products: newShop,
            cart: {
              products: sortById(newCartProducts),
              totalPrice: getTotalPrice(newCartProducts),
            },
          }),
        )
      }
    },
    [cart, dispatch, products],
  )

  const removeProduct = useCallback(
    (product: Product): void => {
      const newShop = products.map(prod => {
        if (prod.id === product.id) {
          return { ...prod, quantity: prod.quantity + 1 }
        }
        return prod
      })

      const foundProduct = cart.products.find(prod => prod.id === product.id)

      if (foundProduct) {
        const newCartProducts = cart.products.filter(
          prod => prod.id !== product.id,
        )
        const newCart = {
          ...cart,
          products:
            foundProduct.quantity === 1
              ? [...newCartProducts]
              : [
                  ...newCartProducts,
                  { ...foundProduct, quantity: foundProduct.quantity - 1 },
                ],
        }

        dispatch(
          addProductToCart({
            products: newShop,
            cart: {
              products: sortById(newCart.products),
              totalPrice: newCart.totalPrice - product.price,
            },
          }),
        )
      }
    },
    [cart, dispatch, products],
  )

  return (
    <div className='flex w-full h-5/6 justify-center flex-wrap mt-32'>
      <div className='bg-white rounded-md p-6 shadow-md w-11/12 lg:w-9/12 mb-6'>
        <div className='flex flex-col h-full justify-between'>
          <div className='w-full flex justify-between'>
            <Link className='text-lg text-emerald-400' to='/'>
              GO TO SHOP
            </Link>
            <h1 className='text-xl'>Checkout</h1>
            <h1 className='text-lg'>Total price: {cart.totalPrice}$</h1>
          </div>
          <div className='flex w-full items-center flex-wrap justify-center'>
            {cart.products.length === 0 ? (
              <p className='text-lg'>Empty cart</p>
            ) : (
              <>
                {cart.products.map(product => (
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
          <Button label='Proceed with payment (Coming soon)' disabled />
        </div>
      </div>
    </div>
  )
}

export default Checkout
