import React, { Component } from "react";
import MaterialAppBar from "@material-ui/core/AppBar";
import { KeyboardArrowLeft } from "@material-ui/icons";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/lab/Breadcrumbs";
import classNames from "classnames";
import SidebarStore from "../../stores/SidebarStore";
import NavigationStore from "../../stores/NavigationStore";
import { NavigationActionTypes } from "../../actions/NavigationActions";
import {
  Toolbar,
  Typography,
  Link,
  IconButton,
  Button
} from "@material-ui/core";

const styles = theme =>
  createStyles({
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
    toolbar: {
      flexWrap: "wrap"
    },
    backArrow: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    breadcrumbs: {
      fontSize: theme.typography.fontSize * 1.5,
      [theme.breakpoints.down("xs")]: {
        flexGrow: 1,
        maxWidth: `calc(100% - ${theme.spacing.unit * 8}px)`,
        "& li:last-child": {
          flexGrow: "1"
        },
        "button, p": {
          maxWidth: "100%"
        }
      }
    },
    saveButton: {
      marginLeft: "auto",
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.down("xs")]: {
        marginBottom: theme.spacing.unit * 2,
        marginTop: theme.spacing.unit * 2
      }
    }
  });

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarOpen: SidebarStore.getState().isOpen
    };
  }

  onSidebarToggle = () => {
    this.setState({ isSidebarOpen: SidebarStore.getState().isOpen });
  };

  handleBreadcrumbClick = () => {};

  handleNavigateBack = () => {};

  componentDidMount() {
    SidebarStore.on("change", this.onSidebarToggle);
  }

  componentWillUnmount() {
    SidebarStore.removeListener("change", this.onSidebarToggle);
  }

  generateBreadcrumbs() {
    const { classes } = this.props;
    const { currentPage } = NavigationStore.getState();
    switch (currentPage) {
      case NavigationActionTypes.FEED:
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <Link
              className={classes.breadcrumbs}
              color="textPrimary"
              component="button"
              onClick={this.handleBreadcrumbClick}
            >
              Employees
            </Link>
            <Link
              className={classes.breadcrumbs}
              color="textPrimary"
              component="button"
              onClick={this.handleBreadcrumbClick}
            >
              Advocacy
            </Link>
            <Typography color="textPrimary" className={classes.breadcrumbs}>
              Feed
            </Typography>
          </Breadcrumbs>
        );
      case NavigationActionTypes.COMP_PROFILE:
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" className={classes.breadcrumbs}>
              Company Profile
            </Typography>
          </Breadcrumbs>
        );
      case NavigationActionTypes.USER_PROFILE:
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" className={classes.breadcrumbs}>
              Edit Profile
            </Typography>
          </Breadcrumbs>
        );
      case NavigationActionTypes.LEADERBOARD:
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <Link
              className={classes.breadcrumbs}
              color="textPrimary"
              component="button"
              onClick={this.handleBreadcrumbClick}
            >
              Employees
            </Link>
            <Link
              className={classes.breadcrumbs}
              color="textPrimary"
              component="button"
              onClick={this.handleBreadcrumbClick}
            >
              Advocacy
            </Link>
            <Typography color="textPrimary" className={classes.breadcrumbs}>
              Leaderboard
            </Typography>
          </Breadcrumbs>
        );
      case NavigationActionTypes.MANAGE_QUESTIONS:
        return (
          <Breadcrumbs aria-label="Breadcrumb" className={classes.breadcrumbs}>
            <Typography color="textPrimary" className={classes.breadcrumbs}>
              Manage Questions
            </Typography>
          </Breadcrumbs>
        );
      default:
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <MaterialAppBar
        position="static"
        color="default"
        className={classNames({
          [classes.drawerOpen]: this.state.isSidebarOpen,
          [classes.drawerClose]: !this.state.isSidebarOpen
        })}
      >
        <Toolbar disableGutters className={classes.toolbar}>
          <span className={classes.backArrow}>
            <IconButton onClick={this.handleNavigateBack} color="secondary">
              <KeyboardArrowLeft />
            </IconButton>
          </span>
          {this.generateBreadcrumbs()}
          <Button
            variant="contained"
            color="primary"
            className={classes.saveButton}
          >
            Save changes
          </Button>
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AppBar);
