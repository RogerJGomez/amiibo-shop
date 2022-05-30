import React, { useMemo } from 'react'
import { Product } from '../../reducers/shopReducer'

interface Props {
  product: Product
  onAddProduct(): void
  onRemoveProduct(): void
}

const CartProduct: React.FC<Props> = ({
  product,
  onAddProduct,
  onRemoveProduct,
}: Props): React.ReactElement => {
  const buttonDisabled = useMemo(
    () => product.quantity === product.maxStock,
    [product],
  )

  return (
    <div key={product.id} className='flex space-x-3 items-center w-full'>
      <img className='h-12' src={product.image} alt='product-img' />
      <p>{product.name}</p>
      <p>{product.quantity}</p>
      <div className='cursor-pointer' onClick={onRemoveProduct}>
        <h2 className='text-lg text-red-300'>-</h2>
      </div>
      <div className='cursor-pointer'>
        <h2
          className='text-lg text-emerald-400'
          onClick={!buttonDisabled ? onAddProduct : () => null}
        >
          +
        </h2>
      </div>
    </div>
  )
}

export default CartProduct
