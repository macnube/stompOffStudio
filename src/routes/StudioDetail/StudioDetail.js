import React, { Component } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { SelectedDeleteToolbar, CustomAddToolbar } from 'components';
import RoomForm from './RoomForm';
import StudioDetailHeader from './StudioDetailHeader';
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
        name: 'Capacity',
    },
];

const convertRoomDataToArray = rooms =>
    reduce(
        rooms,
        (acc, c) => {
            acc.push([c.id, c.name, c.capacity]);
            return acc;
        },
        []
    );

class StudioDetail extends Component {
    state = {
        selectedRoomId: null,
        open: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, canSave: true });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRoomClick = rowData => {
        this.setState({ selectedRoomId: rowData[0], open: true });
    };

    handleClose = onClose => {
        this.setState({ open: false, selectedRoomId: null });
        if (onClose) {
            onClose();
        }
    };

    handleOnDeleteRoomsPress = ids => {
        const { deleteRoom } = this.props;

        forEach(ids, id => {
            deleteRoom({ variables: { id } });
        });
    };

    handleCreateRoom = (name, capacity) => {
        this.props.createRoom({
            variables: {
                name,
                capacity,
                studioId: this.props.studio.id,
            },
        });
        this.handleClose();
    };

    handleUpdateStudio = studio => {
        const { id, name, address } = studio;
        this.props.updateStudio({
            variables: {
                id,
                name,
                address,
            },
        });
    };

    handleUpdateRoom = (id, name, capacity) => {
        this.props.updateRoom({
            variables: {
                id,
                name,
                capacity,
            },
        });
        this.handleClose();
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeleteRoomsPress}
        />
    );

    navigateToStudioManagement = () => {
        this.props.history.push({
            pathname: './studioManagement',
        });
    };

    render() {
        const options = {
            responsive: 'scroll',
            filter: true,
            filterType: 'checkbox',
            onRowClick: this.handleRoomClick,
            customToolbar: () => (
                <CustomAddToolbar
                    title={'Add Room'}
                    handleAddPress={this.handleClickOpen}
                />
            ),
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { studio, classes } = this.props;
        const { open, selectedRoomId } = this.state;
        return (
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <StudioDetailHeader
                        studio={studio}
                        handleOnSave={this.handleUpdateStudio}
                        handleOnCancel={this.navigateToStudioManagement}
                    />
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={'Rooms'}
                            data={convertRoomDataToArray(
                                this.props.studio.rooms
                            )}
                            columns={columns}
                            options={options}
                        />
                    </Grid>
                    <RoomForm
                        open={open}
                        handleClose={this.handleClose}
                        handleCreate={this.handleCreateRoom}
                        handleUpdate={this.handleUpdateRoom}
                        room={find(studio.rooms, { id: selectedRoomId })}
                    />
                </Grid>
            </Container>
        );
    }
}

StudioDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    studio: PropTypes.object.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    updateStudio: PropTypes.func.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter
)(StudioDetail);
