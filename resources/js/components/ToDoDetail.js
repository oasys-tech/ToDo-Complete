import { ListItemButton, TextField } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUpdateToDoDetailMutateTask } from "../hooks/ToDoDetail";

function ToDoDetail(props) {
    /** 更新用オブジェクト */
    let toDoDetail = {
      id: props.detail.id,
      name: "",
    };

    /** 更新イベント */
    const { updateToDoDetailMutation } = useUpdateToDoDetailMutateTask();
    const eventUpdateTodoDetail = (event) => {
      toDoDetail.name = event.target.value;
      updateToDoDetailMutation.mutate(toDoDetail);
    };

    /** テンプレート */
  return (
    <ListItem
      key={props.detail.id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <Checkbox edge="start" />
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
