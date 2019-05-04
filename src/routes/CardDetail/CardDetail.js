import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import { parseCardDataToArray } from './parse';
import CardDetailHeader from './CardDetailHeader';

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
        name: 'Capacity',
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

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleInstanceClick,
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
    card: PropTypes.object.isRequired,
};

export default withRouter(CardDetail);
