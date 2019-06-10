import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import find from 'lodash/find';

import { CustomAddToolbar, SelectedDeleteToolbar, FlatTable } from 'components';
import { parseMembershipsToTableData } from 'routes/StudentDetail/parse';
import AddMembershipDialog from './AddMembershipDialog';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Class Name',
    },
    {
        name: 'Role',
    },
];

const CardsTable = ({
    student,
    open,
    handleAdd,
    deleteMembership,
    handleClose,
    history,
}) => {
    const handleOnDeletePress = ids => {
        forEach(ids, id => {
            deleteMembership({
                variables: { id },
            });
        });
    };
    const renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={handleOnDeletePress}
        />
    );

    const renderToolbar = () => (
        <CustomAddToolbar title={'Add to Course'} handleAddPress={handleAdd} />
    );

    const handleOnCourseClick = rowData => {
        const membership = find(student.memberships, {
            id: rowData[0],
        });
        history.push({
            pathname: './courseDetail',
            search: `id=${membership.course.id}`,
        });
    };

    const options = {
        responsive: 'scroll',
        onRowClick: handleOnCourseClick,
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
    };
    return (
        <Fragment>
            <FlatTable
                title={'Active Registered Courses'}
                data={parseMembershipsToTableData(student.memberships)}
                columns={columns}
                options={options}
            />
            <AddMembershipDialog
                open={open}
                handleClose={handleClose}
                studentId={student.id}
            />
        </Fragment>
    );
};

CardsTable.propTypes = {
    student: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    deleteMembership: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
};

export default React.memo(CardsTable);
