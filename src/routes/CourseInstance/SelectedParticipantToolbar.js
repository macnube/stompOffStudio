import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';
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
    const handleLogAsPresentPress = handleLogParticipantStatus(
        PARTICIPANT_STATUS.PRESENT
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
                className={classes.button}
                onClick={() => handleResetLogPress(selectedId)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Reset
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleLogAsAbsentPress(selectedId)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Absent
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleLogAsPresentPress(selectedId)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Present
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
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
