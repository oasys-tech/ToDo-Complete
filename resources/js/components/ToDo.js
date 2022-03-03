import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ToDoDetail from "./ToDoDetail";
import { useUpdateToDoMutateTask } from "../hooks/ToDo";

function ToDo(props) {
  /** 更新用オブジェクト */
  let toDo = {
    id: props.toDo.id,
    title: props.toDo.title,
  };

  /** 更新イベント */
  const { updateToDoMutation } = useUpdateToDoMutateTask();
  const eventUpdateTodo = (event) => {
    toDo.title = event.target.value;
    updateToDoMutation.mutate(toDo);
  };

  /** テンプレート */
  return (
    <Card>
      <TextField
        variant="standard"
        margin="dense"
        defaultValue={props.toDo.title}
        fullWidth
        onChange={eventUpdateTodo}
      />
      <CardContent>
        <List>
          {props.toDo.to_do_details.map((detail) => {
            return <ToDoDetail key={detail.id} detail={detail}></ToDoDetail>;
          })}
        </List>
      </CardContent>
    </Card>
  );
}

export default ToDo;