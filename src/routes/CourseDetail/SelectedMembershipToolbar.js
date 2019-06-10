import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import { COURSE_STUDENT_STATUS } from 'constants/gql';
import styles from './styles';

const SelectedMembershipToolbar = ({
    classes,
    handleUpdateMembershipStatus,
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
    const handleUpdateAsActive = handleUpdateMembershipStatus(
        COURSE_STUDENT_STATUS.ACTIVE
    );
    const handleUpdateAsInactive = handleUpdateMembershipStatus(
        COURSE_STUDENT_STATUS.INACTIVE
    );
    const handleUpdateAsWaitlist = handleUpdateMembershipStatus(
        COURSE_STUDENT_STATUS.WAITLIST
    );
    return (
        <div>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleUpdateAsActive(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Active
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleUpdateAsInactive(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Inactive
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleUpdateAsWaitlist(selectedIds)}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Waitlist
            </Button>
        </div>
    );
};

SelectedMembershipToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleUpdateMembershipStatus: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectedMembershipToolbar);
