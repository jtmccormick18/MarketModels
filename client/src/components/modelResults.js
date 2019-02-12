import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function ParcelList(props) {
  const { classes } = props;
  return (
    <div>
      <p>The parcels falling into this model range from {props.lowest} to {props.highest}</p>
    <List component="nav" className={classes.root}>
      {props.parcel_list.map(parcel_list=>(<ListItem button>
        <ListItemText inset primary={parcel_list.parcel_no} />
      </ListItem>))}
    </List>
    </div>
  );
}

ParcelList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ParcelList);