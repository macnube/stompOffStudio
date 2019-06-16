import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';
import { isAfter, parseISO } from 'date-fns';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

import { FlatTable } from 'components';
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
        name: 'Value',
    },
    {
        name: 'Expiration Date',
    },
    {
        name: 'Remaining Value',
    },
];

class StudentOverview extends React.Component {
    navigateToInstance = instanceId => {
        this.props.history.push({
            pathname: './courseInstance',
            search: `id=${instanceId}`,
        });
    };

    handleNavigateToInstance = rowData => {
        this.navigateToInstance(rowData[0]);
    };

    handleNavigateToCardDetail = rowData => {
        this.props.history.push({
            pathname: './cardDetail',
            search: `id=${rowData[0]}`,
        });
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
            onRowClick: this.handleNavigateToCardDetail,
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
                <FlatTable
                    title={'Unpaid Cards'}
                    data={parseCardsToTableData(unpaidCards)}
                    columns={cardsColumns}
                    options={cardOptions}
                />
                <FlatTable
                    title={'Recent Classes'}
                    data={parseInstancesToTableData(recentInstances)}
                    columns={instanceColumns}
                    options={instanceOptions}
                />
                <FlatTable
                    title={'Upcoming Classes'}
                    data={parseInstancesToTableData(upcomingInstances)}
                    columns={instanceColumns}
                    options={instanceOptions}
                />
            </Paper>
        );
    }
}

StudentOverview.propTypes = {
    instances: PropTypes.array.isRequired,
    unpaidCards: PropTypes.array.isRequired,
    unlinkedPayments: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentOverview);
