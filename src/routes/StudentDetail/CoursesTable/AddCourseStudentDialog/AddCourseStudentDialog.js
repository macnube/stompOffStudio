import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import some from 'lodash/some';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import SelectedAddCourseStudentToolbar from './SelectedAddCourseStudentToolbar';
import { FullScreenDialog } from 'src/components';

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
            if (some(course.courseStudents, { student: { id: studentId } })) {
                return acc;
            }
            const {
                id,
                name,
                startTime,
                duration,
                courseStudents,
                studentLimit,
            } = course;
            const leaders = filter(
                courseStudents,
                courseStudent => courseStudent.role === 'Leader'
            );
            const followers = filter(
                courseStudents,
                courseStudent => courseStudent.role === 'Follower'
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

class AddCourseStudentDialog extends Component {
    //Having to add each individually because prisma has a bug
    //where cascading adds don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleAddAsRolePress = (ids, role) => {
        const { createCourseStudent, studentId, handleClose } = this.props;

        forEach(ids, courseId => {
            createCourseStudent({ variables: { courseId, studentId, role } });
        });

        handleClose();
    };

    render() {
        const { courses, open, handleClose, studentId } = this.props;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedAddCourseStudentToolbar
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

AddCourseStudentDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courses: PropTypes.array.isRequired,
    createCourseStudent: PropTypes.func.isRequired,
    studentId: PropTypes.string.isRequired,
};

export default AddCourseStudentDialog;
