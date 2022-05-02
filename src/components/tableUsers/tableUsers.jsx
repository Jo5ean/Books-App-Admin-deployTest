import { useState, useEffect } from "react";
import "./tableUsers.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUser, getUsers } from "../../redux/actions/user";



const Datatable = () => {
  const [open, setOpen] =useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const allUser = useSelector((state) => state.user.allUser);
const [id, setId] = useState (0)
const [data, setData] = useState(allUser);

  useEffect(() => {
    setData(allUser);
  }, [allUser]);

  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = (id) => {

    dispatch(deleteUser(id));
    setData(data.filter((item) => item.id !== id));
    setOpen(false);
  
  
  };
   
  const actionColumn = [

  
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
       // console.log('param',params)
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            {/* <Button  onClick={() => handleDelete(params.row.id)} 
           autoFocus >
               
            Delete 
          </Button> */}
           
      <Button  className="deleteButton" variant="outlined" onClick={()=> handleClickOpen(params.row.id)} >
        Delete 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete User
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          The record will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Back</Button>
          <Button  onClick={() =>handleDelete(id)} 
           autoFocus >
               
            Delete 
          </Button>
        </DialogActions>
      </Dialog> 
    
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
