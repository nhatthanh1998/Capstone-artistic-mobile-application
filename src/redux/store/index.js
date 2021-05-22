import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slicers/couter.slicer'
import socketReducer from '../slicers/socket.slicer'
import styleReducer from '../slicers/style.slicer'
import imageSlice from '../slicers/image.slicer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    socket: socketReducer,
    style: styleReducer,
    image: imageSlice
  },
});
