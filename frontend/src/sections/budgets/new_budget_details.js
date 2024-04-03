import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  MenuItem,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { createNewBudgetAction } from "../../actions/budgetActions";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";

const budgetOptions = [
  { value: "No Auto Budget", label: "noAutoBudget" },
  { value: "Set a Fixed Amount Every Period", label: "fixedAmt" },
  { value: "Add an Amount Every Period", label: "amtEveryPeriod" },
  {
    value: "Add an Amount for Every Period and Correct for Overspending",
    label: "amtEveryPeriodCorr",
  },
];

const periodOptions = [
  { value: "Daily", label: "noAutoBudget" },
  { value: "Weekly", label: "fixedAmt" },
  { value: "Monthly", label: "amtEveryPeriod" },
  { value: "Quarterly", label: "amtEveryPeriodCorr" },
  { value: "Half Yearly", label: "amtEveryPeriod" },
  { value: "Yearly", label: "amtEveryPeriodCorr" },
];

const NewBudgetDetails = ({ createbudgetAction }) => {
  const [values, setValues] = useState({
    budgetName: "Groceries",
    budgetAmt: 100,
    budgetType: "",
  });

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
  }, []);
  const router = useRouter();
  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="All fields are mandatory." title="Budget Information" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the budget item name"
                  label="Budget Item Name"
                  name="budgetName"
                  onChange={handleChange}
                  required
                  value={values.budgetName}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the budget amount"
                  label="Budget Amount"
                  name="budgetAmt"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.budgetAmt}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the budget type"
                  select
                  label="Budget Type"
                  name="budgetType"
                  onChange={handleChange}
                  required
                  value={values.budgetType}
                >
                  {budgetOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  onChange={handleChange}
                  required
                  type='date'
                  value={values.date}
                />
                </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText="Please specify the budget period"
                  select
                  label="Budget Period"
                  name="budgetPeriod"
                  onChange={handleChange}
                  required
                  value={values.budgetPeriod}
                >
                  {periodOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => {
              createbudgetAction({
                budget: values.budgetName,
                budgeted: values.budgetAmt,
                spent_pd: -50,
                left_pd: 750,
              });
              router.push("/budgets");
            }}
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return { createbudgetAction: (budget) => dispatch(createNewBudgetAction(budget)) };
};
export default connect(null, mapDispatchToProps)(NewBudgetDetails);
