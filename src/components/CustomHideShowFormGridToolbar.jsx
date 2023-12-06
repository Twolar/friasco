import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import IconButton from "@mui/material/IconButton";
import { tokens } from "../theme";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";

const CustomHideShowFormGridToolbar = ({ formToShow }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <GridToolbarContainer>
      <Tooltip title="Add New Item">
        <IconButton
          sx={{ background: "transparent", color: colors.grey[100] }}
          onClick={() => toggleFormVisibility()}
        >
          {isFormVisible ? <RemoveOutlinedIcon /> : <AddIcon />}
        </IconButton>
      </Tooltip>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      {isFormVisible && (
        <Box width="100%" mb="20px">
          {formToShow}
        </Box>
      )}
    </GridToolbarContainer>
  );
};

export default CustomHideShowFormGridToolbar;
