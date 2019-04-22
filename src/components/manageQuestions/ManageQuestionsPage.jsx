import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, createStyles } from "@material-ui/core/styles";
import SidebarStore from "../../stores/SidebarStore";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "./TabContainer";
import CompanyWideTab from "./CompanyWideTab";

const styles = theme =>
  createStyles({
    hidden: {
      display: "none"
    },
    formLabel: {
      fontSize: theme.typography.fontSize * 0.8
    },
    formHead: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: theme.spacing.unit * 3
    },
    form: {
      maxWidth: 1100,
      margin: "auto",
      padding: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 5
    },
    formCol: {
      [theme.breakpoints.up("sm")]: {
        paddingTop: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
      }
    },
    pageWrapper: {
      marginTop: theme.spacing.unit * 3
    },
    drawerOpen: {
      width: `calc(100% - ${theme.sideBarWidth}px)`,
      marginLeft: theme.sideBarWidth,
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      width: `calc(100% - ${theme.spacing.unit * 7}px)`,
      marginLeft: theme.spacing.unit * 7,
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    tabs: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    },
    avatarWrapper: {
      paddingBottom: theme.spacing.unit * 4.5,
      overflow: "hidden"
    },
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
      width: 180,
      height: 180
    },
    avatarEditWrapper: {
      position: "relative",
      left: "calc(50% + 45px)",
      bottom: 45
    },
    avatarEdit: {
      position: "absolute"
    }
  });

class MangeQuestionsPage extends Component {
  TabNavigationValues = {
    COMPANY_WIDE: 0,
    GROUPS: 1,
    BY_PERSON: 2
  };

  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: SidebarStore.getState().isOpen,
      activeTab: this.TabNavigationValues.COMPANY_WIDE
    };
  }

  onSidebarToggle = () => {
    this.setState({ isSidebarOpen: SidebarStore.getState().isOpen });
  };

  componentDidMount() {
    SidebarStore.on("change", this.onSidebarToggle);
  }

  componentWillUnmount() {
    SidebarStore.removeListener("change", this.onSidebarToggle);
  }

  handleTabChange = (event, value) => {
    this.setState({ activeTab: value });
  };

  render() {
    const { classes } = this.props;
    const { activeTab } = this.state;

    return (
      <div
        className={classNames(classes.pageWrapper, {
          [classes.drawerOpen]: this.state.isSidebarOpen,
          [classes.drawerClose]: !this.state.isSidebarOpen
        })}
      >
        <Tabs
          className={classes.tabs}
          value={activeTab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          variant="fullWidth"
        >
          <Tab label="Company-wide" />
          <Tab label="Groups" />
          <Tab label="By person" />
        </Tabs>
        {activeTab === this.TabNavigationValues.COMPANY_WIDE && (
          <TabContainer>
            <CompanyWideTab />
          </TabContainer>
        )}
        {activeTab === this.TabNavigationValues.GROUPS && (
          <TabContainer>GROUPS TAB</TabContainer>
        )}
        {activeTab === this.TabNavigationValues.BY_PERSON && (
          <TabContainer>BY PERSON TAB</TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(MangeQuestionsPage);
