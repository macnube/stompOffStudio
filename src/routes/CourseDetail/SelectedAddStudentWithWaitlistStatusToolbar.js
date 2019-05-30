import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { DANCE_ROLE } from '~/constants/gql';
import styles from './styles';

const SelectedAddStudentWithWaitlistStatusToolbar = ({
    classes,
    handleAddWithWaitlistStatusPress,
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
    const handleAddAsLeader = handleAddWithWaitlistStatusPress(
        DANCE_ROLE.LEADER
    );
    const handleAddAsFollower = handleAddWithWaitlistStatusPress(
        DANCE_ROLE.FOLLOWER
    );
    return (
        <div>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleAddAsLeader(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Leader
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleAddAsFollower(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Follower
            </Button>
        </div>
    );
};

SelectedAddStudentWithWaitlistStatusToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddWithWaitlistStatusPress: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectedAddStudentWithWaitlistStatusToolbar);
