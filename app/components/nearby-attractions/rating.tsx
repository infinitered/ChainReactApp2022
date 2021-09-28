import * as React from "react"
import { Image, ImageStyle, View, ViewStyle } from "react-native"

const filled = require("./images/star.filled.png")
const empty = require("./images/star.unfilled.png")

const ROOT: ViewStyle = {
  marginLeft: "auto",
  flexDirection: "row",
  width: 17 * 5,
  height: 11,
}
const STAR: ImageStyle = {
  width: 11,
  height: 11,
  marginLeft: 6,
}

type RatingProps = { rating?: number }

export const Rating = (props: RatingProps) => {
  const stars = [1, 2, 3, 4, 5]
  const { rating } = props

  return (
    <View style={ROOT}>
      {stars.map((i) => (
        <Image source={i <= rating ? filled : empty} style={STAR} key={`${i}`} />
      ))}
    </View>
  )
}
