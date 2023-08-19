'use client'
import { signIn, useSession } from "next-auth/react";
import Header from "~/components/header";
import NavItem from "~/components/navItem";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import ProjectCard from "~/components/projectCard";
import { type Project } from "@prisma/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import router from "next/router";

type ProjectForm = {
  name: string;
};

export default function Home() {
  const session = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const projectsQuery = api.project.getAll.useQuery();
  useEffect(() => {
    setProjects(projectsQuery.data?.filter(i => i.ownerId == session?.data?.user?.id) ?? []);
  }, [projectsQuery.data, session?.data?.user?.id]);
  const {
    register,
    handleSubmit
  } = useForm<ProjectForm>()
  const projectCreateMutation = api.project.create.useMutation();
  const onProjectSubmit: SubmitHandler<ProjectForm> = async (projectFrom: ProjectForm, event) => {
    event?.preventDefault();
    try {
      const projectData = {
        name: projectFrom.name,
        ownerId: session?.data?.user?.id
      };
      await projectCreateMutation.mutateAsync({
        data: projectData
      });
    } catch (error) {
      console.log("Error submitting project form:", error);
    }
    void router.reload();
  };
  
  if (session?.data != null) {
    const handleProjectClick = (project: Project) => () => {
      localStorage.setItem("selectedProjectId", project?.id.toString())
      void router.push('/backlog');
    };
    return (
      <>
        <Header />
        <main>
          <div>
            <NavItem />
            {/* project submit form */}
            <div style={{ marginLeft: 20, marginTop: 20 }}>
              <form onSubmit={(event) => { void handleSubmit(onProjectSubmit)(event) }}>
                <input placeholder="name" {...register("name", { required: true })} />
                <button type="submit" disabled={projectCreateMutation.isLoading}
                  className="bg-gray-100 hover:bg-gray-400 text-gray-800 font-bold py-2 px-1">
                  Create Project
                </button>
              </form>
            </div>
            {projects.flatMap((project) => (
              <div key={project.id} onClick={handleProjectClick(project)}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </main>
      </>
    )
  }
  else {
    return (
      <>
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signIn()}
            >
              Log in
            </button>
          </div>
        </main>
      </>
    );
  }
}
