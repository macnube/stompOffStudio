import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import keys from 'lodash/keys';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import { ContentToolbar, SelectedDeleteToolbar } from 'components';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TeacherForm from './TeacherForm';

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
        name: 'Classes Taught',
    },
];

const parseTeachersToTableData = teachers =>
    reduce(
        teachers,
        (acc, teacher) => {
            const classNames = map(teacher.classes, c => c.name).join(', ');
            const result = [
                teacher.id,
                teacher.name,
                teacher.email,
                teacher.mobile,
                classNames,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

class TeacherManagement extends Component {
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

    handleOnDeletePress = ids => () => {
        const { deleteTeacher } = this.props;

        forEach(ids, id => {
            deleteTeacher({ variables: { id } });
        });
    };

    handleCreateTeacher = (name, email, mobile) => {
        this.props.createTeacher({
            variables: {
                name,
                email,
                mobile,
            },
        });
        this.handleClose();
    };

    handleUpdateTeacher = (id, name, email, mobile, classIds) => {
        this.props.updateTeacher({
            variables: {
                id,
                name,
                email,
                mobile,
                classIds,
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
                handleOnDeletePress={this.handleOnDeletePress(idsToDelete)}
            />
        );
    };

    render() {
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleTeacherClick,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { teachers } = this.props;
        const { open, selectedTeacherId } = this.state;
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
                    open={open}
                    handleClose={this.handleClose}
                    handleCreate={this.handleCreateTeacher}
                    handleUpdate={this.handleUpdateTeacher}
                    teacher={find(teachers, { id: selectedTeacherId })}
                />
                <MUIDataTable
                    title={'Teachers'}
                    data={parseTeachersToTableData(teachers)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

TeacherManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    teachers: PropTypes.array.isRequired,
    createTeacher: PropTypes.func.isRequired,
    deleteTeacher: PropTypes.func.isRequired,
    updateTeacher: PropTypes.func.isRequired,
};

export default withStyles(styles)(TeacherManagement);
