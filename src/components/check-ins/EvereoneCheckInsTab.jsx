import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FeedRepository from "../../repositories/FeedRepository";
import SidebarStore from "../../stores/SidebarStore";
import { SocialMediaNetworkTypes } from "../../actions/SocialMediaActions";
import SocialMediaStore from "../../stores/SocialMediaStore";
import FacebookAuthProvider from "../../data/authProviders/FacebookAuthProvider";
import LinkedinAuthProvider from "../../data/authProviders/LinkedinAuthProvider";
// import classNames from "classnames";
import CheckInsTableHead from "./CheckInsTableHead";
import CheckInsTableBody from "./CheckInsTableBody";
// import DefaultImage from "../../assets/Overlay.svg";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
// import FacebookGrayIcon from "../../assets/FacebookGray.svg";
// import InstagramGrayIcon from "../../assets/InstagramGray.svg";
// import LinkedinGrayIcon from "../../assets/LinkedinGray.svg";
// import TwitterGrayIcon from "../../assets/TwitterGray.svg";
// import { createMuiTheme } from "@material-ui/core/styles";
// import { shadows } from "@material-ui/system";
import {
  Typography,
  Table,
  Paper,
  Link,
  ButtonBase,
  List,
  ListItem
} from "@material-ui/core";
import { color } from "@material-ui/system/palette";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const styles = theme => ({
  listItem: {
    border: "solid RGB(245, 245, 245)",
    borderWidth: "2px 0 0"
  },
  "listItem:last-child": {
    borderWidth: "2px 0"
  },
  boldItem: {
    fontWeight: "600"
  }
});

const dates = [
  {
    id: "0",
    firstDate: "Apr 4",
    lastDate: "Apr 10",
    submited: "Apr 10"
  },
  {
    id: "1",
    firstDate: "Mar 28",
    lastDate: "Apr 3",
    submited: "Apr 10"
  }
];

class EvereoneCheckInsTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: dates,
      isSelected: false,
      selectedListItem: ""
    };
  }

  selectListItem = listId => {
    this.setState({ isSelected: true, selectedListItem: listId });
  };

  render() {
    const { classes } = this.props;
    const { dates, isSelected, selectedListItem } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "stretch",
          minWidth: "min-content",
          marginTop: "25px"
        }}
      >
        <Paper
          style={{
            maxWidth: "calc(100% - 340px)",
            flex: "1 1 calc(100% - 340px)",
            minWidth: "max-content",
            marginLeft: "20px"
          }}
        >
          Everyone`s check-ins
          <br />
          sdfdsf
          <br />
          sdfsdfdsf
          <br />
        </Paper>
        <Paper
          style={{
            flex: "1 1 300px",
            maxWidth: "300px",
            marginRight: "20px",
            marginLeft: "20px",
            height: "min-content"
          }}
        >
          <div
            style={{
              padding: "20px 0",
              backgroundColor: "RGB(250, 250 , 250)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: "RGB(200, 200, 200)",
                borderRadius: "50%",
                margin: "10px auto"
              }}
            />
            <Typography
              style={{ width: "max-content", margin: "0 auto" }}
              component="h6"
              variant="headline"
              gutterBottom
            >
              Tomas Comelius
            </Typography>
            <Typography
              style={{ width: "max-content", margin: "0 auto" }}
              variant="subheading"
              gutterBottom
            >
              Reviawer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "max-content",
                margin: "10px auto 0"
              }}
            >
              Print
            </Button>
          </div>
          <List
            style={{
              padding: "0 0 0 0",
              margin: "0 0 0 0"
            }}
          >
            <ListItem className={classNames(classes.boldItem)}>
              Anna Cecy`s Recent Check-Ins
            </ListItem>
            {dates.map(date => (
              <React.Fragment>
                <ListItem
                  onClick={() => this.selectListItem(date.id)}
                  style={{ display: "flex", flexDirection: "column" }}
                  className={classNames(classes.listItem, {
                    [classes.boldItem]:
                      isSelected && selectedListItem == date.id
                  })}
                  button
                >
                  {isSelected && selectedListItem == date.id && (
                    <div
                      style={{
                        position: "absolute",
                        width: "5px",
                        backgroundColor: "blue",
                        height: "100%",
                        top: "0",
                        left: "0"
                      }}
                    />
                  )}
                  <div style={{ fontSize: "16px", width: "100%" }}>
                    {date.firstDate} - {date.lastDate}
                  </div>
                  <div style={{ fontSize: "12px", width: "100%" }}>
                    Submitted on {date.submited}
                  </div>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(EvereoneCheckInsTab);
