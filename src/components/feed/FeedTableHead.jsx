import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  headCell: {
    borderTop: "1px solid #e0e0e0"
  }
});

class FeedTableHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        { id: "network", sortable: true, label: "Network" },
        { id: "post", sortable: true, label: "Post" },
        { id: "link", sortable: true, label: "Link" },
        { id: "image", sortable: false, label: "Image" },
        { id: "preview", sortable: false, label: "Preview Link" },
        { id: "share", sortable: false, label: "Share" },
        { id: "actions", sortable: false, label: "Actions" }
      ]
    };
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { rows } = this.state;
    const { order, orderBy, classes } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                className={classes.headCell}
                key={row.id}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.sortable ? (
                  <Tooltip title="Sort" enterDelay={300}>
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                ) : (
                  row.label
                )}
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

FeedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired
};
export default withStyles(styles)(FeedTableHead);
