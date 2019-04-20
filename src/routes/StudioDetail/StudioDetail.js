import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ContentToolbar, SelectedDeleteToolbar } from 'components';
import CustomToolbar from './CustomToolbar';
import RoomForm from './RoomForm';

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
        id: '',
        name: '',
        address: '',
        open: false,
        selectedRoomId: null,
        canSave: false,
    };

    componentDidMount() {
        const { studio } = this.props;
        if (studio) {
            const { id, name, address } = studio;
            this.setState({
                id,
                name,
                address,
            });
        }
    }

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

    handleOnDeleteRoomsPress = ids => () => {
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
                studioId: this.state.id,
            },
        });
        this.handleClose();
    };

    handleUpdateStudio = () => {
        const { id, name, address } = this.state;
        console.log('address is: ', address);
        this.props.updateStudio({
            variables: {
                id,
                name,
                address,
            },
        });
        this.setState({
            canSave: false,
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
                handleOnDeletePress={this.handleOnDeleteRoomsPress(idsToDelete)}
            />
        );
    };

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
                <CustomToolbar handleAddRoomPress={this.handleClickOpen} />
            ),
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { classes, studio } = this.props;
        const { name, address, open, selectedRoomId, canSave } = this.state;
        return (
            <Fragment>
                <ContentToolbar>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={this.navigateToStudioManagement}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={!canSave}
                        onClick={this.handleUpdateStudio}
                    >
                        Save
                    </Button>
                </ContentToolbar>
                <RoomForm
                    open={open}
                    handleClose={this.handleClose}
                    handleCreate={this.handleCreateRoom}
                    handleUpdate={this.handleUpdateRoom}
                    room={find(studio.rooms, { id: selectedRoomId })}
                />
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
                            label="Address"
                            value={address}
                            className={classes.textField}
                            onChange={this.handleChange('address')}
                            margin="normal"
                        />
                    </form>
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
    classes: PropTypes.object.isRequired,
    studio: PropTypes.object.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    createRoom: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    updateStudio: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudioDetail);
