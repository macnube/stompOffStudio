import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import { ContentToolbar, SelectedDeleteToolbar } from 'components';
import EmailButton from './EmailButton';
import StudentForm from './StudentForm';
import styles from './styles';

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
        name: 'Status',
    },
    {
        name: 'Courses',
    },
];

const parseStudentsToTableData = studentManagement =>
    reduce(
        studentManagement,
        (acc, student) => {
            const courseNames = map(
                student.courses,
                course => course.name
            ).join(', ');
            const result = [
                student.id,
                student.name,
                student.email,
                student.mobile,
                courseNames,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

class StudentManagement extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        const students = values(data);
        forEach(students, ({ name, email, mobile }) => {
            this.props.createStudent({
                variables: {
                    name,
                    email,
                    mobile,
                },
            });
        });
        //this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false });
    };

    navigateToStudentDetail = student => {
        this.props.history.push({
            pathname: './studentDetail',
            search: `id=${student.id}`,
        });
    };

    handleNavigateToStudentDetail = rowData => {
        const { students } = this.props;
        this.navigateToStudentDetail(find(students, { id: rowData[0] }));
    };

    handleOnDeletePress = ids => {
        const { deleteStudent } = this.props;

        forEach(ids, id => {
            deleteStudent({ variables: { id } });
        });
    };

    renderEmailButton = ids => {
        return (
            <EmailButton
                handleOnEmailPress={ids => console.log('ids are: ', ids)}
                selectedIds={ids}
            />
        );
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
            renderChildren={this.renderEmailButton}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToStudentDetail,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { students, createStudent } = this.props;
        const { open } = this.state;
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
                    open={open}
                    handleClose={this.handleClose}
                    navigateToStudentDetail={this.navigateToStudentDetail}
                    createStudent={createStudent}
                />
                <MUIDataTable
                    title={'Students'}
                    data={parseStudentsToTableData(students)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

StudentManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    deleteStudent: PropTypes.func.isRequired,
    createStudent: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudentManagement);
