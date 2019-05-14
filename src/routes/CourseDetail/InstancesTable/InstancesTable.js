import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import map from 'lodash/map';

import { CustomAddToolbar, SelectedDeleteToolbar, FlatTable } from 'components';
import AddInstanceDialog from './AddInstanceDialog';
import { parseInstancesToTableData } from '../parse';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Date',
    },
    {
        name: 'Topic',
    },
    {
        name: '# of Attendees',
    },
    {
        name: '# of Absentees',
    },
];

const InstancesTable = ({
    course,
    open,
    handleAdd,
    createCourseInstance,
    deleteCourseInstance,
    handleClose,
}) => {
    const handleCreate = instance => {
        const { topic, notes, recapUrl, date } = instance;
        const courseStudentIds = map(
            course.courseStudents,
            courseStudent => courseStudent.id
        );
        createCourseInstance({
            variables: {
                topic,
                notes,
                recapUrl,
                date,
                courseId: course.id,
                courseStudentIds,
            },
        });
        this.handleClose();
    };

    const handleOnDeletePress = ids => {
        forEach(ids, id => {
            deleteCourseInstance({
                variables: { id },
            });
        });
    };

    const handleNavigateToInstance = rowData => {
        this.props.history.push({
            pathname: './courseInstance',
            search: `id=${rowData[0]}`,
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
            <FlatTable
                title={'Course Instances'}
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
        </Fragment>
    );
};

InstancesTable.propTypes = {
    course: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    createCourseInstance: PropTypes.func.isRequired,
    deleteCourseInstance: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withRouter(InstancesTable);
