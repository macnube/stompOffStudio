import 'date-fns';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import toNumber from 'lodash/toNumber';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import PaymentsTable from './PaymentsTable';
import CardsTable from './CardsTable';
import MembershipsTable from './MembershipsTable';
import StudentDetailHeader from './StudentDetailHeader';
import styles from './styles';

class StudentDetail extends Component {
    state = {
        openMembershipDialog: false,
        openCardDialog: false,
        openUpdateCardDialog: false,
    };

    handleOpenDialog = name => {
        this.setState({ [name]: true });
    };

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value, canSave: true });
    };

    navigateToStudentManagement = () => {
        this.props.history.push({
            pathname: './studentManagement',
        });
    };

    handleClose = () => {
        this.setState({
            openMembershipDialog: false,
            openCardDialog: false,
        });
    };

    handleUpdateStudent = student => {
        const { updateStudent } = this.props;
        const { id, name, email, mobile, hasReferralBonus } = student;

        updateStudent({
            variables: {
                id,
                name,
                email,
                mobile,
                hasReferralBonus,
            },
        });
    };

    handleOnCreateUser = () => {
        const { createUser, student } = this.props;

        createUser({
            variables: {
                email: student.email,
                password: student.email,
                studentId: student.id,
            },
        });
    };

    render() {
        const {
            classes,
            student,
            clearReferralBonus,
            createCard,
            deleteCard,
            createPayment,
            deletePayment,
            updatePayment,
            deleteMembership,
            payCard,
            unpayCard,
            history,
        } = this.props;
        const { openMembershipDialog, openCardDialog } = this.state;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    {/* Header */}
                    <StudentDetailHeader
                        student={student}
                        handleOnCancel={this.navigateToStudentManagement}
                        handleOnSave={this.handleUpdateStudent}
                        handleOnCreateUser={this.handleOnCreateUser}
                        canCreateUser={!student.user}
                    />

                    {/* Payments Table */}
                    <Grid item xs={12}>
                        <MembershipsTable
                            open={openMembershipDialog}
                            student={student}
                            deleteMembership={deleteMembership}
                            handleAdd={() =>
                                this.handleOpenDialog('openMembershipDialog')
                            }
                            handleClose={this.handleClose}
                            history={history}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CardsTable
                            open={openCardDialog}
                            student={student}
                            createCard={createCard}
                            deleteCard={deleteCard}
                            handleAdd={() =>
                                this.handleOpenDialog('openCardDialog')
                            }
                            handleClose={this.handleClose}
                            history={history}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PaymentsTable
                            student={student}
                            clearReferralBonus={clearReferralBonus}
                            createPayment={createPayment}
                            deletePayment={deletePayment}
                            updatePayment={updatePayment}
                            payCard={payCard}
                            unpayCard={unpayCard}
                            handleClose={this.handleClose}
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

StudentDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired,
    clearReferralBonus: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    deleteMembership: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    deletePayment: PropTypes.func.isRequired,
    updatePayment: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudentDetail);
