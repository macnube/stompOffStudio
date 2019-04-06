const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    formControl: {
        marginLeft: theme.spacing.unit,
    },
    emailField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    menu: {
        width: 200,
    },
    fab: {
        float: 'right',
        margin: theme.spacing.unit,
    },
});

export default styles;
