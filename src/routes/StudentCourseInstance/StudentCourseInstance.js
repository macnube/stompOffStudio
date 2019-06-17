import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';

const StudentCourseInstance = ({ courseInstance: { notes, recapUrl } }) => {
    return (
        <Paper>
            <Player
                fluid
                src={
                    recapUrl
                        ? recapUrl
                        : 'http://www.mediafire.com/file/qh8zbwp9jm848y6/2019-05-02-Thu-Balboa-II.mp4/file'
                }
            >
                <ControlBar>
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                </ControlBar>
            </Player>
            <TextField
                id="standard-name"
                label="Notes"
                variant="outlined"
                value={notes}
                margin="normal"
                fullWidth
            />
        </Paper>
    );
};

StudentCourseInstance.propTypes = {
    courseInstance: PropTypes.object.isRequired,
};

export default StudentCourseInstance;
