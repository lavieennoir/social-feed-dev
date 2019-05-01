import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, createStyles } from "@material-ui/core/styles";
import SidebarStore from "../../stores/SidebarStore";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabContainer from "./TabContainer";
import TeamCheckInsTab from "./TeamCheckInsTab";
import EvereoneCheckInsTab from "./EvereoneCheckInsTab";
import { Paper } from "@material-ui/core";
import { right } from "@material-ui/system/positions";

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

class CheckIns extends Component {
  TabNavigationValues = {
    MY_CHECK_INS: 0,
    TEAM_CHECK_INS: 1,
    EVERYONES: 2,
    FOLLOW_UPS: 3
  };

  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: SidebarStore.getState().isOpen,
      activeTab: this.TabNavigationValues.MY_CHECK_INS
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
          <Tab label="My check-ins" />
          <Tab label="Team check-ins" />
          <Tab label="Everyone`s check-ins" />
          <Tab label="Follow-up`s" />
        </Tabs>
        {activeTab === this.TabNavigationValues.MY_CHECK_INS && (
          <TabContainer>My Check-ins</TabContainer>
        )}
        {activeTab === this.TabNavigationValues.TEAM_CHECK_INS && (
          <TabContainer>
            <TeamCheckInsTab />
          </TabContainer>
        )}
        {activeTab === this.TabNavigationValues.EVERYONES && (
          <EvereoneCheckInsTab />
        )}
        {activeTab === this.TabNavigationValues.FOLLOW_UPS && (
          <TabContainer>Follow-up`s</TabContainer>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(CheckIns);
