const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    nameField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    formControl: {
        marginLeft: theme.spacing(1),
    },
    emailField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    menu: {
        width: 200,
    },
    fab: {
        float: 'right',
        margin: theme.spacing(1),
    },
});

export default styles;
