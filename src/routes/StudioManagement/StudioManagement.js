import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import { ContentToolbar } from 'components';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const availableStudios = {
    AKA: {
        name: 'Akazienstrasse',
        id: 'AKA',
        rooms: [
            { id: 'AKA_SR1', name: 'Big Room' },
            { id: 'AKA_SR2', name: 'Small Room' },
        ],
    },
    SOS: {
        name: 'Stomp Off Studio',
        id: 'SOS',
        rooms: [
            { id: 'SOS_SR1', name: 'Main Room' },
            { id: 'SOS_SR2', name: 'Side Room' },
            { id: 'SOS_SR3', name: 'Upstairs Room' },
            { id: 'SOS_SR4', name: 'Downstairs Room' },
        ],
    },
};

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
            { id: 'AKA_SR1', name: 'Big Room' },
            { id: 'AKA_SR2', name: 'Small Room' },
        ],
    },
    2: {
        id: '2',
        name: 'Stomp Off Studio',
        address: 'future awesome place',
        rooms: [
            { id: 'SOS_SR1', name: 'Main Room' },
            { id: 'SOS_SR2', name: 'Side Room' },
            { id: 'SOS_SR3', name: 'Upstairs Room' },
            { id: 'SOS_SR4', name: 'Downstairs Room' },
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

class Studios extends Component {
    state = {
        open: false,
        selectedTeacherId: null,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false, selectedTeacherId: null });
    };

    handleTeacherClick = rowData => {
        this.setState({ selectedTeacherId: rowData[0], open: true });
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleTeacherClick,
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

Studios.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Studios);
