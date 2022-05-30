import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
  id: string
  amiiboSeries: string
  character: string
  gameSeries: string
  head: string
  image: string
  name: string
  type: string
  price: number
  quantity: number
  maxStock: number
}

export interface Cart {
  products: Product[]
  totalPrice: number
}

interface Shop {
  products: Product[]
  cart: Cart
}

interface ShopState extends Shop {
  loading: boolean
}

const initialState: ShopState = {
  products: [],
  loading: false,
  cart: { products: [], totalPrice: 0 },
}

const shopSlice = createSlice({
  name: 'eCommerce',
  initialState,
  reducers: {
    startGetProducts: state => {
      state.loading = true
    },
    getProductsSuccess: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload
      state.loading = false
    },
    addProductToCart: (state, action: PayloadAction<Shop>) => {
      state.products = action.payload.products
      state.cart = action.payload.cart
    },
  },
})

export const { startGetProducts, getProductsSuccess, addProductToCart } =
  shopSlice.actions

export const loadingSelector = (state: { shopReducer: ShopState }) =>
  state.shopReducer.loading
export const productsSelector = (state: { shopReducer: ShopState }) =>
  state.shopReducer.products
export const cartSelector = (state: { shopReducer: ShopState }) =>
  state.shopReducer.cart

export default shopSlice.reducer
