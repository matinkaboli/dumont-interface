import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
  name: 'dialog',
  initialState: {
    open: false,
    dialogProps: {},
    content: null,
  },
  reducers: {
    openDialog: (state, action) => {
      state.open = true;
      state.dialogProps = action.payload.dialogProps;
      state.content = action.payload.content;
    },
    closeDialog: (state) => {
      state.open = false;
    },
    updateModalProps: (state, action) => {
      state.dialogProps = { ...state.dialogProps, ...action.payload.props };
    },
  },
});

export const { openDialog, closeDialog, updateModalProps } = dialogSlice.actions;
export default dialogSlice.reducer;
