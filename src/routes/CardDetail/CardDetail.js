import React from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import { parseCardDataToArray } from './parse';
import CardDetailHeader from './CardDetailHeader';
import { SelectedDeleteToolbar } from 'components';
import { withUser } from 'core/user';
import styles from './styles';

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
        name: 'Topic',
    },
    {
        name: 'Date',
    },
];

const CardDetail = ({
    card,
    user,
    classes,
    markPrivateLessonUsed,
    history,
    updateCard,
    removeCardParticipation,
}) => {
    const navigateToCourseInstance = id => {
        history.push({
            pathname: './courseInstance',
            search: `id=${id}`,
        });
    };

    const handleInstanceClick = rowData => navigateToCourseInstance(rowData[0]);

    const handleUpdateCard = ({
        id,
        expirationDate,
        value,
        privateLessonLength,
    }) =>
        updateCard({
            variables: {
                id,
                expirationDate,
                value,
                privateLessonLength,
            },
        });

    const navigateToStudentDetail = () =>
        history.push({
            pathname: './studentDetail',
            search: `id=${card.student.id}`,
        });

    const handleOnDeleteParticipationPress = id =>
        removeCardParticipation({
            variables: {
                id: card.id,
                participantId: id,
            },
        });

    const getRowId = (selectedRows, displayData) => {
        const selectedDataIndex = selectedRows.data[0].dataIndex;
        return find(displayData, { dataIndex: selectedDataIndex }).data[0];
    };

    const renderParticipationHistorySelectedToolbar = (
        selectedRows,
        displayData
    ) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={handleOnDeleteParticipationPress}
            getIds={getRowId}
        />
    );

    const studentOptions = {
        responsive: 'scroll',
        selectedRows: 'single',
    };
    const adminOptions = {
        ...studentOptions,
        onRowClick: handleInstanceClick,
        customToolbarSelect: renderParticipationHistorySelectedToolbar,
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <CardDetailHeader
                        card={card}
                        admin={user.admin}
                        handleOnSave={handleUpdateCard}
                        handleOnCancel={navigateToStudentDetail}
                        markPrivateLessonUsed={markPrivateLessonUsed}
                    />
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={'Card Course History'}
                            data={parseCardDataToArray(card)}
                            columns={columns}
                            options={user.admin ? adminOptions : studentOptions}
                        />
                    </Grid>
                </Grid>
            </Container>
        </MuiPickersUtilsProvider>
    );
};

CardDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    updateCard: PropTypes.func.isRequired,
    removeCardParticipation: PropTypes.func.isRequired,
    markPrivateLessonUsed: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles),
    withUser
)(CardDetail);
