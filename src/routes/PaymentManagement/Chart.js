import React from 'react';
import PropTypes from 'prop-types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import Title from './Title';

export default function Chart({ data, year }) {
    return (
        <React.Fragment>
            <Title>{year} Revenue</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" />
                    <YAxis>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle' }}
                        >
                            Revenue
                        </Label>
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#556CD6" />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

Chart.propTypes = {
    data: PropTypes.array.isRequired,
    year: PropTypes.string.isRequired,
};
