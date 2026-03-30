import React, { useEffect, useRef } from 'react'
import { View, Animated, Easing } from 'react-native'

type SkeletonBoxProps = {
  className?: string
}

export const SkeletonBox = ({ className }: SkeletonBoxProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [opacity])

  return (
    <Animated.View
      style={{ opacity }}
      className={`bg-gray-200 rounded ${className}`}
    />
  )
}

export const ProductSkeleton = () => (
  <View className="bg-white rounded-lg mb-4 overflow-hidden elevation-2">
    <SkeletonBox className="w-full h-44" />
    <View className="p-3 gap-2">
      <SkeletonBox className="w-4/5 h-4" />
      <SkeletonBox className="w-2/5 h-3" />
      <SkeletonBox className="w-1/3 h-3" />
    </View>
  </View>
)
