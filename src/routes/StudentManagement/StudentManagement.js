import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { SelectedDeleteToolbar, CustomAddToolbar } from 'components';
import EmailButton from './EmailButton';
import StudentForm from './StudentForm';
import styles from './styles';
import { parseStudentsToTableData, getEmailsFromSelectedRows } from './parse';

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
        name: 'Email',
    },
    {
        name: 'Mobile',
    },
    {
        name: 'Status',
    },
    {
        name: 'Courses',
    },
];

class StudentManagement extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false });
    };

    navigateToStudentDetail = student => {
        this.props.history.push({
            pathname: './studentDetail',
            search: `id=${student.id}`,
        });
    };

    handleNavigateToStudentDetail = rowData => {
        const { students } = this.props;
        this.navigateToStudentDetail(find(students, { id: rowData[0] }));
    };

    handleOnDeletePress = ids => {
        const { deleteStudent } = this.props;

        forEach(ids, id => {
            deleteStudent({ variables: { id } });
        });
    };

    handleOnEmailPress = emails => {
        const { sendMailgunEmail } = this.props;
        sendMailgunEmail({
            variables: {
                tag: 'test',
                from: 'paul.mccloud@gmail.com',
                to: emails,
                subject: 'test',
                text: 'Testing mailgun email!',
            },
        });
    };

    renderEmailButton = (selectedRows, displayData) => () => {
        const emails = getEmailsFromSelectedRows(selectedRows, displayData);
        return (
            <EmailButton
                handleOnEmailPress={() => this.handleOnEmailPress(emails)}
            />
        );
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
            renderChildren={this.renderEmailButton(selectedRows, displayData)}
        />
    );

    renderToolbar = () => (
        <CustomAddToolbar
            title={'Add Student'}
            handleAddPress={this.handleClickOpen}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToStudentDetail,
            customToolbarSelect: this.renderSelectedToolbar,
            customToolbar: this.renderToolbar,
        };
        const { students, createStudent, classes } = this.props;
        const { open } = this.state;
        return (
            <Fragment>
                <StudentForm
                    open={open}
                    handleClose={this.handleClose}
                    navigateToStudentDetail={this.navigateToStudentDetail}
                    createStudent={createStudent}
                />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={'Students'}
                                data={parseStudentsToTableData(students)}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

StudentManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
    sendMailgunEmail: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudentManagement);
