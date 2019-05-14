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
        },
    });

const FlatTable = ({ title, data, columns, options }) => (
    <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
            title={title}
            data={data}
            columns={columns}
            options={options}
        />
    </MuiThemeProvider>
);

FlatTable.propTypes = {
    options: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default FlatTable;
