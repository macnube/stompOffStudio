import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import { SelectedDeleteToolbar, CustomAddToolbar } from 'src/components';
import RoomForm from './RoomForm';
import StudioDetailHeader from './StudioDetailHeader';

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
        const { studio } = this.props;
        const { open, selectedRoomId } = this.state;
        return (
            <Fragment>
                <RoomForm
                    open={open}
                    handleClose={this.handleClose}
                    handleCreate={this.handleCreateRoom}
                    handleUpdate={this.handleUpdateRoom}
                    room={find(studio.rooms, { id: selectedRoomId })}
                />
                <Paper>
                    <StudioDetailHeader
                        studio={studio}
                        handleOnSave={this.handleUpdateStudio}
                        handleOnCancel={this.navigateToStudioManagement}
                    />
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Rooms'}
                            data={convertRoomDataToArray(
                                this.props.studio.rooms
                            )}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </Paper>
            </Fragment>
        );
    }
}

StudioDetail.propTypes = {
    studio: PropTypes.object.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    updateStudio: PropTypes.func.isRequired,
};

export default withRouter(StudioDetail);
