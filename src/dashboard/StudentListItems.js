import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ClassIcon from '@material-ui/icons/CastForEducation';
import CardIcon from '@material-ui/icons/CardMembership';
import LogAbsenceIcon from '@material-ui/icons/PersonAddDisabled';

export const StudentListItems = ({ onLogAbsenceClick }) => (
    <div>
        <NavLink exact to="/studentOverview" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/studentCourses" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Your Courses" />
            </ListItem>
        </NavLink>
        <NavLink exact to="/studentCards" style={{ textDecoration: 'none' }}>
            <ListItem button>
                <ListItemIcon>
                    <CardIcon />
                </ListItemIcon>
                <ListItemText primary="Your Cards" />
            </ListItem>
        </NavLink>
        <ListItem button onClick={onLogAbsenceClick}>
            <ListItemIcon>
                <LogAbsenceIcon />
            </ListItemIcon>
            <ListItemText primary="Log Absence" />
        </ListItem>
    </div>
);

StudentListItems.propTypes = {
    onLogAbsenceClick: PropTypes.func.isRequired,
};

export default StudentListItems;
