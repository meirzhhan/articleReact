import { combineReducers } from '@reduxjs/toolkit';
import { articleCommentsSliceReducer } from './articleCommentsSlice';
import { articleRecommendationsSliceReducer } from './articleRecommendationsSlice';

export const articleDetailsPageReducer = combineReducers({
  recommendations: articleRecommendationsSliceReducer,
  comments: articleCommentsSliceReducer,
});
