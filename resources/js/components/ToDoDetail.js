import DeleteIcon from "@mui/icons-material/Delete";
import { ListItemButton, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import React, { useState } from "react";
import {
  useDeleteToDoDetailMutateTask,
  useUpdateToDoDetailMutateTask
} from "../hooks/ToDoDetail";

function ToDoDetail(props) {
  const [timer, setTimer] = useState(null);

  /** 更新用オブジェクト */
  let toDoDetail = {
    id: props.detail.id,
    to_do_id:props.detail.to_do_id,
    name: props.detail.name,
    completed_flag: props.detail.completed_flag,
  };

  /** 更新イベント */
  const { updateToDoDetailMutation } = useUpdateToDoDetailMutateTask();
  const eventUpdateTodoDetail = (event) => {
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      let data = {
        ...toDoDetail,
        name: event.target.value,
      };
      updateToDoDetailMutation.mutate(data);
    }, 500);

    setTimer(newTimer);
  };

  /** チェックボックス押下イベント */
  const eventCheckToDoDetail = (event) => {
    let data = {
      ...toDoDetail,
      completed_flag: event.target.checked,
    };
    updateToDoDetailMutation.mutate(data);
  };

  /** 削除ボタン押下イベント */
  const { deleteToDoDetailMutation } = useDeleteToDoDetailMutateTask();
  const eventDeleteToDoDetail = (event) => {
    deleteToDoDetailMutation.mutate(toDoDetail);
  };

  /** テンプレート */
  return (
    <ListItem
      key={props.detail.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={eventDeleteToDoDetail}
        >
          <DeleteIcon />
        </IconButton>
      }
      dense={true}
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.detail.completed_flag}
            onChange={eventCheckToDoDetail}
          />
        </ListItemIcon>
        <TextField
          variant="standard"
          margin="dense"
          defaultValue={props.detail.name}
          fullWidth
          onChange={eventUpdateTodoDetail}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default ToDoDetail;
