import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import LeaderboardRepository from "../../repositories/LeaderboardRepository";
import SidebarStore from "../../stores/SidebarStore";
import classNames from "classnames";
import LeaderTableHead from "./LeaderTableHead";
import LeaderTableToolbar from "./LeaderTableToolbar";
import DefaultImage from "../../assets/AvatarPlaceholder.svg";
import {
  Typography,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from "@material-ui/core";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  drawerOpen: {
    marginLeft: theme.sideBarWidth + theme.spacing.unit * 3,
    transition: theme.transitions.create(["width", "margin-left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    marginLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create(["width", "margin-left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  table: {
    minWidth: theme.tableMinWidth
  },
  tableWrapper: {
    overflowX: "auto",
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit
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
  },
  shareButton: {
    padding: theme.spacing.unit
  },
  shareIcon: {
    marginRight: theme.spacing.unit * 3
  },
  avatar: {
    height: theme.spacing.unit * 10
  },
  tableCell: {
    padding: theme.spacing.unit,
    verticalAlign: "top"
  }
});

class LeaderTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      errorMessage: "",
      isSidebarOpen: SidebarStore.getState().isOpen,
      items: [],
      page: 0,
      rowsPerPage: 5,
      order: "asc",
      orderBy: null
    };

    this.onDataLoaded = this.onDataLoaded.bind(this);
    this.onDataError = this.onDataError.bind(this);
  }

  onSidebarToggle = () => {
    this.setState({ isSidebarOpen: SidebarStore.getState().isOpen });
  };

  onDataLoaded = result => {
    this.setState({
      errorMessage: "",
      isLoaded: true,
      items: result.items
    });
  };

  onDataError = error => {
    this.setState({
      errorMessage: error.toString(),
      isLoaded: true,
      items: []
    });
  };

  handleActionClick = event => {
    this.setState({ anchorAction: event.currentTarget });
  };

  handleActionClose = () => {
    this.setState({ anchorAction: null });
  };

  handleShareClick = event => {
    this.setState({ anchorShare: event.currentTarget });
  };

  handleShareClose = () => {
    this.setState({ anchorShare: null });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  }

  componentDidMount() {
    SidebarStore.on("change", this.onSidebarToggle);
    const leaderRepo = new LeaderboardRepository();
    leaderRepo.getList(
      res => this.onDataLoaded(res),
      error => this.onDataError(error)
    );
  }

  componentWillUnmount() {
    SidebarStore.removeListener("change", this.onSidebarToggle);
  }

  render() {
    const { classes } = this.props;
    const {
      errorMessage,
      isLoaded,
      items,
      isSidebarOpen,
      page,
      rowsPerPage,
      order,
      orderBy
    } = this.state;

    if (errorMessage) {
      return (
        <Paper
          className={classNames(classes.root, {
            [classes.drawerOpen]: isSidebarOpen,
            [classes.drawerClose]: !isSidebarOpen
          })}
        >
          <Typography variant="subheading" className={classes.paperInfo}>
            Can not load leaderboard. {errorMessage}.
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
          <LeaderTableToolbar />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <LeaderTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={items.length}
              />
              <TableBody>
                {this.stableSort(items, this.getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(row => (
                    <TableRow key={row.id}>
                      <TableCell className={classes.tableCell}>
                        <img
                          className={classes.avatar}
                          sizes="small"
                          src={row.image ? row.image : DefaultImage}
                          alt="avatar"
                        />
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.name}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.departament}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.location}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.post}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {row.points}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      );
    }
  }
}

export default withStyles(styles)(LeaderTable);
