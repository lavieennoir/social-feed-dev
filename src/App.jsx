import React, { Component } from "react";
import AppBar from "./components/layout/AppBar";
import SideBar from "./components/layout/SideBar";
import { MuiThemeProvider } from "@material-ui/core";
import AppTheme from "./themes/AppTheme";
import FeedTable from "./components/feed/FeedTable";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={AppTheme}>
        <AppBar />
        <SideBar />
        <FeedTable />
      </MuiThemeProvider>
    );
  }
}

export default App;
