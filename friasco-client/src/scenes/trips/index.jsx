import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { fetchTrips } from "../../data/api";

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
    { field: "userId", headerName: "User ID" },
    { field: "location", headerName: "Location" },
    { field: "startDate", headerName: "Start" },
    { field: "endDate", headerName: "End" },
    { field: "status", headerName: "Status" },
    { field: "privacyStatus", headerName: "Privacy" },
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
        <DataGrid rows={trips} columns={columns} />
      </Box>
    </Box>
  );
};

export default Trips;
