import PropTypes from 'prop-types';
//import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
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
import { Delete, Edit, Move } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  buttonCell: {
    width: '1%',
    whiteSpace: 'nowrap',
    paddingRight: theme.spacing(2),
  },
}));

export const ExpenseTable = (props) => {

  const classes = useStyles(); // Define classes using useStyles hook

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
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Total
                </TableCell>
                <TableCell>
                  Average
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((expenses) => {
                const isSelected = selected.includes(expenses.name);
                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={expenses.name}
                    selected={isSelected}
                  >
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        
                        <Typography variant="subtitle2">
                          {expenses.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {expenses.total}
                    </TableCell>
                    <TableCell>
                      {expenses.average}
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

ExpenseTable.propTypes = {
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
