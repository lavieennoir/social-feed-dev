import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';




const styles  = theme => ({
  root: {
    width: '100%',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "30px 0px",
  },

  

  fab: {
    '&:hover': {
        backgroundColor: "#2389c4",
        color: "white",
        borderColor: "#2389c4",
        boxShadow: "none",

    },       
      border: "1px solid gray",
      margin: "0px 15px",
      backgroundColor: "white",
      color: "gray",
      boxShadow: "none",
      fontSize: 18
  },

  mark: {
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    margin: 20,
    flexWrap: "wrap"
  }, 
  menuItem: {
    '&:focus': {
      backgroundColor: "#2389c4",
      color: "white",
      borderColor: "#2389c4",
      boxShadow: "none",      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},

});

function Types(props) {
  const { classes } = props;

  return (
    <div >
     
      <div className={classes.root}>

        <Typography variant="subtitle1" gutterBottom> How are you feeling? </Typography>

        <div className={classes.mark}>
        <Typography variant="body1" gutterBottom> Awful</Typography>

        <Fab className={`${classes.fab} ${classes.menuItem}`}>1</Fab>
        <Fab className={`${classes.fab} ${classes.menuItem}`}>2</Fab>
        <Fab className={`${classes.fab} ${classes.menuItem}`}>3</Fab>
        <Fab className={`${classes.fab} ${classes.menuItem}`}>4</Fab>
        <Fab className={`${classes.fab} ${classes.menuItem}`}>5</Fab>

        <Typography variant="body1" gutterBottom> Amazing! </Typography>
        </div>


        <Link variant="body2"  component="button">Care to eleborate? </Link>

      </div>
            <Divider />
    </div>


  );
}

Types.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Types);

