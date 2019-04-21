import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import { ContentToolbar, SelectedDeleteToolbar } from 'components';
import StudioForm from './StudioForm';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Name',
    },
    {
        name: 'Address',
    },
    {
        name: 'Rooms',
    },
];

const parseStudiosToTableData = studios =>
    reduce(
        studios,
        (acc, studio) => {
            const roomNames = map(studio.rooms, room => room.name).join(', ');
            const result = [studio.id, studio.name, studio.address, roomNames];
            acc.push(result);
            return acc;
        },
        []
    );

class StudioManagement extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false });
    };

    navigateToStudioDetail = studio => {
        this.props.history.push({
            pathname: './studioDetail',
            search: `id=${studio.id}`,
        });
    };

    handleNavigateToStudioDetail = rowData => {
        const { studios } = this.props;
        this.navigateToStudioDetail(find(studios, { id: rowData[0] }));
    };

    //Having to delete each studio individually because prisma has a bug
    //where cascading deletes don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleOnDeletePress = ids => {
        const { deleteStudio } = this.props;

        forEach(ids, id => {
            deleteStudio({ variables: { id } });
        });
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
        />
    );

    render() {
        const { studios, createStudio } = this.props;
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToStudioDetail,
            customToolbarSelect: this.renderSelectedToolbar,
        };
        return (
            <Fragment>
                <ContentToolbar>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        onClick={this.handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </ContentToolbar>
                <StudioForm
                    open={this.state.open}
                    handleClose={this.handleClose}
                    navigateToStudioDetail={this.navigateToStudioDetail}
                    createStudio={createStudio}
                />
                <MUIDataTable
                    title={'Studios'}
                    data={parseStudiosToTableData(studios)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

StudioManagement.propTypes = {
    classes: PropTypes.object.isRequired,
    studios: PropTypes.array.isRequired,
    deleteStudio: PropTypes.func.isRequired,
    createStudio: PropTypes.func.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudioManagement);
