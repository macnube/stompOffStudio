import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const SelectedCourseStudentToolbar = ({
    classes,
    handleAddAsRolePress,
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
    return (
        <div>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleAddAsRolePress(selectedIds, 'Leader')}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Leader
            </Button>
            <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => handleAddAsRolePress(selectedIds, 'Follower')}
                color="primary"
            >
                <AddIcon className={classes.leftIcon} />
                Follower
            </Button>
        </div>
    );
};

SelectedCourseStudentToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddAsRolePress: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectedCourseStudentToolbar);
