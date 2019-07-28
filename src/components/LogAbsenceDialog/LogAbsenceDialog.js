import DateFnsUtils from '@date-io/date-fns';
import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import isSameDay from 'date-fns/isSameDay';
import subDays from 'date-fns/subDays';
import some from 'lodash/some';
import find from 'lodash/find';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, Calendar } from 'material-ui-pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import styles from './styles';
import { getTableDate, getTableDateFromCalendarPicker } from 'utils/date';

const LogAbsenceDialog = ({
    courses,
    logParticipantAbsence,
    logCourseAbsence,
    open,
    handleClose,
    user,
    classes,
    successDate,
}) => {
    const yesterday = subDays(new Date(), 1);
    const [absentDate, setAbsentDate] = useState(yesterday);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const isSuccessful = () =>
        isSameDay(new Date(successDate), new Date(absentDate));

    const clearForm = () => {
        setSelectedCourse(null);
        setAbsentDate(yesterday);
    };

    const handleSetAbsenceDate = absence => {
        setAbsentDate(absence);
    };

    const isAlreadyLogged = () =>
        some(
            selectedCourse.absences,
            absence =>
                getTableDate(absence.date) ===
                getTableDate(new Date(absentDate).toISOString())
        );

    const isNotCourseDate = date =>
        date
            .toString()
            .slice(0, 3)
            .toUpperCase() !== selectedCourse.day;

    const handleCourseClick = id => {
        const selectedCourse = find(courses, { id });
        setSelectedCourse(selectedCourse);
    };

    const getParticipantFromInstance = instance =>
        find(instance.participants, {
            membership: { student: { id: user.student.id } },
        });

    const getMatchingInstance = absentDate => {
        const absentTableDate = getTableDateFromCalendarPicker(absentDate);
        return find(
            selectedCourse.instances,
            instance => getTableDate(instance.date) === absentTableDate
        );
    };

    const handleOnLogAbsence = () => {
        if (!isAlreadyLogged()) {
            logCourseAbsence({
                variables: {
                    date: absentDate,
                    courseId: selectedCourse.id,
                    studentId: user.student.id,
                },
            });
            const instance = getMatchingInstance(absentDate);
            const participant =
                instance && getParticipantFromInstance(instance);
            if (participant) {
                logParticipantAbsence({
                    variables: {
                        id: participant.id,
                    },
                });
            }
        }
    };

    const renderCourseSelect = () => {
        return (
            <Fragment>
                <DialogTitle id="form-dialog-title">
                    Log absence for...
                </DialogTitle>
                {map(courses, course => {
                    return (
                        <Button
                            key={course.id}
                            onClick={() => handleCourseClick(course.id)}
                            variant="outlined"
                            className={classes.button}
                        >
                            {course.name}
                        </Button>
                    );
                })}
            </Fragment>
        );
    };

    const renderSuccess = () => (
        <Fragment>
            <DialogTitle id="form-dialog-title">Success!</DialogTitle>
            <DialogActions>
                <Button
                    onClick={handleClose.bind(null, clearForm)}
                    color="primary"
                >
                    Done
                </Button>
                <Button
                    onClick={clearForm}
                    color="primary"
                    disabled={!absentDate}
                >
                    Log Another Absence
                </Button>
            </DialogActions>
        </Fragment>
    );

    const renderLogAbsence = () => {
        if (isSuccessful()) {
            return renderSuccess();
        }
        return (
            <Fragment>
                <DialogTitle id="form-dialog-title">
                    Select date of absence
                </DialogTitle>
                <DialogContent>
                    <Calendar
                        disablePast
                        shouldDisableDate={isNotCourseDate}
                        date={absentDate}
                        onChange={handleSetAbsenceDate}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose.bind(null, clearForm)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleOnLogAbsence}
                        color="primary"
                        disabled={!absentDate}
                    >
                        Log Absence
                    </Button>
                </DialogActions>
            </Fragment>
        );
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog
                open={open}
                onClose={handleClose.bind(null, clearForm)}
                aria-labelledby="form-dialog-title"
            >
                {selectedCourse ? renderLogAbsence() : renderCourseSelect()}
            </Dialog>
        </MuiPickersUtilsProvider>
    );
};

LogAbsenceDialog.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    successDate: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    logCourseAbsence: PropTypes.func.isRequired,
    logParticipantAbsence: PropTypes.func.isRequired,
};

export default withStyles(styles)(LogAbsenceDialog);
