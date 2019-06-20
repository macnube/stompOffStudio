import 'date-fns';
import React, { useState } from 'react';
import compose from 'recompose/compose';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import StudentCourseDetailHeader from './StudentCourseDetailHeader';
import { FlatTable, SelectedDeleteToolbar } from 'components';
import StudentAbsenceDialog from './StudentAbsenceDialog';
import { parseInstancesToTableData, parseAbsencesToTableData } from './parse';
import { withUser } from 'core/user';
import { getTableDateFromCalendarPicker, getTableDate } from 'utils/date';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Date',
    },
    {
        name: 'Topic',
    },
];

const absencesColumns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Date',
    },
];

const StudentCourseDetail = ({
    course,
    history,
    user,
    logCourseAbsence,
    clearCourseAbsence,
    logParticipantAbsence,
    clearParticipantAbsence,
}) => {
    const [open, setOpen] = useState(false);
    const handleNavigateToInstance = rowData => {
        history.push({
            pathname: './studentCourseInstance',
            search: `id=${rowData[0]}`,
        });
    };
    const getMatchingInstance = absentDate => {
        const absentTableDate = getTableDateFromCalendarPicker(absentDate);
        return find(
            course.instances,
            instance => getTableDate(instance.date) === absentTableDate
        );
    };
    const getMatchingInstanceFromTableDate = absentDate => {
        return find(
            course.instances,
            instance => getTableDate(instance.date) === absentDate
        );
    };
    const getParticipantFromInstance = instance =>
        find(instance.participants, {
            membership: { student: { id: user.student.id } },
        });

    const handleLogAbsence = absentDate => {
        logCourseAbsence({
            variables: {
                date: absentDate,
                courseId: course.id,
                studentId: user.student.id,
            },
        });
        const instance = getMatchingInstance(absentDate);
        const participant = instance && getParticipantFromInstance(instance);
        if (participant) {
            logParticipantAbsence({
                variables: {
                    id: participant.id,
                },
            });
        }
    };
    const handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
    };

    const handleOnDeletePress = absences => {
        forEach(absences, absence => {
            clearCourseAbsence({ variables: { id: absence.id } });
            const instance = getMatchingInstanceFromTableDate(absence.date);
            const participant =
                instance && getParticipantFromInstance(instance);
            if (participant) {
                clearParticipantAbsence({
                    variables: {
                        id: participant.id,
                    },
                });
            }
        });
    };

    const getAbsences = (selectedRows, displayData) =>
        reduce(
            displayData,
            (result, row, index) => {
                if (keys(selectedRows.lookup).includes(index.toString())) {
                    result.push({ id: row.data[0], date: row.data[1] });
                    return result;
                }
                return result;
            },
            []
        );

    const renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={handleOnDeletePress}
            getIds={getAbsences}
        />
    );
    const options = {
        responsive: 'scroll',
        selectableRows: 'none',
        onRowClick: handleNavigateToInstance,
    };
    const absencesOptions = {
        responsive: 'scroll',
        customToolbarSelect: renderSelectedToolbar,
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper>
                <StudentCourseDetailHeader
                    course={course}
                    handleOpen={() => setOpen(true)}
                />
                <FlatTable
                    title={'Course Instances'}
                    data={parseInstancesToTableData(course.instances)}
                    columns={columns}
                    options={options}
                />
                <FlatTable
                    title={'Upcoming Course Absences'}
                    data={parseAbsencesToTableData(course.absences)}
                    columns={absencesColumns}
                    options={absencesOptions}
                />
                <StudentAbsenceDialog
                    open={open}
                    course={course}
                    handleLogAbsence={handleLogAbsence}
                    handleClose={handleClose}
                />
            </Paper>
        </MuiPickersUtilsProvider>
    );
};

StudentCourseDetail.propTypes = {
    course: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logCourseAbsence: PropTypes.func.isRequired,
    clearCourseAbsence: PropTypes.func.isRequired,
    logParticipantAbsence: PropTypes.func.isRequired,
    clearParticipantAbsence: PropTypes.func.isRequired,
};

export default compose(
    withUser,
    withRouter
)(StudentCourseDetail);
