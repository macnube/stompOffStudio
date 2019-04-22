import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import some from 'lodash/some';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import SelectedAddCourseStudentToolbar from './SelectedAddCourseStudentToolbar';
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
        name: 'Email',
    },
];

const parseStudentsToTableData = (students, courseId) =>
    reduce(
        students,
        (acc, student) => {
            console.log('student is: ', student);
            console.log(
                'some check: ',
                some(student.courses, { course: { id: courseId } })
            );
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
    handleAddAsRolePress = (ids, role) => {
        const { createCourseStudent, courseId } = this.props;

        forEach(ids, studentId => {
            createCourseStudent({
                variables: {
                    courseId,
                    studentId,
                    role,
                },
            });
        });
    };

    render() {
        const { students, open, handleClose, courseId, title } = this.props;
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
                title={title}
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
    title: PropTypes.string.isRequired,
};

export default AddStudentsToCourseForm;
