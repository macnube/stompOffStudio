import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { isAfter, parseISO } from 'date-fns';
import { withRouter } from 'react-router-dom';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { parseInstancesToTableData, parseCardsToTableData } from './parse';

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

const cardsColumns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Student',
    },
    {
        name: 'Value',
    },
    {
        name: 'Expiration Date',
    },
    {
        name: 'Remaining Value',
    },
];

class Overview extends React.Component {
    getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MuiPaper: {
                    elevation4: {
                        boxShadow: '0 0 0 0',
                    },
                },
            },
        });

    navigateToInstance = instanceId => {
        this.props.history.push({
            pathname: './courseInstance',
            search: `id=${instanceId}`,
        });
    };

    handleNavigateToInstance = rowData => {
        this.navigateToInstance(rowData[0]);
    };

    navigateToStudent = studentId => {
        this.props.history.push({
            pathname: './studentDetail',
            search: `id=${studentId}`,
        });
    };

    handleNavigateToStudent = rowData => {
        this.navigateToStudent(rowData[0]);
    };

    render() {
        const instanceOptions = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: this.handleNavigateToInstance,
        };

        const cardOptions = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: this.handleNavigateToStudent,
        };

        const { instances, unpaidCards } = this.props;
        const now = new Date();
        const recentInstances = filter(instances, instance => {
            return isAfter(now, parseISO(instance.date));
        });
        const upcomingInstances = filter(instances, instance =>
            isAfter(parseISO(instance.date), now)
        );
        return (
            <Paper>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title={'Unpaid Cards'}
                        data={parseCardsToTableData(unpaidCards)}
                        columns={cardsColumns}
                        options={cardOptions}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title={'Recent Instances'}
                        data={parseInstancesToTableData(recentInstances)}
                        columns={instanceColumns}
                        options={instanceOptions}
                    />
                </MuiThemeProvider>
                <MuiThemeProvider theme={this.getMuiTheme()}>
                    <MUIDataTable
                        title={'Upcoming Instances'}
                        data={parseInstancesToTableData(upcomingInstances)}
                        columns={instanceColumns}
                        options={instanceOptions}
                    />
                </MuiThemeProvider>
            </Paper>
        );
    }
}

Overview.propTypes = {
    instances: PropTypes.array.isRequired,
    unpaidCards: PropTypes.array.isRequired,
};

export default withRouter(Overview);
