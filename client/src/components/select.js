import React from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import ParcelList from './modelResults';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import NeighbTable from './tables';



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    margin: 10,
  },
  input: {
    display: 'none',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    LandType: '',
    MLS: '',
    HighSchool: '',
    Quality: '',
    hasSearched: false,
    neighbList: [],
    selectedModel: '',
    isEditing: false,
    modelSpecific: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  sendNeighb = event => {
    event.preventDefault();
    if (this.state.LandType && this.state.MLS && this.state.HighSchool && this.state.Quality) {
      const NeighbhoodCode = `${this.state.HighSchool}${this.state.Quality}`;
      $.get(`/api/neighbhood/${NeighbhoodCode}`)
        .then(neighbRes => {
          console.log(neighbRes)
          this.setState({
            neighbList: neighbRes.data[0],
            hasSearched: true,
            isEditing:false
          })
        })
    }
    else {
      alert('Please Fill out all fields')
    }
  }
  viewModels = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    $.get(`/api/ModelInfo/${event.target.value}`)
      .then(res => {
        this.setState({
          modelSpecific: res.data[0],
          isEditing: true
        })
      });
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <form className={classes.root} autoComplete="off">

          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-auto-width">Land Type</InputLabel>
            <Select
              value={this.state.LandType}
              onChange={this.handleChange}
              input={<Input name="LandType" id="LandTypeSelect" />}
              autoWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Rural Land</MenuItem>
              <MenuItem value={2}>Urban Land</MenuItem>
              <MenuItem value={3}>Desirable Location</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-required">MLS Area</InputLabel>
            <Select
              value={this.state.MLS}
              onChange={this.handleChange}
              input={<Input name="MLS" id="MLSSelect" />}
              autoWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-required">High School</InputLabel>
            <Select
              value={this.state.HighSchool}
              onChange={this.handleChange}
              input={<Input name="HighSchool" id="HSSelect" />}
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={11}>Duluth</MenuItem>
              <MenuItem value={12}>Norcross</MenuItem>
              <MenuItem value={13}>Peachtree Ridge</MenuItem>
              <MenuItem value={14}>Buford</MenuItem>
              <MenuItem value={21}>Lanier</MenuItem>
              <MenuItem value={22}>Mill Creek</MenuItem>
              <MenuItem value={23}>North Gwinnett</MenuItem>
              <MenuItem value={31}>Collins Hill</MenuItem>
              <MenuItem value={32}>Dacula</MenuItem>
              <MenuItem value={33}>Mountain View</MenuItem>
              <MenuItem value={41}>Berkmar</MenuItem>
              <MenuItem value={42}>Discovery</MenuItem>
              <MenuItem value={43}>Meadowcreek</MenuItem>
              <MenuItem value={44}>Parkview</MenuItem>
              <MenuItem value={51}>Brookwood</MenuItem>
              <MenuItem value={52}>Shiloh</MenuItem>
              <MenuItem value={53}>South Gwinnett</MenuItem>
              <MenuItem value={61}>Archer</MenuItem>
              <MenuItem value={62}>Central Gwinnett</MenuItem>
              <MenuItem value={63}>Grayson</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required className={classes.formControl}>
            <InputLabel htmlFor="age-required">Quality/Amenity</InputLabel>
            <Select
              value={this.state.Quality}
              onChange={this.handleChange}
              input={<Input name="Quality" id="QualitySelect" />}
              autoWidth
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <Button variant="outlined" className={classes.button} onClick={this.sendNeighb}>
            Go
      </Button>
        </form>
        {!this.state.hasSearched ? (<div>To display the makeup and subdivisions of the models, enter your search criteria</div>) :
          (<div> From your search, we can gather that {this.state.neighbList.length} models fit this criteria.</div>)}
        {!this.state.isEditing ? (<NeighbTable rows={this.state.neighbList} onClick={this.viewModels} />) : (<div><ParcelList parcel_list={this.state.modelSpecific} lowest={this.state.modelSpecific[0].parcel_no} highest={this.state.modelSpecific[this.state.modelSpecific.length-1].parcel_no}/></div>)}
      </div>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);