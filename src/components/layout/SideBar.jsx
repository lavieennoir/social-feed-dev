import React, { Component, RefObject } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SideBarTheme from "../../themes/SidebarTheme";
import SidebarActions from "../../actions/SidebarActions";
import SidebarStore from "../../stores/SidebarStore";
import SurroundSoundIcon from "@material-ui/icons/SurroundSound";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import PeopleIcon from "@material-ui/icons/People";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  withStyles,
  createStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";

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
      width: theme.spacing.unit * 7 + 1,
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
    const { classes, items } = this.props;

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
              <SurroundSoundIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="item1">
              <ListItemIcon>
                <ViewQuiltIcon />
              </ListItemIcon>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem button key="item2">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Item 2" />
            </ListItem>
            <ListItem button key="item3">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Item 3" />
            </ListItem>
            <ListItem button key="item4">
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Item 4" />
            </ListItem>
            <ListItem button key="item5">
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Item 5 " />
            </ListItem>
            <ListItem button key="item6">
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Item 6" />
            </ListItem>
            <ListItem button key="item7">
              <ListItemIcon>
                <FileCopyIcon />
              </ListItemIcon>
              <ListItemText primary="Item 7" />
            </ListItem>
            <ListItem button key="item8">
              <ListItemIcon>
                <RefreshIcon />
              </ListItemIcon>
              <ListItemText primary="Item 8" />
            </ListItem>
          </List>
        </Drawer>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SideBar);
