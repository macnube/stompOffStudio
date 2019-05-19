import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import {
    CustomAddToolbar,
    SelectedDeleteToolbar,
    CardDialog,
} from 'components';
import AddCourseStudentDialog from './AddCourseStudentDialog';
import StudentDetailPaymentDialog from './StudentDetailPaymentDialog';
import StudentDetailHeader from './StudentDetailHeader';
import {
    parseCardsToTableData,
    parsePaymentsToTableData,
    parseCourseStudentsToTableData,
} from './parse';
import { PAYMENT_TYPE } from 'constants/gql';

const courseStudentsColumns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Class Name',
    },
    {
        name: 'Role',
    },
];

const cardsColumns = [
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

const paymentsColumns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'CARD_ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Amount',
    },
    {
        name: 'Payment Date',
    },
    {
        name: 'Reason',
    },
];

class StudentDetail extends Component {
    state = {
        openCourseStudentDialog: false,
        openCardDialog: false,
        openPaymentDialog: false,
        openUpdateCardDialog: false,
        card: null,
    };

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value, canSave: true });
    };

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

    navigateToStudentManagement = () => {
        this.props.history.push({
            pathname: './studentManagement',
        });
    };

    navigateToCourseDetail = course => {
        this.props.history.push({
            pathname: './courseDetail',
            search: `id=${course.id}`,
        });
    };

    handleNavigateToCourseDetail = rowData => {
        const { student } = this.props;
        const courseStudent = find(student.courses, {
            id: rowData[0],
        });
        this.navigateToCourseDetail(courseStudent.course);
    };

    renderCourseSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteCourseStudentsPress}
        />
    );

    renderCardSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteCardsPress}
        />
    );

    renderPaymentSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePaymentsPress}
        />
    );

    handleClickAddCourseOpen = () => {
        this.setState({ openCourseStudentDialog: true });
    };

    handleClickAddCardOpen = () => {
        this.setState({ openCardDialog: true });
    };

    handleClickAddPaymentOpen = () => {
        this.setState({ openPaymentDialog: true });
    };

    handleClickUpdateCardOpen = () => {
        this.setState({ openUpdateCardDialog: true });
    };

    handleClose = () => {
        this.setState({
            openCourseStudentDialog: false,
            openCardDialog: false,
            openPaymentDialog: false,
            openUpdateCardDialog: false,
            card: null,
        });
    };

    handleOnDeleteCourseStudentsPress = ids => {
        const { deleteCourseStudent } = this.props;

        forEach(ids, id => {
            deleteCourseStudent({
                variables: { id },
            });
        });
    };

    handleOnDeleteCardsPress = ids => {
        const { deleteCard } = this.props;

        forEach(ids, id => {
            deleteCard({
                variables: { id },
            });
        });
    };

    handleOnDeletePaymentsPress = ids => {
        const { deletePayment, unpayCard, student } = this.props;

        forEach(ids, id => {
            deletePayment({
                variables: { id },
            });
            const card = find(student.cards, { payment: { id } });
            if (card) {
                unpayCard({
                    variables: {
                        id: card.id,
                    },
                });
            }
        });
    };

    handleUpdateStudent = student => {
        const { updateStudent } = this.props;
        const { id, name, email, mobile } = student;

        updateStudent({
            variables: {
                id,
                name,
                email,
                mobile,
            },
        });
    };

    handleCreatePayment = payment => {
        const { createPayment, payCard } = this.props;
        createPayment({
            variables: {
                ...payment,
            },
        });
        if (payment.type === PAYMENT_TYPE.CARD && payment.cardId) {
            payCard({
                variables: {
                    id: payment.cardId,
                },
            });
        }

        this.handleClose();
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

    navigateToCardDetail = id => {
        this.props.history.push({
            pathname: './cardDetail',
            search: `id=${id}`,
        });
    };

    handleOnCardClick = rowData => this.navigateToCardDetail(rowData[0]);

    render() {
        const baseOptions = {
            responsive: 'scroll',
        };
        const courseStudentOptions = {
            ...baseOptions,
            onRowClick: this.handleNavigateToCourseDetail,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add to Course'}
                    handleAddPress={this.handleClickAddCourseOpen}
                />
            ),
            customToolbarSelect: this.renderCourseSelectedToolbar,
        };
        const cardOptions = {
            ...baseOptions,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Card'}
                    handleAddPress={this.handleClickAddCardOpen}
                />
            ),
            customToolbarSelect: this.renderCardSelectedToolbar,
            onRowClick: this.handleOnCardClick,
        };
        const paymentOptions = {
            ...baseOptions,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Payment'}
                    handleAddPress={this.handleClickAddPaymentOpen}
                />
            ),
            customToolbarSelect: this.renderPaymentSelectedToolbar,
        };
        const { student, createCard } = this.props;
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
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Active Registered Courses'}
                            data={parseCourseStudentsToTableData(
                                student.courses
                            )}
                            columns={courseStudentsColumns}
                            options={courseStudentOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Cards'}
                            data={parseCardsToTableData(student.cards)}
                            columns={cardsColumns}
                            options={cardOptions}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Payments'}
                            data={parsePaymentsToTableData(student.payments)}
                            columns={paymentsColumns}
                            options={paymentOptions}
                        />
                    </MuiThemeProvider>
                </Paper>
                <AddCourseStudentDialog
                    open={openCourseStudentDialog}
                    handleClose={this.handleClose}
                    studentId={student.id}
                />
                <CardDialog
                    title="Add New Card to Student"
                    open={openCardDialog}
                    createCard={createCard}
                    handleClose={this.handleClose}
                    studentId={student.id}
                />
                <StudentDetailPaymentDialog
                    open={openPaymentDialog}
                    handleCreate={this.handleCreatePayment}
                    handleClose={this.handleClose}
                    student={student}
                />
            </div>
        );
    }
}

StudentDetail.propTypes = {
    student: PropTypes.object.isRequired,
    updateStudent: PropTypes.func.isRequired,
    deleteCourseStudent: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    deletePayment: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired,
};

export default withRouter(StudentDetail);
