import AddIcon from "@mui/icons-material/Add";
import { Fab, Grid } from "@mui/material";
import React from "react";
import ToDo from "../components/ToDo";
import { useStoreToDoMutateTask } from "../hooks/ToDo";
import { useCurrentToDoList, useGetToDoList } from "../hooks/ToDoList";

/** スタイル */
const fabStyle = {
  position: "fixed",
  bottom: 16,
  right: 16,
};

function Home() {
  /** ToDo追加イベント */
  const { storeToDoMutation } = useStoreToDoMutateTask();
  const eventStoreTodo = (event) => {
    storeToDoMutation.mutate();
  };

  const { isLoading } = useGetToDoList();
  const toDoList = useCurrentToDoList();

  if (isLoading) return "Loading...";

  return (
    <div>
      <Grid container spacing={2}>
        {toDoList.map((toDo) => (
          <Grid item key={toDo.id} xs={12} sm={6} md={4} xl={3}>
            <ToDo toDo={toDo} />
          </Grid>
        ))}
      </Grid>
      <Fab
        color="primary"
        aria-label="add"
        sx={fabStyle}
        onClick={eventStoreTodo}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Home;
