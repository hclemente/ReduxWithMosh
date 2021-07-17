//import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {
    bugsRequested: (bugs, action ) => {
      bugs.loading = true;
    },

    bugsReceived: (bugs, action) => {
      // bugs/bugsReceived
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    // actions => action handlers
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload
      const index = bugs.list.findIndex(bug => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    }
  }
})

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsRequestFailed,
  bugsReceived,
  bugsRequested
} = slice.actions;

export default slice.reducer;

// Action creator

const url = '/bugs';

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes');
  if (diffInMinutes < 10) return;

  dispatch(
    apiCallBegan({
      url: '/bugs',
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type
    })
  )
}

// export const  loadBugs = () => apiCallBegan({
//   url: '/bugs',
//   onStart: bugsRequested.type,
//   onSuccess: bugsReceived.type,
//   onError: bugsRequestFailed.type
// })

// selector
// export const getUnresolvedBugs = state =>
//   state.entities.bugs.filter(bug => !bug.resolved);

// memoization

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  state => state.entities.projects,
  (bugs, projects) => bugs.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.userId === userId)
)

// const bugUpdated = createAction("bugUpdated");
// console.log(bugUpdated.type);

// Action types

// const BUG_ADDED = "bugAdded";
// const BUG_REMOVED = "bugRemoved";
// const BUG_RESOLVED = "bugResolved";

// Action creators

// export const bugAdded = createAction("bugAdded");

// export const bugAdded = description => ({
//   type: BUG_ADDED,
//   payload: {
//     description
//   }
// })

// export const bugResolved = createAction("bugResolved");

// export const bugResolved = id => ({
//   type: BUG_RESOLVED,
//   payload: {
//     id
//   }
// })

// export const bugRemoved = createAction("bugRemoved");

// Reducer



// old reducer

// export default createReducer([], {
//   // key: value
//   // actions: functions (event => event handler)
//   [bugAdded.type]: (bugs, action) => {
//     bugs.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false
//     })
//   },
//   [bugResolved.type]: (bugs, action) => {
//     const index = bugs.findIndex(bug => bug.id === action.payload.id);
//     bugs[index].resolved = true;
//   }
// })

// example

// produce(initialState, draftState => {
//   draftState.x = 1;
// })

//reducer old

// export default function reducer(state = [], action) {
//   switch (action.type) {
//     case bugAdded.type:
//       return [
//         ...state,
//         {
//           id: ++lastId,
//           description: action.payload.description,
//           resolved: false
//         }
//       ]
//     case bugRemoved.type:
//       return state.filter(bug => bug.id !== action.payload.id)
//     case bugResolved.type:
//       return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true });
//     default:
//       return state;
//   }
// }