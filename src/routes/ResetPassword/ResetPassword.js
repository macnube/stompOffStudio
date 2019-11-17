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

class ResetPassword extends React.Component {
    state = {
        password: '',
        passwordValidation: '',
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleResetPassword = () => {
        const { email, encryptedEmail, encryptedDate } = this.props;
        const { password } = this.state;
        this.props.resetPassword({
            variables: {
                email,
                encryptedEmail,
                encryptedDate,
                password,
            },
        });
    };

    render() {
        const { classes } = this.props;
        const { password, passwordValidation } = this.state;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Reset Your Password
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                autoComplete="password"
                                type="password"
                                value={password}
                                onChange={this.handleChange('password')}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">
                                Enter password again
                            </InputLabel>
                            <Input
                                id="passwordValidation"
                                name="passwordValidation"
                                autoComplete="passwordValidation"
                                type="password"
                                value={passwordValidation}
                                onChange={this.handleChange(
                                    'passwordValidation'
                                )}
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleResetPassword}
                            disabled={password !== passwordValidation}
                        >
                            Reset Password
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
    resetPassword: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    encryptedEmail: PropTypes.string.isRequired,
    encryptedDate: PropTypes.string.isRequired,
};

export default withStyles(styles)(ResetPassword);
