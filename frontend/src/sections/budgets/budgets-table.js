import PropTypes from 'prop-types';
import { useCallback, useState } from "react";
//import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
//import { getInitials } from 'src/utils/get-initials';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  buttonCell: {
    width: '1%',
    whiteSpace: 'nowrap',
    paddingRight: theme.spacing(2),
  },
}));

export const BudgetsTable = (props) => {

  const classes = useStyles(); // Define classes using useStyles hook

  const handleDelete = (budget) => {
    // Delete logic here
    budget++;
  };

  const handleMove = (budget) => {
    // Move logic here
    budget++;
  };

  const handleEdit = (budget) => {
    // Edit logic here
    budget++;
  };

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  // const [selectedPeriod, setSelectedPeriod] = useState('all');
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell className={classes.buttonCell}>Actions</TableCell>
                <TableCell>
                  Budget
                </TableCell>
                <TableCell>
                  Budgeted
                </TableCell>
                <TableCell>
                  Spent (per day)
                </TableCell>
                <TableCell>
                  Left (per day)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((budgets) => {
                const isSelected = selected.includes(budgets.budget);
                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={budgets.budget}
                    selected={isSelected}
                  >
                    <TableCell className={classes.buttonCell} component="th" scope="row">
                                  <IconButton onClick={() => {
                                      
                                    }}
                                    >
                                            <DeleteIcon />
                                  </IconButton>
          
                                  <IconButton onClick={() => {
                                                
                                    }}
                                    >
                                      <EditIcon />
                                  </IconButton>
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        
                        <Typography variant="subtitle2">
                          {budgets.budget}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {budgets.budgeted}
                    </TableCell>
                    <TableCell>
                      {budgets.spent_pd}
                    </TableCell>
                    <TableCell>
                      {budgets.left_pd}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

BudgetsTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
