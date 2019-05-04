import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import forEach from 'lodash/forEach';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import { CustomAddToolbar, SelectedDeleteToolbar } from 'components';
import CourseInstanceHeader from './CourseInstanceHeader';
import AddParticipantToInstanceDialog from './AddParticipantToInstanceDialog';
import { parseParticipantsToTableData } from './parse';

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
        openParticipantForm: false,
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

    renderParticipantSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteParticipantsPress}
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

    handleNavigateToStudentDetail = rowData =>
        this.navigateToStudentDetail(rowData[1]);

    handleClickAddParticipantOpen = () => {
        this.setState({ openParticipantForm: true });
    };

    handleClose = () => {
        this.setState({
            openParticipantForm: false,
        });
    };

    handleOnDeleteParticipantsPress = ids => {
        const { deleteParticipant } = this.props;

        forEach(ids, id => {
            deleteParticipant({
                variables: { id },
            });
        });
    };

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

    render() {
        const options = {
            responsive: 'scroll',
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Participant'}
                    handleAddPress={this.handleClickAddParticipantOpen}
                />
            ),
            customToolbarSelect: this.renderParticipantSelectedToolbar,
            onRowClick: this.handleNavigateToStudentDetail,
        };
        const { courseInstance } = this.props;
        const { openParticipantForm } = this.state;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper>
                    <CourseInstanceHeader
                        courseInstance={courseInstance}
                        handleOnCancel={this.navigateToCourseDetail}
                        handleOnSave={this.handleUpdateCourseInstance}
                    />
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Participants'}
                            data={parseParticipantsToTableData(
                                courseInstance.participants
                            )}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                    {courseInstance && courseInstance.id ? (
                        <AddParticipantToInstanceDialog
                            open={openParticipantForm}
                            handleClose={this.handleClose}
                            courseInstanceId={courseInstance.id}
                            participantCourseStudentIds={map(
                                courseInstance.participants,
                                p => p.courseStudent.id
                            )}
                        />
                    ) : null}
                </Paper>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseInstance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
    updateCourseInstance: PropTypes.func.isRequired,
    deleteParticipant: PropTypes.func.isRequired,
};

export default withRouter(CourseInstance);
