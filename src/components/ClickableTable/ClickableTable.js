import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const ClickableTable = props => {
    const getMuiTheme = () =>
        createMuiTheme({
            overrides: {
                MUIDataTableBodyCell: {
                    root: {
                        cursor: 'pointer',
                    },
                },
            },
        });

    return (
        <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable {...props} />
        </MuiThemeProvider>
    );
};

export default ClickableTable;
