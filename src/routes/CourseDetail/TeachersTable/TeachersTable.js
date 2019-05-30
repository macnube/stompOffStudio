import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import {
    CustomAddToolbar,
    SelectedDeleteToolbar,
    FlatTable,
} from '~/components';
import AddTeacherDialog from './AddTeacherDialog';

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
        name: 'email',
    },
];

const TeachersTable = ({
    courseId,
    open,
    handleAdd,
    removeTeacherFromCourse,
    handleClose,
    history,
    data,
}) => {
    const handleOnDeletePress = ids => {
        forEach(ids, teacherId => {
            removeTeacherFromCourse({
                variables: { id: courseId, teacherId },
            });
        });
    };

    const handleNavigateToTeacherManagement = () => {
        history.push({
            pathname: './teacherManagement',
        });
    };

    const renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={handleOnDeletePress}
        />
    );

    const renderToolbar = () => (
        <CustomAddToolbar title={'Add Teacher'} handleAddPress={handleAdd} />
    );

    const options = {
        responsive: 'scroll',
        onRowClick: handleNavigateToTeacherManagement,
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
    };
    return (
        <Fragment>
            <FlatTable
                title={'Teachers'}
                data={data}
                columns={columns}
                options={options}
            />
            <AddTeacherDialog
                open={open}
                handleClose={handleClose}
                courseId={courseId}
            />
        </Fragment>
    );
};

TeachersTable.propTypes = {
    courseId: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    removeTeacherFromCourse: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default React.memo(TeachersTable);
