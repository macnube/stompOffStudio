import React from 'react';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import { parseCardDataToArray } from './parse';
import StudentCardDetailHeader from './StudentCardDetailHeader';
import { NoToolbarTable } from 'components';
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

const StudentCardDetail = ({ card, classes }) => {
    const options = {
        responsive: 'scroll',
        selectableRows: 'none',
        search: false,
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <StudentCardDetailHeader card={card} />
                    <Grid item xs={12}>
                        <NoToolbarTable
                            title={'Cards Course History'}
                            data={parseCardDataToArray(card)}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                </Grid>
            </Container>
        </MuiPickersUtilsProvider>
    );
};

StudentCardDetail.propTypes = {
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
)(StudentCardDetail);
