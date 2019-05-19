import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const AdminToggleButton = ({ selectedIds, handleOnAdminTogglePress }) => (
    <Button
        variant="contained"
        size="small"
        onClick={() => handleOnAdminTogglePress(selectedIds)}
        color="primary"
    >
        Toggle Admin
    </Button>
);

AdminToggleButton.propTypes = {
    selectedIds: PropTypes.array.isRequired,
    handleOnAdminTogglePress: PropTypes.func.isRequired,
};

export default AdminToggleButton;
