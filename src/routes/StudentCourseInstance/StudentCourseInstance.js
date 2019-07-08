import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';

const StudentCourseInstance = ({
    courseInstance: { notes, recapUrl, topic },
}) => {
    return (
        <Paper>
            <Container maxWidth="md">
                <Typography
                    component="h2"
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    {topic}
                </Typography>
                {recapUrl ? (
                    <Player fluid src={recapUrl}>
                        <ControlBar>
                            <PlaybackRateMenuButton
                                rates={[5, 2, 1, 0.5, 0.1]}
                            />
                        </ControlBar>
                    </Player>
                ) : null}
                <TextField
                    id="standard-name"
                    label="Notes"
                    variant="outlined"
                    value={notes}
                    margin="normal"
                    fullWidth
                />
            </Container>
        </Paper>
    );
};

StudentCourseInstance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
};

export default StudentCourseInstance;
