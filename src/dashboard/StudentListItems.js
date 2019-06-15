import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ClassIcon from '@material-ui/icons/CastForEducation';
import CardIcon from '@material-ui/icons/CardMembership';

export const ListItems = () => (
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
    </div>
);

export default ListItems;
