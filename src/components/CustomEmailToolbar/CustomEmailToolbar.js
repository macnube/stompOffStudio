import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

class CustomEmailToolbar extends React.Component {
    render() {
        const { classes, children } = this.props;

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

CustomEmailToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default withStyles(defaultToolbarStyles, { name: 'CustomEmailToolbar' })(
    CustomEmailToolbar
);
