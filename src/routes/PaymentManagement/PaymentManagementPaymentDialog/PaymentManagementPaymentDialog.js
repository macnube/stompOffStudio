import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import find from 'lodash/find';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import isNil from 'lodash/isNil';
import toNumber from 'lodash/toNumber';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MUIDataTable from 'mui-datatables';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import styles from 'routes/CourseManagement/styles';

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

class PaymentManagementPaymentDialog extends React.Component {
    state = {
        type: 'Course',
        amount: 0,
        date: new Date(),
        studentId: '',
        cardId: '',
    };

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value });
    };

    handleSetDate = date => {
        this.setState({
            date,
        });
    };

    handleStudentClick = rowData => {
        this.setState({ studentId: rowData[0] });
    };

    handleCreatePayment = () => {
        const { handleCreate } = this.props;
        console.log('here in handleCreatePayment with: ', this.state);
        handleCreate(this.state);
        this.clearForm();
        // this.props.navigateToStudio(newStudio);
    };

    clearForm = () => {
        this.setState({
            type: 'Course',
            amount: 0,
            date: new Date(),
            studentId: '',
            cardId: '',
        });
    };

    renderStudentSelect = () => {
        const { students } = this.props;
        const options = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: this.handleStudentClick,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        return (
            <MUIDataTable
                title={'Select Student'}
                data={parseStudentsToTableData(students)}
                columns={columns}
                options={options}
            />
        );
    };

    getUnpaidCards = () => {
        const { students } = this.props;
        const { studentId } = this.state;
        const student = find(students, { id: studentId });
        return filter(student.cards, card => isNil(card.payment));
    };

    renderForm = () => {
        const { classes } = this.props;
        const { type, amount, date, cardId } = this.state;
        const PAYMENT_TYPES = ['Card', 'PRIVATE', 'DropIn'];
        return (
            <React.Fragment>
                <TextField
                    select
                    label="Select Type"
                    value={type}
                    className={classes.textField}
                    onChange={this.handleChange('type')}
                    margin="normal"
                >
                    {map(PAYMENT_TYPES, (type, i) => (
                        <MenuItem key={i} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="filled-number"
                    label="Payment Amount"
                    value={amount}
                    onChange={this.handleChange('amount', true)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                />
                <TextField
                    id="standard-select-studio-native"
                    select
                    label="Select Card"
                    value={cardId}
                    className={classes.textField}
                    onChange={this.handleChange('cardId')}
                    margin="normal"
                >
                    {map(this.getUnpaidCards(), card => (
                        <MenuItem key={card.id} value={card.id}>
                            {card.expirationDate}
                        </MenuItem>
                    ))}
                </TextField>
                <DatePicker
                    margin="normal"
                    label="Date"
                    value={date}
                    className={classes.textField}
                    onChange={this.handleSetDate}
                />
            </React.Fragment>
        );
    };

    render() {
        const { open, handleClose } = this.props;
        const { studentId } = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Dialog
                    open={open}
                    onClose={handleClose.bind(null, this.clearForm)}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Payment
                    </DialogTitle>
                    <DialogContent>
                        {studentId
                            ? this.renderForm()
                            : this.renderStudentSelect()}
                    </DialogContent>
                    {studentId ? (
                        <DialogActions>
                            <Button
                                onClick={handleClose.bind(null, this.clearForm)}
                                color="primary"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={this.handleCreatePayment}
                                color="primary"
                            >
                                Create
                            </Button>
                        </DialogActions>
                    ) : null}
                </Dialog>
            </MuiPickersUtilsProvider>
        );
    }
}

PaymentManagementPaymentDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(PaymentManagementPaymentDialog);
