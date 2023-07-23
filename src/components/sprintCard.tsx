import { type Issue } from "~/types/issue";
import { type Sprint } from "~/types/sprint";

export default function SprintCard(props: { sprint: Sprint }) {

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Sprint {props.sprint.id}</div>
          <p className="text-gray-700 text-base">
            {props.sprint.issues?.flatMap((issue: Issue) => {
              return (
                <div key={issue.id}>
                  <p>{issue.title}</p>
                </div>
              )
            })}
          </p>
        </div>
      </div>
    </>
  );
}