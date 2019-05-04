import 'date-fns';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

class CourseInstance extends Component {
    render() {
        const { courseInstance } = this.props;
        const students = getCourseInstanceStudents(courseInstance);
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper>
                    <Grid container spacing={24}>
                        {}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>xs=12</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={classes.paper}>xs=6</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper className={classes.paper}>xs=3</Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </MuiPickersUtilsProvider>
        );
    }
}

CourseInstance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
};

export default withRouter(CourseInstance);
