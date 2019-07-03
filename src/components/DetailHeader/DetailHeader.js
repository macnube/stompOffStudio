import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const DetailHeader = ({
    classes,
    children,
    renderForm,
    height = 'Md',
    formOnly = false,
}) => {
    const fixedHeightPaper = clsx(classes.paper, classes[`height${height}`]);

    const fixedHeightButtonPaper = clsx(
        classes.buttonPaper,
        classes[`height${height}`]
    );
    return formOnly ? (
        <Fragment>
            <Grid item xs={12} md={12} lg={12}>
                <Paper elevation={3} className={fixedHeightPaper}>
                    {renderForm()}
                </Paper>
            </Grid>
        </Fragment>
    ) : (
        <Fragment>
            <Grid item xs={12} md={4} lg={3}>
                <Paper elevation={3} className={fixedHeightButtonPaper}>
                    {children}
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
                <Paper elevation={3} className={fixedHeightPaper}>
                    {renderForm()}
                </Paper>
            </Grid>
        </Fragment>
    );
};

DetailHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    renderForm: PropTypes.func.isRequired,
    children: PropTypes.node,
    height: PropTypes.oneOf(['Sm', 'Md', 'Lg']),
    formOnly: PropTypes.bool,
};

export default withStyles(styles)(DetailHeader);
