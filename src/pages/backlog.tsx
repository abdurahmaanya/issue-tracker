import MainNavbar from "~/components/navItem";
import Header from "~/components/header";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Issue } from "~/types/issue";
import { api } from '../utils/api';
import { useRouter } from "next/router";
import IssueCard from "~/components/issueCard";
import { type Sprint } from "~/types/sprint";
import { useEffect, useState } from "react";
import SprintCard from "~/components/sprintCard";

type IssueForm = {
  issueType: "Bug" | "Task"
  title: string
}

const Backlog = () => {
  const router = useRouter();

  // issue query and submit form
  const issuesQuery = api.issue.getAll.useQuery();
  const [issues, setIssues] = useState<Issue[]>([]);
  const {
    register,
    handleSubmit
  } = useForm<IssueForm>()
  const issueMutation = api.issue.create.useMutation();
  const onIssueSubmit: SubmitHandler<IssueForm> = async (issueFrom: IssueForm, event) => {
    event?.preventDefault();
    try {
      await issueMutation.mutateAsync({
        data: {
          title: issueFrom.title,
          issueType: issueFrom.issueType,
          projectId: 0,
          createdAt: new Date().toISOString(),
          status: "TODO",
        }
      });
    } catch (error) {
      console.log("Error submitting issue form:", error);
    }
    router.reload();
  };

  // sprint query and submit form
  const sprintsQuery = api.sprint.getAll.useQuery();
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const {
    handleSubmit: handleSprintSubmit
  } = useForm();
  const sprintMutation = api.sprint.create.useMutation();
  const onSprintSubmit: SubmitHandler<any> = async (never, event) => {
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

  useEffect(() => {
    setIssues(issuesQuery.data ?? []);
  }, [issuesQuery.data]);

  useEffect(() => {
    setSprints(sprintsQuery.data ?? []);
  }, [sprintsQuery.data]);

  return (
    <>
      <Header />
      <main>
        <div className='app'>
          <MainNavbar />
          {/* sprints */}
          <div className='app' style={{ height: 500, width: '100%' }}>
            {sprints.flatMap((sprint) => (
              <div className='app'>
                <SprintCard sprint={sprint} />
              </div>
            ))}
          </div>
          {/* backlog issues */}
          <div className='app' style={{ height: 200, width: '100%' }}>
            {issues.flatMap((issue) => (
              <div className='app'>
                <IssueCard issue={issue} />
              </div>
            ))}
          </div>
          {/* issue and sprint submit forms*/}
          <div className='app' style={{ height: 100, width: '100%' }}>
            {/* issue submit form */}
            <form onSubmit={(event) => { void handleSubmit(onIssueSubmit)(event) }}>
              <select id="issueTypes" {...register("issueType", { required: true })}>
                <option value="Bug">Bug</option>
                <option value="Task">Task</option>
              </select>
              <input placeholder="title" {...register("title", { required: true })} />
              <button type="submit" disabled={issueMutation.isLoading}>Create sprint</button>
            </form>
            {/* sprint submit form */}
            <form onSubmit={(event) => { void handleSprintSubmit(onSprintSubmit)(event) }}>
              <button type="submit" disabled={issueMutation.isLoading}>+ Create issue</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Backlog;