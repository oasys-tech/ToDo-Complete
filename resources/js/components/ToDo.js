import { AddCircle, Delete } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  List,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import {
  useDeleteToDoMutateTask,
  useUpdateToDoMutateTask,
} from "../hooks/ToDo";
import { useStoreToDoDetailMutateTask } from "../hooks/ToDoDetail";
import ToDoDetail from "./ToDoDetail";

function ToDo(props) {
  const [timer, setTimer] = useState(null);
  let toDo = {
    id: props.toDo.id,
    title: props.toDo.title,
  };

  /** 名称更新イベント */
  const { updateToDoMutation } = useUpdateToDoMutateTask();
  const eventUpdateToDo = (event) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      let data = {
        ...toDo,
        title: event.target.value,
      };
      updateToDoMutation.mutate(data);
    }, 500);

    setTimer(newTimer);
  };

  /** 削除イベント */
  const { deleteToDoMutation } = useDeleteToDoMutateTask();
  const eventDeleteToDo = (event) => {
    deleteToDoMutation.mutate(toDo);
  };

  /** ToDoDetail追加イベント */
  const { storeToDoDetailMutation } = useStoreToDoDetailMutateTask();
  const eventStoreToDoDetail = (event) => {
    storeToDoDetailMutation.mutate(toDo);
  };

  return (
    <Card>
      <TextField
        variant="standard"
        margin="dense"
        defaultValue={props.toDo.title}
        fullWidth
        onChange={eventUpdateToDo}
      />
      <CardContent>
        <List>
          {props.toDo.to_do_details.map((detail) => {
            return <ToDoDetail key={detail.id} detail={detail} />;
          })}
        </List>
      </CardContent>

      <CardActions>
        <IconButton
          edge="start"
          aria-label="add"
          color="primary"
          onClick={eventStoreToDoDetail}
        >
          <AddCircle />
        </IconButton>

        <IconButton edge="end" aria-label="delete" onClick={eventDeleteToDo}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ToDo;
