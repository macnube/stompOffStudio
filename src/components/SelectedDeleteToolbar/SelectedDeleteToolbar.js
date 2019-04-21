import React from 'react';
import keys from 'lodash/keys';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

const SelectedToolbar = ({
    classes,
    children,
    selectedRows,
    displayData,
    handleOnDeletePress,
}) => {
    const idsToDelete = reduce(
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
            <Tooltip title={'Delete'}>
                <IconButton
                    className={classes.iconButton}
                    onClick={() => handleOnDeletePress(idsToDelete)}
                >
                    <TrashIcon className={classes.deleteIcon} />
                </IconButton>
            </Tooltip>
            {children}
        </React.Fragment>
    );
};

SelectedToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    handleOnDeletePress: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'SelectedToolbar' })(
    SelectedToolbar
);
