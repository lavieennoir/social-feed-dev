import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Fab from './Fab';
import Divider from '@material-ui/core/Divider';
import Priorities from './Prioritoes'
import Questions from './Questions';
import Objectives from './Objectives';

const styles = {
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  dcolumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start"
  },
  main: {
    padding: "30px",
    marginBottom: "30px",
  },
  whole: {
    padding: "30px"
  }
  
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.whole}>    
      <div className={classes.main}>

    <Grid container >
      <Avatar className={classes.bigAvatar}  />
    
    <div className={classes.dcolumn}>
     <Typography variant="h5" align="center" gutterBottom>Tomas Taylor</Typography>
      <Link component="button" variant="subtitle1" >Add your job title</Link>
    </div>
    </Grid>
    
      </div>
        <Divider />
        <Fab />
        <Priorities  />
        <Questions />
        <Objectives />
    </div>

  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);