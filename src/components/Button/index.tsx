import React from 'react'

interface Props {
  onClick?(): void
  label: string
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  onClick,
  label,
  disabled,
}: Props): React.ReactElement => {
  return (
    <button
      type='button'
      className={`${
        disabled ? 'opacity-60' : 'hover:bg-emerald-600 '
      } text-white bg-emerald-400 rounded-lg px-5 py-2.5 mr-2 mb-2 hover`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
