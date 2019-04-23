import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import some from 'lodash/some';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import { FullScreenDialog, SelectedAddToolbar } from 'components';

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
        name: 'Email',
    },
];

const parseStudentsToTableData = (students, courseId) =>
    reduce(
        students,
        (acc, student) => {
            if (some(student.courses, { course: { id: courseId } })) {
                return acc;
            }
            const { id, name, email } = student;
            const result = [id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );

class AddStudentsToCourseForm extends Component {
    //Having to add each individually because prisma has a bug
    //where cascading adds don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleAddAsRolePress = role => ids => {
        const { createCourseStudent, courseId, handleClose } = this.props;

        forEach(ids, studentId => {
            createCourseStudent({
                variables: {
                    courseId,
                    studentId,
                    role,
                },
            });
        });
        handleClose();
    };

    render() {
        const { students, open, handleClose, courseId, role } = this.props;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedAddToolbar
                    title={`Add as ${role}`}
                    selectedRows={selectedRows}
                    displayData={displayData}
                    handleAddPress={this.handleAddAsRolePress(role)}
                />
            ),
        };
        return (
            <FullScreenDialog
                open={open}
                title={`Add Students as ${role}`}
                handleClose={handleClose}
            >
                <MUIDataTable
                    title={'Students'}
                    data={parseStudentsToTableData(students, courseId)}
                    columns={columns}
                    options={options}
                />
            </FullScreenDialog>
        );
    }
}

AddStudentsToCourseForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    createCourseStudent: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['Leader', 'Follower', 'Solo']).isRequired,
};

export default AddStudentsToCourseForm;
