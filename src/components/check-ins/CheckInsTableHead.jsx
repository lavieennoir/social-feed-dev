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
      rows: props.rows
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
                {row.id == 0 ? (
                  <div style={{ paddingLeft: "50px" }}>{row.label}</div>
                ) : (
                  row.label
                )}
              </TableCell>
            ),
            this
          )}
          <TableCell
            key={rows.lenght + 1}
            className={classes.headCell}
            sortDirection={orderBy === rows.lenght + 1 ? order : false}
          />
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
