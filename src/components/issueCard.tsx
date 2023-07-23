import { type Issue } from "~/types/issue";
import Draggable from "react-draggable";

export default function IssueCard(props: { issue: Issue }) {

  return (
    <>
      <Draggable>
          <div className="max-w-sm rounded overflow-hidden shadow-lg" style={{ width: '100%' }}>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Issue {props.issue.id}</div>
              <p className="text-gray-700 text-base">
                {props.issue.title}
              </p>
            </div>
          </div>
        </Draggable>
    </>
  );
}