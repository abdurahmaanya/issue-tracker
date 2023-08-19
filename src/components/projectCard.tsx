import { type Project } from "@prisma/client";

export default function ProjectCard(props: { project: Project }) {

  return (
    <>
      <div className="px-2 py-2">
        <div className="font-bold text-xl mb-2">{props.project.name}</div>
        <p className="text-gray-100 text-base">
          {props.project.name}
        </p>
      </div>
    </>
  );
}