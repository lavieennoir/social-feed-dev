import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Link } from "@material-ui/core";
import QuestionDetail from "./QuestionDetail";
import ArrowedWrapper from "./ArrowedWrapper";
import RepeatIcon from "@material-ui/icons/Repeat";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import ToggleQuestionAction, { ToggleQuestionName } from '../../actions/ToggleQustionActions';

const styles = theme =>
  createStyles({
    paper: {
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    },

    spacer: {
      marginLeft: "auto"
    },
    header: {
      fontWeight: 600
    },
    subheader: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      flexWrap: "wrap",
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    secondaryInfo: {
      color: "#979797"
    },
    headerIcon: {
      color: "#6E6E6E"
    },
    topSpacing: {
      marginTop: theme.spacing.unit * 5
    }
  });

  

class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuestionDetailsVisbleCheckIn: true,
      isQuestionDetailsVisbleQueue: true
    };
  }

  handleLearnMore = () => {};

  ToogleQuestionDetailsCheckIn = () => {
    this.setState(state => ({
      isQuestionDetailsVisbleCheckIn: !state.isQuestionDetailsVisbleCheckIn
    }));
    if (this.state.isQuestionDetailsVisbleCheckIn) {
      ToggleQuestionAction.showName(); 
    } else{
      ToggleQuestionAction.hideName();
    }

  };

  ToogleQuestionDetailsQueue = () => {
    this.setState(state => ({
      isQuestionDetailsVisbleCheckIn: !state.isQuestionDetailsVisbleCheckIn
    }));
    if (this.state.isQuestionDetailsVisbleCheckIn) {
      ToggleQuestionAction.showSubName();

    } else{
      ToggleQuestionAction.hideSubName();
    }

  };

  render() {
    const { classes } = this.props;
    const {
      isQuestionDetailsVisbleCheckIn,
      isQuestionDetailsVisbleQueue
    } = this.state;
    return (
      <React.Fragment>
        <Typography variant="h6">In every Check-In</Typography>
        <div className={classes.subheader}>
          <Typography className={classes.secondaryInfo}>
            These questions are asked in every Chek-In
          </Typography>
          <Link
            href="javascript:;"
            onClick={this.ToogleQuestionDetailsCheckIn}
            className={classes.spacer}
          >
            {isQuestionDetailsVisbleCheckIn ? "Show" : "Hide"} all question
            details
          </Link>
        </div>
        <QuestionDetail
          title="What went well this week?"
          section="Name"
          isText
          isWeeklyQuestion
        />
        <QuestionDetail
          title="What's your biggest challange right now, and how can I help?"
          section="Name"
          isText
          isWeeklyQuestion
          isOptional
        />

        <Typography variant="h6" className={classes.topSpacing}>
          <span className={classes.subheader}>
            <span>Questions Queue</span>
            <IconButton
              className={classnames(classes.headerIcon, classes.spacer)}
            >
              <RepeatIcon />
            </IconButton>
            <IconButton className={classes.headerIcon}>
              <SettingsIcon />
            </IconButton>
            <IconButton className={classes.headerIcon}>
              <AddCircleIcon />
            </IconButton>
          </span>
        </Typography>
        <div className={classes.subheader}>
          <Typography className={classes.secondaryInfo}>
            The top question is automatically cycled into the current Check-In.{" "}
            <Link
              href="javascript:;"
              onClick={this.handleLearnMore}
              className={classes.spacer}
            >
              Learn more
            </Link>
          </Typography>
          <Link
            href="javascript:;"
            onClick={this.ToogleQuestionDetailsQueue}
            className={classes.spacer}
          >
            {isQuestionDetailsVisbleQueue ? "Show" : "Hide"} all question
            details
          </Link>
        </div>

        <QuestionDetail
          title="Is there a tool or service that wuold help in your role?"
          isText
          isWeeklyQuestion
          isOptional
          createdAt={new Date(2019, 3, 10)}
        />

        <ArrowedWrapper>
          <QuestionDetail
            title="Is there a tool or service that wuold help in your role?"
            isText
            isWeeklyQuestion
            isOptional
            createdAt={new Date(2019, 3, 11)}
          />
          <QuestionDetail
            title="Is there a tool or service that wuold help in your role?"
            isText
            isWeeklyQuestion
            isOptional
            createdAt={new Date(2019, 3, 10)}
          />
          <QuestionDetail
            title="Is there a tool or service that wuold help in your role?"
            isText
            isWeeklyQuestion
            isOptional
            createdAt={new Date(2019, 3, 10)}
          />
          <QuestionDetail
            title="Is there a tool or service that wuold help in your role?"
            isText
            isWeeklyQuestion
            isOptional
            createdAt={new Date(2019, 3, 10)}
          />
          <QuestionDetail
            title="Is there a tool or service that wuold help in your role?"
            isText
            isWeeklyQuestion
            isOptional
            createdAt={new Date(2019, 3, 10)}
          />
          <QuestionDetail
            title="Is there a tool or service that wuold help in your role?"
            isText
            isWeeklyQuestion
            isOptional
            createdAt={new Date(2019, 3, 10)}
          />
        </ArrowedWrapper>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(TabContainer);
