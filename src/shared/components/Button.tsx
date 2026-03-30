import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline'

type ButtonProps = {
  label: string
  onPress: () => void
  variant?: ButtonVariant
  fullWidth?: boolean
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: 'bg-blue-500',
    text: 'text-white',
  },
  secondary: {
    container: 'bg-gray-100',
    text: 'text-gray-700',
  },
  danger: {
    container: 'bg-red-500',
    text: 'text-white',
  },
  outline: {
    container: 'border border-gray-300 bg-transparent',
    text: 'text-gray-500',
  },
}

export const Button = ({
  label,
  onPress,
  variant = 'primary',
  fullWidth = true,
  disabled = false,
}: ButtonProps) => {
  const styles = variantStyles[variant]

  return (
    <TouchableOpacity
      className={`py-3 rounded-lg items-center ${styles.container} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50' : ''}`}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      <Text className={`font-medium text-base ${styles.text}`}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}