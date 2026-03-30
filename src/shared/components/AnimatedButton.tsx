import React, { useRef, useState } from 'react'
import { Animated, TouchableOpacity, Text } from 'react-native'

type AnimatedButtonProps = {
  label: string
  labelSuccess?: string
  onPress: () => void
  className?: string
  successClassName?: string
}

export const AnimatedButton = ({
  label,
  labelSuccess,
  onPress,
  className = 'bg-blue-500',
  successClassName = 'bg-green-500',
}: AnimatedButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current
  const [success, setSuccess] = useState(false)

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start()

    onPress()

    if (labelSuccess) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2000)
    }
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        className={`py-4 rounded-lg items-center ${success ? successClassName : className}`}
        onPress={handlePress}
        activeOpacity={0.9}>
        <Text className="text-white font-bold text-base">
          {success && labelSuccess ? labelSuccess : label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  )
}