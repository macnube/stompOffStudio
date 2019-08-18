import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ClickableTable } from 'components';
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
    {
        name: 'Room',
    },
    {
        name: 'Teachers',
    },
    {
        name: 'Day',
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
        <ClickableTable
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
