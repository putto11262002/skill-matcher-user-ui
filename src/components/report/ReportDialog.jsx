import React from "react";
import { REPORT_CATEGORY } from "@/constants/report.constant";
import {
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  MenuItem,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { upperFirst } from "lodash";
const ReportDialog = ({ open, onClose, onSubmit, target }) => {
  const { control, handleSubmit } = useForm();
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Box
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          onSubmit(data);
          onClose();
        })}
        component="form"
      >
        <DialogTitle fontWeight="bold">Report {target?.profile?.firstName} {target?.profile?.lastName}</DialogTitle>
        <DialogContent>
          <Stack paddingY={1} spacing={2}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Please select a category" },
              }}
              name="category"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  select
                  error={Boolean(error)}
                  helperText={error?.message}
                  value={value || ''}
                  onChange={onChange}
                  fullWidth
                  label="Category"
                >
                  {Object.values(REPORT_CATEGORY).map((category) => (
                    <MenuItem key={category} value={category}>
                      {upperFirst(category.replace("_", " "))}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the reason of report",
                },
              }}
              name="message"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  label="Reason"
                  helperText={error?.message}
                  error={Boolean(error)}
                  value={value || ""}
                  onChange={onChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button sx={{ width: "auto" }} onClick={onClose}>
            Cancel
          </Button>
          <Button sx={{ width: "auto" }} type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ReportDialog;
