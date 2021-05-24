import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../slicers/couter.slicer'
import styleReducer from '../slicers/style.slicer'
import originImageReducer from '../slicers/origin-image.slicer'
import generatedImageReducer from '../slicers/generated-image.slicer'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    style: styleReducer,
    originImage: originImageReducer,
    generatedImage: generatedImageReducer
  },
});
