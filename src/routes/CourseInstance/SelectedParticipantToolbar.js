import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { PARTICIPANT_STATUS } from 'constants/gql';
import styles from './styles';

const SelectedParticipantToolbar = ({
    classes,
    handleLogParticipantStatus,
    handleDeleteParticipant,
    selectedRows,
    displayData,
}) => {
    const selectedDataIndex = selectedRows.data[0].dataIndex;
    const selectedId = find(displayData, { dataIndex: selectedDataIndex })
        .data[0];
    const handleLogAsNoShowPress = handleLogParticipantStatus(
        PARTICIPANT_STATUS.NO_SHOW
    );
    const handleLogAsAbsentPress = handleLogParticipantStatus(
        PARTICIPANT_STATUS.ABSENT
    );
    const handleResetLogPress = handleLogParticipantStatus(
        PARTICIPANT_STATUS.NOT_LOGGED
    );
    return (
        <div>
            <Button
                variant="contained"
                size="small"
                className={classes.toolbarButton}
                onClick={() => handleResetLogPress(selectedId)}
                color="primary"
            >
                Reset
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.toolbarButton}
                onClick={() => handleLogAsAbsentPress(selectedId)}
                color="primary"
            >
                Absent
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.toolbarButton}
                onClick={() => handleLogAsNoShowPress(selectedId)}
                color="primary"
            >
                No Show
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.toolbarButton}
                onClick={() => handleDeleteParticipant(selectedId)}
                color="secondary"
            >
                Remove
            </Button>
        </div>
    );
};

SelectedParticipantToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleLogParticipantStatus: PropTypes.func.isRequired,
    handleDeleteParticipant: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectedParticipantToolbar);
