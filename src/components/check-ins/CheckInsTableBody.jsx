import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import classNames from "classnames";
import { Collapse } from "@material-ui/core";

const styles = theme => ({
  headCell: {
    borderTop: "1px solid #e0e0e0"
  },
  noChild: {
    paddingLeft: "49px"
  },
  cellChildName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "80px"
  },
  cellName: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  cellNameImg: {
    border: "1px solid gray",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    marginRight: "10px"
  },
  cellCollapsed: {
    padding: 0,
    borderBottom: "none"
  }
});

class CheckInsTableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: props.rows,
      anchorAction: null,
      statusRow: []
    };
  }

  changeStatusRow = parentId => {
    const checkParentId = this.state.statusRow.indexOf(parentId);
    const statusRow = this.state.statusRow;
    if (checkParentId !== -1) {
      statusRow.splice(checkParentId);
    } else {
      statusRow.push(parentId);
    }
    this.setState({
      statusRow: statusRow
    });
  };

  contains = (elem, arr) => {
    return arr.indexOf(elem) !== -1;
  };

  handleActionClick = event => {
    this.setState({ anchorAction: event.currentTarget });
  };

  handleActionClose = () => {
    this.setState({ anchorAction: null });
  };

  renderChild = (row, isActionOpen = false) => {
    const isExpanded = this.state.statusRow.includes(row.id);
    return (
      <React.Fragment>
        {row.childs.map(child => (
          <TableRow key={"parent" + row.id + "child" + child.id}>
            <TableCell
              className={classNames({
                [this.props.classes.cellCollapsed]: !isExpanded
              })}
            >
              <Collapse in={isExpanded}>
                <div className={this.props.classes.cellChildName}>
                  <div className={this.props.classes.cellNameImg}>
                    {/* <image src="" /> */}
                  </div>
                  <div>
                    {child.name.name}
                    <br />
                    {child.name.subtext}
                  </div>
                </div>
              </Collapse>
            </TableCell>
            <TableCell
              className={classNames({
                [this.props.classes.cellCollapsed]: !isExpanded
              })}
            >
              <Collapse in={isExpanded}>
                <div className={this.postCell}>{child.dueDate}</div>
              </Collapse>
            </TableCell>
            <TableCell
              className={classNames({
                [this.props.classes.cellCollapsed]: !isExpanded
              })}
            >
              <Collapse in={isExpanded}>{child.submitDate}</Collapse>
            </TableCell>
            <TableCell
              className={classNames({
                [this.props.classes.cellCollapsed]: !isExpanded
              })}
            >
              <Collapse in={isExpanded}>
                <IconButton
                  aria-label="More"
                  aria-owns={
                    this.state.isActionOpen ? "action-menu" : undefined
                  }
                  aria-haspopup="true"
                  onClick={this.handleActionClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="action-menu"
                  anchorEl={this.anchorAction}
                  open={isActionOpen}
                  onClose={this.handleActionClose}
                >
                  <MenuItem key="action1" onClick={this.handleActionClose}>
                    Action 1
                  </MenuItem>
                  <MenuItem key="action2" onClick={this.handleActionClose}>
                    Action 2
                  </MenuItem>
                  <MenuItem key="action3" onClick={this.handleActionClose}>
                    Action 3
                  </MenuItem>
                </Menu>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    );
  };

  render() {
    const { rows, anchorAction, statusRow } = this.state;
    const { classes } = this.props;
    const isActionOpen = this.state.anchorAction ? true : false;

    return (
      <TableBody>
        {rows.map(row => (
          <React.Fragment key={"fragment" + row.id}>
            <TableRow key={"parent" + row.id}>
              <TableCell>
                <div
                  className={classNames(classes.cellName, {
                    [classes.noChild]: row.childs.length === 0
                  })}
                >
                  {row.childs.length !== 0 && (
                    <IconButton onClick={() => this.changeStatusRow(row.id)}>
                      {statusRow.includes(row.id) ? (
                        <RemoveCircleIcon />
                      ) : (
                        <AddCircleIcon />
                      )}
                    </IconButton>
                  )}
                  <div className={classes.cellNameImg}>
                    {/* <image src="" /> */}
                  </div>
                  <div>
                    {row.name.name}
                    <br />
                    {row.name.subtext}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={classes.postCell}>{row.dueDate}</div>
              </TableCell>
              <TableCell>{row.submitDate}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="More"
                  aria-owns={isActionOpen ? "action-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleActionClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="action-menu"
                  anchorEl={anchorAction}
                  open={isActionOpen}
                  onClose={this.handleActionClose}
                >
                  <MenuItem key="action1" onClick={this.handleActionClose}>
                    Send a reminder
                  </MenuItem>
                  <MenuItem key="action2" onClick={this.handleActionClose}>
                    View Profile
                  </MenuItem>
                  <MenuItem key="action3" onClick={this.handleActionClose}>
                    Mark as on vacation
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
            {this.renderChild(row, this.isActionOpen)}
          </React.Fragment>
        ))}
      </TableBody>
    );
  }
}

export default withStyles(styles)(CheckInsTableBody);
