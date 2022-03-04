import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import ToDoDetail from "./ToDoDetail";
import {
  useUpdateToDoMutateTask,
  useDeleteToDoMutateTask,
} from "../hooks/ToDo";

function ToDo(props) {
  /** 更新用オブジェクト */
  let toDo = {
    id: props.toDo.id,
    title: props.toDo.title,
  };

  /** 更新イベント */
  const { updateToDoMutation } = useUpdateToDoMutateTask();
  const eventUpdateTodo = (event) => {
    let data = {
      ...toDo,
      title: event.target.value,
    };
    updateToDoMutation.mutate(data);
  };

  /** 削除イベント */
  const { deleteToDoMutation } = useDeleteToDoMutateTask();
  const eventDeleteTodo = (event) => {
    deleteToDoMutation.mutate(toDo);
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
      <CardActions disableSpacing>
        <IconButton edge="end" aria-label="delete" onClick={eventDeleteTodo}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ToDo;
