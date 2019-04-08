import React, { Component } from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { ButtonBase, Typography } from "@material-ui/core";
import FacebookIcon from "../../assets/facebook.svg";
import TwitterIcon from "../../assets/twitter.svg";
import LinkedinIcon from "../../assets/linkedin.svg";
import InstagramIcon from "../../assets/instagram.svg";

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
    facebookText: {
      color: "#4463B1",
      marginLeft: theme.spacing.unit * 2
    },
    twitterText: {
      color: "#56ACEE",
      marginLeft: theme.spacing.unit * 2
    },
    linkedinText: {
      color: "#067EB8",
      marginLeft: theme.spacing.unit * 2
    },
    instagramText: {
      color: "#DE307F",
      marginLeft: theme.spacing.unit * 2
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
          <img src={FacebookIcon} alt="facebook" />
          <Typography className={classes.facebookText}>Facebook</Typography>
          <Typography className={classes.connectButton}>CONNECT</Typography>
        </ButtonBase>
        <ButtonBase className={classes.accountCard}>
          <img src={TwitterIcon} alt="twitter" />
          <Typography className={classes.twitterText}>Twitter</Typography>
          <Typography className={classes.connectButton}>CONNECT</Typography>
        </ButtonBase>
        <ButtonBase className={classes.accountCard}>
          <img src={LinkedinIcon} alt="linkedin" />
          <Typography className={classes.linkedinText}>Linkedin</Typography>
          <Typography className={classes.connectButton}>CONNECT</Typography>
        </ButtonBase>
        <ButtonBase className={classes.accountCard}>
          <img src={InstagramIcon} alt="instagram" />
          <Typography className={classes.instagramText}>Instagram</Typography>
          <Typography className={classes.connectButton}>CONNECT</Typography>
        </ButtonBase>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(SocialMedaiAccounts);
