import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';

const EmailButton = ({ handleOnEmailPress }) => (
    <Tooltip title={'Email'}>
        <IconButton onClick={handleOnEmailPress}>
            <EmailIcon />
        </IconButton>
    </Tooltip>
);

EmailButton.propTypes = {
    handleOnEmailPress: PropTypes.func.isRequired,
};

export default EmailButton;
