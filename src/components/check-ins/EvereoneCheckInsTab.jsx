import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import EvereoneComments from "./EvereoneComments";

const styles = theme => ({
  listItem: {
    border: "solid RGB(240, 240, 240)",
    borderWidth: "0 0 1px",
    display: "flex",
    flexDirection: "column"
  },
  listHeadItem: {
    border: "solid RGB(210, 210, 210)",
    borderWidth: "1px 0"
  },
  boldItem: {
    fontWeight: "600"
  },
  mainBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minWidth: "min-content",
    marginTop: "25px",
    height: "100%",
    minHeight: "100%"
  },
  leftBlock: {
    maxWidth: "calc(100% - 340px)",
    flex: "calc(100% - 340px)",
    minWidth: "max-content",
    marginLeft: "20px",
    padding: "20px",
    alignSelf: "stretch"
  },
  rightBlock: {
    flex: "1 1 300px",
    maxWidth: "300px",
    marginRight: "20px",
    marginLeft: "20px",
    height: "min-content"
  },
  personInf: {
    padding: "20px 0",
    backgroundColor: "RGB(250, 250 , 250)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  personIcon: {
    height: "55px",
    width: "55px",
    backgroundColor: "RGB(200, 200, 200)",
    borderRadius: "50%",
    margin: "10px auto"
  },
  personNameBlock: {
    width: "max-content",
    margin: "0 auto"
  },
  printButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    margin: "10px auto 0"
  },
  listPersonBlock: {
    padding: "0 0 0 0",
    margin: "0 0 0 0"
  },
  leftSolid: {
    position: "absolute",
    width: "5px",
    backgroundColor: "blue",
    height: "100%",
    top: "0",
    left: "0"
  },
  period: {
    fontSize: "16px",
    width: "100%"
  },
  submitedOnDate: {
    fontSize: "12px",
    width: "100%"
  },
  leftBlockHead: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: "20px"
  },
  nullMargin: {
    margin: "0"
  },
  leftHeadName: {
    marginLeft: "20px"
  },
  leftHeadSubmited: {
    marginLeft: "auto",
    display: "inline-block",
    "& *": {
      float: "left"
    }
  },
  leftHeadDate: {
    fontWeight: "600",
    marginLeft: "5px"
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
      <div className={classes.mainBlock}>
        <Paper className={classes.leftBlock}>
          <div className={classes.leftBlockHead}>
            <div
              className={classNames(classes.personIcon, classes.nullMargin)}
            />
            <div className={classes.leftHeadName}>
              <Typography
                variant="h6"
                className={classes.nullMargin}
                gutterBottom
              >
                Ana Cecy Gallo
              </Typography>
              <Typography
                variant="body2"
                className={classes.nullMargin}
                gutterBottom
              >
                UX Designer
              </Typography>
            </div>
            <div className={classes.leftHeadSubmited}>
              <Typography variant="body2" gutterBottom>
                Submitted on
              </Typography>
              <Typography
                className={classes.leftHeadDate}
                variant="body2"
                gutterBottom
              >
                Wednesday, April 3
              </Typography>
            </div>
          </div>
          <EvereoneComments />
        </Paper>
        <Paper className={classes.rightBlock}>
          <div className={classes.personInf}>
            <div className={classes.personIcon} />
            <Typography
              className={classes.personNameBlock}
              variant="h6"
              gutterBottom
            >
              Tomas Comelius
            </Typography>
            <Typography
              className={classes.personNameBlock}
              variant="body2"
              gutterBottom
            >
              Reviewer
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.printButton}
            >
              Print
            </Button>
          </div>
          <List className={classes.listPersonBlock}>
            <ListItem
              className={classNames(classes.boldItem, classes.listHeadItem)}
            >
              Anna Cecy`s Recent Check-Ins
            </ListItem>
            {dates.map(date => (
              <React.Fragment key={"dateBlock" + date.id}>
                <ListItem
                  key={"dateItem" + date.id}
                  onClick={() => this.selectListItem(date.id)}
                  className={classNames(classes.listItem, {
                    [classes.boldItem]:
                      isSelected && selectedListItem === date.id
                  })}
                  button
                >
                  {isSelected && selectedListItem === date.id && (
                    <div className={classes.leftSolid} />
                  )}
                  <div key="period" className={classes.period}>
                    {date.firstDate} - {date.lastDate}
                  </div>
                  <div key="submitedOnDate" className={classes.submitedOnDate}>
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
