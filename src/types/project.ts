import { type Issue } from "./issue"
import { type Sprint } from "./sprint"

export type Project= {
    id           :   bigint 
    name         :  string   
    isPersonal   : boolean
    sprints      : Sprint[]|[]
    issues       :Issue[]|[]
    teamId       : bigint|never
    ownerId      : string
  }