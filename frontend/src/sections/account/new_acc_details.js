import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { createNewAccAction } from "../../actions/accActions";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";



const NewAccountDetails = ({createaccAction}) => {
  
  const [values, setValues] = useState({
    budgetName: 'SBI',
    budgetAmt: 1000000
  });

  

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const router = useRouter();
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="All fields are mandatory."
          title="Account Information"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the account name"
                  label="Account Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the account balance"
                  label="Account Balance"
                  name="current_balance"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.current_balance}
                />

              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            onClick={() => {
              createaccAction({
                name: values.name,
                current_balance: values.current_balance
              });
              router.push("/account");
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
  return { createaccAction: (acc) => dispatch(createNewAccAction(acc)) };
};

export default connect(null, mapDispatchToProps)(NewAccountDetails);