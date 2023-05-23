import React from "react";
import {
  Dialog,
  DialogTitle,
  Rating,
  DialogContent,
  Button,
  Box,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { green } from "@mui/material/colors";
const ReviewDialog = ({ open, onClose, onSubmit, target }) => {
  const { control, handleSubmit, reset} = useForm();
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <Box
        onSubmit={handleSubmit((data, e) => {
          e.preventDefault();
          reset()
          onSubmit(data);
          onClose()
        })}
        component="form"
      >
        <DialogTitle>
          Rate {target?.profile?.firstName} {target?.profile?.lastName}&apos;s
          performance{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Controller
              control={control}
              name="score"
              render={({ field: { value, onChange }, fieldState }) => (
                <Rating
                  value={Number(value) || 0}
                  onChange={onChange}
                  sx={{ fontSize: "2em" }}
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: { value: true, message: "Comment cannot be empty" },
              }}
              name="message"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <TextField
                  label="Comment"
                  error={Boolean(error)}
                  helperText={error?.message}
                  multiline
                  rows={4}
                  value={value || ""}
                  onChange={onChange}
                  fullWidth
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button sx={{ width: "auto" }} type="button" onClick={onClose}>
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

export default ReviewDialog;
