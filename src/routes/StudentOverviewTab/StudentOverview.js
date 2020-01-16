import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import { NoToolbarTable } from 'components';
import { parseCardToTableData, parseAbsencesToTableData } from './parse';

const cardColumns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Classes Left',
    },
    {
        name: 'Expiration Date',
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

        const { card, absences } = this.props;

        return (
            <Paper>
                <NoToolbarTable
                    title={'Active Card'}
                    data={parseCardToTableData(card)}
                    columns={cardColumns}
                    options={instanceOptions}
                />
                <NoToolbarTable
                    title={'Upcoming Course Absences'}
                    data={parseAbsencesToTableData(absences)}
                    columns={absencesColumns}
                    options={absencesOptions}
                />
            </Paper>
        );
    }
}

StudentOverview.propTypes = {
    card: PropTypes.object.isRequired,
    absences: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentOverview);
