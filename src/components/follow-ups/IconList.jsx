import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Flag from '@material-ui/icons/Flag';
import Forum from '@material-ui/icons/Forum';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';



const styles = theme => createStyles({ 

    main: {
        display: "flex",
        flexDirection: "column",
        padding: "20px"
    },  

    margin: {
        margin: theme.spacing.unit,  
        width: 105,
        height: 35
    },

     entire1: {
         display: "flex",
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between"
     },
     entire2: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing.unit / 2
     },
     box:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
     },
     icon: {
      margin: theme.spacing.unit * 1.25
    },
     text: {
       margin: '0px 6px'
     },
     span: {
       fontSize: theme.spacing.unit * 1.5,
       color: "gray",
       marginLeft: 3
     },  
     padding: {
       paddingTop: "10px"
     }  

  });
  
  function IconList(props) {
    const { classes } = props;
    return (
      <div className={classes.main}>  

        <div className={classes.entire1}>
          <div className={classes.box}>
            <Flag color="primary" className={classes.icon}/>
            <Typography ><b>Anna Gallo </b>flagged for follow up
              <span className={classes.span}> Apr 02</span></Typography>  </div>

             <Button variant="contained" size="medium" color="primary" className={classes.margin}>
                 Resolve
              </Button>
        </div>
        <Divider />

      <div className={classes.entire2}>

       <Forum color="primary" className={classes.icon}/>
          <div>
            <Typography className={classes.padding} ><b>Anna Gallo</b> GalloAdded this answer as a talking point for your 1-on-1:</Typography>
            <Typography >"Discuss priority tasks for january" <span className={classes.span}>Apr 02</span></Typography>     
          </div>
                

       </div>

      </div>
  
    );
  }
  
  IconList.propTypes = {
    classes: PropTypes.object.isRequired,
  };


export default withStyles(styles)(IconList);