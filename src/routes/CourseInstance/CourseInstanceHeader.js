import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from 'material-ui-pickers';
import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';

import { DetailHeader } from 'components';
import styles from './styles';

class CourseInstanceHeader extends Component {
    state = {
        id: '',
        topic: '',
        notes: '',
        date: new Date(),
        recapUrl: '',
        canSave: false,
    };

    componentDidMount() {
        const { courseInstance } = this.props;
        if (courseInstance) {
            const { id, topic, notes, date, recapUrl } = courseInstance;
            this.setState({
                id,
                topic,
                notes,
                date,
                recapUrl,
            });
        }
    }

    handleChange = (name, isNumber = false) => event => {
        let value = event.target.value;
        if (isNumber) {
            value = toNumber(value);
        }
        this.setState({ [name]: value, canSave: true });
    };

    handleSetDate = date => {
        this.setState({
            date,
            canSave: true,
        });
    };

    handleSave = () => {
        const { id, topic, notes, date, recapUrl } = this.state;
        this.props.handleOnSave({
            id,
            topic,
            notes,
            date,
            recapUrl,
        });
        this.setState({
            canSave: false,
        });
    };

    renderForm = () => {
        const { classes } = this.props;

        const { topic, notes, date, recapUrl } = this.state;
        return (
            <form>
                <TextField
                    id="standard-name"
                    label="Topic"
                    value={topic}
                    className={classes.textField}
                    onChange={this.handleChange('topic')}
                    margin="normal"
                    autoFocus
                />
                <DatePicker
                    margin="normal"
                    label="Date"
                    value={date}
                    className={classes.textField}
                    onChange={this.handleSetDate}
                />
                <TextField
                    id="standard-name"
                    label="Recap URL"
                    value={recapUrl}
                    className={classes.textField}
                    onChange={this.handleChange('recapUrl')}
                    margin="normal"
                />
                <TextField
                    id="standard-name"
                    label="Notes"
                    variant="outlined"
                    value={notes}
                    onChange={this.handleChange('notes')}
                    margin="normal"
                    fullWidth
                    multiline
                />
            </form>
        );
    };

    render() {
        const {
            handleOnCancel,
            handleNavigateToCourseAttendance,
            classes,
        } = this.props;
        const { recapUrl } = this.state;
        return (
            <Fragment>
                <DetailHeader renderForm={this.renderForm}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNavigateToCourseAttendance}
                        className={classes.button}
                    >
                        Attendance Tool
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!this.state.canSave}
                        onClick={this.handleSave}
                        className={classes.button}
                    >
                        Save
                    </Button>
                    <Button variant="contained" onClick={handleOnCancel}>
                        Cancel
                    </Button>
                </DetailHeader>
                {recapUrl ? (
                    <Grid item xs={12}>
                        <Player fluid src={recapUrl}>
                            <ControlBar>
                                <PlaybackRateMenuButton
                                    rates={[5, 2, 1, 0.5, 0.1]}
                                />
                            </ControlBar>
                        </Player>
                    </Grid>
                ) : null}
            </Fragment>
        );
    }
}

CourseInstanceHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    courseInstance: PropTypes.object.isRequired,
    handleOnSave: PropTypes.func.isRequired,
    handleOnCancel: PropTypes.func.isRequired,
    handleNavigateToCourseAttendance: PropTypes.func.isRequired,
};

export default withStyles(styles)(CourseInstanceHeader);
