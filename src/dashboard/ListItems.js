import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CardMembership from '@material-ui/icons/CardMembership';
import PeopleIcon from '@material-ui/icons/People';
import EuroIcon from '@material-ui/icons/EuroSymbol';
import AttendanceIcon from '@material-ui/icons/HowToReg';
import ClassIcon from '@material-ui/icons/CastForEducation';

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
        <NavLink exact to="/classManagement" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Class Management" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/cardManagement" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <CardMembership />
                </ListItemIcon>
                <ListItemText primary="Dance Cards" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/students" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Students" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/payments" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <EuroIcon />
                </ListItemIcon>
                <ListItemText primary="Payments" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/classAttendance" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <AttendanceIcon />
                </ListItemIcon>
                <ListItemText primary="Class Attendance" />
            </ListItem>
        </NavLink>
    </div>
);

export default ListItems;
