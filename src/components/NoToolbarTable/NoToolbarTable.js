import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const getMuiTheme = () =>
    createMuiTheme({
        overrides: {
            MuiPaper: {
                elevation4: {
                    boxShadow: '0 0 0 0',
                },
            },
            MUIDataTableBodyCell: {
                root: {
                    cursor: 'pointer',
                },
            },
        },
    });

const NoToolbarTable = ({ title, data, columns, options }) => (
    <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={{
                ...options,
                search: true,
                print: false,
                download: false,
                filter: false,
                viewColumns: false,
            }}
        />
    </MuiThemeProvider>
);

NoToolbarTable.propTypes = {
    options: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default NoToolbarTable;
