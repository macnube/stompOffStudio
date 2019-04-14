import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import { ContentToolbar } from 'components';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

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
        name: 'Address',
    },
    {
        name: 'rooms',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Rooms',
    },
];

const data = {
    1: {
        id: '1',
        name: 'Akazienstrasse',
        address: 'Akazienstraße 28',
        rooms: [
            { id: 'AKA_SR1', name: 'Big Room', capacity: 20 },
            { id: 'AKA_SR2', name: 'Small Room', capacity: 10 },
        ],
    },
    2: {
        id: '2',
        name: 'Stomp Off Studio',
        address: 'future awesome place',
        rooms: [
            { id: 'SOS_SR1', name: 'Main Room', capacity: 26 },
            { id: 'SOS_SR2', name: 'Side Room', capacity: 10 },
            { id: 'SOS_SR3', name: 'Upstairs Room', capacity: 16 },
            { id: 'SOS_SR4', name: 'Downstairs Room', capacity: 14 },
        ],
    },
};

const convertStudioDataToArray = studios =>
    reduce(
        studios,
        (acc, studio) => {
            const result = { ...studio };
            result.roomNames = map(studio.rooms, room => room.name).join(', ');
            acc.push(Object.values(result));
            return acc;
        },
        []
    );

class StudioManagement extends Component {
    state = {
        open: false,
        selectedStudentId: null,
    };

    handleNavigateToStudioDetail = rowData => {
        this.props.history.push({
            pathname: '/studioDetail',
            state: {
                selectedClass: data[rowData[0]],
            },
        });
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToStudioDetail,
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
                <MUIDataTable
                    title={'Studios'}
                    data={convertStudioDataToArray(data)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

StudioManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudioManagement);
