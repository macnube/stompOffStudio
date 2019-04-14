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
import Checkbox from '@material-ui/core/Checkbox';
import styles from './styles';

const availableClasses = {
    TueL2: { name: 'Tues - Lindy Hop II', id: 'TueL2' },
    ThuB2: { name: 'Thu - Balboa II', id: 'ThuB2' },
    TueL3: { name: 'Tues - Lindy Hop III', id: 'TueL3' },
    ThuAJ2: { name: 'Thu - Authentic Jazz II', id: 'ThuAJ2' },
};

class TeacherForm extends React.Component {
    state = {
        id: '',
        name: '',
        mobile: '',
        email: '',
        selectedClasses: [],
    };

    componentDidUpdate() {
        const { teacher } = this.props;
        if (teacher && teacher.id !== this.state.id) {
            this.setState({
                id: teacher.id,
                name: teacher.name,
                mobile: teacher.mobile,
                email: teacher.email,
                selectedClasses: teacher.classes,
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
            selectedClasses: [],
        });
    };

    render() {
        const { classes, open, handleClose, teacher } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        {teacher ? 'Edit Teacher' : 'Create New Teacher'}
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
                        <FormControl
                            component="fieldset"
                            className={classes.formControl}
                            margin="normal"
                        >
                            <FormLabel component="legend">
                                Assign To Class
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
                            {teacher ? 'Save' : 'Create'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

TeacherForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    teacher: PropTypes.object,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(TeacherForm);
