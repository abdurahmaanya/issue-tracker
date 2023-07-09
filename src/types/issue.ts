import { type IssueType, type Status } from "./enums";

export type Issue={
    id:bigint|string
    title:string
    issueType:IssueType
    description:string|undefined|null
    assignee:string|null|undefined
    projectId:bigint|string
    sprintId:bigint|null|string|undefined
    createdAt:Date|string
    updatedAt:Date|string|null|never
    closedAt:Date|never|string|null|undefined
    status:Status  
  };
  