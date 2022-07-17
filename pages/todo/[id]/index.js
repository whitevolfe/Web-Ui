import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { fetchTodoById } from "../../../BAL/fetcher";

export default function Page({ data }) {
  const router = useRouter();
  return (
    <div style={{ padding: 30 }}>
      <h1> Todo detials</h1>
      <h3>title: {data.title}</h3>
      <h3>completed: {data.completed ? "yes" : "no"}</h3>
      <br />
      {JSON.stringify(data)}
      <br />
      <Button
        variant="contained"
        onClick={() => {
          router.back();
        }}
      >
        Back
      </Button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  return await fetchTodoById(id).then((data) => {
    return {
      props: {
        data,
      },
    };
  });
}
