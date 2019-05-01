import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Reorder from '@material-ui/icons/Reorder';
import classNames from 'classnames';



const styles = theme => ({
  container: {
    margin: "30px 0px"
  }
});



class TextFields extends React.Component {
  
  render() {
    const { classes } = this.props;

    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off">

      <Typography variant="h6" >Objectives</Typography>

       
      <List component="nav">
      
        <ListItem >
          <ListItemText primary="What went well this week?" />
        </ListItem>

        <ListItem >
          <ListItemIcon>
            <Reorder />
          </ListItemIcon>
          
          <TextField
            className={(classes.dense, classes.textField) }
            id="standard-dense"
            label="Add a new answer" 
            fullWidth
            />

        </ListItem>

        <ListItem >
          <ListItemText primary="Whats your biggest chalange right now, and how can l help?" />
        </ListItem>

        <ListItem >
          <ListItemIcon>
            <Reorder />
          </ListItemIcon>
          <TextField  
          id="standard-dense" 
          label="Add a new answer" 
          className={classNames(classes.textField, classes.dense)} 
          fullWidth  />
        </ListItem>

        <ListItem >
          <ListItemText primary="Is there a tool or service that would help you in your role?" />
        </ListItem>

        <ListItem >
          <ListItemIcon>
            <Reorder />
          </ListItemIcon>
          <TextField  
             id="standard-dense" 
             label="Add a new answer" 
             className={classNames(classes.textField, classes.dense)} 
             fullWidth />
        </ListItem>

      </List>
     
      </form>

      </div>

    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
