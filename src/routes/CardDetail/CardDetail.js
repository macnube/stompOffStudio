import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import { parseCardDataToArray } from './parse';
import CardDetailHeader from './CardDetailHeader';
import { SelectedDeleteToolbar } from '~/components';
import { PARTICIPANT_STATUS } from '~/constants/gql';

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
        const options = {
            responsive: 'scroll',
            selectedRows: 'single',
            onRowClick: this.handleInstanceClick,
            customToolbarSelect: this.renderInstanceSelectedToolbar,
        };
        const { card } = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper>
                    <CardDetailHeader
                        card={card}
                        handleOnSave={this.handleUpdateCard}
                        handleOnCancel={this.navigateToStudentDetail}
                    />
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Card Course History'}
                            data={parseCardDataToArray(card)}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </Paper>
            </MuiPickersUtilsProvider>
        );
    }
}

CardDetail.propTypes = {
    updateCard: PropTypes.func.isRequired,
    removeCardParticipation: PropTypes.func.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    card: PropTypes.object.isRequired,
};

export default withRouter(CardDetail);
