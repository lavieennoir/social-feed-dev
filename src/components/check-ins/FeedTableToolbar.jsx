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

    return ('');
  }
}

FeedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(toolbarStyles)(FeedTableToolbar);
