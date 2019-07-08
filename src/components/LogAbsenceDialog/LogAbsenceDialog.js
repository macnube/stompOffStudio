import DateFnsUtils from '@date-io/date-fns';
import React, { Fragment, useState } from 'react';
import some from 'lodash/some';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { MuiPickersUtilsProvider, Calendar } from 'material-ui-pickers';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { getTableDate, getTableDateFromCalendarPicker } from 'utils/date';
import { parseCoursesToTableData } from './parse';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Name',
    },
];

const LogAbsenceDialog = ({
    courses,
    logParticipantAbsence,
    logCourseAbsence,
    open,
    handleClose,
    user,
}) => {
    const [absentDate, setAbsentDate] = useState(new Date());
    const [selectedCourse, setSelectedCourse] = useState(null);

    const clearForm = () => {
        setSelectedCourse(null);
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

    const handleCourseClick = rowData => {
        const selectedCourse = find(courses, { id: rowData[0] });
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
        handleClose(clearForm);
    };

    const renderCourseSelect = () => {
        const options = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: handleCourseClick,
        };
        return (
            <Fragment>
                <DialogTitle id="form-dialog-title">
                    Log absence for...
                </DialogTitle>
                <DialogContent>
                    <MUIDataTable
                        title={'Select Course'}
                        data={parseCoursesToTableData(courses)}
                        columns={columns}
                        options={options}
                    />
                </DialogContent>
            </Fragment>
        );
    };

    const renderLogAbsence = () => (
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
    courses: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    logCourseAbsence: PropTypes.func.isRequired,
    logParticipantAbsence: PropTypes.func.isRequired,
};

export default LogAbsenceDialog;
