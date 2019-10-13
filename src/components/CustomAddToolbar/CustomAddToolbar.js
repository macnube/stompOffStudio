import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

class CustomAddToolbar extends React.Component {
    render() {
        const { classes, handleAddPress, title, children } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={title}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={handleAddPress}
                    >
                        <AddIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                {children}
            </React.Fragment>
        );
    }
}

CustomAddToolbar.propTypes = {
    children: PropTypes.array,
    classes: PropTypes.object.isRequired,
    handleAddPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'CustomAddToolbar' })(
    CustomAddToolbar
);
