import React, { Component, Fragment } from 'react';
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
        leaderCount: 8,
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

    handleClassClick = rowData => {
        this.setState({ selectedClassId: rowData[0], open: true });
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleClassClick,
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
                    student={data[this.state.selectedClassId]}
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

export default withStyles(styles)(ClassManagement);
