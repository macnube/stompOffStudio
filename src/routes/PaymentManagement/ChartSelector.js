import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Title from './Title';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function ChartSelector({ total, year, handleOnChangeYear }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Total for year</Title>
            <Typography
                component="p"
                variant="h4"
                className={classes.depositContext}
            >
                {`€ ${total}`}
            </Typography>
            <Select value={year} onChange={handleOnChangeYear}>
                <MenuItem value={2019}>2019</MenuItem>
                <MenuItem value={2018}>2018</MenuItem>
            </Select>
        </React.Fragment>
    );
}

ChartSelector.propTypes = {
    total: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    handleOnChangeYear: PropTypes.func.isRequired,
};
