import { Card, CardContent, CardHeader, TextField } from "@mui/material";
import React from "react";
import List from "@mui/material/List";
import ToDoDetail from "./ToDoDetail";

function ToDo(props) {
  return (
    <Card>
      <CardHeader title={props.toDo.title} />
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
