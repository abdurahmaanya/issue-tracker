/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import MainNavbar from "~/components/navItem";
import Header from "~/components/header";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type SubmitHandler, useForm } from "react-hook-form";
import { type Issue } from "~/types/issue";
import { useEffect, useState } from "react";
import { api } from '../utils/api';
import { useRouter } from "next/router";

type IssueForm = {
  issueType:"Bug"|"Task"
  title:string
}

const Backlog = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit
  } = useForm<IssueForm>()

  const issuesQuery = api.issue.getAll.useQuery();
  const [issues, setIssues] = useState<Issue[]>([]);

  const issueMutation = api.issue.create.useMutation();
  const onSubmit:SubmitHandler<IssueForm> = async(issueFrom:IssueForm, event) => {
    event?.preventDefault();
    try {
      await issueMutation.mutateAsync({
          title:issueFrom.title,
          issueType:issueFrom.issueType,
          projectId:BigInt(0),
          createdAt: new Date().toISOString(),
          status:"TODO",
      });

      
    } catch (error) {
      console.log("Error submitting form:", error);
    }
    
    router.reload();
  };

  
  useEffect(() => {
    setIssues(issuesQuery.data ?? []);
  },[issuesQuery.data])

  const columns: GridColDef[] = [
    { field: 'issueType', headerName: 'Issue Type', width: 150 },
    { field: 'assignee', headerName: 'Assignee', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 }
  ];

  return (
    <>
      <Header />
      <main>
        <div>
          <MainNavbar />
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid getRowId={(row:Issue) => row.id.toString()}
              rows={issues}
              columns={columns}
              sx={{
                margin: 1,
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
              }}
            />
          </div>
          <form onSubmit={(event) => {void handleSubmit(onSubmit)(event)}}>
            {/* register your input into the hook by invoking the "register" function */}
            {/* include validation with required or other standard HTML validation rules */}
            <select id="issueTypes" {...register("issueType", { required: true })}>
              <option value="Bug">Bug</option>
              <option value="Task">Task</option>
            </select>
            <input placeholder="title" {...register("title", { required: true })} />
            <button type="submit" disabled={issueMutation.isLoading}>sumbit</button>
          </form>
        </div>
      </main>

    </>
  );
}

export default Backlog;