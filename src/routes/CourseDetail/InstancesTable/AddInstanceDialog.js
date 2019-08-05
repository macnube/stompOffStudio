import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, Calendar } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddInstanceDialog extends React.Component {
    state = {
        date: new Date(),
    };

    handleSetDate = date => {
        this.setState({
            date,
        });
    };

    handleCreateInstance = () => {
        const { handleCreate } = this.props;
        handleCreate(this.state.date);
        this.clearForm();
        // this.props.navigateToStudio(newStudio);
    };

    clearForm = () => {
        this.setState({
            date: new Date(),
        });
    };

    isNotCourseDate = date =>
        date
            .toString()
            .slice(0, 3)
            .toUpperCase() !== this.props.course.day;

    render() {
        const { open, handleClose } = this.props;
        const { date } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Select new instance date
                    </DialogTitle>
                    <DialogContent>
                        <Calendar
                            disablePast
                            shouldDisableDate={this.isNotCourseDate}
                            date={date}
                            onChange={this.handleSetDate}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose.bind(null, this.clearForm)}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleCreateInstance}
                            color="primary"
                        >
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

AddInstanceDialog.propTypes = {
    course: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default AddInstanceDialog;
