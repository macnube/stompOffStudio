import 'date-fns';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { CustomAddToolbar, SelectedDeleteToolbar } from 'components';
import AddCourseStudentDialog from './AddCourseStudentDialog';
import CardDialog from './CardDialog';
import PaymentDialog from './PaymentDialog';
import StudentDetailHeader from './StudentDetailHeader';

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
        name: 'Valid Count',
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
        name: 'Amount',
    },
    {
        name: 'Payment Date',
    },
    {
        name: 'Reason',
    },
];
const parseCourseStudentsToTableData = courseStudents =>
    reduce(
        courseStudents,
        (acc, courseStudent) => {
            const result = [
                courseStudent.id,
                courseStudent.course.name,
                courseStudent.role,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

const parseCardsToTableData = cards =>
    reduce(
        cards,
        (acc, card) => {
            const uses =
                card.useHistory && card.useHistory.length
                    ? card.useHistory.length
                    : 0;
            const result = [
                card.id,
                card.validCount,
                format(parseISO(card.expirationDate), 'MMM do, yyyy'),
                card.validCount - uses,
                toString(card.active),
                toString(!!card.payment),
            ];
            acc.push(result);
            return acc;
        },
        []
    );

const parsePaymentsToTableData = payments =>
    reduce(
        payments,
        (acc, payment) => {
            const result = [
                payment.id,
                payment.amount,
                format(parseISO(payment.date), 'MMM do, yyyy'),
                payment.type,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

class StudentDetail extends Component {
    state = {
        openCourseStudentDialog: false,
        openCardDialog: false,
        openPaymentDialog: false,
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

    handleClose = () => {
        this.setState({
            openCourseStudentDialog: false,
            openCardDialog: false,
            openPaymentDialog: false,
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
        const { deletePayment } = this.props;

        forEach(ids, id => {
            deletePayment({
                variables: { id },
            });
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
        this.props.createPayment({
            variables: {
                ...payment,
            },
        });
        this.handleClose();
    };

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
                    open={openCardDialog}
                    createCard={createCard}
                    handleClose={this.handleClose}
                    studentId={student.id}
                />
                <PaymentDialog
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
};

export default withRouter(StudentDetail);
