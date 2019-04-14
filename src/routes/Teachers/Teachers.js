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
import TeacherForm from './TeacherForm';

const availableClasses = {
    TueL2: { name: 'Tues - Lindy Hop II', id: 'TueL2' },
    ThuB2: { name: 'Thu - Balboa II', id: 'ThuB2' },
    TueL3: { name: 'Tues - Lindy Hop III', id: 'TueL3' },
    ThuAJ2: { name: 'Thu - Authentic Jazz II', id: 'ThuAJ2' },
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
        name: 'email',
    },
    {
        name: 'ClassIds',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Classes Taught',
    },
];

const data = {
    1: {
        id: 1,
        name: 'Paul McCloud',
        email: 'paul.mccloud@gmail.com',
        classes: ['TueL3', 'ThuB2'],
    },
    2: {
        id: 2,
        name: 'Lana Sedlmayr',
        email: 'miss.lana.sedlmayr@gmail.com',
        classes: ['TueL3', 'ThuB2', 'ThuAJ2'],
    },
};

const getClassNamesFromIds = ids =>
    map(ids, id => availableClasses[id].name).join(', ');

const convertTeachersDataToArray = teachers =>
    reduce(
        teachers,
        (acc, teacher) => {
            const result = { ...teacher };
            result.classNames = getClassNamesFromIds(teacher.classes);
            acc.push(Object.values(result));
            return acc;
        },
        []
    );

class Teachers extends Component {
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
                <TeacherForm
                    open={this.state.open}
                    handleClose={this.handleClose}
                    teacher={data[this.state.selectedTeacherId]}
                />
                <MUIDataTable
                    title={'Teachers'}
                    data={convertTeachersDataToArray(data)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

Teachers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teachers);
