import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import ClassForm from './ClassForm';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { ContentToolbar } from 'components';

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
        name: 'Leader Ids',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Follower Ids',
        options: {
            display: 'false',
        },
    },
    {
        name: '# of Leaders',
    },
    {
        name: '# of Followers',
    },
    {
        name: 'Max # of Students',
    },
    {
        name: 'Start Date',
    },
    {
        name: 'Status',
    },
];

const data = {
    TueL2: {
        id: 'TueL2',
        name: 'Tues - Lindy Hop II',
        studio: 'Akazienstr',
        room: 'Small Room',
        teachers: 'Lana S., Paul M',
        leaderIds: [1, 4],
        followerIds: [5, 8],
        leaderCount: 5,
        followerCount: 5,
        maxStudents: 10,
        startDate: '',
        status: 'Active',
    },
    ThuB2: {
        id: 'ThuB2',
        name: 'Thu - Balboa II',
        studio: 'Akazienstr',
        room: 'Big Room',
        teachers: 'Lana S., Paul M',
        leaderIds: [1, 3, 4, 10],
        followerIds: [5, 6, 7, 8, 9],
        leaderCount: 10,
        followerCount: 10,
        maxStudents: 26,
        startDate: '',
        status: 'Active',
    },
    TueL3: {
        id: 'TueL3',
        name: 'Tues - Lindy Hop III',
        studio: 'Akazienstr',
        room: 'Small Room',
        teachers: 'Lana S., Paul M',
        leaderIds: [1, 3],
        followerIds: [9],
        leaderCount: 5,
        followerCount: 5,
        maxStudents: 10,
        startDate: '',
        status: 'Active',
    },
    ThuAJ2: {
        id: 'ThuAJ2',
        name: 'Thu - Authentic Jazz II',
        studio: 'Akazienstr',
        room: 'Big Room',
        teachers: 'Lana S., Paul M',
        leaderIds: [1, 3, 7, 10],
        leaderCount: 4,
        followerCount: 0,
        maxStudents: 26,
        startDate: '',
        status: 'Active',
    },
};

const convertClassesDataToArray = classes =>
    reduce(
        classes,
        (acc, c) => {
            acc.push(Object.values(c));
            return acc;
        },
        []
    );

class ClassManagement extends Component {
    state = {
        open: false,
        selectedClassId: null,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false, selectedClassId: null });
    };

    handleNavigateToClassDetail = rowData => {
        this.props.history.push({
            pathname: '/classDetail',
            state: {
                selectedClass: data[rowData[0]],
            },
        });
    };

    handleClassClick = rowData => {
        this.setState({ selectedClassId: rowData[0], open: true });
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToClassDetail,
        };
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
                <ClassForm
                    open={this.state.open}
                    handleClose={this.handleClose}
                    handleNavigateToClassDetail={
                        this.handleNavigateToClassDetail
                    }
                />
                <MUIDataTable
                    title={'Class Overview'}
                    data={convertClassesDataToArray(data)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

ClassManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(ClassManagement);
