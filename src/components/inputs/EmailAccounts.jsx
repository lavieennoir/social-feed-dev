import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { ButtonBase, Typography } from "@material-ui/core";
import GoogleIcon from "../../assets/Google.svg";
import ExchangeIcon from "../../assets/Exchange.svg";

const styles = theme =>
  createStyles({
    accountCard: {
      display: "flex",
      alignItems: "center",
      border: "1px solid lightgray",
      padding: theme.spacing.unit,
      marginTop: theme.spacing.unit,
      "&:hover, &:focus": {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main
      }
    },
    connectButton: {
      marginLeft: "auto",
      color: "inherit"
    }
  });

class SocialMedaiAccounts extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ButtonBase className={classes.accountCard}>
          <img src={GoogleIcon} alt="google" />
          <Typography className={classes.connectButton}>CONNECT</Typography>
        </ButtonBase>
        <ButtonBase className={classes.accountCard}>
          <img src={ExchangeIcon} alt="exchange" />
          <Typography className={classes.connectButton}>CONNECT</Typography>
        </ButtonBase>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(SocialMedaiAccounts);
