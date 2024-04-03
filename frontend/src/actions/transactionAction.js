import { FETCH_TRANSACTIONS, ADD_TRANSACTION } from 'src/constants/projectConstants';
// import { fetchData } from 'src/utils/api'; // Assuming you have an API utility for fetching data

// Action creator to fetch transactions
export const fetchTransactions = () => {
  return async (dispatch) => {
    try {
      // Make an API call to fetch transactions
    //   const transactions = await fetchData('/api/transactions'); // Replace with your API endpoint
      
    const transactions = {

    }

      // Dispatch the success action with the fetched transactions
      dispatch({
        type: FETCH_TRANSACTIONS,
        payload: transactions,
      });
    } catch (error) {
      // Handle error if fetching transactions fails
      // You can dispatch an error action or perform any necessary error handling
      console.error('Error fetching transactions:', error);
    }
  };
};

// Action creator to add a new transaction
export const addTransaction = (transaction) => {
  return async (dispatch) => {
    try {
      // Make an API call to add a new transaction
    //   const newTransaction = await fetchData('/api/transactions', {
    //     method: 'POST',
    //     body: JSON.stringify(transaction),
    //   }); // Replace with your API endpoint

      // Dispatch the success action with the added transaction
      dispatch({
        type: ADD_TRANSACTION,
        payload: transaction,
      });
      console.log('transaction added');
    } catch (error) {
      // Handle error if adding a new transaction fails
      // You can dispatch an error action or perform any necessary error handling
      console.error('Error adding transaction:', error);
    }
  };
};
