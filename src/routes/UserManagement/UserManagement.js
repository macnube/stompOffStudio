import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';

import { SelectedDeleteToolbar } from 'src/components';
import styles from './styles';
import { parseUsersToTableData } from './parse';
import AdminToggleButton from './AdminToggleButton';

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
        name: 'User Role',
    },
];

class UserManagement extends Component {
    handleOnDeletePress = ids => {
        const { deleteUser } = this.props;

        forEach(ids, id => {
            deleteUser({ variables: { id } });
        });
    };

    handleOnAdminTogglePress = ids => {
        const { toggleUserAdminStatus } = this.props;

        forEach(ids, id => {
            toggleUserAdminStatus({ variables: { id } });
        });
    };

    renderAdminToggleButton = ids => (
        <AdminToggleButton
            selectedIds={ids}
            handleOnAdminTogglePress={this.handleOnAdminTogglePress}
        />
    );

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
            renderChildren={this.renderAdminToggleButton}
        />
    );

    render() {
        const options = {
            responsive: 'scroll',
            selectableRows: 'single',
            customToolbarSelect: this.renderSelectedToolbar,
        };
        const { users } = this.props;
        return (
            <Fragment>
                <MUIDataTable
                    title={'Users'}
                    data={parseUsersToTableData(users)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

UserManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    deleteUser: PropTypes.func.isRequired,
    toggleUserAdminStatus: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(UserManagement);
