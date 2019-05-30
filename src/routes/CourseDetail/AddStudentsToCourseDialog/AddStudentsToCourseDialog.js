import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import some from 'lodash/some';
import MUIDataTable from 'mui-datatables';

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

const AddStudentsToCourseDialog = ({
    students,
    open,
    handleClose,
    customToolbarSelect,
    title,
    courseId,
}) => {
    const options = {
        responsive: 'scroll',
        customToolbarSelect,
    };

    return (
        <FullScreenDialog open={open} title={title} handleClose={handleClose}>
            <MUIDataTable
                title={'Students'}
                data={parseStudentsToTableData(students, courseId)}
                columns={columns}
                options={options}
            />
        </FullScreenDialog>
    );
};

AddStudentsToCourseDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    customToolbarSelect: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
};

export default AddStudentsToCourseDialog;
