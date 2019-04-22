import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import IconButton from "@material-ui/core/IconButton";

const styles = theme =>
  createStyles({
    container: {
      border: "1px solid #E0E0E0",
      borderRadius: "3px",
      padding: theme.spacing.unit * 3,
      backgroundColor: "#F7F7F7",
      "& > :first-child": {
        marginTop: theme.spacing.unit
      }
    },
    arrow: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing.unit * 3,
      width: "100%",
      textAlign: "center",
      marginBottom: -theme.spacing.unit * 3
    },
    buttonBGWrapper: {
      height: theme.spacing.unit * 3 + 1,
      width: theme.spacing.unit * 6 + 2,
      overflow: "hidden",
      position: "absolute"
    },
    buttonBG: {
      backgroundColor: "#F7F7F7",
      border: "1px solid #E0E0E0",
      height: theme.spacing.unit * 6,
      width: theme.spacing.unit * 6,
      position: "absolute",
      borderRadius: "50%",
      content: '""'
    }
  });

class ArrowWrapper extends Component {
  render() {
    const { classes, children } = this.props;
    return (
      <React.Fragment>
        <div className={classes.arrow}>
          <div className={classes.buttonBGWrapper}>
            <div className={classes.buttonBG} />
          </div>
          <IconButton>
            <ArrowUpIcon />
          </IconButton>
        </div>
        <div className={classes.container}>{children}</div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(ArrowWrapper);
