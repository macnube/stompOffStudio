import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './styles';

const cardTypes = ['None', 'Single', 'Double', 'Triple', 'All'];

const availableClasses = {
    TueL2: { name: 'Tues - Lindy Hop II', id: 'TueL2' },
    ThuB2: { name: 'Thu - Balboa II', id: 'ThuB2' },
    TueL3: { name: 'Tues - Lindy Hop III', id: 'TueL3' },
    ThuAJ2: { name: 'Thu - Authentic Jazz II', id: 'ThuAJ2' },
};

class StudentForm extends React.Component {
    state = {
        id: '',
        name: '',
        mobile: '',
        email: '',
        cardType: 'Single',
        cardStart: '',
        selectedClasses: [],
    };

    componentDidUpdate() {
        const { student } = this.props;
        if (student && student.id !== this.state.id) {
            this.setState({
                id: student.id,
                name: student.name,
                mobile: student.mobile,
                email: student.email,
                selectedClasses: student.classes,
            });
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSelectClass = selectedId => {
        const { selectedClasses } = this.state;
        if (selectedClasses.includes(selectedId)) {
            return this.setState({
                selectedClasses: filter(
                    selectedClasses,
                    id => id !== selectedId
                ),
            });
        }
        this.setState({
            selectedClasses: selectedClasses.concat(selectedId),
        });
    };

    clearForm = () => {
        this.setState({
            id: '',
            name: '',
            mobile: '',
            email: '',
            cardType: 'Single',
            cardStart: '',
            selectedClasses: [],
        });
    };

    render() {
        const { classes, open, handleClose, student } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {student ? 'Edit Student' : 'Create New Student'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-number"
                            label="Mobile Number"
                            value={this.state.mobile}
                            onChange={this.handleChange('mobile')}
                            type="number"
                            className={classes.textField}
                            margin="normal"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Email Address"
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            className={classes.emailField}
                            type="email"
                        />
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Select Card Type"
                            className={classes.textField}
                            value={this.state.cardType}
                            onChange={this.handleChange('cardType')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                        >
                            {cardTypes.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="date"
                            label="Card Start Date"
                            type="date"
                            onChange={this.handleChange('cardStart')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            disabled={this.state.cardType === 'None'}
                        />
                        <FormControl
                            component="fieldset"
                            className={classes.formControl}
                            margin="normal"
                        >
                            <FormLabel component="legend">
                                Assign Class
                            </FormLabel>
                            <FormGroup>
                                {map(availableClasses, c => (
                                    <FormControlLabel
                                        key={c.id}
                                        control={
                                            <Checkbox
                                                checked={this.state.selectedClasses.includes(
                                                    c.id
                                                )}
                                                onChange={() =>
                                                    this.handleSelectClass(c.id)
                                                }
                                            />
                                        }
                                        label={c.name}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            {student ? 'Save' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

StudentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    student: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudentForm);
