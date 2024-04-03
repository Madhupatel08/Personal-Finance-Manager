import PropTypes from 'prop-types';
import { format } from 'date-fns';
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

export const BillTable = (props) => {


  const classes = useStyles(); // Define classes using useStyles hook

  const handleDelete = (bill) => {
    // Delete logic here
    bill++;
  };

  const handleMove = (bill) => {
    // Move logic here
    budget++;
  };

  const handleEdit = (bill) => {
    // Edit logic here
    bill++;
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

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell className={classes.buttonCell}>Actions</TableCell>
              
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Paid On
                </TableCell>
                <TableCell>
                  Repeats
                </TableCell>
                <TableCell>
                Next Expected
                 
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((bill) => {
                const isSelected = selected.includes(bill.id);
                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={bill.id}
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
                          {bill.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {bill.amount}
                    </TableCell>
                    <TableCell>
                      {bill.paidOn}
                    </TableCell>
                    <TableCell>
                      {bill.repeats}
                    </TableCell>
                    <TableCell>
                      {bill.nextExpected}
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

BillTable.propTypes = {
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
