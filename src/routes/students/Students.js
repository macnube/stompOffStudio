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
import { ContentToolbar } from 'components';

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
