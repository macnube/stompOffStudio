import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import CourseForm from './CourseForm';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { ContentToolbar, SelectedDeleteToolbar } from 'components';

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
        name: 'Studio',
    },
    {
        name: 'Room',
    },
    {
        name: 'Teachers',
    },
    {
        name: 'Start Date',
    },
];

const parseCoursesToTableData = courses =>
    reduce(
        courses,
        (acc, course) => {
            const teacherNames = map(
                course.teachers,
                teacher => teacher.name
            ).join(', ');
            const result = [
                course.id,
                course.name,
                course.room.studio.name,
                course.room.name,
                [],
                course.startDate,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

class CourseManagement extends Component {
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

    navigateToCourseDetail = course => {
        this.props.history.push({
            pathname: './courseDetail',
            search: `id=${course.id}`,
        });
    };

    handleNavigateToClassDetail = rowData => {
        const { courses } = this.props;
        this.navigateToCourseDetail(find(courses, { id: rowData[0] }));
    };

    handleOnDeletePress = ids => () => {
        const { deleteCourse } = this.props;

        forEach(ids, id => {
            deleteCourse({ variables: { id } });
        });
    };

    handleCreateCourse = course => {
        this.props.createCourse({
            variables: {
                ...course,
            },
        });
        this.handleClose();
    };

    renderSelectedToolbar = (selectedRows, displayData) => {
        const selectedIndexes = keys(selectedRows.lookup);
        const idsToDelete = reduce(
            displayData,
            (result, row, index) => {
                if (selectedIndexes.includes(index.toString())) {
                    result.push(row.data[0]);
                    return result;
                }
                return result;
            },
            []
        );
        return (
            <SelectedDeleteToolbar
                handleOnDeletePress={this.handleOnDeletePress(idsToDelete)}
            />
        );
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToClassDetail,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { courses, studios } = this.props;
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
                {studios ? (
                    <CourseForm
                        open={this.state.open}
                        handleClose={this.handleClose}
                        navigateToCourseDetail={this.navigateToCourseDetail}
                        handleCreate={this.handleCreateCourse}
                        studios={studios}
                    />
                ) : null}
                <MUIDataTable
                    title={'Course Overview'}
                    data={parseCoursesToTableData(courses)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

CourseManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    studios: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(CourseManagement);
