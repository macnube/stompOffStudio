import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import filter from 'lodash/filter';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
        name: 'email',
    },
];

const data = {
    1: {
        id: 1,
        name: 'Paul McCloud',
        email: 'paul.mccloud@gmail.com',
        mobile: '17643311645',
        classes: ['TueL3', 'ThuB2', 'ThuAJ2'],
        status: 'Active',
    },
    2: {
        id: 2,
        name: 'Helge Berger',
        email: 'lanabalboa.maki@mailhero.io',
        mobile: '4915205780149',
        classes: ['ThuB2'],
        status: 'Inactive',
    },
    3: {
        id: 3,
        name: 'Benjamin Weitner',
        email: 'benjamin-weitner@web.de',
        mobile: '491799091735',
        classes: ['TueL3', 'TueL2', 'ThuAJ2'],
        status: 'Active',
    },
    4: {
        id: 4,
        name: 'Timm Gerber',
        email: 'timm2202@gmx.net',
        mobile: '1636523812',
        classes: ['TueL2', 'ThuB2'],
        status: 'Active',
    },
    5: {
        id: 5,
        name: 'Julia Küchle',
        email: 'Juliakuechle@yahoo.de',
        mobile: '17622600181',
        classes: ['TueL2', 'ThuB2'],
        status: 'Active',
    },
    6: {
        id: 6,
        name: 'Julia Fuhs',
        email: 'Julia_Fuhs@hotmail.com',
        mobile: '17620174245',
        classes: ['ThuB2'],
        status: 'Active',
    },
    7: {
        id: 7,
        name: 'Juliane Krüger',
        email: 'juliane_krueger@freenet.de',
        mobile: '1733517552',
        classes: ['ThuB2', 'ThuAJ2'],
        status: 'Active',
    },
    8: {
        id: 8,
        name: 'Agata Bilska',
        email: 'bilska.ag@gmail.com',
        mobile: '17699816083',
        classes: ['ThuB2', 'TueL2'],
        status: 'Active',
    },
    9: {
        id: 9,
        name: 'Tea Ghigo',
        email: 'teaghigo@libero.it',
        mobile: '17637597750',
        classes: ['ThuB2', 'TueL3'],
        status: 'Active',
    },
    10: {
        id: 10,
        name: 'Jim Liu',
        email: 'jimmy.h.liu@gmail.com',
        mobile: '49015901960810',
        classes: ['ThuB2', 'ThuAJ2'],
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

class ClassDetail extends Component {
    state = {
        id: '',
        name: '',
        studioId: '',
        roomId: '',
        startDate: '',
        teachers: [],
        maxStudents: null,
    };

    componentDidMount() {
        const { location } = this.props;
        console.log('location is: ', location);
        // if (location && location.state) {
        //     const {id, name, studioId}
        //     this.setState({
        //         id: '',
        // name: '',
        // studioId: '',
        // roomId: '',
        // startDate: '',
        // teachers: [],
        // maxStudents: null,
        //     })
        // }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
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
            onRowClick: this.handleClassClick,
        };
        const { classes } = this.props;
        const { studioId, roomId } = this.state;
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
                <Paper>
                    <form className={classes.topForm}>
                        <TextField
                            id="standard-name"
                            label="Name"
                            value={this.state.name}
                            className={classes.textField}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="standard-select-studio-native"
                            select
                            label="Select Studio"
                            value={studioId}
                            className={classes.textField}
                            onChange={this.handleChange('studioId')}
                            margin="normal"
                        >
                            {map(this.availableStudios, s => (
                                <MenuItem key={s.id} value={s.id}>
                                    {s.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="standard-select-room-native"
                            select
                            label="Select Room"
                            value={roomId}
                            className={classes.textField}
                            onChange={this.handleChange('roomId')}
                            margin="normal"
                            disabled={!studioId}
                        >
                            {studioId &&
                                map(
                                    this.availableStudios[studioId].rooms,
                                    r => (
                                        <MenuItem key={r.id} value={r.id}>
                                            {r.name}
                                        </MenuItem>
                                    )
                                )}
                        </TextField>
                        <TextField
                            id="date"
                            label="Start Date"
                            type="date"
                            onChange={this.handleChange('startDate')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <TextField
                            id="filled-number"
                            label="Max Students"
                            value={this.state.maxStudents}
                            onChange={this.handleChange('maxStudents')}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </form>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Leaders'}
                            data={convertClassesDataToArray(data)}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={'Leaders'}
                            data={convertClassesDataToArray(data)}
                            columns={columns}
                            options={options}
                        />
                    </MuiThemeProvider>
                </Paper>
            </Fragment>
        );
    }
}

ClassDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassDetail);
