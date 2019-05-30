import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import { SelectedAddToolbar, FullScreenDialog } from '~/components';
import { parseTeachersToTableData } from '~/routes/CourseDetail/parse';

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

class AddTeacherForm extends Component {
    //Having to delete each teacher individually because prisma has a bug
    //where cascading deletes don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleAddPress = ids => {
        const { addTeacherToCourse, courseId, handleClose } = this.props;

        forEach(ids, teacherId => {
            addTeacherToCourse({ variables: { id: courseId, teacherId } });
        });

        handleClose();
    };

    render() {
        const { teachers, open, handleClose } = this.props;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedAddToolbar
                    selectedRows={selectedRows}
                    displayData={displayData}
                    title={'Add Teacher'}
                    handleAddPress={this.handleAddPress}
                />
            ),
        };
        return (
            <FullScreenDialog
                open={open}
                title={'Add Teachers'}
                handleClose={handleClose}
            >
                <MUIDataTable
                    title={'Teachers'}
                    data={parseTeachersToTableData(teachers)}
                    columns={columns}
                    options={options}
                />
            </FullScreenDialog>
        );
    }
}

AddTeacherForm.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    addTeacherToCourse: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
};

export default AddTeacherForm;
