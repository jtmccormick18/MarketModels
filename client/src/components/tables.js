import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextButton from './editButton';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});


function NeighbTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Model Number</CustomTableCell>
            <CustomTableCell align="right">Description</CustomTableCell>
            <CustomTableCell align="right">Subdivision</CustomTableCell>
            <CustomTableCell align="right"># of Parcels</CustomTableCell>
            <CustomTableCell align="right">Average Value</CustomTableCell>
            <CustomTableCell align="right">Average Land Value</CustomTableCell>
            <CustomTableCell align="right">Average Lot Size</CustomTableCell>
            <CustomTableCell align="right">Edit?</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map(row => (
            <TableRow className={classes.row} key={row.neigh}>
              <CustomTableCell component="th" scope="row">
                {row.neigh}
              </CustomTableCell>
              <CustomTableCell align="right">{row.descripton}</CustomTableCell>
              <CustomTableCell align="right">{row.subd_name}</CustomTableCell>
              <CustomTableCell align="right">{row.PARCEL_COUNT}</CustomTableCell>
              <CustomTableCell align="right">{row.VAL_AVG}</CustomTableCell>
              <CustomTableCell align="right">{row.LAND_VAL_AVG}</CustomTableCell>
              <CustomTableCell align="right">{row.ACRE_AVG}</CustomTableCell>
              <CustomTableCell align="right"><TextButton onClick={props.onClick} id={row.neigh} value={row.neigh} name="selectedModel"/></CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

NeighbTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NeighbTable);