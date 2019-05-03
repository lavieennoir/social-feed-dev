import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Menu, MenuItem } from "@material-ui/core";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextFormatIcon from "@material-ui/icons/TextFormat";
import ReplayIcon from "@material-ui/icons/Replay";
import DateFormatter from "./DateFormatter";
import ToggleQuestionStore from '../../stores/ToggleQuestionStore'

const ExpansionPanel = withStyles(theme => ({
  root: {
    marginTop: theme.spacing.unit,
    border: "1px solid #E0E0E0",
    boxShadow: "none",
    "&:before": {
      display: "none"
    }
  }
}))(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles(theme => ({
  root: {
    borderBottom: "1px solid #E0E0E0",
    marginBottom: -1,
    padding: `0 ${theme.spacing.unit * 1.5}px`,
    minHeight: theme.spacing.unit * 6,
    "&$expanded": {
      minHeight: theme.spacing.unit * 6
    }
  },
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > :last-child": {
      paddingRight: 0
    },
    "&$expanded": {
      margin: "8px 0"
    }
  },
  expanded: {}
}))(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#6E6E6E",
    backgroundColor: "#F7F7F7",
    padding: `${theme.spacing.unit * 0.5}px ${theme.spacing.unit * 1.5}px`
  }
}))(MuiExpansionPanelDetails);

const styles = theme =>
  createStyles({
    spacer: {
      flexGrow: 1
    },
    inlineButton: {
      padding: 0
    },
    title: {
      paddingLeft: theme.spacing.unit * 3
    },
    detailsText: {
      fontSize: 12,
      color: "#6E6E6E",
      marginRight: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit * 0.5
    },
    secondaryInfo: {
      color: "#979797"
    }
  });

class QuestionDetail extends Component {
  dateFormatter = new DateFormatter();

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      anchorMore: null
    };
  }

  handleMoreClick = event => {
    this.setState({ anchorMore: event.currentTarget });
    event.stopPropagation();
  };

  handleMoreClose = event => {
    this.setState({ anchorMore: null });
    event.stopPropagation();
  };

  handleChange = (event, expanded) => {
    this.setState({
      isExpanded: expanded
    });
  };

  componentDidMount() {
    ToggleQuestionStore.on("change", this.ToggleQuestion);
  }

  componentWillUnmount() {
    ToggleQuestionStore.removeListener("change", this.ToggleQuestion);
  }
  
  ToggleQuestion = () => {

    if (this.props.section === "Name") {
      this.setState({
        isExpanded: !ToggleQuestionStore.getState().isNameHidden
      }) 
    } else {
      this.setState({
        isExpanded: !ToggleQuestionStore.getState().isSubNameHidden
      })
    }
  }

  render() {
    const {
      title,
      classes,
      isText,
      isWeeklyQuestion,
      isOptional,
      createdAt
    } = this.props;
    const { isExpanded, anchorMore } = this.state;
    const isMoreOpen = anchorMore ? true : false;
    return (
      <ExpansionPanel square expanded={isExpanded} onChange={this.handleChange}>
        <ExpansionPanelSummary>
          <IconButton className={classes.inlineButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            {title}{" "}
            <span className={classes.secondaryInfo}>
              {createdAt ? this.dateFormatter.format(createdAt) : ""}
            </span>
          </Typography>
          <div className={classes.spacer} />
          <IconButton
            className={classes.inlineButton}
            aria-label="more"
            onClick={this.handleMoreClick}
            aria-owns={isMoreOpen ? "more-menu" : undefined}
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="more-menu"
            anchorEl={anchorMore}
            open={isMoreOpen}
            onClose={this.handleMoreClose}
          >
            <MenuItem key="edit-action" onClick={this.handleMoreClose}>
              Edit
            </MenuItem>
            <MenuItem key="deactivate-action" onClick={this.handleMoreClose}>
              Deactivate
            </MenuItem>
            <MenuItem key="delete-action" onClick={this.handleMoreClose}>
              Delete
            </MenuItem>
          </Menu>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <span />
          {isText && (
            <React.Fragment>
              <TextFormatIcon fontSize="small" />
              <Typography className={classes.detailsText}>Text</Typography>
            </React.Fragment>
          )}
          {isWeeklyQuestion && (
            <React.Fragment>
              <ReplayIcon fontSize="small" />
              <Typography className={classes.detailsText}>
                Weekly Question
              </Typography>
            </React.Fragment>
          )}
          {isOptional && (
            <Typography className={classes.detailsText}>Optional</Typography>
          )}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
export default withStyles(styles)(QuestionDetail);
