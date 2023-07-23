import { type Issue } from "~/types/issue";

export default function IssueCards(props: { issues: Issue[] }) {
  return (
    <>
      {props.issues.flatMap((issue) => (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Issue {issue.id}</div>
            <p className="text-gray-700 text-base">
              {issue.title}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}