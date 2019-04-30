import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FeedRepository from "../../repositories/FeedRepository";
import SidebarStore from "../../stores/SidebarStore";
import { SocialMediaNetworkTypes } from "../../actions/SocialMediaActions";
import SocialMediaStore from "../../stores/SocialMediaStore";
import FacebookAuthProvider from "../../data/authProviders/FacebookAuthProvider";
import LinkedinAuthProvider from "../../data/authProviders/LinkedinAuthProvider";
import CheckInsTableHead from "./CheckInsTableHead";
import CheckInsTableBody from "./CheckInsTableBody";
import { Typography, Table } from "@material-ui/core";

const rowsHead = [
  { id: 0, label: "Name" },
  { id: 1, label: "Due Date" },
  { id: 2, label: "Submit Date" }
];

const rowsBody = [
  {
    id: 0,
    name: { name: "Anna Gallo", subtext: "UX designer" },
    childs: [
      {
        id: 1,
        name: { name: "Anna NoGallo", subtext: "" },
        dueDate: "April 4",
        submitDate: "April 3"
      },
      {
        id: 1,
        name: { name: "Anna NoGallo", subtext: "" },
        dueDate: "April 4",
        submitDate: "April 3"
      }
    ],
    dueDate: "April 4",
    submitDate: "April 3"
  },
  {
    id: 1,
    name: { name: "Anna NoGallo", subtext: "" },
    childs: [
      {
        id: 1,
        name: { name: "Anna NoGallo", subtext: "" },
        dueDate: "April 4",
        submitDate: "April 3"
      },
      {
        id: 1,
        name: { name: "Anna NoGallo", subtext: "" },
        dueDate: "April 4",
        submitDate: "April 3"
      }
    ],
    dueDate: "April 4",
    submitDate: "April 3"
  },
  {
    id: 2,
    name: { name: "Anna GalloNo", subtext: "" },
    childs: [],
    dueDate: "April 4",
    submitDate: "April 3"
  }
];

const styles = theme => ({
  root: {
    margin: 0,
    overflowX: "auto"
  },
  drawerOpen: {
    marginLeft: 0,
    transition: theme.transitions.create(["width", "margin-left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    marginLeft: 0,
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
    paddingLeft: 0,
    paddingRight: 0
  },
  paperInfo: {
    textAlign: "center",
    paddingTop: 0,
    paddingBottom: 0
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
    marginRight: 0
  }
});

class CurrentCheckInsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      errorMessage: "",
      isSidebarOpen: SidebarStore.getState().isOpen,
      items: [],
      anchorAction: null,
      anchorShare: null,
      page: 0,
      rowsPerPage: 5,
      order: "asc",
      orderBy: null
    };

    this.facebookAuth = new FacebookAuthProvider();
    this.linkedinAuth = new LinkedinAuthProvider();

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

  handleActionClick = event => {
    this.setState({ anchorAction: event.currentTarget });
  };

  handleActionClose = () => {
    this.setState({ anchorAction: null });
  };

  handleShareClick = event => {
    this.setState({ anchorShare: event.currentTarget });
  };

  handleShareClose = (socialNetwork, link) => () => {
    switch (socialNetwork) {
      case SocialMediaNetworkTypes.FACEBOOK:
        const { facebookConnected } = SocialMediaStore.getState();
        if (!facebookConnected) {
          this.facebookAuth.login(() => {
            this.facebookAuth.share(link);
          });
        } else {
          this.facebookAuth.share(link);
        }
        break;
      case SocialMediaNetworkTypes.TWITTER:
        break;
      case SocialMediaNetworkTypes.LINKEDIN:
        const { linkedinConnected } = SocialMediaStore.getState();
        if (!linkedinConnected) {
          this.linkedinAuth.login(() => {
            this.linkedinAuth.share(link);
          });
        } else {
          this.linkedinAuth.share(link);
        }
        break;
      case SocialMediaNetworkTypes.INSTAGRAM:
        break;
      default:
    }
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
    const { errorMessage, isLoaded, items, order, orderBy } = this.state;

    if (errorMessage) {
      return (
        <Typography variant="subheading" className={classes.paperInfo}>
          Can not load feed. {errorMessage}.
        </Typography>
      );
    } else if (!isLoaded) {
      return (
        <Typography variant="subheading" className={classes.paperInfo}>
          Loading...
        </Typography>
      );
    } else {
      return (
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <CheckInsTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={items.length}
              rows={rowsHead}
            />
            <CheckInsTableBody rows={rowsBody} />
          </Table>
        </div>
      );
    }
  }
}

export default withStyles(styles)(CurrentCheckInsTab);
