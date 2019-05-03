import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from './Avatar';
import Divider from '@material-ui/core/Divider';
import Prioritoes from './Prioritoes';



const styles = {
  root: {
    flexGrow: 1,
    boxShadow: "none"
  },
  tab: {
    textTransform: "initial",

  }, 
  shadow: {
    boxShadow:  "0px 0px 7px 0px #e4e4e4",
    padding: "30px"
  }
};


class CenteredTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    console.log(this.state)
  };
 
  render() {
    const { classes } = this.props;

    return (
        <div className={classes.shadow}>
      <Paper className={classes.root} >
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor= "primary"
          textColor= "primary"
          className={classes.tabs}          
        >


          <Tab label="Current Check-Ins"  className={classes.tab}/>
          <Tab label="My History" className={classes.tab} />
        </Tabs>
        <Divider />

      </Paper>
      
      {this.state.value === 0 && <div><Avatar /> </div>}

      </div>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);
