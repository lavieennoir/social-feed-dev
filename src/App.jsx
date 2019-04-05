import React, { Component } from "react";
import AppBar from "./components/layout/AppBar";
import SideBar from "./components/layout/SideBar";
import { MuiThemeProvider } from "@material-ui/core";
import AppTheme from "./themes/AppTheme";
import FeedTable from "./components/feed/FeedTable";
import CompanyForm from "./components/companyProfile/CompanyForm";
import NavigationStore from "./stores/NavigationStore";
import { NavigationActionTypes } from "./actions/NavigationActions";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: NavigationStore.getState().currentPage
    };
  }

  onNavigationChanged = () => {
    this.setState({
      currentPage: NavigationStore.getState().currentPage
    });
  };
  componentDidMount() {
    NavigationStore.on("change", this.onNavigationChanged);
  }

  componentWillUnmount() {
    NavigationStore.removeListener("change", this.onNavigationChanged);
  }

  render() {
    const { currentPage } = this.state;
    let currentPageComponent = null;
    switch (currentPage) {
      case NavigationActionTypes.FEED:
        currentPageComponent = <FeedTable />;
        break;
      case NavigationActionTypes.COMP_PROFILE:
        currentPageComponent = <CompanyForm />;
        break;
      default:
        currentPageComponent = <FeedTable />;
        break;
    }
    return (
      <MuiThemeProvider theme={AppTheme}>
        <AppBar />
        <SideBar />
        {currentPageComponent}
      </MuiThemeProvider>
    );
  }
}

export default App;
