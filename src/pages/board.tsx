import { Droppable } from "react-beautiful-dnd";
import Header from "~/components/header";
import NavItem from "~/components/navItem";
import { useEffect, useState } from "react";
import { api } from '../utils/api';
import { type Issue } from "@prisma/client";
import IssueCard from "~/components/issueCard";
import boardColumnStyles from "~/styles/board.module.css";

export default function Board() {
  const issuesQuery = api.issue.getAll.useQuery();
  const [toDo, setToDo] = useState<Issue[]>([]);
  const [inProgress, setInProgress] = useState<Issue[]>([]);
  const [done, setDone] = useState<Issue[]>([]);
  useEffect(() => {
    setToDo(issuesQuery.data?.filter(i => i.status == "TODO") ?? []);
    setInProgress(issuesQuery.data?.filter(i => i.status == "IN_PROGRESS") ?? []);
    setDone(issuesQuery.data?.filter(i => i.status == "DONE") ?? []);
  }, [issuesQuery.data]);
  return (
    <>
      <Header />
      <main>
        <div>
          <NavItem />
          <div className="flex flex-row bg-columnBackgroundColor gap-1 justify-center">
            <div className={boardColumnStyles.column}>
              <p style={{ marginLeft: 20 }}>TODO</p>
              <Droppable droppableId="TODO">
                  {
                    (provided) => (
                      <div className={boardColumnStyles.columnContent} 
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {toDo.flatMap((issue) => (
                          <div key={issue?.id}>
                            <IssueCard issue={issue} />
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
            </div>
            <div className={boardColumnStyles.column}>
              <p style={{ marginLeft: 20 }}>IN PROGRESS</p>
              <Droppable droppableId="IN_PROGRESS">
                {
                  (provided) => (
                    <div className={boardColumnStyles.columnContent}
                      ref={provided.innerRef}
                      {...provided.droppableProps}>
                      {inProgress.flatMap((issue) => (
                        <div key={issue?.id}>
                          <IssueCard issue={issue} />
                        </div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )
                }
              </Droppable>
            </div>
            <div className={boardColumnStyles.column}>
              <p style={{ marginLeft: 20 }}>DONE</p>
              <Droppable droppableId="DONE">
                  {
                    (provided) => (
                      <div className={boardColumnStyles.columnContent}
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                        {done.flatMap((issue) => (
                          <div key={issue?.id}>
                            <IssueCard issue={issue} />
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    )
                  }
                </Droppable>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}