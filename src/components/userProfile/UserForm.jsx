import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Paper,
  FormControl,
  FormHelperText,
  Fab
} from "@material-ui/core";
import SidebarStore from "../../stores/SidebarStore";
import SocialMedaiAccounts from "../inputs/SocialMediaAccounts";
import EmailAccounts from "../inputs/EmailAccounts";
import AvatarPlaceholder from "../../assets/AvatarPlaceholder.svg";
import EditIcon from "@material-ui/icons/EditOutlined";

const styles = theme =>
  createStyles({
    hidden: {
      display: "none"
    },
    formLabel: {
      fontSize: theme.typography.fontSize * 0.8
    },
    formHead: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight: theme.spacing.unit * 3
    },
    form: {
      maxWidth: 1100,
      margin: "auto",
      padding: theme.spacing.unit * 2,
      paddingTop: theme.spacing.unit * 5
    },
    formCol: {
      [theme.breakpoints.up("sm")]: {
        paddingTop: 0,
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3
      }
    },
    formWrapper: {
      marginTop: theme.spacing.unit * 5
    },
    formInput: {
      marginTop: theme.spacing.unit * 2
    },
    drawerOpen: {
      width: `calc(100% - ${theme.sideBarWidth}px)`,
      marginLeft: theme.sideBarWidth,
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      width: `calc(100% - ${theme.spacing.unit * 7}px)`,
      marginLeft: theme.spacing.unit * 7,
      transition: theme.transitions.create(["width", "margin-left"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    avatarWrapper: {
      paddingBottom: theme.spacing.unit * 4.5,
      overflow: "hidden"
    },
    avatar: {
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
      width: 180,
      height: 180
    },
    avatarEditWrapper: {
      position: "relative",
      left: "calc(50% + 45px)",
      bottom: 45
    },
    avatarEdit: {
      position: "absolute"
    }
  });

class UserFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      currentPass: "",
      newPass: "",
      newPassConfirmation: "",
      Avatar: null,
      hasError: [],
      isSidebarOpen: SidebarStore.getState().isOpen
    };
  }

  onSidebarToggle = () => {
    this.setState({ isSidebarOpen: SidebarStore.getState().isOpen });
  };
  componentDidMount() {
    SidebarStore.on("change", this.onSidebarToggle);
  }

  componentWillUnmount() {
    SidebarStore.removeListener("change", this.onSidebarToggle);
  }

  validate = (value, field) => {
    return value ? true : false;
  };

  toogleLiveMode = () => {
    this.setState(state => ({
      isLiveModeEnabled: !state.isLiveModeEnabled
    }));
  };
  handleChange = name => event => {
    const newValue = event.target.value;
    const { hasError } = this.state;
    const hasErrorIdx = hasError.indexOf(name);
    const isValid = this.validate(newValue, name);

    if (isValid && hasErrorIdx !== -1) {
      hasError.splice(hasErrorIdx, 1);
    } else if (!isValid && hasErrorIdx === -1) {
      hasError.push(name);
    }
    this.setState({
      [name]: event.target.value,
      hasError: hasError
    });
  };

  OnFileDrop = files => {
    if (files.length > 0) {
      const file = files[files.length - 1];
      if (file.size * 1024 <= this.state.maxFileSizeKb) {
        this.setState({ file });
      }
    }
  };

  OnAvatarLoad = files => {
    if (files.length > 0) {
      const avatar = files[files.length - 1];
      this.setState({ avatar });
    }
  };

  hasError = field => {
    return this.state.hasError.indexOf(field) !== -1;
  };

  isValid = () => {
    const { name, calories, fat, carbs, protein } = this.state;
    const allFieldsInitialized =
      [name, calories, fat, carbs, protein].indexOf(null) === -1;
    return allFieldsInitialized && this.state.hasError.length === 0;
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classNames(classes.formWrapper, {
          [classes.drawerOpen]: this.state.isSidebarOpen,
          [classes.drawerClose]: !this.state.isSidebarOpen
        })}
      >
        <Paper className={classes.form}>
          <form>
            <Grid container spacing={32}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    error={this.hasError("name")}
                    id="name"
                    label="Full name"
                    type="text"
                    value={this.state.name !== null ? this.state.name : ""}
                    onChange={this.handleChange("name")}
                    inputProps={{ maxLength: 150 }}
                  />
                  <FormHelperText
                    hidden={!this.hasError("name")}
                    error={this.hasError("namr")}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    required
                    error={this.hasError("email")}
                    id="email"
                    label="Email"
                    type="email"
                    value={this.state.email !== null ? this.state.email : ""}
                    onChange={this.handleChange("email")}
                    fullWidth
                    className={classes.formInput}
                    inputProps={{ maxLength: 150 }}
                  />
                  <FormHelperText
                    hidden={!this.hasError("email")}
                    error={this.hasError("email")}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    autoComplete="current-pass"
                    error={this.hasError("currentPass")}
                    id="currentPass"
                    label="Current Password"
                    type="password"
                    value={
                      this.state.currentPass !== null
                        ? this.state.currentPass
                        : ""
                    }
                    onChange={this.handleChange("currentPass")}
                    fullWidth
                    className={classes.formInput}
                    inputProps={{ maxLength: 150 }}
                  />
                  <FormHelperText
                    hidden={!this.hasError("currentPass")}
                    error={this.hasError("currentPass")}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    autoComplete="new-pass"
                    error={this.hasError("newPass")}
                    id="newPass"
                    label="New Password"
                    type="password"
                    value={
                      this.state.newPass !== null ? this.state.currentPass : ""
                    }
                    onChange={this.handleChange("newPass")}
                    fullWidth
                    className={classes.formInput}
                    inputProps={{ maxLength: 150 }}
                  />
                  <FormHelperText
                    hidden={!this.hasError("newPass")}
                    error={this.hasError("newPass")}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    autoComplete="new-pass-confirm"
                    error={this.hasError("newPassConfirmation")}
                    id="newPassConfirmation"
                    label="Current Password Confirmation"
                    type="password"
                    value={
                      this.state.newPassConfirmation !== null
                        ? this.state.newPassConfirmation
                        : ""
                    }
                    onChange={this.handleChange("newPassConfirmation")}
                    fullWidth
                    className={classes.formInput}
                    inputProps={{ maxLength: 150 }}
                  />
                  <FormHelperText
                    hidden={!this.hasError("newPassConfirmation")}
                    error={this.hasError("newPassConfirmation")}
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formWrapper}>
                  <FormHelperText>Email Account Integration</FormHelperText>
                  <EmailAccounts />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.formCol}>
                <div className={classes.avatarWrapper}>
                  <img
                    src={AvatarPlaceholder}
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-image"
                    hidden
                    onChange={e => this.OnAvatarLoad(e.target.files)}
                  />
                  <div className={classes.avatarEditWrapper}>
                    <Fab
                      size="small"
                      color="primary"
                      aria-label="Edit"
                      className={classes.avatarEdit}
                      onClick={e =>
                        document.querySelector("#avatar-image").click()
                      }
                    >
                      <EditIcon />
                    </Fab>
                  </div>
                </div>
                <FormControl fullWidth className={classes.formInput}>
                  <FormHelperText>
                    Connect your company social media accounts
                  </FormHelperText>
                  <SocialMedaiAccounts />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(UserFrom);
