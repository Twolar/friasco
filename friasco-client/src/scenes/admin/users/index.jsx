import { useState, useEffect } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../../components/Header";
import NewUserForm from "../../../components/NewUserForm";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [isNewUserFormVisible, setNewUserFormVisible] = useState(false);

  const toggleNewUserFormVisibility = () => {
    setNewUserFormVisible(!isNewUserFormVisible);
  };

  useEffect(() => {
    fetch("http://localhost:8000/v1/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // TODO: Delete me - Temporary for display purposes until users built out more...
        data.users.forEach((user, index) => {
          if (index === 0) {
            user.access = "admin";
          } else {
            user.access = "user";
          }
        });
        setUsers(data.users);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 0"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="0px 20px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Header title="USERS" subtitle="Manage all users" />
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleNewUserFormVisibility}
            sx={{ marginBottom: "15px" }}
          >
            {isNewUserFormVisible ? "HIDE" : "NEW USER"}
          </Button>
        </Box>
      </Box>

      <Box>{isNewUserFormVisible && <NewUserForm />}</Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Users;
