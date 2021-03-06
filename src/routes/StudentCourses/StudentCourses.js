import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NoToolbarTable } from 'components';
import { parseCoursesToTableData } from './parse';

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
        name: 'Studio',
    },
];

const StudentCourses = ({ courses, history }) => {
    const handleNavigateToClassDetail = rowData => {
        history.push({
            pathname: './studentCourseDetail',
            search: `id=${rowData[0]}`,
        });
    };

    const options = {
        responsive: 'scroll',
        selectableRows: 'none',
        onRowClick: handleNavigateToClassDetail,
    };
    return (
        <NoToolbarTable
            title={'Your Courses'}
            data={parseCoursesToTableData(courses)}
            columns={columns}
            options={options}
        />
    );
};

StudentCourses.propTypes = {
    courses: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentCourses);
