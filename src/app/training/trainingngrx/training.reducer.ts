import {} from 'src/app/training/trainingngrx/training.action';
import { Excercise } from '../excercise.model';
import * as fromRoot from 'src/app/app.reducer';
import {
  TrainingActions,
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from 'src/app/training/trainingngrx/training.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableExcercise: Excercise[];
  finishedExcercise: Excercise[];
  runningExercise: Excercise;
}

export interface State extends fromRoot.State {
  trainingState: TrainingState;
}

const initialState: TrainingState = {
  availableExcercise: [],
  finishedExcercise: [],
  runningExercise: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExcercise: action.payload,
      };

    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExcercise: action.payload,
      };

    case START_TRAINING:
      return {
        ...state,
        runningExercise: action.payload,
      };

    case STOP_TRAINING:
      return {
        ...state,
        runningExercise: null,
      };

    default:
      return state;
  }
}

export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExcercise
);

export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExcercise
);
export const getrunningExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.runningExercise
);
