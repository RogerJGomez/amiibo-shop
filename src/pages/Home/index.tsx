import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addProductToCart,
  cartSelector,
  loadingSelector,
  Product,
  productsSelector,
} from '../../reducers/shopReducer'
import { getProducts } from '../../services'
import ProductItem from '../../components/Product'
import SpinnerLoader from '../../components/Spinner'
import { getTotalPrice, sortById } from '../../utils'

const Home: React.FC = (): React.ReactElement => {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const products = useSelector(productsSelector)
  const cart = useSelector(cartSelector)

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts() as any)
    }
  }, [dispatch, products])

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

  return (
    <div className='flex w-full h-full justify-center flex-wrap mt-32 mb-12'>
      {loading ? (
        <SpinnerLoader />
      ) : (
        <>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onAddProduct={() => addProduct(product)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Home
