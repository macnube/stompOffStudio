import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import styles from './styles';
import { SelectedAddToolbar } from 'components';

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
];

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const parseTeachersToTableData = teachers =>
    reduce(
        teachers,
        (acc, teacher) => {
            const result = [teacher.id, teacher.name, teacher.email];
            acc.push(result);
            return acc;
        },
        []
    );

class AddTeacherForm extends Component {
    navigateToteacherDetail = teacher => {
        this.props.history.push({
            pathname: './teacherDetail',
            search: `id=${teacher.id}`,
        });
    };

    handleNavigateToteacherDetail = rowData => {
        const { teachers } = this.props;
        this.navigateToteacherDetail(find(teachers, { id: rowData[0] }));
    };

    //Having to delete each teacher individually because prisma has a bug
    //where cascading deletes don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleAddPress = ids => {
        const { addTeacherToCourse, courseId } = this.props;

        forEach(ids, teacherId => {
            addTeacherToCourse({ variables: { id: courseId, teacherId } });
        });
    };

    render() {
        const { classes, teachers, open, handleClose } = this.props;
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToteacherDetail,
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedAddToolbar
                    selectedRows={selectedRows}
                    displayData={displayData}
                    title={'Add Teacher'}
                    handleAddPress={this.handleAddPress}
                />
            ),
        };
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                TransitionComponent={Transition}
            >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={handleClose}
                            aria-label="Close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            className={classes.flex}
                        >
                            Close
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogTitle id="form-dialog-title">
                    Add Teachers to Course
                </DialogTitle>
                <DialogContent>
                    <MUIDataTable
                        title={'Teachers'}
                        data={parseTeachersToTableData(teachers)}
                        columns={columns}
                        options={options}
                    />
                </DialogContent>
            </Dialog>
        );
    }
}

AddTeacherForm.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    teachers: PropTypes.array.isRequired,
    addTeacherToCourse: PropTypes.func.isRequired,
    courseId: PropTypes.string.isRequired,
};

export default withStyles(styles)(AddTeacherForm);
