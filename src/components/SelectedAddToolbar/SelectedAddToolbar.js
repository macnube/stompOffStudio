import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import keys from 'lodash/keys';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

const SelectedAddToolbar = ({
    classes,
    handleAddPress,
    title,
    selectedRows,
    displayData,
}) => {
    const idsToAdd = reduce(
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
        <React.Fragment>
            <Tooltip title={title}>
                <IconButton
                    className={classes.iconButton}
                    onClick={() => handleAddPress(idsToAdd)}
                >
                    <AddIcon className={classes.deleteIcon} />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
};

SelectedAddToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    handleAddPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'SelectedAddToolbar' })(
    SelectedAddToolbar
);
