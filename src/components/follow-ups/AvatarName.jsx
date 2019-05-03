import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import BlueForm from "./BlueForm";
import Divider from "@material-ui/core/Divider";

const styles = theme =>
  createStyles({
    grid: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center"
    },

    main: {},

    avatar: {
      margin: 10,
      marginTop: 30,
      marginBottom: 15
    },

    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60
    },

    text: {
      marginTop: 20,
      marginLeft: 10
    }
  });

class AvatarName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCommentOpen: false
    };
  }

  commentActionClick = id => {
    this.setState({
      isCommentOpen: true
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.main}>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.grid}
          >
            <Avatar className={classes.avatar} />
            <Typography variant="subtitle1" className={classes.text}>
              Anna Gallo
            </Typography>
          </Grid>
        </div>
        <BlueForm />
        <Divider />
      </div>
    );
  }
}

AvatarName.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AvatarName);
