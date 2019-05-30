import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import isNil from 'lodash/isNil';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MUIDataTable from 'mui-datatables';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from 'src/routes/CourseManagement/styles';

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
];

const parseStudentsToTableData = students =>
    reduce(
        students,
        (acc, student) => {
            const result = [student.id, student.name];
            acc.push(result);
            return acc;
        },
        []
    );

const PaymentManagementStudentSelectDialog = ({
    open,
    students,
    handleStudentSelect,
}) => {
    const handleStudentClick = rowData => {
        const student = find(students, { id: rowData[0] });
        handleStudentSelect(student);
    };

    const options = {
        responsive: 'scroll',
        selectableRows: 'none',
        onRowClick: handleStudentClick,
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    Add payment for...
                </DialogTitle>
                <DialogContent>
                    <MUIDataTable
                        title={'Select Student'}
                        data={parseStudentsToTableData(students)}
                        columns={columns}
                        options={options}
                    />
                </DialogContent>
            </Dialog>
        </MuiPickersUtilsProvider>
    );
};

PaymentManagementStudentSelectDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    handleStudentSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaymentManagementStudentSelectDialog);
