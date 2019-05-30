import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { ContentToolbar, SelectedDeleteToolbar } from '~/components';
import EmailButton from './EmailButton';
import StudentForm from './StudentForm';
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

const parseStudentsToTableData = students =>
    reduce(
        students,
        (acc, student) => {
            const courseNames = map(
                student.courses,
                courseStudent => courseStudent.course.name
            ).join(', ');
            const result = [
                student.id,
                student.name,
                student.email,
                student.mobile,
                'True',
                courseNames,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

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

    renderEmailButton = ids => {
        return (
            <EmailButton
                handleOnEmailPress={ids => console.log('ids are: ', ids)}
                selectedIds={ids}
            />
        );
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
            renderChildren={this.renderEmailButton}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToStudentDetail,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { students, createStudent } = this.props;
        const { open } = this.state;
        return (
            <Fragment>
                <ContentToolbar>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        onClick={this.handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </ContentToolbar>
                <StudentForm
                    open={open}
                    handleClose={this.handleClose}
                    navigateToStudentDetail={this.navigateToStudentDetail}
                    createStudent={createStudent}
                />
                <MUIDataTable
                    title={'Students'}
                    data={parseStudentsToTableData(students)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

StudentManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudentManagement);
