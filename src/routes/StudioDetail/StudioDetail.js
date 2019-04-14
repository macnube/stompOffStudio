import React, { Component, Fragment } from 'react';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ContentToolbar } from 'components';
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
            acc.push(Object.values(c));
            return acc;
        },
        []
    );

class StudioDetail extends Component {
    state = {
        id: '',
        name: '',
        address: '',
        rooms: [],
        open: false,
        selectedRoomId: null,
    };

    componentDidMount() {
        const { location } = this.props;
        if (location && location.state && location.state.selectedClass) {
            const { id, name, address, rooms } = location.state.selectedClass;
            this.setState({
                id,
                name,
                address,
                rooms,
            });
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRoomClick = rowData => {
        this.setState({ selectedRoomId: rowData[0], open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false, selectedRoomId: null });
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

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleRoomClick,
            customToolbar: () => (
                <CustomToolbar handleAddRoomPress={this.handleClickOpen} />
            ),
        };
        const { classes } = this.props;
        const { name, address, rooms, open, selectedRoomId } = this.state;
        console.log('rooms is: ', rooms);
        console.log('roomId is: ', selectedRoomId);
        return (
            <Fragment>
                <ContentToolbar>
                    <Button variant="contained" className={classes.button}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Save
                    </Button>
                </ContentToolbar>
                <RoomForm
                    open={open}
                    handleClose={this.handleClose}
                    room={find(rooms, { id: selectedRoomId })}
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
                            data={convertRoomDataToArray(rooms)}
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
};

export default withStyles(styles)(StudioDetail);
