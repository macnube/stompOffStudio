import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { PARTICIPANT_STATUS } from 'constants/gql';
import styles from './styles';

const SelectedAddParticipantToolbar = ({
    classes,
    handleAddParticipantPress,
    selectedRows,
    displayData,
}) => {
    const selectedIds = reduce(
        displayData,
        (result, row, index) => {
            if (keys(selectedRows.lookup).includes(index.toString())) {
                result.push(row.data[0]);
                return result;
            }
            return result;
        },
        []
    );
    const handleAddAsPresentPress = handleAddParticipantPress(
        PARTICIPANT_STATUS.PRESENT
    );
    const handleAddAsAbsentPress = handleAddParticipantPress(
        PARTICIPANT_STATUS.ABSENT
    );
    return (
        <div>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleAddAsAbsentPress(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Absent
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleAddAsPresentPress(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Present
            </Button>
        </div>
    );
};

SelectedAddParticipantToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddParticipantPress: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectedAddParticipantToolbar);
