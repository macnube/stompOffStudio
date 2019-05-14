import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';

import { CustomAddToolbar, SelectedDeleteToolbar, FlatTable } from 'components';
import AddTeacherDialog from './AddTeacherDialog';
import { parseTeachersToTableData } from '../parse';

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
    course,
    open,
    handleAdd,
    removeTeacherFromCourse,
    handleClose,
}) => {
    const handleOnDeletePress = ids => {
        forEach(ids, teacherId => {
            removeTeacherFromCourse({
                variables: { id: course.id, teacherId },
            });
        });
    };

    const handleNavigateToTeacherManagement = () => {
        this.props.history.push({
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
                data={parseTeachersToTableData(course.teachers)}
                columns={columns}
                options={options}
            />
            {course && course.id ? (
                <AddTeacherDialog
                    open={open}
                    handleClose={handleClose}
                    courseId={course.id}
                />
            ) : null}
        </Fragment>
    );
};

TeachersTable.propTypes = {
    course: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    removeTeacherFromCourse: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withRouter(TeachersTable);
