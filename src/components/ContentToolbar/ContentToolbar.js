import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const ContentToolbar = ({ children, classes }) => {
    return (
        <div className={classes.toolbar}>
            {React.Children.map(children, child => (
                <div className={classes.action}>{child}</div>
            ))}
        </div>
    );
};

ContentToolbar.propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContentToolbar);
