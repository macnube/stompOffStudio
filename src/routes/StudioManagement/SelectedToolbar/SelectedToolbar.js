import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

class SelectedToolbar extends React.Component {
    render() {
        const { classes, children } = this.props;
        console.log('props are: ', this.props);

        return (
            <React.Fragment>
                <Tooltip title={'Email'}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => null}
                    >
                        <EmailIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                {children}
            </React.Fragment>
        );
    }
}

SelectedToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    deleteStudio: PropTypes.func.isRequired,
    selectedRows: PropTypes.array.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'SelectedToolbar' })(
    SelectedToolbar
);
