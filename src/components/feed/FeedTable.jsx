import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FeedRepository from "../../repositories/FeedRepository";
import SidebarStore from "../../stores/SidebarStore";
import { SocialMediaNetworkTypes } from "../../actions/SocialMediaActions";
import SocialMediaStore from "../../stores/SocialMediaStore";
import FacebookAuthProvider from "../../data/authProviders/FacebookAuthProvider";
import LinkedinAuthProvider from "../../data/authProviders/LinkedinAuthProvider";
import classNames from "classnames";
import FeedTableHead from "./FeedTableHead";
import FeedTableToolbar from "./FeedTableToolbar";
import DefaultImage from "../../assets/Overlay.svg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import FacebookGrayIcon from "../../assets/FacebookGray.svg";
import InstagramGrayIcon from "../../assets/InstagramGray.svg";
import LinkedinGrayIcon from "../../assets/LinkedinGray.svg";
import TwitterGrayIcon from "../../assets/TwitterGray.svg";
import {
  Typography,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Link,
  IconButton,
  Menu,
  MenuItem,
  ButtonBase
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
  }
});

class FeedTable extends Component {
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
    const {
      errorMessage,
      isLoaded,
      items,
      isSidebarOpen,
      anchorAction,
      anchorShare,
      page,
      rowsPerPage,
      order,
      orderBy
    } = this.state;
    const isActionOpen = anchorAction ? true : false;
    const isShareOpen = anchorShare ? true : false;

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
          <FeedTableToolbar />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <FeedTableHead
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
                      <TableCell component="th" scope="row">
                        {row.network}
                      </TableCell>
                      <TableCell>
                        <div className={classes.postCell}>{row.post}</div>
                      </TableCell>
                      <TableCell>
                        <Link href={row.link} target="_blank">
                          {row.link}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <img
                          src={row.image ? row.image : DefaultImage}
                          alt="feed"
                        />
                      </TableCell>
                      <TableCell>
                        <Link href={row.link} target="_blank">
                          Preview
                        </Link>
                      </TableCell>
                      <TableCell>
                        <ButtonBase
                          className={classes.shareButton}
                          aria-owns={isShareOpen ? "share-menu" : undefined}
                          aria-haspopup="true"
                          onClick={this.handleShareClick}
                        >
                          Share
                          {isShareOpen ? <ArrowDropUp /> : <ArrowDropDown />}
                        </ButtonBase>
                        <Menu
                          id="share-menu"
                          anchorEl={anchorShare}
                          open={isShareOpen}
                          onClose={this.handleShareClose(null, null)}
                          getContentAnchorEl={null}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left"
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                          }}
                        >
                          <MenuItem
                            key="share-facebook"
                            onClick={this.handleShareClose(
                              SocialMediaNetworkTypes.FACEBOOK,
                              row.link
                            )}
                          >
                            <img
                              src={FacebookGrayIcon}
                              alt="facebook icon"
                              className={classes.shareIcon}
                            />
                            Facebook
                          </MenuItem>
                          <MenuItem
                            key="share-twitter"
                            onClick={this.handleShareClose(
                              SocialMediaNetworkTypes.TWITTER,
                              row.link
                            )}
                          >
                            <img
                              src={TwitterGrayIcon}
                              alt="twitter icon"
                              className={classes.shareIcon}
                            />
                            Twitter
                          </MenuItem>
                          <MenuItem
                            key="share-linkedin"
                            onClick={this.handleShareClose(
                              SocialMediaNetworkTypes.LINKEDIN,
                              row.link
                            )}
                          >
                            <img
                              src={LinkedinGrayIcon}
                              alt="linkedin icon"
                              className={classes.shareIcon}
                            />
                            LinkedIn
                          </MenuItem>
                          <MenuItem
                            key="share-instagram"
                            onClick={this.handleShareClose(
                              SocialMediaNetworkTypes.INSTAGRAM,
                              row.link
                            )}
                          >
                            <img
                              src={InstagramGrayIcon}
                              alt="instagram icon"
                              className={classes.shareIcon}
                            />
                            Instagram
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="More"
                          aria-owns={isActionOpen ? "action-menu" : undefined}
                          aria-haspopup="true"
                          onClick={this.handleActionClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="action-menu"
                          anchorEl={anchorAction}
                          open={isActionOpen}
                          onClose={this.handleActionClose}
                        >
                          <MenuItem
                            key="action1"
                            onClick={this.handleActionClose}
                          >
                            Action 1
                          </MenuItem>
                          <MenuItem
                            key="action2"
                            onClick={this.handleActionClose}
                          >
                            Action 2
                          </MenuItem>
                          <MenuItem
                            key="action3"
                            onClick={this.handleActionClose}
                          >
                            Action 3
                          </MenuItem>
                        </Menu>
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

export default withStyles(styles)(FeedTable);
