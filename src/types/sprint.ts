import { type Status } from "./enums"
import { type Issue } from "./issue"

export type Sprint = {
  id: number
  startsAt: Date | never
  finishesAt: Date | never
  goal: string | never
  projectId: bigint
  status: Status
  issues: Issue[] | []
}
