import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MUIDataTable from 'mui-datatables';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import SelectedParticipantToolbar from './SelectedParticipantToolbar';
import CourseInstanceHeader from './CourseInstanceHeader';
import AddMembershipsToCourseInstanceDialog from './AddMembershipsToCourseInstanceDialog';
import { CustomAddToolbar } from 'components';
import { parseParticipantsToTableData } from './parse';
import styles from './styles';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Student ID',
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
        name: 'Role',
    },
    {
        name: 'Status',
    },
];

class CourseInstance extends Component {
    state = {
        openAddParticipantDialog: false,
        title: '',
    };

    handleAddParticipant = () => {
        this.setState({ openAddParticipantDialog: true });
    };

    handleClose = () => {
        this.setState({
            openAddParticipantDialog: false,
        });
    };

    renderParticipantSelectedToolbar = (selectedRows, displayData) => (
        <SelectedParticipantToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleLogParticipantStatus={this.handleLogParticipantStatus}
            handleDeleteParticipant={this.handleDeleteParticipant}
        />
    );

    navigateToCourseDetail = () => {
        this.props.history.push({
            pathname: './courseDetail',
            search: `id=${this.props.courseInstance.course.id}`,
        });
    };

    navigateToStudentDetail = id => {
        this.props.history.push({
            pathname: './studentDetail',
            search: `id=${id}`,
        });
    };

    navigateToCourseAttendance = id => {
        this.props.history.push({
            pathname: './courseAttendance',
            search: `id=${id}`,
        });
    };

    handleNavigateToCourseAttendance = () =>
        this.navigateToCourseAttendance(this.props.courseInstance.id);

    handleLogParticipantStatus = status => id => {
        const { logParticipantStatus } = this.props;

        logParticipantStatus({
            variables: {
                id,
                status,
            },
        });
    };

    handleDeleteParticipant = id => {
        this.props.deleteParticipant({
            variables: {
                id,
            },
        });
    };

    handleNavigateToStudentDetail = rowData =>
        this.navigateToStudentDetail(rowData[1]);

    handleUpdateCourseInstance = courseInstance => {
        const { updateCourseInstance } = this.props;
        const { id, topic, notes, recapUrl, date } = courseInstance;

        updateCourseInstance({
            variables: {
                id,
                topic,
                notes,
                recapUrl,
                date,
            },
        });
    };

    renderCustomToolbar = () => (
        <CustomAddToolbar
            title={'Add Participants'}
            handleAddPress={this.handleAddParticipant}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            selectableRows: 'single',
            customToolbar: this.renderCustomToolbar,
            customToolbarSelect: this.renderParticipantSelectedToolbar,
            onRowClick: this.handleNavigateToStudentDetail,
        };
        const { courseInstance, classes } = this.props;
        const { openAddParticipantDialog } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <CourseInstanceHeader
                            courseInstance={courseInstance}
                            handleOnCancel={this.navigateToCourseDetail}
                            handleOnSave={this.handleUpdateCourseInstance}
                            handleNavigateToCourseAttendance={
                                this.handleNavigateToCourseAttendance
                            }
                        />
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={'Participants'}
                                data={parseParticipantsToTableData(
                                    courseInstance.participants
                                )}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                    {courseInstance ? (
                        <AddMembershipsToCourseInstanceDialog
                            open={openAddParticipantDialog}
                            handleClose={this.handleClose}
                            courseInstance={courseInstance}
                        />
                    ) : null}
                </Container>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseInstance.propTypes = {
    classes: PropTypes.object.isRequired,
    courseInstance: PropTypes.object.isRequired,
    updateCourseInstance: PropTypes.func.isRequired,
    logParticipantStatus: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired,
    card: PropTypes.object,
    history: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter
)(CourseInstance);
