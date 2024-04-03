import React from 'react';
//import PeriodNavigator from 'src/sections/budgets/period-navigator.js';
import { applyPagination } from 'src/utils/apply-pagination';
import { useCallback, useMemo, useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { BudgetsTable } from 'src/sections/budgets/budgets-table.js';
import { addDays } from 'date-fns';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import BarGraph from 'src/sections/budgets/progress-bar.js';
import { connect } from "react-redux";
import {getBudgetsData} from "../selectors/budgetSelectors"
//import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import the styles
import 'react-date-range/dist/theme/default.css';
import DatePicker from "react-datepicker"; 
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";

const now = new Date();

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0 !important"
  },
  removeElement: {
    display: "none !important"
  },
  header: {
    paddingBottom: "8px",
    background: "white !important"
  },
  month: {
    padding: "8px 0"
  },
  selectedMonth: {
    background: "gray !important",
    padding: "8px 0"
  },
  inputBox: {
    // background: 'white !important',
    border: "none"
  }
}));

// const data = [
//   {
//     "budget": "Groceries",
//     "budgeted": 100,
//     "spent_pd": -88.49,
//     "left_pd": 11.51
//   },
  // {
  //   "budget": "Bills",
  //   "budgeted": 800,
  //   "spent_pd": -50,
  //   "left_pd": 750
  // },
//   {
//     "budget": "Car",
//     "budgeted": 100,
//     "spent_pd": -142,
//     "left_pd": -42
//   },
//   {
//     "budget": "Going Out",
//     "budgeted": 300,
//     "spent_pd": -33.25,
//     "left_pd": 266.75
//   }
// ];


const useBudgets = (data,page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useBudgetsName = (budgets) => {
  return useMemo(
    () => {
      return budgets.map((budgets) => budgets.budget);
    },
    [budgets]
  );
};

const getMonthName = (monthNumber) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[monthNumber - 1];
};

const Page = ({data}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const budgets = useBudgets(data,page, rowsPerPage);
  const budgetsIds = useBudgetsName(budgets);
  const budgetsSelection = useSelection(budgetsIds);
  const [startDate, setStartDate] = useState(new Date());
  const ref = useRef();
  const classes = useStyles();
  useEffect(() => {
    // const inputBox=document.getElementsByClassName("react-datepicker-ignore-onclickoutside");
    // inputBox[0].setAttribute('disabled', true);
    // inputBox[0].classList.add(classes.inputBox);
    console.log(ref.current);
  }, []);

  const selectedMonth = startDate.getMonth() + 1;
  const selectedYear = startDate.getFullYear();

  console.log(selectedMonth, selectedYear);

  // const [dateRange, setDateRange] = useState([
  //   {
  //     startDate: null,
  //     endDate: null,
  //     key: 'selection',
  //   },
  // ]);
  
  // const handleDateChange = (ranges) => {
  //   const { selection } = ranges;
  //   setDateRange({
  //     startDate: new Date(selection.startDate.getFullYear(), ranges.selection.startDate.getMonth()),
  //     endDate: new Date(selection.endDate.getFullYear(), ranges.selection.endDate.getMonth()),
  //     key: 'selection',
  //   });
  // };
  

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const router=useRouter();
  const handleAddNewBudget = useCallback(() => {
    router.push('/new_budget');
  }, [router]);
  
  return (
    <Router>
      <>
        <Head>
          <title>
            Budgets 
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Budgets
                  </Typography>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <Button
                      color="inherit"
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <ArrowDownOnSquareIcon />
                        </SvgIcon>
                      )}
                    >
                      Export
                    </Button>
                  </Stack>
                </Stack>
                  <div>
                      <Button
                        onClick={handleAddNewBudget}
                        startIcon={(
                          <SvgIcon fontSize="small">
                            <PlusIcon />
                          </SvgIcon>
                        )}
                        variant="contained"
                      >
                        New Budget
                      </Button>
                  </div>
              </Stack>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MMM y"
                      showMonthYearPicker
                      inline
                      ref={ref}
                      onYearChange={() => {
                        const selectedMonth = document.getElementsByClassName(
                          "react-datepicker__month-text--keyboard-selected"
                        );
                        selectedMonth[0].classList.add(classes.selectedMonth);
                      }}
                      onCalendarOpen={() => {
                        const x = document.getElementsByClassName(
                          "react-datepicker-popper"
                        );
                        const y = document.getElementsByClassName(
                          "react-datepicker__triangle"
                        );
                        const z = document.getElementsByClassName(
                          "react-datepicker__header"
                        );
                        const months = document.getElementsByClassName(
                          "react-datepicker__month-text"
                        );
                        const selectedMonth = document.getElementsByClassName(
                          "react-datepicker__month-text--keyboard-selected"
                        );
                        x[0].classList.add(classes.root);
                        y[0].classList.add(classes.removeElement);
                        z[0].classList.add(classes.header);
                        for (let i = 0; i < months.length; i++) {
                          months[i].classList.add(classes.month);
                        }
                        selectedMonth[0].classList.add(classes.selectedMonth);
                      }}
                    />
                    

                  {/* <DateRangePicker
                    ranges={[dateRange]}
                    onChange={handleDateChange}
                    showMonthAndYearPickers
                    showDateDisplay={false}
                  /> */}

                  {/* <PeriodNavigator/> */}

                  <Typography variant='h7'>
                    Budget data for the month of {getMonthName(selectedMonth)}, {selectedYear} 
                  </Typography>

                  <Typography variant="h6" style={{ fontWeight: 'bold' , marginTop: '20px'}}>
                    Total available budget in Rupees
                  </Typography>

                

                  <BarGraph/>
                </div>
              
              <BudgetsTable
                count={data.length}
                items={budgets}
                onDeselectAll={budgetsSelection.handleDeselectAll}
                onDeselectOne={budgetsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={budgetsSelection.handleSelectAll}
                onSelectOne={budgetsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={budgetsSelection.selected}
              />
            </Stack>
          </Container>
        </Box>
      </>
    </Router>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

const mapStateToProps = (state,props)=> {
  return {
    data:getBudgetsData(state)
  }
}
export default connect(
  mapStateToProps
)(Page);



