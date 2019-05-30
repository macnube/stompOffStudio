import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import find from 'lodash/find';

import {
    CustomAddToolbar,
    SelectedDeleteToolbar,
    FlatTable,
} from 'src/components';
import { parseCourseStudentsToTableData } from 'src/routes/StudentDetail/parse';
import AddCourseStudentDialog from './AddCourseStudentDialog';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Class Name',
    },
    {
        name: 'Role',
    },
];

const CardsTable = ({
    student,
    open,
    handleAdd,
    deleteCourseStudent,
    handleClose,
    history,
}) => {
    const handleOnDeletePress = ids => {
        forEach(ids, id => {
            deleteCourseStudent({
                variables: { id },
            });
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
        <CustomAddToolbar title={'Add to Course'} handleAddPress={handleAdd} />
    );

    const handleOnCourseClick = rowData => {
        const courseStudent = find(student.courses, {
            id: rowData[0],
        });
        history.push({
            pathname: './courseDetail',
            search: `id=${courseStudent.course.id}`,
        });
    };

    const options = {
        responsive: 'scroll',
        onRowClick: handleOnCourseClick,
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
    };
    return (
        <Fragment>
            <FlatTable
                title={'Active Registered Courses'}
                data={parseCourseStudentsToTableData(student.courses)}
                columns={columns}
                options={options}
            />
            <AddCourseStudentDialog
                open={open}
                handleClose={handleClose}
                studentId={student.id}
            />
        </Fragment>
    );
};

CardsTable.propTypes = {
    student: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    deleteCourseStudent: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default React.memo(CardsTable);
