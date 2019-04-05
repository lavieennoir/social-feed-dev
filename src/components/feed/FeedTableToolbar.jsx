import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilterListIcon from "@material-ui/icons/FilterList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Toolbar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem
} from "@material-ui/core";

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  }
});

class FeedTableToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorAction: null
    };
  }

  handleActionClick = event => {
    this.setState({ anchorAction: event.currentTarget });
  };

  handleActionClose = () => {
    this.setState({ anchorAction: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorAction } = this.state;
    const isActionOpen = anchorAction ? true : false;

    return (
      <Toolbar>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.actions}>
          <Tooltip title="More actions">
            <IconButton
              aria-label="More"
              aria-owns={isActionOpen ? "action-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleActionClick}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
          <Menu
            id="action-menu"
            anchorEl={anchorAction}
            open={isActionOpen}
            onClose={this.handleActionClose}
          >
            <MenuItem key="action1" onClick={this.handleActionClose}>
              Global Action 1
            </MenuItem>
            <MenuItem key="action2" onClick={this.handleActionClose}>
              Global Action 2
            </MenuItem>
            <MenuItem key="action3" onClick={this.handleActionClose}>
              Global Action 3
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    );
  }
}

FeedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(toolbarStyles)(FeedTableToolbar);
