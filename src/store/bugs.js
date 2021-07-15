//import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    // actions => action handlers
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex(bug => bug.id === action.payload.id);
      bugs[index].resolved = true;
    }
  }
})

export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;

// selector
// export const getUnresolvedBugs = state =>
//   state.entities.bugs.filter(bug => !bug.resolved);

// memoization

export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => !bug.resolved)
);


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