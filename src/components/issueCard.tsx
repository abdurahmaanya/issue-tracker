import { type Issue } from "@prisma/client";
import { Draggable } from "react-beautiful-dnd";

export default function IssueCard(props: { issue: Issue }) {

  return (
    <>
      <div className="border border-gray-100 p-4" style={{ marginLeft: 20, marginRight: 20, marginTop: 5, marginBottom: 5 }}>
        <Draggable draggableId={props.issue.id.toString()} index={props.issue.id}>
          {
            (provided) => (
              <div className="px-2 py-2"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <div className="font-bold text-xl mb-2">Issue {props.issue.id}</div>
                <p className="text-gray-100 text-base">
                  {props.issue.title}
                </p>
              </div>
            )
          }

        </Draggable>
      </div>
    </>
  );
}