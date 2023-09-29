import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { fetchTrips, deleteTrip } from "../../data/api";
import CustomHideShowFormGridToolbar from "../../components/CustomHideShowFormGridToolbar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import NewTripForm from "../../components/NewTripForm";

// TODO: Hook up handle actions
// TODO: Decide on CREATE functionality + validation, i.e. single point of validation on serverside?
// TODO: Optimization, how should the API be called for each update action?

const Trips = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const updateTripGrid = async () => {
    const fetchedTrips = await fetchTrips();
    setRows(fetchedTrips);
  };

  useEffect(() => {
    updateTripGrid();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    const tripDeletedSuccess = await deleteTrip(id);
    if (tripDeletedSuccess) {
      updateTripGrid();
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "userId", headerName: "User ID", editable: true },
    { field: "location", headerName: "Location", editable: true },
    { field: "startDate", headerName: "Start", editable: true },
    { field: "endDate", headerName: "End", editable: true },
    { field: "status", headerName: "Status", editable: true },
    { field: "privacyStatus", headerName: "Privacy", editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              style={{
                color: colors.greenAccent[500],
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              style={{
                color: colors.redAccent[300],
              }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            style={{
              color: colors.grey[100],
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            style={{
              color: colors.redAccent[300],
            }}
          />,
        ];
      },
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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: () => (
              <CustomHideShowFormGridToolbar
                formToShow={<NewTripForm updateTripGrid={updateTripGrid} />}
              />
            ),
          }}        
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    </Box>
  );
};

export default Trips;
