import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { config } from 'dotenv';

import { ClickableTable } from 'components';
import { removeExistingStudentsFromImportData } from './parse';
import ImportStudentForm from './ImportStudentForm';

config();

const columns = [
    {
        name: 'Sign up date',
    },
    {
        name: 'Name',
    },
    {
        name: 'Email',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Number',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Desired Class',
    },
    {
        name: 'Second Class',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Role',
    },
    {
        name: 'Partner',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Third Class',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Referred By',
    },
    {
        name: 'Experience',
        options: {
            display: 'false',
        },
    },
];

const rowDataToStudent = rowData => ({
    waitlistDate: rowData[0],
    name: rowData[1],
    email: rowData[2],
    number: rowData[3],
    firstClass: rowData[4],
    secondClass: rowData[5],
    role: rowData[6],
    dancePartner: rowData[7],
    thirdClass: rowData[8],
    referredBy: rowData[9],
    experience: rowData[10],
});

class RegistrationManagement extends Component {
    state = {
        open: false,
        importData: null,
        selectedStudent: null,
    };

    data = null;

    handleClickOpen = rowData => {
        this.setState({
            open: true,
            selectedStudent: rowDataToStudent(rowData),
        });
    };

    handleClose = () => {
        this.setState({ open: false, selectedStudent: null });
    };

    componentDidUpdate = prevProps => {
        if (prevProps.students.length !== this.props.students.length) {
            this.setState({
                importData: removeExistingStudentsFromImportData(
                    this.state.importData,
                    this.props.students
                ),
            });
        }
    };

    fetchRegistrationData = () => {
        // Array of API discovery doc URLs for APIs used by the quickstart
        var DISCOVERY_DOCS = [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
        ];

        // Authorization scopes required by the API; multiple scopes can be
        // included, separated by spaces.
        var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';
        window.gapi.client
            .init({
                apiKey: process.env.REACT_APP_GOOGLE_SHEET_API_KEY,
                clientId: process.env.REACT_APP_GOOGLE_SHEET_CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })
            .then(() => {
                return window.gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId:
                        '1zlkkYEr-K6-SN9eW6mrQlZixSCLRsfzKrwJDW0QPCF8',
                    range: 'A2:K',
                });
            })
            .then(response => {
                var result = response.result;
                var numRows = result.values ? result.values.length : 0;
                const cleanedImportData = removeExistingStudentsFromImportData(
                    response.result.values,
                    this.props.students
                );
                if (cleanedImportData.length > 0) {
                    this.setState({
                        importData: cleanedImportData,
                    });
                }
            })
            .catch(error => {
                console.log('error is :', JSON.stringify(error, null, 2));
            });
    };

    componentDidMount() {
        window.gapi.load('client:auth2', () => this.fetchRegistrationData());
    }

    render() {
        const { importData, selectedStudent, open } = this.state;
        const { courses, importStudent, addedStudent } = this.props;
        const options = {
            responsive: 'scroll',
            selectableRows: 'none',
            onRowClick: this.handleClickOpen,
        };
        return importData ? (
            <Fragment>
                <ClickableTable
                    title={'Student Registrations'}
                    data={importData}
                    columns={columns}
                    options={options}
                />
                {selectedStudent ? (
                    <ImportStudentForm
                        student={selectedStudent}
                        courses={courses}
                        open={open}
                        handleClose={this.handleClose}
                        importStudent={importStudent}
                        addedStudent={addedStudent}
                    />
                ) : null}
            </Fragment>
        ) : null;
    }
}

RegistrationManagement.propTypes = {
    courses: PropTypes.array.isRequired,
    students: PropTypes.array.isRequired,
    importStudent: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    addedStudent: PropTypes.object,
};

export default withRouter(RegistrationManagement);
