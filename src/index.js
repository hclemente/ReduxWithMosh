import configureStore from './store/configureStore';
import * as actions from './store/api';
//import { loadBugs } from './store/bugs';
//import { addBug } from './store/bugs';
import { loadBugs, resolveBug, assignBugToUser } from './store/bugs';


const store = configureStore();

// UI Layer

store.dispatch(loadBugs());

setTimeout(() => store.dispatch(assignBugToUser(1, 4)), 2000);

//store.dispatch(addBug({ description: "a" }))

//store.dispatch(loadBugs())

//setTimeout(() => store.dispatch(loadBugs()), 2000);