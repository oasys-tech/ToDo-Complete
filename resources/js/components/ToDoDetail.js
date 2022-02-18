import { ListItemButton } from "@mui/material";
import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";

function ToDoDetail(props) {
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
        <ListItemText primary={props.detail.name} />
      </ListItemButton>
    </ListItem>
  );
}

export default ToDoDetail;
