import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import { FullScreenDialog } from 'components';
import { parseStudentsToTableData } from './parse';

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
