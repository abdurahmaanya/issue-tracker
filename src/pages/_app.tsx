import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { type Issue } from "@prisma/client";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const issueUpdateMutation = api.issue.update.useMutation();

  const handleIssueUpdate = (updatedIssue: Issue) => {
    try {
      issueUpdateMutation.mutate({
        data: updatedIssue,
      });
    } catch (error) {
      console.error("Error moving issue:", error);
    }
  };

  // issues query
  const issuesQuery = api.issue.getAll.useQuery();
  const [issuesData, setIssuesData] = useState<Issue[]>([]);
  useEffect(() => {
    setIssuesData(issuesQuery.data ?? []);
  }, [issuesQuery.data]);

  // drag and drop
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination?.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    // find issue to update
    const issueToUpdate = issuesData.find((i) => i.id === parseInt(draggableId));

    // move issue to todo
    if (destination.droppableId === "TODO") {
      issueToUpdate.status = "TODO";
      issueToUpdate.closedAt = null;
    }
    // move issue to in progress
    else if (destination.droppableId === "IN_PROGRESS") {
      issueToUpdate.status = "IN_PROGRESS";
      issueToUpdate.closedAt = null;
    }
    // move issue to done
    else if (destination.droppableId === "DONE") {
      issueToUpdate.status = "DONE";
      issueToUpdate.closedAt = new Date();
    }
    // move issue to backlog
    else if (destination.droppableId === "backlog") {
      issueToUpdate.sprintId = null;
    }
    // move issue to a sprint
    else {
      try {
        const sprintId = parseInt(destination.droppableId);
        issueToUpdate.sprintId = sprintId;
      }
      catch (error) {
        console.log("Error moving issue to sprint: ", destination.droppableId, error);
      }
    }

    // update issue
    try {
      handleIssueUpdate(issueToUpdate);
    } catch (error) {
      console.log("Error moving issue: ", error);
    }

    // Reload the page after the mutation
    window.location.reload();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </DragDropContext>
  );
};

export default api.withTRPC(MyApp);
