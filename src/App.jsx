import React, { Component } from "react";
import AppBar from "./components/layout/AppBar";
import SideBar from "./components/layout/SideBar";
import { MuiThemeProvider } from "@material-ui/core";
import AppTheme from "./themes/AppTheme";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={AppTheme}>
        <AppBar />
        <SideBar />
      </MuiThemeProvider>
    );
  }
}

export default App;
