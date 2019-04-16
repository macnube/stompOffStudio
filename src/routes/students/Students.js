import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import StudentForm from './StudentForm';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { ContentToolbar, CustomEmailToolbar } from 'components';

const availableClasses = {
    TueL2: { name: 'Tues - Lindy Hop II', id: 'TueL2' },
    ThuB2: { name: 'Thu - Balboa II', id: 'ThuB2' },
    TueL3: { name: 'Tues - Lindy Hop III', id: 'TueL3' },
    ThuAJ2: { name: 'Thu - Authentic Jazz II', id: 'ThuAJ2' },
};

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
        classes: ['TueL3', 'TueL2'],
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
        name: 'Email',
    },
    {
        name: 'Mobile',
    },
    {
        name: 'ClassIds',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Status',
    },
    {
        name: 'Classes',
    },
];

const getClassNamesFromIds = ids =>
    map(ids, id => availableClasses[id].name).join(', ');

const convertStudentsDataToArray = students =>
    reduce(
        students,
        (acc, student) => {
            const result = { ...student };
            result.classNames = getClassNamesFromIds(student.classes);
            acc.push(Object.values(result));
            return acc;
        },
        []
    );

class Students extends Component {
    state = {
        open: false,
        selectedStudentId: null,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false, selectedStudentId: null });
    };

    handleStudentClick = rowData => {
        this.setState({ selectedStudentId: rowData[0], open: true });
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleStudentClick,
            customToolbarSelect: () => <CustomEmailToolbar />,
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
                <StudentForm
                    open={this.state.open}
                    handleClose={this.handleClose}
                    student={data[this.state.selectedStudentId]}
                />
                <MUIDataTable
                    title={'Students'}
                    data={convertStudentsDataToArray(data)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

Students.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Students);
