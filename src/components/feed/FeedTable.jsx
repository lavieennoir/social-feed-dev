import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FeedRepository from "../../repositories/FeedRepository";
import SidebarStore from "../../stores/SidebarStore";
import classNames from "classnames";
import { Typography, Hidden } from "@material-ui/core";
import DefaultImage from "../../assets/Overlay.svg";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  drawerOpen: {
    // width: `calc(100% - ${theme.sideBarWidth}px)`,
    marginLeft: theme.sideBarWidth + theme.spacing.unit * 3,
    transition: theme.transitions.create(["width", "margin-left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    // width: `calc(100% - ${theme.spacing.unit * 7}px)`,
    marginLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create(["width", "margin-left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  table: {
    minWidth: theme.tableMinWidth
  },
  paperInfo: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  tableRow: {
    verticalAlign: "top"
  },
  postCell: {
    minWidth: 200,
    maxHeight: "3.5em",
    overflowY: "hidden",
    textOverflow: "ellipsis"
  }
});

class FeedTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      errorMessage: "",
      isSidebarOpen: SidebarStore.getState().isOpen,
      items: []
    };

    this.onFeedLoaded = this.onFeedLoaded.bind(this);
    this.onFeedError = this.onFeedError.bind(this);
  }

  onSidebarToggle = () => {
    this.setState({ isSidebarOpen: SidebarStore.getState().isOpen });
  };

  onFeedLoaded = result => {
    this.setState({
      errorMessage: "",
      isLoaded: true,
      items: result.items
    });
  };

  onFeedError = error => {
    this.setState({
      errorMessage: error.toString(),
      isLoaded: true,
      items: []
    });
  };

  componentDidMount() {
    SidebarStore.on("change", this.onSidebarToggle);
    const feedRepo = new FeedRepository();
    feedRepo.getList(
      res => this.onFeedLoaded(res),
      error => this.onFeedError(error)
    );
  }

  componentWillUnmount() {
    SidebarStore.removeListener("change", this.onSidebarToggle);
  }

  render() {
    const { classes } = this.props;
    const { errorMessage, isLoaded, items, isSidebarOpen } = this.state;
    console.log({ errorMessage });
    if (errorMessage) {
      return (
        <Paper
          className={classNames(classes.root, {
            [classes.drawerOpen]: isSidebarOpen,
            [classes.drawerClose]: !isSidebarOpen
          })}
        >
          <Typography variant="subheading" className={classes.paperInfo}>
            Can not load feed. {errorMessage}.
          </Typography>
        </Paper>
      );
    } else if (!isLoaded) {
      return (
        <Paper
          className={classNames(classes.root, {
            [classes.drawerOpen]: isSidebarOpen,
            [classes.drawerClose]: !isSidebarOpen
          })}
        >
          <Typography variant="subheading" className={classes.paperInfo}>
            Loading...
          </Typography>
        </Paper>
      );
    } else {
      return (
        <Paper
          className={classNames(classes.root, {
            [classes.drawerOpen]: isSidebarOpen,
            [classes.drawerClose]: !isSidebarOpen
          })}
        >
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Network</TableCell>
                <TableCell>Post</TableCell>
                <TableCell>Link</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Preview Link</TableCell>
                <TableCell>Share</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.network}
                  </TableCell>
                  <TableCell>
                    <div className={classes.postCell}>{row.post}</div>
                  </TableCell>
                  <TableCell>{row.link}</TableCell>
                  <TableCell>
                    <img
                      src={row.image ? row.image : DefaultImage}
                      alt="image"
                    />
                  </TableCell>
                  <TableCell>Preview</TableCell>
                  <TableCell>Share</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
  }
}

export default withStyles(styles)(FeedTable);
