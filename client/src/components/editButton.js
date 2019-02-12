import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function TextButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Button color="secondary" id={props.id} className={classes.button} value={props.value} onClick={props.onClick} name={props.name}>
        Edit
      </Button>
    </div>
  );
}

TextButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextButtons);