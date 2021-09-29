import { GeneralApiProblem } from "./api-problem"
// import { Character } from "../../models/character/character"

export interface User {
  id: number
  name: string
}

export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult =
  | { kind: "ok"; characters: /* Character */ unknown[] }
  | GeneralApiProblem
export type GetCharacterResult =
  | { kind: "ok"; character: /* Character */ unknown }
  | GeneralApiProblem
