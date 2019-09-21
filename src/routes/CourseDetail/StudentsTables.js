import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';
import Grid from '@material-ui/core/Grid';

import { CustomAddToolbar, SelectedAddToolbar } from 'components';
import AddStudentsToCourseDialog from './AddStudentsToCourseDialog';
import {
    parseActiveMembershipsToTableData,
    parseMembershipsByStatusToTableData,
} from './parse';
import { DANCE_ROLE, MEMBERSHIP_STATUS } from 'constants/gql';
import SelectedMembershipToolbar from './SelectedMembershipToolbar';
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

const inactiveColumns = [
    ...columns,
    {
        name: 'Role',
    },
];

const waitlistColumns = [
    ...inactiveColumns,

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
    createMembership,
    updateMembershipStatus,
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
            createMembership({
                variables: {
                    courseId: course.id,
                    studentId,
                    role,
                    status: MEMBERSHIP_STATUS.ACTIVE,
                },
            });
        });
        handleClose();
    };

    const handleAddWithWaitlistStatusPress = role => ids => {
        forEach(ids, studentId => {
            createMembership({
                variables: {
                    courseId: course.id,
                    studentId,
                    role,
                    status: MEMBERSHIP_STATUS.WAITLIST,
                },
            });
        });
        handleClose();
    };

    const handleUpdateMembershipStatus = status => ids => {
        forEach(ids, id => {
            updateMembershipStatus({
                variables: {
                    id,
                    status,
                },
            });
        });
    };

    const renderStudentsSelectedToolbar = (selectedRows, displayData) => (
        <SelectedMembershipToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleUpdateMembershipStatus={handleUpdateMembershipStatus}
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
            <Grid item xs={12}>
                <MUIDataTable
                    title={'Leaders'}
                    data={parseActiveMembershipsToTableData(
                        course.memberships,
                        DANCE_ROLE.LEADER
                    )}
                    columns={columns}
                    options={leadersOptions}
                />
            </Grid>
            <Grid item xs={12}>
                <MUIDataTable
                    title={'Followers'}
                    data={parseActiveMembershipsToTableData(
                        course.memberships,
                        DANCE_ROLE.FOLLOWER
                    )}
                    columns={columns}
                    options={followersOptions}
                />
            </Grid>
            <Grid item xs={12}>
                <MUIDataTable
                    title={'Waitlist'}
                    data={parseMembershipsByStatusToTableData(
                        course.memberships,
                        MEMBERSHIP_STATUS.WAITLIST
                    )}
                    columns={waitlistColumns}
                    options={waitlistOptions}
                />
            </Grid>
            <Grid item xs={12}>
                <MUIDataTable
                    title={'Inactive'}
                    data={parseMembershipsByStatusToTableData(
                        course.memberships,
                        MEMBERSHIP_STATUS.INACTIVE
                    )}
                    columns={inactiveColumns}
                    options={studentOptions}
                />
            </Grid>
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
    createMembership: PropTypes.func.isRequired,
    updateMembershipStatus: PropTypes.func.isRequired,
    openLeaders: PropTypes.bool.isRequired,
    openFollowers: PropTypes.bool.isRequired,
    openWaitlist: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentsTables);
