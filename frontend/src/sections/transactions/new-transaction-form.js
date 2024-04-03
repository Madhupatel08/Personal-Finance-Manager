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
import { addTransaction } from 'src/actions/transactionAction';
import { connect } from "react-redux";
import { useRouter } from 'next/router';



 const NewTransactionForm = (props) => {

  const router = useRouter();
  const {pageToShow,addNewTransaction} = props;
  
  const [values, setValues] = useState({
    description: 'Abhyudit',
    amount: 100,
    source: 'SBI',
    destinationAccount: 'Gauransh',
    date: '2021-10-10',
    budget: 'Groceries',
    category: 'Food',
    bill: '',
    method: 'Cash',
    // notes: ''}

    
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

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
        //   subheader="All fields are mandatory."
          title="Transaction information"
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
                <Grid>
                <TextField
                  fullWidth
                //   helperText="Describe your transaction"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  required
                  value={values.description}
                />
                </Grid>
                <Grid>
                <TextField
                  fullWidth
                //   helperText="Describe your transaction"
                  label="Source"
                  name="source"
                  onChange={handleChange}
                  required
                  value={values.source}
                />
                </Grid>
                <Grid>
                <TextField
                  fullWidth
                //   helperText="Describe your transaction"
                  label="Destination"
                  name="Destination"
                  onChange={handleChange}
                  required
                  value={values.destinationAccount}
                />
                </Grid>
                <Grid>
                <TextField
                  fullWidth
                //   helperText="Describe your transaction"
                  label="Date"
                  name="Date"
                  onChange={handleChange}
                  required
                  type='date'
                  value={values.date}
                />
                </Grid>

              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                
             <Grid>   
                <TextField
                  fullWidth
                //   helperText="Please specify the budget amount"
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.amount}
                />
            </Grid>

            {pageToShow === "a" && 
            
            <Grid>
            <Grid> 
                
            <TextField
                  fullWidth
                //   helperText="Please specify the budget amount"
                  label="Budget"
                  name="budget"
                  onChange={handleChange}
                  required
                  value={values.budget}
                />

                
            </Grid>
            
            
            <Grid>   
            <TextField
              fullWidth
            //   helperText="Please specify the budget amount"
              label="Category"
              name="category"
              onChange={handleChange}
              required
              value={values.category}
            />
        </Grid>
         
        <Grid>   
            <TextField
              fullWidth
              label="Bill"
              name="bill"
              onChange={handleChange}
              type=''
              required
              value={values.bill}
            />
        </Grid>
        </Grid>
            
            }

            

            

            
              </Grid>


            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
          onClick={() => {
            addNewTransaction(values);
            router.push('/transactions');}
          }
          >
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return { addNewTransaction: (transaction) => dispatch(addTransaction(transaction)) };
// };
// export default connect(null, mapDispatchToProps)(NewTransactionForm);

// // 
// const mapDispatchToProps = (dispatch) => {
//   return { addNewTransaction: (transaction) => dispatch(addTransaction(transaction)) };
// };
// export default connect(null, mapDispatchToProps)(NewTransactionForm);


const mapDispatchToProps = (dispatch) => {
  return {
    addNewTransaction: (transaction) => dispatch(addTransaction(transaction)),
  };
};

export default connect(null, mapDispatchToProps)(NewTransactionForm);
