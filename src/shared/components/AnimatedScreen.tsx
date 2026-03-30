import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

type AnimatedScreenProps = {
  children: React.ReactNode
}

export const AnimatedScreen = ({ children }: AnimatedScreenProps) => {
  const opacity = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(20)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacity, translateY])

  return (
    <Animated.View
      style={{ flex: 1, opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  )
}