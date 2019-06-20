import DateFnsUtils from '@date-io/date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, Calendar } from 'material-ui-pickers';

import { getTableDate } from 'utils/date';
import styles from './styles';

class StudentAbsenceDialog extends Component {
    state = {
        absentDate: new Date(),
    };

    clearForm = () => {
        this.setState({
            absentDate: new Date(),
        });
    };

    handleSetAbsenceDate = absence => {
        this.setState({
            absentDate: absence,
        });
    };

    isAlreadyLogged = () =>
        some(
            this.props.course.absences,
            absence =>
                getTableDate(absence.date) ===
                getTableDate(new Date(this.state.absentDate).toISOString())
        );

    handleOnLogAbsence = () => {
        if (!this.isAlreadyLogged()) {
            this.props.handleLogAbsence(this.state.absentDate);
        }
        this.props.handleClose(this.clearForm);
    };

    isNotCourseDate = date =>
        date
            .toString()
            .slice(0, 3)
            .toUpperCase() !== this.props.course.day;

    render() {
        const { handleClose, open } = this.props;
        const { absentDate } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Log Course Absence
                    </DialogTitle>
                    <DialogContent>
                        <Calendar
                            disablePast
                            shouldDisableDate={this.isNotCourseDate}
                            date={absentDate}
                            onChange={this.handleSetAbsenceDate}
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
                            onClick={this.handleOnLogAbsence}
                            color="primary"
                            disabled={!absentDate}
                        >
                            Log Absence
                        </Button>
                    </DialogActions>
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

StudentAbsenceDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    course: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleLogAbsence: PropTypes.func.isRequired,
};

export default withStyles(styles)(StudentAbsenceDialog);
