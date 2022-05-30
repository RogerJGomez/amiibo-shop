import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartImg from '../../assets/img/cart.png'
import {
  addProductToCart,
  cartSelector,
  Product,
  productsSelector,
} from '../../reducers/shopReducer'
import { getTotalPrice } from '../../utils'
import Button from '../Button'
import CartProduct from '../CartProduct'

const Header: React.FC = (): React.ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const cart = useSelector(cartSelector)
  const products = useSelector(productsSelector)

  const dispatch = useDispatch()

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
              ...newCart,
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
              products: newCartProducts,
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
              ...newCart,
              totalPrice: newCart.totalPrice - product.price,
            },
          }),
        )
      }
    },
    [cart, dispatch, products],
  )

  return (
    <div className='h-24 w-full bg-white shadow-inner py-4 px-8 fixed top-0 flex items-center justify-between'>
      <Link to='/'>
        <h1 className='text-xl'>E-Commerce</h1>
      </Link>
      <div className='relative'>
        <img
          src={CartImg}
          className='w-12 h-12 cursor-pointer'
          onMouseEnter={() => setIsOpen(true)}
          alt='cart'
        />
        {cart.products.length > 0 && (
          <span className='absolute text-white -top-1 right-0 bg-red-600 rounded-full'>
            <div className='px-1'>{cart.products.length}</div>
          </span>
        )}
        {isOpen && (
          <div
            className='absolute bg-white w-72 top-14 right-0 max-h-96 overflow-y-auto shadow-md rounded-md p-6 space-y-4'
            onMouseLeave={() => setIsOpen(false)}
          >
            {cart.products.length === 0 ? (
              <div className='flex flex-col items-center justify-center space-y-4'>
                <p className='text-lg'>Empty Cart</p>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center space-y-4'>
                <p className='text-lg'>Cart</p>
                {cart.products.map(product => (
                  <CartProduct
                    key={product.id}
                    product={product}
                    onAddProduct={() => addProduct(product)}
                    onRemoveProduct={() => removeProduct(product)}
                  />
                ))}
                <p className='text-lg mb-4'>Total price: {cart.totalPrice}$</p>
                <Link to='/checkout'>
                  <Button label='Checkout' />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
