import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import EuroIcon from '@material-ui/icons/EuroSymbol';
import ClassIcon from '@material-ui/icons/CastForEducation';
import TeacherIcon from '@material-ui/icons/RecordVoiceOver';
import StudioIcon from '@material-ui/icons/AccountBalance';
import UserIcon from '@material-ui/icons/Person';
import NewRegistration from '@material-ui/icons/PersonAdd';

export const ListItems = () => (
    <div>
        <NavLink exact to="/overview" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
            </ListItem>
        </NavLink>
        <NavLink
            exact
            to="/courseManagement"
            style={{ textDecoration: 'none' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Course Management" />
            </ListItem>
        </NavLink>
        <NavLink
            exact
            to="/studentManagement"
            style={{ textDecoration: 'none' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
            </ListItem>
        </NavLink>
        <NavLink
            exact
            to="/teacherManagement"
            style={{ textDecoration: 'none' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <TeacherIcon />
                </ListItemIcon>
                <ListItemText primary="Teachers" />
            </ListItem>
        </NavLink>
        <NavLink
            exact
            to="/paymentManagement"
            style={{ textDecoration: 'none' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <EuroIcon />
                </ListItemIcon>
                <ListItemText primary="Payments" />
            </ListItem>
        </NavLink>
        <NavLink
            exact
            to="/studioManagement"
            style={{ textDecoration: 'none' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <StudioIcon />
                </ListItemIcon>
                <ListItemText primary="Studio Management" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/userManagement" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <UserIcon />
                </ListItemIcon>
                <ListItemText primary="User Management" />
            </ListItem>
        </NavLink>
        <NavLink
            exact
            to="/registrationManagement"
            style={{ textDecoration: 'none' }}
        >
            <ListItem button>
                <ListItemIcon>
                    <NewRegistration />
                </ListItemIcon>
                <ListItemText primary="Registration Management" />
            </ListItem>
        </NavLink>
    </div>
);

export default ListItems;
