import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import Message from '@material-ui/icons/Message';
import MoreVert from '@material-ui/icons/MoreVert';
import EveryoneComments from './EvereoneComments';
import IconList from './IconList';



const styles = theme => createStyles({ 

    main: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e9f3f9",
        paddingLeft: theme.spacing.unit * 2.5
    },  
    entire1: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: "center"
    },

    entire2: {
      display: "flex",
      flexDirection: 'row',
      alignItems: "center",
      marginLeft: theme.spacing.unit * 2
    },

    fav: {
      margin: theme.spacing.unit,
      marginRight: theme.spacing.unit / 8,
      padding: theme.spacing.unit / 8
    },

    margin: {
      marginRight: theme.spacing.unit
    }

    

  });
  
  class BlueForm extends Component {
    constructor(props){
      super(props);
      this.state = {
        isCommentOpen: false
      }
    }

    commentActionClick = id => {
      this.setState((state)=> ({
        isCommentOpen: !state.isCommentOpen
      }))
        
    };

    render() {
    const { classes } = this.props;
    const {isCommentOpen} = this.state;

    return (
      
        <div>
 <div className={classes.main}>   
      
      <div className={classes.entire1}> 

        <Typography variant="subtitle2" >
            What went well this week ? 
        </Typography>
        <div className={classes.margin}>
         <IconButton onClick={this.commentActionClick}  >
           <Message   color="disabled"  />
         </IconButton>

         <IconButton >
           <MoreVert color="disabled" />
         </IconButton>

         </div>
      </div>

      <div className={classes.entire2}>

      <Typography variant="body1" >
        This was a really nice and productive week. 
      </Typography>
        
        <IconButton className={classes.fav} >
           <Favorite color="disabled"  />
        </IconButton>
         <Typography>Like</Typography >

      </div>
      
      </div>
      <IconList />
      <EveryoneComments isCommentOpen={isCommentOpen}   />
        </div>
      
     
  
    );
  }}
  
  BlueForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(BlueForm);