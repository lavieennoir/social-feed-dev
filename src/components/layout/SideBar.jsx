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
import {
  SurroundSound,
  ViewList,
  ViewQuilt,
  People,
  FileCopy,
  Refresh
} from "@material-ui/icons";
import {
  withStyles,
  createStyles,
  MuiThemeProvider
} from "@material-ui/core/styles";
import SideBarTheme from "../../themes/SidebarTheme";
import SidebarActions from "../../actions/SidebarActions";
import SidebarStore from "../../stores/SidebarStore";

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
            <ListItem button key="item1">
              <ListItemIcon>
                <ViewQuilt />
              </ListItemIcon>
              <ListItemText primary="Item 1" />
            </ListItem>
            <ListItem button key="item2">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Item 2" />
            </ListItem>
            <ListItem button key="item3">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Item 3" />
            </ListItem>
            <ListItem button key="item4">
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Item 4" />
            </ListItem>
            <ListItem button key="item5">
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText primary="Item 5 " />
            </ListItem>
            <ListItem button key="item6">
              <ListItemIcon>
                <FileCopy />
              </ListItemIcon>
              <ListItemText primary="Item 6" />
            </ListItem>
            <ListItem button key="item7">
              <ListItemIcon>
                <FileCopy />
              </ListItemIcon>
              <ListItemText primary="Item 7" />
            </ListItem>
            <ListItem button key="item8">
              <ListItemIcon>
                <Refresh />
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
