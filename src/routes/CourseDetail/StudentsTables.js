import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import { CustomAddToolbar, SelectedAddToolbar, FlatTable } from 'components';
import AddStudentsToCourseDialog from './AddStudentsToCourseDialog';
import {
    parseActiveCourseStudentsToTableData,
    parseCourseStudentsByStatusToTableData,
} from './parse';
import { DANCE_ROLE, COURSE_STUDENT_STATUS } from 'constants/gql';
import SelectedCourseStudentToolbar from './SelectedCourseStudentToolbar';
import SelectedAddStudentWithWaitlistStatusToolbar from './SelectedAddStudentWithWaitlistStatusToolbar';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'STUDENT_ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Name',
    },
    {
        name: 'Email',
    },
];

const waitlistColumns = [
    ...columns,
    {
        name: 'Waitlist Date',
    },
];

const StudentsTables = ({
    course,
    openLeaders,
    openFollowers,
    openWaitlist,
    handleOpenDialog,
    createCourseStudent,
    updateCourseStudentStatus,
    handleClose,
    history,
}) => {
    const handleNavigateToStudentDetail = rowData => {
        history.push({
            pathname: './studentDetail',
            search: `id=${rowData[1]}`,
        });
    };

    const handleAddAsRolePress = role => ids => {
        forEach(ids, studentId => {
            createCourseStudent({
                variables: {
                    courseId: course.id,
                    studentId,
                    role,
                    status: COURSE_STUDENT_STATUS.ACTIVE,
                },
            });
        });
        handleClose();
    };

    const handleAddWithWaitlistStatusPress = role => ids => {
        forEach(ids, studentId => {
            createCourseStudent({
                variables: {
                    courseId: course.id,
                    studentId,
                    role,
                    status: COURSE_STUDENT_STATUS.WAITLIST,
                },
            });
        });
        handleClose();
    };

    const handleUpdateCourseStudentStatus = status => ids => {
        forEach(ids, id => {
            updateCourseStudentStatus({
                variables: {
                    id,
                    status,
                },
            });
        });
    };

    const renderStudentsSelectedToolbar = (selectedRows, displayData) => (
        <SelectedCourseStudentToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleUpdateCourseStudentStatus={handleUpdateCourseStudentStatus}
        />
    );

    const renderDialogLeaderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedAddToolbar
            title="Add as leader"
            selectedRows={selectedRows}
            displayData={displayData}
            handleAddPress={handleAddAsRolePress(DANCE_ROLE.LEADER)}
        />
    );

    const renderDialogFollowerSelectedToolbar = (selectedRows, displayData) => (
        <SelectedAddToolbar
            title="Add as follower"
            selectedRows={selectedRows}
            displayData={displayData}
            handleAddPress={handleAddAsRolePress(DANCE_ROLE.FOLLOWER)}
        />
    );

    const renderDialogWaitlistSelectedToolbar = (selectedRows, displayData) => (
        <SelectedAddStudentWithWaitlistStatusToolbar
            title="Add Students to waitlist"
            selectedRows={selectedRows}
            displayData={displayData}
            handleAddWithWaitlistStatusPress={handleAddWithWaitlistStatusPress}
        />
    );

    const renderLeadersToolbar = () => (
        <CustomAddToolbar
            title={'Add Leaders'}
            handleAddPress={() => handleOpenDialog('openCourseLeadersForm')}
        />
    );

    const renderFollowersToolbar = () => (
        <CustomAddToolbar
            title={'Add Followers'}
            handleAddPress={() => handleOpenDialog('openCourseFollowersForm')}
        />
    );

    const renderWaitlistToolbar = () => (
        <CustomAddToolbar
            title={'Add to Waitlist'}
            handleAddPress={() => handleOpenDialog('openCourseWaitlistForm')}
        />
    );

    const studentOptions = {
        responsive: 'scroll',
        onRowClick: handleNavigateToStudentDetail,
        customToolbarSelect: renderStudentsSelectedToolbar,
    };
    const leadersOptions = {
        ...studentOptions,
        customToolbar: renderLeadersToolbar,
    };
    const followersOptions = {
        ...studentOptions,
        customToolbar: renderFollowersToolbar,
    };
    const waitlistOptions = {
        ...studentOptions,
        customToolbar: renderWaitlistToolbar,
    };

    return (
        <Fragment>
            <FlatTable
                title={'Leaders'}
                data={parseActiveCourseStudentsToTableData(
                    course.courseStudents,
                    DANCE_ROLE.LEADER
                )}
                columns={columns}
                options={leadersOptions}
            />
            <FlatTable
                title={'Followers'}
                data={parseActiveCourseStudentsToTableData(
                    course.courseStudents,
                    DANCE_ROLE.FOLLOWER
                )}
                columns={columns}
                options={followersOptions}
            />
            <FlatTable
                title={'Waitlist'}
                data={parseCourseStudentsByStatusToTableData(
                    course.courseStudents,
                    COURSE_STUDENT_STATUS.WAITLIST
                )}
                columns={waitlistColumns}
                options={waitlistOptions}
            />
            <FlatTable
                title={'Inactive'}
                data={parseCourseStudentsByStatusToTableData(
                    course.courseStudents,
                    COURSE_STUDENT_STATUS.INACTIVE
                )}
                columns={columns}
                options={studentOptions}
            />
            {course && course.id ? (
                <AddStudentsToCourseDialog
                    open={openLeaders}
                    handleClose={handleClose}
                    customToolbarSelect={renderDialogLeaderSelectedToolbar}
                    title="Add Students as Leader"
                    courseId={course.id}
                />
            ) : null}
            {course && course.id ? (
                <AddStudentsToCourseDialog
                    open={openFollowers}
                    handleClose={handleClose}
                    customToolbarSelect={renderDialogFollowerSelectedToolbar}
                    title="Add Students as Follower"
                    courseId={course.id}
                />
            ) : null}
            {course && course.id ? (
                <AddStudentsToCourseDialog
                    open={openWaitlist}
                    handleClose={handleClose}
                    customToolbarSelect={renderDialogWaitlistSelectedToolbar}
                    title="Add Students to Waitlist"
                    courseId={course.id}
                />
            ) : null}
        </Fragment>
    );
};

StudentsTables.propTypes = {
    course: PropTypes.object.isRequired,
    handleOpenDialog: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    createCourseStudent: PropTypes.func.isRequired,
    updateCourseStudentStatus: PropTypes.func.isRequired,
    openLeaders: PropTypes.bool.isRequired,
    openFollowers: PropTypes.bool.isRequired,
    openWaitlist: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentsTables);
