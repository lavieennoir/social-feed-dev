import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Reorder from '@material-ui/icons/Reorder';
import classNames from 'classnames';



const styles = theme => ({

  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
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

      <Typography variant="h6" >Priorities</Typography>

       
      <List component="nav">
      
        <ListItem >
          <ListItemText primary="What are your top priorities for the coming week ?" />
        </ListItem>

        <ListItem >
          <ListItemIcon>
            <Reorder />
          </ListItemIcon>
          <ListItemText primary="This is my top priority the coming week." />
        </ListItem>

        <ListItem >
          <ListItemIcon>
            <Reorder />
          </ListItemIcon>
          <ListItemText primary="This is my top priority the coming week." />
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
      <Divider />

      </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
