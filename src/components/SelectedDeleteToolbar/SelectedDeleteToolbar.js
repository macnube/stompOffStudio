import React from 'react';
import keys from 'lodash/keys';
import noop from 'lodash/noop';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';

const SelectedDeleteToolbar = ({
    selectedRows,
    displayData,
    handleOnDeletePress,
    renderChildren = noop,
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
            {renderChildren(selectedIds)}
            <Tooltip title={'Delete'}>
                <IconButton onClick={() => handleOnDeletePress(selectedIds)}>
                    <TrashIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
};

SelectedDeleteToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    renderChildren: PropTypes.func,
    handleOnDeletePress: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
};

export default SelectedDeleteToolbar;
