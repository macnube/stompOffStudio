import React from 'react';
import forEach from 'lodash/forEach';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TrashIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
    iconButton: {},
};

class SelectedToolbar extends React.Component {
    //Having to delete each studio individually because prisma has a bug
    //where cascading deletes don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    deleteStudios = () => {
        const { idsToDelete, deleteStudio } = this.props;
        forEach(idsToDelete, id => {
            deleteStudio({ variables: { id } });
        });
    };

    render() {
        const { classes, children } = this.props;

        return (
            <React.Fragment>
                <Tooltip title={'Delete'}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={this.deleteStudios}
                    >
                        <TrashIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                {children}
            </React.Fragment>
        );
    }
}

SelectedToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    deleteStudio: PropTypes.func.isRequired,
    idsToDelete: PropTypes.array.isRequired,
};

export default withStyles(defaultToolbarStyles, { name: 'SelectedToolbar' })(
    SelectedToolbar
);
