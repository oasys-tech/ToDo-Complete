import { Container, Grid } from "@mui/material";
import React from "react";
import { QueryClient, useQueryClient } from "react-query";
import ToDo from "../components/ToDo";
import { useCurrentToDoList, useGetToDoList } from "../hooks/ToDoList";

const client = new QueryClient();

function Home() {
  const { isLoading } = useGetToDoList();
  const toDoList =  useCurrentToDoList();

  if (isLoading) return "Loading...";

  return (
    <Grid container spacing={2}>
      {toDoList.map((toDo) => (
        <Grid item key={toDo.id} xs={3}>
          <ToDo toDo={toDo} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
