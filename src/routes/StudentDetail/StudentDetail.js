import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import PaymentsTable from './PaymentsTable';
import CardsTable from './CardsTable';
import CoursesTable from './CoursesTable';
import StudentDetailHeader from './StudentDetailHeader';

class StudentDetail extends Component {
    state = {
        openCourseStudentDialog: false,
        openCardDialog: false,
        openPaymentDialog: false,
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
            openCourseStudentDialog: false,
            openCardDialog: false,
            openPaymentDialog: false,
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
            deleteCourseStudent,
            payCard,
            unpayCard,
            history,
        } = this.props;
        const {
            openCourseStudentDialog,
            openCardDialog,
            openPaymentDialog,
        } = this.state;
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
                    <CoursesTable
                        open={openCourseStudentDialog}
                        student={student}
                        deleteCourseStudent={deleteCourseStudent}
                        handleAdd={() =>
                            this.handleOpenDialog('openCourseStudentDialog')
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
                        open={openPaymentDialog}
                        student={student}
                        clearReferralBonus={clearReferralBonus}
                        createPayment={createPayment}
                        deletePayment={deletePayment}
                        payCard={payCard}
                        unpayCard={unpayCard}
                        handleAdd={() =>
                            this.handleOpenDialog('openPaymentDialog')
                        }
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
    deleteCourseStudent: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    deletePayment: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudentDetail);
