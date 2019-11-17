import React from 'react';
import { Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { SEND_RESET_EMAIL } from './graphql';
import ForgotPassword from './ForgotPassword';

const sendResetEmail = ({ render }) => (
    <Mutation mutation={SEND_RESET_EMAIL}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    sendResetEmail,
};

const ForgotPasswordContainer = () => {
    return (
        <Adopt mapper={mapper}>
            {({
                sendResetEmail: {
                    mutation: sendResetEmailMutation,
                    result: sendResetEmail,
                },
            }) => {
                if (sendResetEmail.data) {
                    console.log(
                        'sendResetEmail data is: ',
                        sendResetEmail.data
                    );
                    return (
                        <ForgotPassword
                            sendResetEmail={sendResetEmailMutation}
                            recipientEmail={
                                sendResetEmail.data.sendResetEmail.email
                            }
                        />
                    );
                }

                return (
                    <ForgotPassword sendResetEmail={sendResetEmailMutation} />
                );
            }}
        </Adopt>
    );
};

export default ForgotPasswordContainer;
