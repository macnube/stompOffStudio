import React from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import noop from 'lodash/noop';
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
    buttonLabel = '',
    renderChildren = noop,
}) => {
    const selectedIds = reduce(
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
    return (
        <React.Fragment>
            {renderChildren(selectedIds)}
            <Tooltip title={title}>
                <IconButton
                    className={classes.iconButton}
                    onClick={() => handleAddPress(selectedIds)}
                >
                    <AddIcon className={classes.deleteIcon} />
                    {buttonLabel}
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
    buttonLabel: PropTypes.string,
    renderChildren: PropTypes.func,
};

export default withStyles(defaultToolbarStyles, { name: 'SelectedAddToolbar' })(
    SelectedAddToolbar
);
