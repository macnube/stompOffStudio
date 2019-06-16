import React from 'react';
import PropTypes from 'prop-types';

import forEach from 'lodash/forEach';

import MUIDataTable from 'mui-datatables';

import { FullScreenDialog, SelectedAddToolbar } from 'components';
import { parseMembershipsToTableData } from './parse';

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

const AddMembershipsToCourseInstanceDialog = ({
    memberships,
    open,
    handleClose,
    courseInstance,
    addParticipantToCourseInstance,
}) => {
    const handleAddPress = ids => {
        forEach(ids, membershipId => {
            addParticipantToCourseInstance({
                variables: { id: courseInstance.id, membershipId },
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
                data={parseMembershipsToTableData(memberships, courseInstance)}
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
    memberships: PropTypes.array.isRequired,
    courseInstance: PropTypes.object.isRequired,
};

export default AddMembershipsToCourseInstanceDialog;
