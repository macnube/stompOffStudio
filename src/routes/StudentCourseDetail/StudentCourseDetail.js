import 'date-fns';
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import StudentCourseDetailHeader from './StudentCourseDetailHeader';
import { FlatTable } from 'components';
import { parseInstancesToTableData } from './parse';

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
];

const StudentCourseDetail = ({ course, history }) => {
    const handleNavigateToInstance = rowData => {
        history.push({
            pathname: './studentCourseInstance',
            search: `id=${rowData[0]}`,
        });
    };
    const options = {
        responsive: 'scroll',
        selectableRows: 'none',
        onRowClick: handleNavigateToInstance,
    };
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper>
                <StudentCourseDetailHeader course={course} />
                <FlatTable
                    title={'Course Instances'}
                    data={parseInstancesToTableData(course.instances)}
                    columns={columns}
                    options={options}
                />
            </Paper>
        </MuiPickersUtilsProvider>
    );
};

StudentCourseDetail.propTypes = {
    course: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentCourseDetail);
