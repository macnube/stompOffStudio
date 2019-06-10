import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import some from 'lodash/some';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import SelectedAddMembershipToolbar from './SelectedAddMembershipToolbar';
import { FullScreenDialog } from 'components';

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
    {
        name: 'Start Time',
    },
    {
        name: 'Duration',
    },
    {
        name: '# of Leaders',
    },
    {
        name: '# of Followers',
    },
    {
        name: 'Student Limit',
    },
];

const parseCoursesToTableData = (courses, studentId) =>
    reduce(
        courses,
        (acc, course) => {
            if (some(course.memberships, { student: { id: studentId } })) {
                return acc;
            }
            const {
                id,
                name,
                startTime,
                duration,
                memberships,
                studentLimit,
            } = course;
            const leaders = filter(
                memberships,
                membership => membership.role === 'Leader'
            );
            const followers = filter(
                memberships,
                membership => membership.role === 'Follower'
            );
            const result = [
                id,
                name,
                startTime,
                duration,
                leaders.length,
                followers.length,
                studentLimit,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

class AddMembershipDialog extends Component {
    //Having to add each individually because prisma has a bug
    //where cascading adds don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleAddAsRolePress = (ids, role) => {
        const { createMembership, studentId, handleClose } = this.props;

        forEach(ids, courseId => {
            createMembership({ variables: { courseId, studentId, role } });
        });

        handleClose();
    };

    render() {
        const { courses, open, handleClose, studentId } = this.props;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedAddMembershipToolbar
                    selectedRows={selectedRows}
                    displayData={displayData}
                    handleAddAsRolePress={this.handleAddAsRolePress}
                />
            ),
        };
        return (
            <FullScreenDialog
                open={open}
                title={'Add Student to Courses'}
                handleClose={handleClose}
            >
                <MUIDataTable
                    title={'Courses'}
                    data={parseCoursesToTableData(courses, studentId)}
                    columns={columns}
                    options={options}
                />
            </FullScreenDialog>
        );
    }
}

AddMembershipDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    createMembership: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
};

export default AddMembershipDialog;
