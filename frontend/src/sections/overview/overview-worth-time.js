import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';


const useChartOptions = () => {
  const theme = useTheme();
 


  return {
    chart: {
      id: 'line-chart',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: [2],
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    markers: {
      size: 0,
      colors: theme.palette.primary.main,
      strokeColors: theme.palette.primary.main,
      strokeWidth: 2,
      hover: {
        size: 7,
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      
      labels: {
        
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        },
        formatter: (value) => `${value}`

      }
    },
    yaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewSales = (props) => {
  const { chartSeries, sx, title } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button
            color="inherit"
            size="small"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}
          >
            Sync
          </Button>
        )}
        title={title}
      />
      <CardContent>
        {/* <Chart
          
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        /> */}
        <Chart
              height={350}
              options={chartOptions}
              series={chartSeries}
              type="line"
              width="100%"
            />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Overview
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewSales.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
