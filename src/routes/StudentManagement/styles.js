const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
});

export default styles;
