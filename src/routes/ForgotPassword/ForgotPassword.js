import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

class ForgotPassword extends React.Component {
    state = {
        email: '',
        emailValidation: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSendResetEmail = () => {
        const { email } = this.state;
        console.log('here');
        this.props.sendResetEmail({
            variables: {
                email,
            },
        });
    };

    render() {
        const { classes, recipientEmail } = this.props;
        const { email, emailValidation } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email Address
                            </InputLabel>
                            <Input
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={this.handleChange('email')}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Enter Email Address Again
                            </InputLabel>
                            <Input
                                id="emailValidation"
                                name="emailValidation"
                                autoComplete="emailValidation"
                                value={emailValidation}
                                onChange={this.handleChange('emailValidation')}
                            />
                        </FormControl>
                        {recipientEmail ? (
                            <Typography color="primary" variant="h6">
                                Successfully sent to {recipientEmail}, please
                                check your email
                            </Typography>
                        ) : null}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSendResetEmail}
                            disabled={email !== emailValidation}
                        >
                            Send Reset Email
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

ForgotPassword.propTypes = {
    classes: PropTypes.object.isRequired,
    sendResetEmail: PropTypes.func.isRequired,
    recipientEmail: PropTypes.string,
};

export default withStyles(styles)(ForgotPassword);
