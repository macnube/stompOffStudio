import React, { Component } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import { parseCourseStudentsToTableData } from 'routes/CourseInstance/parse';
import SelectedAddParticipantToolbar from './SelectedAddParticipantToolbar';
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
    {
        name: 'Role',
    },
];

class AddParticipantToInstanceDialog extends Component {
    //Having to add each individually because prisma has a bug
    //where cascading adds don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleAddParticipantPress = status => ids => {
        const { createParticipant, courseInstanceId, handleClose } = this.props;

        forEach(ids, courseStudentId => {
            createParticipant({
                variables: {
                    courseInstanceId,
                    courseStudentId,
                    status,
                },
            });
        });
        handleClose();
    };

    render() {
        const {
            courseStudents,
            open,
            handleClose,
            participantCourseStudentIds,
        } = this.props;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedAddParticipantToolbar
                    selectedRows={selectedRows}
                    displayData={displayData}
                    handleAddParticipantPress={this.handleAddParticipantPress}
                />
            ),
        };
        return (
            <FullScreenDialog
                open={open}
                title={'Add Participants'}
                handleClose={handleClose}
            >
                <MUIDataTable
                    title={'Students'}
                    data={parseCourseStudentsToTableData(
                        courseStudents,
                        participantCourseStudentIds
                    )}
                    columns={columns}
                    options={options}
                />
            </FullScreenDialog>
        );
    }
}

AddParticipantToInstanceDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    courseStudents: PropTypes.array.isRequired,
    createParticipant: PropTypes.func.isRequired,
    courseInstanceId: PropTypes.string.isRequired,
    participantCourseStudentIds: PropTypes.array.isRequired,
};

export default AddParticipantToInstanceDialog;
