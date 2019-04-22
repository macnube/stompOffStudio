import 'date-fns';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import toNumber from 'lodash/toNumber';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import styles from './styles';
import {
    ContentToolbar,
    CustomAddToolbar,
    SelectedDeleteToolbar,
} from 'components';
import AddCourseStudentForm from './AddCourseStudentForm';

const columns = [
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

class StudentDetail extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        mobile: '',
        canSave: false,
        openCourseStudentForm: false,
    };

    componentDidMount() {
        const { student } = this.props;
        if (student) {
            const { id, name, email, mobile } = student;
            this.setState({
                id,
                name,
                email,
                mobile,
            });
        }
    }

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

    handleClickAddCourseOpen = () => {
        this.setState({ openCourseStudentForm: true });
    };

    handleClose = () => {
        this.setState({ openCourseStudentForm: false });
    };

    handleOnDeleteCourseStudentsPress = ids => {
        const { deleteCourseStudent } = this.props;

        forEach(ids, id => {
            deleteCourseStudent({
                variables: { id },
            });
        });
    };

    handleUpdateStudent = () => {
        const { updateStudent } = this.props;
        const { id, name, email, mobile } = this.state;

        updateStudent({
            variables: {
                id,
                name,
                email,
                mobile,
            },
        });
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
        const { classes, student } = this.props;
        const {
            id,
            name,
            email,
            mobile,
            canSave,
            openCourseStudentForm,
        } = this.state;
        return (
            <div>
                <ContentToolbar>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.navigateToStudentManagement}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!canSave}
                        onClick={this.handleUpdateStudent}
                    >
                        Save
                    </Button>
                </ContentToolbar>
                <Paper>
                    <form className={classes.topForm}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={name}
                            className={classes.textField}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-name"
                            label="Email"
                            value={email}
                            className={classes.textField}
                            onChange={this.handleChange('email')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-select-studio-native"
                            label="Mobile"
                            value={mobile}
                            className={classes.textField}
                            onChange={this.handleChange('mobile')}
                            margin="normal"
                        />
                    </form>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Active Registered Courses'}
                            data={parseCourseStudentsToTableData(
                                student.courses
                            )}
                            columns={columns}
                            options={courseStudentOptions}
                        />
                    </MuiThemeProvider>
                </Paper>
                <AddCourseStudentForm
                    open={openCourseStudentForm}
                    handleClose={this.handleClose}
                    studentId={id}
                />
            </div>
        );
    }
}

StudentDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired,
    updateStudent: PropTypes.func.isRequired,
    deleteCourseStudent: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudentDetail);
