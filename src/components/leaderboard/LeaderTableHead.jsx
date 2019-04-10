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

class LeaderTableHead extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [
        { id: "picture", sortable: false, label: "Picture" },
        { id: "name", sortable: true, label: "Name" },
        { id: "departament", sortable: true, label: "Departament" },
        { id: "location", sortable: true, label: "Location" },
        { id: "post", sortable: true, label: "Post" },
        { id: "points", sortable: true, label: "Points" }
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

LeaderTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired
};
export default withStyles(styles)(LeaderTableHead);
