import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { ButtonBase, Typography } from "@material-ui/core";
import FacebookIcon from "../../assets/facebook.svg";
import TwitterIcon from "../../assets/twitter.svg";
import LinkedinIcon from "../../assets/linkedin.svg";
import InstagramIcon from "../../assets/instagram.svg";
import FacebookAuthProvider from "../../data/authProviders/FacebookAuthProvider";
import LinkedinAuthProvider from "../../data/authProviders/LinkedinAuthProvider";
import SocialMediaStore from "../../stores/SocialMediaStore";
import SocialMediaActions, {
  SocialMediaNetworkTypes
} from "../../actions/SocialMediaActions";

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
    },
    connected: {
      color: "#23AB2F",
      borderColor: "#23AB2F"
    }
  });

class SocialMedaiAccounts extends Component {
  constructor(props) {
    super(props);

    this.facebookAuth = new FacebookAuthProvider();
    this.linkedinAuth = new LinkedinAuthProvider();
    this.state = {
      facebookConnected: SocialMediaStore.getState().facebookConnected,
      twitterConnected: SocialMediaStore.getState().twitterConnected,
      linkedinConnected: SocialMediaStore.getState().linkedinConnected,
      instagramConnecetd: SocialMediaStore.getState().instagramConnected
    };
  }

  OnFacebookClick = () => {
    if (!this.state.facebookConnected) {
      this.facebookAuth.login();
    } else {
      this.facebookAuth.logout();
    }
  };
  OnLinkedinClick = () => {
    const { linkedinConnected } = SocialMediaStore.getState();
    if (linkedinConnected) {
      SocialMediaActions.disconect(SocialMediaNetworkTypes.LINKEDIN);
    } else {
      window.location.href = this.linkedinAuth.getAuthLink();
    }
  };

  componentDidMount() {
    this.facebookAuth.getLoginStatus(status =>
      this.setState({ facebookConnected: status === "connected" })
    );
    SocialMediaStore.on("change", this.onSocialMediaConnectionChange);
  }

  componentWillUnmount() {
    SocialMediaStore.removeListener(
      "change",
      this.onSocialMediaConnectionChange
    );
  }

  onSocialMediaConnectionChange = () => {
    const {
      facebookConnected,
      twitterConnected,
      linkedinConnected,
      instagramConnected
    } = SocialMediaStore.getState();
    this.setState({
      facebookConnected,
      twitterConnected,
      linkedinConnected,
      instagramConnected
    });
  };

  render() {
    const { classes } = this.props;
    const {
      facebookConnected,
      twitterConnected,
      linkedinConnected,
      instagramConnecetd
    } = this.state;
    return (
      <React.Fragment>
        <ButtonBase
          className={classNames(classes.accountCard, {
            [classes.connected]: facebookConnected
          })}
          onClick={this.OnFacebookClick}
        >
          <img src={FacebookIcon} alt="facebook" />
          <Typography className={classes.facebookText}>Facebook</Typography>
          <Typography className={classes.connectButton}>
            {facebookConnected ? "CONNECTED" : "CONNECT"}
          </Typography>
        </ButtonBase>
        <ButtonBase
          className={classNames(classes.accountCard, {
            [classes.connected]: twitterConnected
          })}
        >
          <img src={TwitterIcon} alt="twitter" />
          <Typography className={classes.twitterText}>Twitter</Typography>
          <Typography className={classes.connectButton}>
            {twitterConnected ? "CONNECTED" : "CONNECT"}
          </Typography>
        </ButtonBase>
        <ButtonBase
          className={classNames(classes.accountCard, {
            [classes.connected]: linkedinConnected
          })}
          onClick={this.OnLinkedinClick}
        >
          <img src={LinkedinIcon} alt="linkedin" />
          <Typography className={classes.linkedinText}>Linkedin</Typography>
          <Typography className={classes.connectButton}>
            {linkedinConnected ? "CONNECTED" : "CONNECT"}
          </Typography>
        </ButtonBase>
        <ButtonBase
          className={classNames(classes.accountCard, {
            [classes.connected]: instagramConnecetd
          })}
        >
          <img src={InstagramIcon} alt="instagram" />
          <Typography className={classes.instagramText}>Instagram</Typography>
          <Typography className={classes.connectButton}>
            {instagramConnecetd ? "CONNECTED" : "CONNECT"}
          </Typography>
        </ButtonBase>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(SocialMedaiAccounts);
