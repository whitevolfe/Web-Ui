import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React from "react";
import { fetchTodo } from "../BAL/fetcher";
import Header from "../components/header";

export default function Todo({data}) {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="lg">
        <h1>Todo</h1>
        <DataTable rows={data} />
      </Container>
    </>
  );
}

const DataTable = ({ rows }) => {
  const router = useRouter();

  const columns = [
    {
      field: "userId",
      label: "User Id",
    },
    { field: "id", label: "Id", renderCell: (props) => (
      <Button variant="contained" onClick={()=>{
        router.push(`/todo/${props.row.id}`)
      }}>
        <u>{props.value}</u>
      </Button>
    ), },
    { field: "title", label: "Title", width: 500 },
    { field: "completed", label: "Completed" },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
    </div>
  );
};

export async function getServerSideProps(context) {
  return await fetchTodo().then((data) => {
    return {
      props: {
        data,
      },
    };
  });
}
