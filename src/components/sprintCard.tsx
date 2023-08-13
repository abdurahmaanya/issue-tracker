import { useEffect, useState } from "react";
import { type Issue } from "@prisma/client";
import { type Sprint } from "@prisma/client";
import { api } from "~/utils/api";
import IssueCard from "./issueCard";
import { Droppable } from "react-beautiful-dnd";

export default function SprintCard(props: { sprint: Sprint }) {

    // issue query and submit form
    const issuesQuery = api.issue.getAll.useQuery();
    const [sprintIssues, setSprintIssues] = useState<Issue[]>([]);


    useEffect(() => {
      const sprintIssues = issuesQuery.data?.filter(i=>i.sprintId == props.sprint.id) ?? [];
      setSprintIssues(sprintIssues);
  }, [issuesQuery.data, props.sprint.id]);

  return (
    <>
      <div className="border border-gray-100 p-1" style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
        <Droppable droppableId={props.sprint.id.toString()}>
          {
            (provided) => (
              <div className="px-2 py-2"
                ref={provided.innerRef}
                {...provided.droppableProps}>
                <div className="font-bold text-xl mb-2" style={{marginLeft:20}}>Sprint {props.sprint.id}</div>
                <p className="text-gray-100 text-base">
                  {sprintIssues?.flatMap((issue: Issue) => {
                    return (
                      <div key={issue.id}>
                        <IssueCard issue={issue} />
                      </div>
                    )
                  })}
                </p>
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      </div>
    </>
  );
}