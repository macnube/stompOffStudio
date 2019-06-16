import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import PaymentsTable from './PaymentsTable';
import CardsTable from './CardsTable';
import MembershipsTable from './MembershipsTable';
import StudentDetailHeader from './StudentDetailHeader';

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
            <div>
                <Paper>
                    <StudentDetailHeader
                        student={student}
                        handleOnCancel={this.navigateToStudentManagement}
                        handleOnSave={this.handleUpdateStudent}
                        handleOnCreateUser={this.handleOnCreateUser}
                        canCreateUser={!student.user}
                    />
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
                </Paper>
            </div>
        );
    }
}

StudentDetail.propTypes = {
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

export default withRouter(StudentDetail);
