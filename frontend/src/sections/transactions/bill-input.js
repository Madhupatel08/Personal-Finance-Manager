import React, { useState,useEffect } from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@material-ui/core/TextField';


export function BillInput() {
    const [billOptions, setBillOptions] = useState([]);
  
    // Fetch the list of bills from the database
    const fetchBills = async () => {
    //   const response = await fetch('/api/bills');
    //   const data = await response.json();

    const data = {
        "bills": [
            {
                "id": 1,
                "billNumber": "groceries",
            }
        ]
    }
      setBillOptions(data);
    };
  
    // Call fetchBills when the component mounts
    useEffect(() => {
      fetchBills();
    }, []);
  
    return (
      <Autocomplete
        // options={billOptions}
        options={!billOptions ? [{label:"Loading...", id:0}] : billOptions }
        getOptionLabel={(option) => option.bills.billNumber}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Bill"
            name="bill"
            required
          />
        )}
      />
    );
  }

