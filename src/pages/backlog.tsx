import MainNavbar from "~/components/navItem";
import Header from "~/components/header";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Issue } from "@prisma/client";
import { api } from '../utils/api';
import { useRouter } from "next/router";
import IssueCard from "~/components/issueCard";
import { type Sprint } from "@prisma/client";
import { useEffect, useState } from "react";
import SprintCard from "~/components/sprintCard";
import { Droppable } from "react-beautiful-dnd";
import backlogStyles from "~/styles/backlog.module.css";
import sprintStyles from "~/styles/sprints.module.css";

type IssueForm = {
  issueType: string
  title: string
}

const Backlog = () => {
  const router = useRouter();

  // issue query and submit form
  const issuesQuery = api.issue.getAll.useQuery();
  const [backlogIssues, setIssues] = useState<Issue[]>([]);
  useEffect(() => {
    setIssues(issuesQuery.data?.filter(i => i.sprintId == null) ?? []);
  }, [issuesQuery.data]);
  const {
    register,
    handleSubmit
  } = useForm<IssueForm>()
  const issueCreateMutation = api.issue.create.useMutation();
  const onIssueSubmit: SubmitHandler<IssueForm> = async (issueFrom: IssueForm, event) => {
    event?.preventDefault();
    try {
      const issueData = {
        title: issueFrom.title,
        issueType: issueFrom.issueType,
        projectId: 0,
        createdAt: new Date(),
        status: "TODO",
      };
      await issueCreateMutation.mutateAsync({
        data: issueData
      });
    } catch (error) {
      console.log("Error submitting issue form:", error);
    }
    router.reload();
  };

  // sprint query and submit form
  const sprintsQuery = api.sprint.getAll.useQuery();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  useEffect(() => {
    setSprints(sprintsQuery.data ?? []);
  }, [sprintsQuery.data]);
  const {
    handleSubmit: handleSprintSubmit
  } = useForm();
  const sprintMutation = api.sprint.create.useMutation();
  const onSprintSubmit: SubmitHandler<never> = async (never, event) => {
    event?.preventDefault();
    try {
      await sprintMutation.mutateAsync({
        data: {
          projectId: 0,
        }
      });
    } catch (error) {
      console.log("Error submitting form:", error);
    }
    router.reload();
  };

  return (
    <>
      <Header />
      <main>
        <div>
          <MainNavbar />
          {/* sprints */}
          <div className={sprintStyles.sprints}
            style={{ marginLeft: 20 }}>
            {sprints.flatMap((sprint) => (
              <div key={sprint?.id} >
                <SprintCard sprint={sprint} />
              </div>
            ))}
          </div>
          {/* sprint submit form */}
          <form onSubmit={(event) => { void handleSprintSubmit(onSprintSubmit)(event) }}>
            <button type="submit" disabled={issueCreateMutation.isLoading}
              className="bg-gray-100 hover:bg-gray-400 text-gray-800 font-bold py-2 px-1"
              style={{ top: '43%', right: 0, position: "absolute", marginRight: 20 }}
            >
              Create sprint
            </button>
          </form>
          <p className="font-bold text-xl mb-2" style={{ marginLeft: 20 }}>Backlog</p>
          {/*  backlog issues*/}
          <div className={backlogStyles.backlog}
            style={{ marginLeft: 20 }}>
            <Droppable droppableId="backlog">
              {
                (provided) => (
                  <div className="px-2 py-2"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <p className="text-gray-100 text-base">
                      {backlogIssues.flatMap((issue) => (
                        <div key={issue?.id}>
                          <IssueCard issue={issue} />
                        </div>
                      ))}
                    </p>
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>
          </div>

          {/* issue submit form */}
          <div style={{ marginLeft: 20, marginTop: 20 }}>
            <form onSubmit={(event) => { void handleSubmit(onIssueSubmit)(event) }}>
              <select id="issueTypes" {...register("issueType", { required: true })}>
                <option value="Bug">Bug</option>
                <option value="Task">Task</option>
              </select>
              <input placeholder="title" {...register("title", { required: true })} />
              <button type="submit" disabled={issueCreateMutation.isLoading}>
              </button>
            </form>
          </div>

        </div>
      </main>
    </>
  );
}
export default Backlog;