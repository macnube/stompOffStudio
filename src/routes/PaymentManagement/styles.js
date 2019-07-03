const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    nameField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    topForm: {
        paddingLeft: 2 * theme.spacing(1),
        paddingRight: 2 * theme.spacing(1),
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
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

export default styles;
