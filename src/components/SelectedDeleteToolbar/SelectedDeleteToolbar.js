import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

const SelectedToolbar = ({ classes, children, handleOnDeletePress }) => (
    <React.Fragment>
        <Tooltip title={'Delete'}>
            <IconButton
                className={classes.iconButton}
                onClick={handleOnDeletePress}
            >
                <TrashIcon className={classes.deleteIcon} />
            </IconButton>
        </Tooltip>
        {children}
    </React.Fragment>
);

SelectedToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    handleOnDeletePress: PropTypes.func.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'SelectedToolbar' })(
    SelectedToolbar
);
