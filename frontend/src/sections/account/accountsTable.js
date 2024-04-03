import PropTypes from 'prop-types';
//import { format } from 'date-fns';
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
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

export const AccTable = (props) => {

  const classes = useStyles(); // Define classes using useStyles hook

  const handleDelete = (account) => {
    // Delete logic here
    account++;
  };

  const handleMove = (account) => {
    // Move logic here
    account++;
  };

  const handleEdit = (account) => {
    // Edit logic here
    account++;
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
                  Account Name
                </TableCell>
                <TableCell>
                  Current Balance
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((accounts) => {
                const isSelected = selected.includes(accounts.name);
                //const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={accounts.name}
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
                          {accounts.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {accounts.current_balance}
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

AccTable.propTypes = {
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
