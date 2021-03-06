import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { Route, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SettingsIcon from '@material-ui/icons/Settings';
import LogAbsenceIcon from '@material-ui/icons/PersonAddDisabled';
import logo from 'assets/logo.png';

import { UserSettingsDialog, LogAbsenceDialog } from 'components';
import {
    Overview,
    StudentDetail,
    StudentManagement,
    CourseManagement,
    CourseDetail,
    TeacherManagement,
    RegistrationManagement,
    StudioManagement,
    StudioDetail,
    PaymentManagement,
    CourseAttendance,
    CourseInstance,
    CardDetail,
    UserManagement,
    Login,
    ForgotPassword,
    ResetPassword,
    StudentCardDetail,
    StudentOverview,
    StudentCourses,
    StudentCourseDetail,
    StudentCourseInstance,
    StudentCards,
} from 'routes';
import ListItems from './ListItems';
import StudentListItems from './StudentListItems';
import styles from './styles';
import { withUser } from 'core/user';

const Dashboard = ({ classes, user, setUser, location }) => {
    const [open, setOpen] = useState(false);
    const [openUserSettings, setOpenUserSettings] = useState(false);
    const [openLogAbsence, setOpenLogAbsence] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(handleDrawerClose, [location]);

    const handleCloseUserSettings = onClose => {
        onClose();
        setOpenUserSettings(false);
    };

    const handleOpenUserSettings = () => {
        setOpenUserSettings(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('authUser');
        setUser({ admin: false, isAuthenticated: false, student: null });
    };

    const handleOpenLogAbsence = () => {
        setOpen(false);
        setOpenLogAbsence(true);
    };

    const handleCloseLogAbsence = onClose => {
        onClose();
        setOpenLogAbsence(false);
    };

    const renderRoutes = () => (
        <Fragment>
            <Route path="/overview" component={Overview} />
            <Route path="/studentManagement" component={StudentManagement} />
            <Route path="/studentDetail" component={StudentDetail} />
            <Route path="/courseManagement" component={CourseManagement} />
            <Route path="/courseDetail" component={CourseDetail} />
            <Route path="/teacherManagement" component={TeacherManagement} />
            <Route path="/studioManagement" component={StudioManagement} />
            <Route path="/studioDetail" component={StudioDetail} />
            <Route path="/paymentManagement" component={PaymentManagement} />
            <Route path="/courseInstance" component={CourseInstance} />
            <Route path="/cardDetail" component={CardDetail} />
            <Route path="/courseAttendance" component={CourseAttendance} />
            <Route path="/userManagement" component={UserManagement} />
            <Route
                path="/registrationManagement"
                component={RegistrationManagement}
            />
            <Route path="/studentCardDetail" component={StudentCardDetail} />
            <Route path="/studentOverview" component={StudentOverview} />
            <Route path="/studentCourses" component={StudentCourses} />
            <Route
                path="/studentCourseDetail"
                component={StudentCourseDetail}
            />
            <Route
                path="/studentCourseInstance"
                component={StudentCourseInstance}
            />
            <Route path="/studentCards" component={StudentCards} />
        </Fragment>
    );

    const renderLoggedOutRoutes = () => (
        <Fragment>
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/login" component={Login} />
            <Route path="/resetPassword" component={ResetPassword} />
        </Fragment>
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={classNames(
                    classes.appBar,
                    open && classes.appBarShift
                )}
            >
                <Toolbar disableGutters={!open} className={classes.toolbar}>
                    {user.isAuthenticated ? (
                        <Fragment>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    open && classes.menuButtonHidden
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <img src={logo} height={40} alt="Dashboard" />
                            <div className={classes.spacer} />
                        </Fragment>
                    ) : null}
                    {user.isAuthenticated && !user.admin ? (
                        <IconButton
                            onClick={handleOpenLogAbsence}
                            color="inherit"
                        >
                            <LogAbsenceIcon />
                        </IconButton>
                    ) : null}
                    {user.isAuthenticated ? (
                        <IconButton
                            onClick={handleOpenUserSettings}
                            color="inherit"
                        >
                            <SettingsIcon />
                        </IconButton>
                    ) : null}
                </Toolbar>
            </AppBar>
            {user.isAuthenticated ? (
                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            variant="temporary"
                            classes={{
                                paper: classNames(
                                    classes.drawerPaper,
                                    !open && classes.drawerPaperClose
                                ),
                            }}
                            open={open}
                        >
                            <div className={classes.toolbarIcon}>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                {user.admin ? (
                                    <ListItems />
                                ) : (
                                    <StudentListItems
                                        onLogAbsenceClick={handleOpenLogAbsence}
                                    />
                                )}
                            </List>
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            variant="permanent"
                            classes={{
                                paper: classNames(
                                    classes.drawerPaper,
                                    !open && classes.drawerPaperClose
                                ),
                            }}
                            open={open}
                        >
                            <div className={classes.toolbarIcon}>
                                <IconButton onClick={handleDrawerClose}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                {user.admin ? (
                                    <ListItems />
                                ) : (
                                    <StudentListItems
                                        onLogAbsenceClick={handleOpenLogAbsence}
                                    />
                                )}
                            </List>
                        </Drawer>
                    </Hidden>
                </nav>
            ) : null}
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {user.isAuthenticated
                    ? renderRoutes()
                    : renderLoggedOutRoutes()}
                <UserSettingsDialog
                    open={openUserSettings}
                    handleClose={handleCloseUserSettings}
                    handleLogout={handleLogout}
                />
                <LogAbsenceDialog
                    open={openLogAbsence}
                    handleClose={handleCloseLogAbsence}
                />
            </main>
        </div>
    );
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    setUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter,
    withUser
)(Dashboard);
