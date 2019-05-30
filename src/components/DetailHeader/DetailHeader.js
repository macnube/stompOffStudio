import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const DetailHeader = ({ classes, children, renderForm }) => (
    <Grid
        container
        direction="row"
        justify="space-between"
        className={classes.formContainer}
    >
        <Grid item xs={8} md={9}>
            {renderForm()}
        </Grid>
        <Grid item xs={4} md={3}>
            <Grid
                container
                spacing={16}
                justify="flex-end"
                className={classes.buttonContainer}
            >
                {React.Children.map(children, child => (
                    <Grid item>{child}</Grid>
                ))}
            </Grid>
        </Grid>
    </Grid>
);

DetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    renderForm: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default withStyles(styles)(DetailHeader);
