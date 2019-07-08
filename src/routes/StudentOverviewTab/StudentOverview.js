import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { isAfter, parseISO } from 'date-fns';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import { FlatTable } from 'components';
import { parseInstancesToTableData, parseAbsencesToTableData } from './parse';

const instanceColumns = [
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
        name: 'Class Name',
    },
    {
        name: 'Topic',
    },
    {
        name: '# of Leaders',
    },
    {
        name: '# of Followers',
    },
];

const absencesColumns = [
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
        name: 'Course',
    },
];

class StudentOverview extends React.Component {
    navigateToInstance = instanceId => {
        this.props.history.push({
            pathname: './studentCourseInstance',
            search: `id=${instanceId}`,
        });
    };

    handleNavigateToInstance = rowData => {
        this.navigateToInstance(rowData[0]);
    };

    handleNavigateToCourseDetail = rowData => {
        this.props.history.push({
            pathname: './studentCourseDetail',
            search: `id=${rowData[0]}`,
        });
    };

    render() {
        const instanceOptions = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: this.handleNavigateToInstance,
        };

        const absencesOptions = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: this.handleNavigateToCourseDetail,
        };

        const { instances, absences } = this.props;
        const now = new Date();
        const recentInstances = filter(instances, instance => {
            return isAfter(now, parseISO(instance.date));
        });
        const upcomingInstances = filter(instances, instance =>
            isAfter(parseISO(instance.date), now)
        );

        return (
            <Paper>
                <FlatTable
                    title={'Upcoming Classes'}
                    data={parseInstancesToTableData(upcomingInstances)}
                    columns={instanceColumns}
                    options={instanceOptions}
                />
                <FlatTable
                    title={'Upcoming Course Absences'}
                    data={parseAbsencesToTableData(absences)}
                    columns={absencesColumns}
                    options={absencesOptions}
                />
                <FlatTable
                    title={'Recent Classes'}
                    data={parseInstancesToTableData(recentInstances)}
                    columns={instanceColumns}
                    options={instanceOptions}
                />
            </Paper>
        );
    }
}

StudentOverview.propTypes = {
    instances: PropTypes.array.isRequired,
    absences: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentOverview);
