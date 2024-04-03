import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, useMediaQuery, createMuiTheme, ThemeProvider} from '@material-ui/core';

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  chart: {
    marginRight: theme.spacing(4), // Adjust the value to set space between charts
  },
}));

const budgeted=[
  { name: 'Budgeted', value: 1300, label: 'Budgeted'},
]

const spent=[
  { name: 'Spent', value: 313.74, label: 'Spent'},
]

const ProgressBar = () => {
  const classes = useStyles();
  const commonXDomain = [0, Math.max(...budgeted.map((item) => item.value, ...spent.map((item) => item.value)))];

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <div className={classes.chartContainer}>
          {/* <Typography variant="h6" style={{ fontWeight: 'bold', alignItems: 'center' }}>
            Total available budget in Rupees
          </Typography> */}
          
            <div className={classes.chart} style={{ marginLeft: isMobile ? '0' : '50px' }} >
              <Typography variant='subtitle1' style={{ paddingTop: isMobile ? '10px' : '20px' }}>
                Budgeted: Rs {budgeted[0].value}
              </Typography>
              <BarChart width={isMobile ? 300 : 800} height={50} data={budgeted} layout="vertical" minWidth="800">
                <XAxis type="number" domain={commonXDomain} hide={true} />
                <YAxis type="category" dataKey="label" tick={false}/>
                <Tooltip />
                <CartesianGrid stroke="#ffffff" strokeDasharray="0" />
                <Bar dataKey="value" fill="#8884d8"></Bar>
              </BarChart>
              <Typography variant='subtitle1' style={{ paddingTop: isMobile ? '10px' : '20px' }}>
                Spent: Rs {spent[0].value}
              </Typography>
              <BarChart width={isMobile ? 300 : 800} height={50} data={spent} layout="vertical" minWidth="800">
                <XAxis type="number" domain={commonXDomain} hide={true}/>
                <YAxis type="category" dataKey="label" tick={false}/>
                <Tooltip />
                <CartesianGrid stroke="#ffffff" strokeDasharray="0" />
                <Bar dataKey="value" fill="#ff4c4c"></Bar>
              </BarChart>
            </div>
    </div>
  );
};

const BarGraph = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProgressBar />
    </ThemeProvider>
  );
};

export default BarGraph;

