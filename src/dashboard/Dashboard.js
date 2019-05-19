import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {
    Overview,
    StudentDetail,
    StudentManagement,
    CourseManagement,
    CourseDetail,
    TeacherManagement,
    StudioManagement,
    StudioDetail,
    PaymentManagement,
    CourseAttendance,
    CourseInstance,
    CardDetail,
    UserManagement,
} from 'routes';
import ListItems from './ListItems';
import styles from './styles';

class Dashboard extends React.Component {
    state = {
        open: true,
        mainContent: 'overview',
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleContentChange = contentId => {
        this.setState({ mainContent: contentId });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(
                        classes.appBar,
                        this.state.open && classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.open}
                        className={classes.toolbar}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.state.open && classes.drawerPaperClose
                        ),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItems
                            handleContentChange={this.handleContentChange}
                        />
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Route exact path="/" component={Overview} />
                    <Route
                        exact
                        path="/studentManagement"
                        component={StudentManagement}
                    />
                    <Route
                        exact
                        path="/studentDetail"
                        component={StudentDetail}
                    />
                    <Route
                        exact
                        path="/courseManagement"
                        component={CourseManagement}
                    />
                    <Route
                        exact
                        path="/courseDetail"
                        component={CourseDetail}
                    />
                    <Route
                        exact
                        path="/teacherManagement"
                        component={TeacherManagement}
                    />
                    <Route
                        exact
                        path="/studioManagement"
                        component={StudioManagement}
                    />
                    <Route
                        exact
                        path="/studioDetail"
                        component={StudioDetail}
                    />
                    <Route
                        exact
                        path="/paymentManagement"
                        component={PaymentManagement}
                    />
                    <Route
                        exact
                        path="/courseInstance"
                        component={CourseInstance}
                    />
                    <Route exact path="/cardDetail" component={CardDetail} />
                    <Route
                        exact
                        path="/courseAttendance"
                        component={CourseAttendance}
                    />
                    <Route
                        exact
                        path="/userManagement"
                        component={UserManagement}
                    />
                </main>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
