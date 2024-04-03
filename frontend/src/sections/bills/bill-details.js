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
  Unstable_Grid2 as Grid
} from '@mui/material';
import { createNewBillAction } from "../../actions/billActions";
import { connect } from "react-redux";
import { useRouter } from "next/navigation";

const currencies = [
  {
    value: 'indian-rupee',
    label: 'Indian Rupee'
  },
  {
    value: 'british-pound',
    label: 'British Pound'
  },
  {
    value: 'US-dollar',
    label: 'US Dollar '
  },
  
];


const repeat = [
    
    {
        value: 'monthly',
        label: 'Monthly'
      },
     
      {
        value: 'quaterly',
        label: 'Quaterly'
      },
      
      {
        value: 'yearly',
        label: 'Yearly'
      },

    
  ];

  const skip = [
    
    {
        value: 1,
        label: '1'
      },
     
      {
        value: 2,
        label: '2'
      },
      
      {
        value: 3,
        label: '3'
      },
      {
        value: 4 ,
        label: '4'
      },
      {
        value: 5,
        label: '5'
      },

    
  ];

const BillDetails = ({createbillAction}) => {
  const [values, setValues] = useState({
    Name: 'Rent',
    Currency: 'Indian Rupee',
    Minimum : '1000',
    Maximum: '500000',
    Date: '10/7/2023',
    
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
          
          title="Mandatory"
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
                  label="Name"
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
                  label="Minimum Amount"
                  name="min_amount"
                  onChange={handleChange}
                  required
                  value={values.min_amount}
                  
                />
              </Grid>


              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Maximum Amount"
                  name="max_amount"
                  onChange={handleChange}
                  required
                  value={values.max_amount}
                  
                />

            
              </Grid>



              <Grid>
                <TextField
                  fullWidth
                //   helperText="Describe your transaction"
                  label="Date"
                  name="date"
                  onChange={handleChange}
                  required
                  type='date'
                  value={values.date}
                />
                </Grid>




              <Grid
                xs={12}
                md={6}
              >


            <TextField
                  fullWidth
                  label="Repeats"
                  name="repeats"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.repeats}
                  
                >
                  {repeat.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
              </Grid>
              <Grid
                xs={12}
                md={6}
              >


            <TextField
                  fullWidth
                  label="Skip"
                  name="skip"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.repeats}
                  
                >
                  {skip.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                
              </Grid>
      

            
              </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained"
            onClick={() => {
              createbillAction({
                name: values.name,
                amount: "10000",
                paidOn: values.date,
                repeats: values.repeats,
                nextExpected: "12/07/2023"
              });
              router.push("/bills");
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
  return { createbillAction: (bill) => dispatch(createNewBillAction(bill)) };
};
export default connect(null, mapDispatchToProps)(BillDetails);
