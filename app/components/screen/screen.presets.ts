import { ViewStyle } from "react-native"
import { color } from "../../theme"

/**
 * The base shape & color.
 */
const SHAPE: ViewStyle = { backgroundColor: color.background, flex: 1 }

/**
 * Governs the default child layout.
 */
const CONTENTS: ViewStyle = {
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection: "column",
}

/**
 * Glues the shape & child layout together since there's no restrictions on view style.
 */
const DOES_NOT_SCROLL: ViewStyle = { ...SHAPE, ...CONTENTS }

// a style-safe value when a preset's sub-style isn't defined
const NOPE = {}

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      height: "100%",
      width: "100%",
    } as ViewStyle,
    nonScroll: DOES_NOT_SCROLL,
    scrollOuter: NOPE,
    scrollInner: NOPE,
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: color.background,
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: { justifyContent: "flex-start", alignItems: "stretch" } as ViewStyle,
  },

  /**
   * Like scroll, but children are stretched to full width.
   */
  scrollStack: {
    nonScroll: NOPE,
    scrollOuter: SHAPE,
    scrollInner: { ...CONTENTS, alignItems: "stretch" } as ViewStyle,
  },
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset?: ScreenPresets) {
  // any of these things will make you scroll
  return !preset || !presets[preset] || preset === "fixed"
}
