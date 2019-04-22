import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';

const EmailButton = ({ selectedIds, handleOnEmailPress }) => (
    <Tooltip title={'Email'}>
        <IconButton onClick={() => handleOnEmailPress(selectedIds)}>
            <EmailIcon />
        </IconButton>
    </Tooltip>
);

EmailButton.propTypes = {
    selectedIds: PropTypes.array.isRequired,
    handleOnEmailPress: PropTypes.func.isRequired,
};

export default EmailButton;
