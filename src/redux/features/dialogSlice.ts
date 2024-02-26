import { createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

import { DialogProps } from '@/components/Dialog/Dialog';

interface InitialState {
  open: boolean;
  dialogProps: DialogProps | null;
  content: ReactNode;
}

const initialState: InitialState = {
  open: false,
  dialogProps: null,
  content: null,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
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
