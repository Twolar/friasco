import { useState, useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { fetchTrips } from "../../data/api";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";

const Trips = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trips, setTrips] = useState([]);

  const updateTripGrid = async () => {
    const fetchedTrips = await fetchTrips();
    setTrips(fetchedTrips);
  };

  useEffect(() => {
    updateTripGrid();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "userId", headerName: "User ID", editable: true },
    { field: "location", headerName: "Location", editable: true },
    { field: "startDate", headerName: "Start", editable: true },
    { field: "endDate", headerName: "End", editable: true },
    { field: "status", headerName: "Status", editable: true },
    { field: "privacyStatus", headerName: "Privacy", editable: true },
    {
      field: "",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => alert("Editing Row: " + params.id)}
            style={{
              color: colors.primary[100],
            }}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton
            onClick={() => alert("Deleting Row: " + params.id)}
            style={{
              color: colors.redAccent[300],
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="0px 20px">
      <Header title="TRIPS" subtitle="Manage your trips" />

      <Box
        width="100%"
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
        <DataGrid rows={trips} columns={columns} editMode="row" />
      </Box>
    </Box>
  );
};

export default Trips;
