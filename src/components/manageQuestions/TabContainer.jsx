import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles, createStyles } from "@material-ui/core/styles";

const styles = theme =>
  createStyles({
    container: {
      maxWidth: 1100,
      margin: "auto"
    },
    paper: {
      margin: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 3
    }
  });

class TabContainer extends Component {
  render() {
    return (
      <div className={this.props.classes.container}>
        <Paper className={this.props.classes.paper}>
          {this.props.children}
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(TabContainer);
