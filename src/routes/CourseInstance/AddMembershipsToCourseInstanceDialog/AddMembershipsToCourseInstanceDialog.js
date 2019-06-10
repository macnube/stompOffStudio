import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
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

const parseStudentsToTableData = (students, courseInstance) => {
    const currentParticipantStudentIds = map(
        courseInstance.participants,
        participant => participant.student.id
    );
    return reduce(
        students,
        (acc, student) => {
            if (includes(currentParticipantStudentIds, student.id)) {
                return acc;
            }
            const { id, name, email } = student;
            const result = [id, name, email];
            acc.push(result);
            return acc;
        },
        []
    );
};

const AddMembershipsToCourseInstanceDialog = ({
    students,
    open,
    handleClose,
    courseInstance,
    addParticipantToCourseInstance,
}) => {
    const handleAddPress = ids => {
        forEach(ids, studentId => {
            addParticipantToCourseInstance({
                variables: { id: courseInstance.id, studentId },
            });
        });

        handleClose();
    };

    const customToolbarSelect = (selectedRows, displayData) => (
        <SelectedAddToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            title={'Add Student'}
            handleAddPress={handleAddPress}
        />
    );

    const options = {
        responsive: 'scroll',
        customToolbarSelect,
    };

    return (
        <FullScreenDialog
            open={open}
            title={'Add Students as a Participant'}
            handleClose={handleClose}
        >
            <MUIDataTable
                title={'Students'}
                data={parseStudentsToTableData(students, courseInstance)}
                columns={columns}
                options={options}
            />
        </FullScreenDialog>
    );
};

AddMembershipsToCourseInstanceDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    addParticipantToCourseInstance: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
    courseInstance: PropTypes.object.isRequired,
};

export default AddMembershipsToCourseInstanceDialog;
