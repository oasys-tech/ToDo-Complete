import { Box } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          {/*
          <ReactQueryDevtools></ReactQueryDevtools>
          */}
        </QueryClientProvider>
      </Router>
    </Box>
  );
}

export default Main;
// for <div id="main-employee"></div>
ReactDOM.render(<Main />, document.getElementById("app"));
