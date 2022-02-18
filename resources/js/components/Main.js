import { Container, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useGetToDoList } from "../hooks/ToDoList";
import Home from "../pages/Home";
import Navigation from "./Navigation";

const client = new QueryClient();

function Main() {
  return (
    <Box>
      <Navigation></Navigation>
      <Router>
        <QueryClientProvider client={client}>
          <main className={"m-5"}>
            <Switch>
              <Route path="/" exact component={Home} />
            </Switch>
          </main>
        </QueryClientProvider>
      </Router>
    </Box>
  );
}

export default Main;
// for <div id="main-employee"></div>
ReactDOM.render(<Main />, document.getElementById("app"));
