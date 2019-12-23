import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';

import { CustomAddToolbar, SelectedDeleteToolbar } from 'components';
import AddInstanceDialog from './AddInstanceDialog';
import CancelInstanceDialog from './CancelInstanceDialog';
import { parseInstancesToTableData } from '../parse';
import { MEMBERSHIP_STATUS } from 'constants/gql';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'CANCELLED',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Date',
    },
    {
        name: '# of Leaders',
    },
    {
        name: '# of Followers',
    },
];

const InstancesTable = ({
    course,
    open,
    handleOnError,
    cancelCourseInstance,
    handleAdd,
    createCourseInstance,
    deleteCourseInstance,
    handleClose,
    history,
}) => {
    const [instanceId, setInstanceId] = useState('');
    const [openCancelInstanceDialog, setOpenCancelInstanceDialog] = useState(
        false
    );

    const handleCreate = date => {
        const membershipIds = reduce(
            course.memberships,
            (result, membership) => {
                if (membership.status === MEMBERSHIP_STATUS.ACTIVE) {
                    result.push(membership.id);
                    return result;
                }
                return result;
            },
            []
        );
        createCourseInstance({
            variables: {
                date,
                courseId: course.id,
                membershipIds,
            },
        });
        handleClose();
    };

    const handleOnDeletePress = ids => {
        forEach(ids, id => {
            deleteCourseInstance({
                variables: { id },
            });
        });
    };

    const handleOnCancelPress = (ids, displayData) => {
        if (ids.length > 1) {
            handleOnError(
                'Please only select one instance at a time to cancel'
            );
        }
        const instanceRow = find(displayData, d => {
            return d.data[0] === ids[0];
        });
        const isCancelled = instanceRow.data[1];
        if (isCancelled) {
            handleOnError('This instance has already been cancelled.');
        } else {
            setInstanceId(ids[0]);
            setOpenCancelInstanceDialog(true);
        }
    };

    const handleCancel = id => {
        cancelCourseInstance({
            variables: { id },
        });
        handleCloseCancelDialog();
        // console.log('id to cancel is: ', id);
    };

    const handleCloseCancelDialog = () => {
        setInstanceId('');
        setOpenCancelInstanceDialog(false);
    };

    const handleNavigateToInstance = rowData => {
        history.push({
            pathname: './courseInstance',
            search: `id=${rowData[0]}`,
        });
    };
    const renderSelectedToolbar = (selectedRows, displayData) => {
        return (
            <SelectedDeleteToolbar
                selectedRows={selectedRows}
                displayData={displayData}
                handleOnDeletePress={handleOnDeletePress}
                renderChildren={selectedIds => (
                    <IconButton
                        onClick={() =>
                            handleOnCancelPress(selectedIds, displayData)
                        }
                    >
                        <CancelIcon />
                    </IconButton>
                )}
            />
        );
    };

    const renderToolbar = () => (
        <CustomAddToolbar
            title={'Add a Course Instance'}
            handleAddPress={handleAdd}
        />
    );

    const options = {
        responsive: 'scroll',
        onRowClick: handleNavigateToInstance,
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
    };

    return (
        <Fragment>
            <MUIDataTable
                title={'Course History'}
                data={parseInstancesToTableData(course.instances)}
                columns={columns}
                options={options}
            />
            {course ? (
                <AddInstanceDialog
                    open={open}
                    handleClose={handleClose}
                    course={course}
                    handleCreate={handleCreate}
                />
            ) : null}
            {instanceId ? (
                <CancelInstanceDialog
                    open={openCancelInstanceDialog}
                    handleClose={handleCloseCancelDialog}
                    instance={find(course.instances, { id: instanceId })}
                    handleCancel={handleCancel}
                />
            ) : null}
        </Fragment>
    );
};

InstancesTable.propTypes = {
    course: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOnError: PropTypes.func.isRequired,
    createCourseInstance: PropTypes.func.isRequired,
    deleteCourseInstance: PropTypes.func.isRequired,
    cancelCourseInstance: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(InstancesTable);
