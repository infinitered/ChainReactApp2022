/**
 * TODO: Replace with something Expo-compatible...unless we
 * follow these instructions:
 *
 * https://github.com/react-native-mapbox-gl/maps/blob/master/plugin/install.md
 */
import React, { useState, useRef } from "react"
// import Mapbox from "@mapbox/react-native-mapbox-gl"
import { TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native"
import { AttractionsMapCallout } from "./attractions-map-callout"
import { color, getScreenHeight, getScreenWidth } from "../../theme"
import { unnest } from "ramda"
import { useStores } from "../../models"
import { Text } from ".."

// Mapbox.setAccessToken(
//   "pk.eyJ1Ijoiamh1c2tleSIsImEiOiJjamFicHEyYmowMmh4MzNwbGJsMHFmNHhoIn0._2iDBeHi7lUMHWUEdTFrqA",
// )

const MAPVIEW: ViewStyle = {
  height: 506,
  flex: 1,
  overflow: "hidden",
  justifyContent: "center",
}

const HIDDEN_MARKER: ViewStyle = { backgroundColor: color.transparent }

const VENUE_MARKER: ViewStyle = { width: 41, height: 66 }

const ATTRACTION_MARKER: ViewStyle = { width: 18, height: 32 }

const TEMP_TEXT: TextStyle = { textAlign: "center", fontWeight: "bold", fontSize: 22 }

export const AttractionsMap = () => {
  const mapViewRef = useRef(undefined)
  const [selected, setSelected] = useState<string | null>(null)
  const {
    eventStore: { attractions },
  } = useStores()

  const onPressLocation = (location, locationId) => {
    setSelected(locationId)
    mapViewRef.current.flyTo(location.geometry.coordinates)
  }

  const size = { width: getScreenWidth(), maxHeight: getScreenHeight() * 0.8 }
  const styleUrl: any = "mapbox://styles/jhuskey/cjabpqolp3lf02so534xe4q9g"
  return (
    <View style={{ ...MAPVIEW, ...size, backgroundColor: "#fc1fbe" }}>
      <Text style={TEMP_TEXT}>TODO: Replace with map</Text>
    </View>
    // <Mapbox.MapView
    //   ref={mapViewRef}
    //   centerCoordinate={attractions.locations[0].geometry.coordinates}
    //   rotateEnabled={false}
    //   pitchEnabled={false}
    //   styleURL={styleUrl}
    //   style={{ ...MAPVIEW, ...size }}
    //   // showUserLocation
    // >
    //   {unnest(
    //     Object.keys(attractions).map((key) => {
    //       const category = attractions[key]
    //       return category.map((location) => {
    //         const markerDimensions = key === "locations" ? VENUE_MARKER : ATTRACTION_MARKER
    //         const locationId = `${location.id}-${key}`
    //         const isSelected = selected === locationId
    //         return (
    //           <Mapbox.PointAnnotation
    //             key={locationId}
    //             id={locationId}
    //             title={location.properties.place_name}
    //             coordinate={location.geometry.coordinates}
    //             selected={isSelected}
    //           >
    //             <TouchableWithoutFeedback onPress={() => onPressLocation(location, locationId)}>
    //               <View style={[HIDDEN_MARKER, markerDimensions]} />
    //             </TouchableWithoutFeedback>
    //             <AttractionsMapCallout
    //               title={location.properties.place_name}
    //               description={location.properties.place_description}
    //               link={location.properties.place_link}
    //               onPressClose={() => setSelected(null)}
    //             />
    //           </Mapbox.PointAnnotation>
    //         )
    //       })
    //     }),
    //   )}
    // </Mapbox.MapView>
  )
}
