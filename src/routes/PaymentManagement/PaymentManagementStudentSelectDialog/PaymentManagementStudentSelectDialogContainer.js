import React from 'react';
import { Query } from 'react-apollo';

import { GET_STUDENTS } from './graphql';
import PaymentManagementStudentSelectDialog from './PaymentManagementStudentSelectDialog';

const PaymentManagementStudentSelectDialogContainer = props => (
    <Query query={GET_STUDENTS}>
        {({ loading, error, data, refetch }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.students) return `404: Session not found`;
            return data.students ? (
                <PaymentManagementStudentSelectDialog
                    {...props}
                    students={data.students}
                    refetch={refetch}
                />
            ) : null;
        }}
    </Query>
);

export default PaymentManagementStudentSelectDialogContainer;
