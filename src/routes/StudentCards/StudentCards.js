import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { NoToolbarTable } from 'components';
import { parseCardsToTableData } from './parse';

const columns = [
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

const StudentCards = ({ cards, history }) => {
    const handleNavigateToStudentCardDetail = rowData => {
        history.push({
            pathname: './studentCardDetail',
            search: `id=${rowData[0]}`,
        });
    };

    const options = {
        responsive: 'scroll',
        selectableRows: 'none',
        onRowClick: handleNavigateToStudentCardDetail,
        search: false,
    };
    return (
        <NoToolbarTable
            title={'Cards'}
            data={parseCardsToTableData(cards)}
            columns={columns}
            options={options}
        />
    );
};

StudentCards.propTypes = {
    cards: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentCards);
