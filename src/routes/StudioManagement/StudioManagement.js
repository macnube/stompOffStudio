import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import MUIDataTable from 'mui-datatables';
import { ContentToolbar } from 'components';
import SelectedToolbar from './SelectedToolbar';
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
            console.log('roomNames is :', roomNames);
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
            state: {
                studioId: studio.id,
            },
        });
    };

    handleNavigateToStudioDetail = rowData => {
        const { studios } = this.props;
        this.navigateToStudioDetail(find(studios, { id: rowData[0] }));
    };

    render() {
        const { studios } = this.props;
        const options = {
            responsive: 'scroll',
            onRowClick: this.handleNavigateToStudioDetail,
            customToolbarSelect: (selectedRows, displayData) => (
                <SelectedToolbar
                    selectedRows={selectedRows}
                    displayData={displayData}
                />
            ),
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
};

export default compose(
    withRouter,
    withStyles(styles)
)(StudioManagement);
