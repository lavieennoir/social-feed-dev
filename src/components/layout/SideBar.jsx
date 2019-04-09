import React, { Component } from "react";
import classNames from "classnames";
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { SurroundSound, ViewQuilt, People } from "@material-ui/icons";
import {
  withStyles,
  createStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";
import SideBarTheme from "../../themes/SidebarTheme";
import SidebarActions from "../../actions/SidebarActions";
import SidebarStore from "../../stores/SidebarStore";
import NavigationActions from "../../actions/NavigationActions";

const styles = theme =>
  createStyles({
    drawer: {
      flexShrink: 0,
      whiteSpace: "nowrap",
      overflowX: "hidden"
    },
    drawerOpen: {
      width: theme.sideBarWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      width: theme.spacing.unit * 7,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 5px",
      ...theme.mixins.toolbar
    }
  });

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: SidebarStore.getState().isOpen
    };
  }

  handleDrawerToggle = () => {
    SidebarActions.toggleSidebar(!this.state.isOpen);
    this.setState(state => ({
      isOpen: !state.isOpen
    }));
  };

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={SideBarTheme}>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.isOpen,
              [classes.drawerClose]: !this.state.isOpen
            })
          }}
          open={this.state.isOpen}
          anchor="left"
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerToggle}>
              <SurroundSound />
            </IconButton>
          </div>
          <Divider color="primary" />
          <List>
            <ListItem
              button
              key="feed"
              onClick={() => NavigationActions.openFeed()}
            >
              <ListItemIcon>
                <ViewQuilt />
              </ListItemIcon>
              <ListItemText primary="Feed" />
            </ListItem>
            <ListItem
              button
              key="companyProfile"
              onClick={() => NavigationActions.openCompanyProfile()}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Company profile" />
            </ListItem>
            <ListItem
              button
              key="userProfile"
              onClick={() => NavigationActions.openUserProfile()}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="User profile" />
            </ListItem>
            <ListItem
              button
              key="leaderboard"
              onClick={() => NavigationActions.openLeaderboard()}
            >
              <ListItemIcon>
                <ViewQuilt />
              </ListItemIcon>
              <ListItemText primary="Leaderboard" />
            </ListItem>
          </List>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SideBar);
