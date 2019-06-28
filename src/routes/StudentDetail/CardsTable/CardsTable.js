import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';

import {
    CustomAddToolbar,
    SelectedDeleteToolbar,
    CardDialog,
} from 'components';
import { parseCardsToTableData } from '../parse';

const columns = [
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
        name: 'Classes Left',
    },
    {
        name: 'Active',
    },
    {
        name: 'Paid',
    },
];

const CardsTable = ({
    student,
    open,
    handleAdd,
    deleteCard,
    createCard,
    handleClose,
    history,
}) => {
    const handleOnDeletePress = ids => {
        forEach(ids, id => {
            deleteCard({
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
        <CustomAddToolbar title={'Add Card'} handleAddPress={handleAdd} />
    );

    const handleOnCardClick = rowData => {
        history.push({
            pathname: './cardDetail',
            search: `id=${rowData[0]}`,
        });
    };

    const options = {
        responsive: 'scroll',
        onRowClick: handleOnCardClick,
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
    };
    return (
        <Fragment>
            <MUIDataTable
                title={'Cards'}
                data={parseCardsToTableData(student.cards)}
                columns={columns}
                options={options}
            />
            <CardDialog
                title="Add New Card to Student"
                open={open}
                createCard={createCard}
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
    createCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default React.memo(CardsTable);
