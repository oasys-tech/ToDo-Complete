import { Add } from "@mui/icons-material";
import { Fab, Grid } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import ToDo from "../components/ToDo";
import { useStoreToDoMutateTask } from "../hooks/ToDo";
import { useCurrentToDoList, useGetToDoList } from "../hooks/ToDoList";

/** スタイル */
const fabStyle = {
  postion: "fixed",
  bottom: 16,
  right: 16,
};

function Home() {
  /** ToDo追加イベント */
  const { storeToDoMutation } = useStoreToDoMutateTask();
  const eventstoreToDo = (event) => {
    storeToDoMutation.mutate();
  };

  const { isLoading } = useGetToDoList();
  const toDoList = useCurrentToDoList();
  if (isLoading) return "Now Loading.......";
  return (
    <div>
      <Grid container spacing={2}>
        {toDoList.map((toDo) => (
          <Grid item key={toDo.id} xs={3}>
            <ToDo toDo={toDo} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={fabStyle}
        onClick={eventstoreToDo}
      >
        <Add />
      </Fab>
    </div>
  );
}

export default Home;
