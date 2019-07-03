import React, { Component } from 'react';
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
import { PARTICIPANT_STATUS } from 'constants/gql';
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
        name: 'Date',
    },
];

class CardDetail extends Component {
    handleInstanceClick = rowData => this.navigateToCourseInstance(rowData[0]);

    handleUpdateCard = card => {
        const { id, expirationDate, value } = card;
        this.props.updateCard({
            variables: {
                id,
                expirationDate,
                value,
            },
        });
    };

    navigateToCourseInstance = id => {
        this.props.history.push({
            pathname: './courseInstance',
            search: `id=${id}`,
        });
    };

    navigateToStudentDetail = () => {
        const { history, card } = this.props;
        history.push({
            pathname: './studentDetail',
            search: `id=${card.student.id}`,
        });
    };

    handleOnDeleteInstancePress = id => {
        const {
            removeCardParticipation,
            logParticipantStatus,
            card,
        } = this.props;

        removeCardParticipation({
            variables: {
                id: card.id,
                participantId: id,
                value: ++card.value,
            },
        });

        logParticipantStatus({
            variables: {
                id,
                status: PARTICIPANT_STATUS.PRESENT,
            },
        });
    };

    renderInstanceSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteInstancePress}
            getIds={this.getRowId}
        />
    );

    getRowId = (selectedRows, displayData) => {
        const selectedDataIndex = selectedRows.data[0].dataIndex;
        return find(displayData, { dataIndex: selectedDataIndex }).data[0];
    };

    render() {
        const studentOptions = {
            responsive: 'scroll',
            selectedRows: 'single',
        };
        const adminOptions = {
            ...studentOptions,
            onRowClick: this.handleInstanceClick,
            customToolbarSelect: this.renderInstanceSelectedToolbar,
        };
        const { card, user, classes } = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <CardDetailHeader
                            card={card}
                            admin={user.admin}
                            handleOnSave={this.handleUpdateCard}
                            handleOnCancel={this.navigateToStudentDetail}
                        />
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={'Card Course History'}
                                data={parseCardDataToArray(card)}
                                columns={columns}
                                options={
                                    user.admin ? adminOptions : studentOptions
                                }
                            />
                        </Grid>
                    </Grid>
                </Container>
            </MuiPickersUtilsProvider>
        );
    }
}

CardDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    updateCard: PropTypes.func.isRequired,
    removeCardParticipation: PropTypes.func.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles),
    withUser
)(CardDetail);
