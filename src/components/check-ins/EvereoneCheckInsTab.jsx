import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Paper, List, ListItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import classNames from "classnames";

const styles = theme => ({
  listItem: {
    border: "solid RGB(245, 245, 245)",
    borderWidth: "2px 0 0",
    display: "flex",
    flexDirection: "column"
  },
  "listItem:last-child": {
    borderWidth: "2px 0"
  },
  boldItem: {
    fontWeight: "600"
  },
  mainBlock: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    minWidth: "min-content",
    marginTop: "25px"
  },
  leftBlock: {
    maxWidth: "calc(100% - 340px)",
    flex: "1 1 calc(100% - 340px)",
    minWidth: "max-content",
    marginLeft: "20px"
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
    height: "50px",
    width: "50px",
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
          Everyone`s check-ins
          <br />
          sdfdsf
          <br />
          sdfsdfdsf
          <br />
        </Paper>
        <Paper className={classes.rightBlock}>
          <div className={classes.personInf}>
            <div className={classes.personIcon} />
            <Typography
              className={classes.personNameBlock}
              component="h6"
              variant="headline"
              gutterBottom
            >
              Tomas Comelius
            </Typography>
            <Typography
              className={classes.personNameBlock}
              variant="subheading"
              gutterBottom
            >
              Reviawer
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
            <ListItem className={classNames(classes.boldItem)}>
              Anna Cecy`s Recent Check-Ins
            </ListItem>
            {dates.map(date => (
              <React.Fragment>
                <ListItem
                  onClick={() => this.selectListItem(date.id)}
                  className={classNames(classes.listItem, {
                    [classes.boldItem]:
                      isSelected && selectedListItem == date.id
                  })}
                  button
                >
                  {isSelected && selectedListItem == date.id && (
                    <div className={classes.leftSolid} />
                  )}
                  <div className={classes.period}>
                    {date.firstDate} - {date.lastDate}
                  </div>
                  <div className={classes.submitedOnDate}>
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
