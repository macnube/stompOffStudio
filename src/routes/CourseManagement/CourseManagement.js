import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import CourseForm from './CourseForm';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { ContentToolbar, SelectedDeleteToolbar } from '~/components';

import { parseCoursesToTableData } from './parse';

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
        name: 'Day',
    },
];

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

    handleOnDeletePress = ids => {
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

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToClassDetail,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { courses } = this.props;
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
                <CourseForm
                    open={this.state.open}
                    handleClose={this.handleClose}
                    navigateToCourseDetail={this.navigateToCourseDetail}
                    handleCreate={this.handleCreateCourse}
                />
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
    createCourse: PropTypes.func.isRequired,
    deleteCourse: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(CourseManagement);
