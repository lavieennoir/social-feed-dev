import React, { Component } from "react";
import classNames from "classnames";
import { withStyles, createStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Switch,
  Link,
  ButtonBase
} from "@material-ui/core";
import SidebarStore from "../../stores/SidebarStore";
import DragAndDropInput from "../inputs/DragDropInput";
import SocialMedaiAccounts from "../inputs/SocialMediaAccounts";
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
      padding: theme.spacing.unit * 2
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
    buttonFile: {
      width: "100%",
      marginTop: theme.spacing.unit
    }
  });

class CompanyFrom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      customerSubdomain: null,
      industry: "",
      timezone: "",
      dateformat: "",
      email: null,
      website: "",
      currency: "",
      image: null,
      address: null,
      state: null,
      phone: null,
      city: null,
      postcode: null,
      country: "",
      isLiveModeEnabled: false,
      hasError: [],
      file: null,
      maxFileSizeKb: 500,
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
      if (file.size <= this.state.maxFileSizeKb * 1024) {
        this.setState({ file });
      }
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
          <div className={classes.formHead}>
            <Typography> Live Mode</Typography>
            <Switch
              checked={this.state.isLiveModeEnabled}
              onChange={this.toogleLiveMode}
              value="isLiveModeEnabled"
              color="primary"
            />
          </div>
          <Grid container spacing={32}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("company")}
                  id="company"
                  label="Company name"
                  type="text"
                  value={this.state.company !== null ? this.state.company : ""}
                  onChange={this.handleChange("company")}
                  inputProps={{ maxLength: 150 }}
                />
                <FormHelperText
                  hidden={!this.hasError("company")}
                  error={this.hasError("company")}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("customerSubdomain")}
                  id="customerSubdomain"
                  label="Customer Posrtal Subdomain"
                  type="text"
                  value={
                    this.state.customerSubdomain !== null
                      ? this.state.customerSubdomain
                      : ""
                  }
                  onChange={this.handleChange("customerSubdomain")}
                  fullWidth
                  className={classes.formInput}
                  inputProps={{ maxLength: 50 }}
                />
                <FormHelperText
                  hidden={!this.hasError("customerSubdomain")}
                  error={this.hasError("customerSubdomain")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formInput}>
                <InputLabel htmlFor="industry">Industry</InputLabel>
                <Select
                  value={this.state.industry}
                  onChange={this.handleChange("industry")}
                  id="industry"
                >
                  <MenuItem value={0}>Automotive</MenuItem>
                  <MenuItem value={1}>Business Support &amp; Supplies</MenuItem>
                  <MenuItem value={2}>Computers &amp; Electronics</MenuItem>
                  <MenuItem value={3}>Construction &amp; Contractors</MenuItem>
                  <MenuItem value={4}>Education</MenuItem>
                  <MenuItem value={5}>Entertainment</MenuItem>
                  <MenuItem value={6}>Food &amp; Dining</MenuItem>
                  <MenuItem value={7}>Health &amp; Medicine</MenuItem>
                  <MenuItem value={8}>Home &amp; Garden</MenuItem>
                  <MenuItem value={9}>Legal &amp; Financial</MenuItem>
                  <MenuItem value={10}>
                    Manufacturing, Wholesale, Distribution
                  </MenuItem>
                  <MenuItem value={11}>Merchants (Retail)</MenuItem>
                  <MenuItem value={12}>Miscellaneous</MenuItem>
                  <MenuItem value={13}>Personal Care &amp; Services</MenuItem>
                  <MenuItem value={14}>Real Estate</MenuItem>
                  <MenuItem value={15}>Travel &amp; Transportation</MenuItem>
                  <MenuItem value={16}>Other</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth className={classes.formInput}>
                <InputLabel htmlFor="timezone">Time Zone</InputLabel>
                <Select
                  value={this.state.timezone}
                  onChange={this.handleChange("timezone")}
                  id="timezone"
                >
                  <MenuItem value={0}>(GMT-11:00) Niue</MenuItem>
                  <MenuItem value={1}>(GMT-10:00) Hawaii Time</MenuItem>
                  <MenuItem value={2}>(GMT-09:00) Alaska Time</MenuItem>
                  <MenuItem value={3}>(GMT-08:00) Pacific Time</MenuItem>
                  <MenuItem value={4}>(GMT-07:00) Dawson Creek</MenuItem>
                  <MenuItem value={5}>(GMT-06:00) Belize</MenuItem>
                  <MenuItem value={6}>(GMT-05:00) Bogota</MenuItem>
                  <MenuItem value={7}>(GMT-04:00) Barbados</MenuItem>
                  <MenuItem value={8}>(GMT-03:00) Campo Grande</MenuItem>
                  <MenuItem value={9}>(GMT-02:00) Sao Paulo</MenuItem>
                  <MenuItem value={10}>(GMT-01:00) Scoresbysund</MenuItem>
                  <MenuItem value={11}>(GMT+00:00) Abidjan</MenuItem>
                  <MenuItem value={12}>(GMT+01:00) Prague</MenuItem>
                  <MenuItem value={13}>(GMT+02:00) Cairo</MenuItem>
                  <MenuItem value={14}>(GMT+03:00) Khartoum</MenuItem>
                  <MenuItem value={15}>(GMT+04:00) Baku</MenuItem>
                  <MenuItem value={16}>(GMT+05:00) Mawson</MenuItem>
                  <MenuItem value={17}>(GMT+06:00) Vostok</MenuItem>
                  <MenuItem value={18}>(GMT+07:00) Davis</MenuItem>
                  <MenuItem value={19}>(GMT+08:00) Casey</MenuItem>
                  <MenuItem value={20}>(GMT+09:00) Jayapura</MenuItem>
                  <MenuItem value={21}>(GMT+10:00) Dumont D'Urville</MenuItem>
                  <MenuItem value={22}>(GMT+11:00) Hobart</MenuItem>
                  <MenuItem value={23}>(GMT+12:00) Funafuti</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth className={classes.formInput}>
                <InputLabel htmlFor="dateformat">Date Fromate</InputLabel>
                <Select
                  value={this.state.dateformat}
                  onChange={this.handleChange("dateformat")}
                  id="dateformat"
                >
                  <MenuItem value={0}>MM/DD/YY</MenuItem>
                  <MenuItem value={1}>MM/DD/YYYY</MenuItem>
                  <MenuItem value={2}>DD/MM/YY</MenuItem>
                  <MenuItem value={3}>DD/MM/YYYY</MenuItem>
                  <MenuItem value={4}>DD-MM-YYYY</MenuItem>
                  <MenuItem value={5}>MM-DD-YYYY</MenuItem>
                  <MenuItem value={6}>YYYY-MM-DD</MenuItem>
                  <MenuItem value={7}>YYYY-DD-MM</MenuItem>
                  <MenuItem value={8}>MM.DD.YYYY</MenuItem>
                  <MenuItem value={9}>DD.MM.YYYY</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("email")}
                  id="email"
                  label="Accounting Email"
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
                  error={this.hasError("website")}
                  id="website"
                  label="Website"
                  type="text"
                  value={this.state.website}
                  onChange={this.handleChange("website")}
                  fullWidth
                  className={classes.formInput}
                  inputProps={{ maxLength: 150 }}
                />
                <FormHelperText
                  hidden={!this.hasError("website")}
                  error={this.hasError("website")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formInput}>
                <InputLabel htmlFor="currency">Currency</InputLabel>
                <Select
                  value={this.state.currency}
                  onChange={this.handleChange("currency")}
                  id="currency"
                >
                  <MenuItem value={0}>USD - United States dollar</MenuItem>
                  <MenuItem value={1}>AED - UAE dirham</MenuItem>
                  <MenuItem value={2}>AFN - Afghan afghani</MenuItem>
                  <MenuItem value={3}>ALL - Albanian lek</MenuItem>
                  <MenuItem value={4}>AMD - Armenian dram</MenuItem>
                  <MenuItem value={5}>
                    ANG - Netherlands Antillean gulden
                  </MenuItem>
                  <MenuItem value={6}>AOA - Angolan kwanza</MenuItem>
                  <MenuItem value={7}>ARS - Argentine peso</MenuItem>
                  <MenuItem value={8}>AUD - Australian dollar</MenuItem>
                  <MenuItem value={9}>AWG - Aruban florin</MenuItem>
                  <MenuItem value={10}>AZN - Azerbaijani manat</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth className={classes.formInput}>
                <FormHelperText htmlFor="logo-file">
                  Company Image/Logo
                </FormHelperText>
                <input
                  onChange={e => this.OnFileDrop(e.target.files)}
                  accept="image/*"
                  className={classes.hidden}
                  id="logo-file"
                  type="file"
                />
                <label htmlFor="logo-file">
                  <ButtonBase component="span" className={classes.buttonFile}>
                    <DragAndDropInput handleDrop={this.OnFileDrop}>
                      Maximum file size: {this.state.maxFileSizeKb}Kb
                      <br />
                      Drag &amp; Drop Company image or
                      <Link> upload clicking here</Link>
                      {this.state.file ? <p>{this.state.file.name}</p> : ""}
                    </DragAndDropInput>
                  </ButtonBase>
                </label>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.formCol}>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("address")}
                  id="address"
                  label="Address Line"
                  type="text"
                  value={this.state.address !== null ? this.state.address : ""}
                  onChange={this.handleChange("address")}
                  fullWidth
                  inputProps={{ maxLength: 150 }}
                />
                <FormHelperText
                  hidden={!this.hasError("address")}
                  error={this.hasError("address")}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("state")}
                  id="state"
                  label="State"
                  type="text"
                  value={this.state.state !== null ? this.state.state : ""}
                  onChange={this.handleChange("state")}
                  fullWidth
                  className={classes.formInput}
                  inputProps={{ maxLength: 20 }}
                />
                <FormHelperText
                  hidden={!this.hasError("state")}
                  error={this.hasError("state")}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("phone")}
                  id="phone"
                  label="Phone Number"
                  type="text"
                  value={this.state.phone !== null ? this.state.phone : ""}
                  onChange={this.handleChange("phone")}
                  fullWidth
                  className={classes.formInput}
                  inputProps={{ maxLength: 20 }}
                />
                <FormHelperText
                  hidden={!this.hasError("phone")}
                  error={this.hasError("phone")}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("city")}
                  id="city"
                  label="City"
                  type="text"
                  value={this.state.city !== null ? this.state.city : ""}
                  onChange={this.handleChange("phone")}
                  fullWidth
                  className={classes.formInput}
                  inputProps={{ maxLength: 150 }}
                />
                <FormHelperText
                  hidden={!this.hasError("city")}
                  error={this.hasError("city")}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  error={this.hasError("postcode")}
                  id="postcode"
                  label="Postal Code"
                  type="text"
                  value={
                    this.state.postcode !== null ? this.state.postcode : ""
                  }
                  onChange={this.handleChange("postcode")}
                  fullWidth
                  className={classes.formInput}
                  inputProps={{ maxLength: 10 }}
                />
                <FormHelperText
                  hidden={!this.hasError("postcode")}
                  error={this.hasError("postcode")}
                />
              </FormControl>
              <FormControl fullWidth className={classes.formInput}>
                <InputLabel htmlFor="country">Country</InputLabel>
                <Select
                  value={this.state.country}
                  onChange={this.handleChange("country")}
                  id="country"
                >
                  <MenuItem value={0}>United States</MenuItem>
                  <MenuItem value={1}>Afghanistan</MenuItem>
                  <MenuItem value={2}>Aland Islands</MenuItem>
                  <MenuItem value={3}>Albania</MenuItem>
                  <MenuItem value={4}>Algeria</MenuItem>
                  <MenuItem value={5}>American Samoa</MenuItem>
                  <MenuItem value={6}>Andorra</MenuItem>
                  <MenuItem value={7}>Anguilla</MenuItem>
                  <MenuItem value={8}>Antarctica</MenuItem>
                  <MenuItem value={9}>Antigua and Barbuda</MenuItem>
                  <MenuItem value={10}>Argentina</MenuItem>
                  <MenuItem value={11}>Armenia</MenuItem>
                  <MenuItem value={12}>Aruba</MenuItem>
                  <MenuItem value={13}>Australia</MenuItem>
                  <MenuItem value={14}>Austria</MenuItem>
                  <MenuItem value={15}>Azerbaijan</MenuItem>
                  <MenuItem value={16}>Bahamas</MenuItem>
                  <MenuItem value={17}>Bahrain</MenuItem>
                  <MenuItem value={18}>Bangladesh</MenuItem>
                  <MenuItem value={19}>Barbados</MenuItem>
                  <MenuItem value={20}>Belgium</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth className={classes.formInput}>
                <FormHelperText>
                  Connect your company social media accounts
                </FormHelperText>
                <SocialMedaiAccounts />
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(CompanyFrom);
