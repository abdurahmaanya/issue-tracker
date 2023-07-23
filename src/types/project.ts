import { type Issue } from "./issue"
import { type Sprint } from "./sprint"

export type Project = {
  id: number
  name: string
  isPersonal: boolean
  sprints: Sprint[] | []
  issues: Issue[] | []
  teamId: number | never
  ownerId: string
}