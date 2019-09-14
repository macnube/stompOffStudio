import React from 'react';
import keys from 'lodash/keys';
import noop from 'lodash/noop';
import reduce from 'lodash/reduce';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';

const defaultGetIds = (selectedRows, displayData) =>
    reduce(
        displayData,
        (result, row) => {
            if (keys(selectedRows.lookup).includes(row.dataIndex.toString())) {
                result.push(row.data[0]);
                return result;
            }
            return result;
        },
        []
    );

const SelectedDeleteToolbar = ({
    selectedRows,
    displayData,
    handleOnDeletePress,
    renderChildren = noop,
    getIds = defaultGetIds,
}) => {
    const selectedIds = getIds(selectedRows, displayData);
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
    renderChildren: PropTypes.func,
    handleOnDeletePress: PropTypes.func.isRequired,
    selectedRows: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
    getIds: PropTypes.func,
};

export default SelectedDeleteToolbar;
