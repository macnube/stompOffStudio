import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

class CustomToolbar extends React.Component {
    render() {
        const { classes, handleAddRoomPress } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={'Add Room'}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={handleAddRoomPress}
                    >
                        <AddIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        );
    }
}

CustomToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddRoomPress: PropTypes.func.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'CustomToolbar' })(
    CustomToolbar
);
