import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SimpleLineChart from './SimpleLineChart';
import SimpleTable from './SimpleTable';
import styles from './styles';

const Overview = ({ classes }) => {
    return (
        <Fragment>
            <Typography variant="h4" gutterBottom component="h2">
                Orders
            </Typography>
            <Typography component="div" className={classes.chartContainer}>
                <SimpleLineChart />
            </Typography>
            <Typography variant="h4" gutterBottom component="h2">
                Products
            </Typography>
            <div className={classes.tableContainer}>
                <SimpleTable />
            </div>
        </Fragment>
    );
};

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Overview);
