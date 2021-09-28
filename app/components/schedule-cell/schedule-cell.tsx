import React, { useRef } from "react"
import { Animated, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { ScheduleCellPresets } from "./schedule-cell.presets"
import { ScheduleCellProps } from "./schedule-cell.props"
import { Text } from "../text/text"
import { palette } from "../../theme"
import { RenderImage } from "./render-image"
import { RenderTime } from "./render-time"

export function ScheduleCell(props: ScheduleCellProps) {
  const { preset, index, event, onPress, noTime } = props
  const style: any = ScheduleCellPresets[preset] || ScheduleCellPresets.default
  const isOdd = index % 2 === 0 // index starts at 0
  const speakerName = event && event.speakers ? event.speakers.map((s) => s.name).join(", ") : ""

  const animatedSize = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(animatedSize, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(animatedSize, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  if (!event) return null

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(props.event)}
    >
      <Animated.View
        style={[
          style.root as ViewStyle,
          { transform: [{ scale: animatedSize }] },
          isOdd && { backgroundColor: palette.portGoreLighter },
        ]}
      >
        {noTime ? (
          <View style={{ width: "100%", backgroundColor: palette.mantiniqueLight, height: 1 }} />
        ) : (
          <RenderTime preset={preset} event={event} />
        )}
        <View style={style.contentWrapper as ViewStyle}>
          <View style={style.imageWrapper as ViewStyle}>
            <RenderImage preset={preset} event={event} />
          </View>
          <View style={style.content as ViewStyle}>
            <Text preset="subheader" text={event.title} style={style.title as TextStyle} />
            {event && event.speakers && event.speakers.length > 0 && event.speakers[0].name && (
              <Text preset="subheader" text={speakerName} style={style.speaker as TextStyle} />
            )}
            {preset === "afterparty" && (
              <Text
                preset="subheader"
                text={event.description}
                style={style.speaker as TextStyle}
              />
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}
