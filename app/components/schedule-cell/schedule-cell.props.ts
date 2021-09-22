import { ViewProps } from "react-native"
import { Event } from "../../models"
import { ScheduleCellPresetNames } from "./schedule-cell.presets"

export interface ScheduleCellProps extends ViewProps {
  // Index to determine if cell is even or odd
  index: number
  event: Event
  preset?: ScheduleCellPresetNames
  onPress: Function
  noTime?: boolean
}
