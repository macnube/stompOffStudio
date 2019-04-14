const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    nameField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    topForm: {
        paddingLeft: 2 * theme.spacing.unit,
        paddingRight: 2 * theme.spacing.unit,
    },
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
