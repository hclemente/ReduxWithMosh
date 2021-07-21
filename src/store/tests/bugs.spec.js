// import { addBug, bugAdded } from '../bugs';
import { addBug, getUnresolvedBugs, resolveBug } from '../bugs';
// import { apiCallBegan } from '../api';
import configureStore from '../configureStore';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';




describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  })

  const bugSlice = () => store.getState().entities.bugs;

  it("should mark the bug as resolved if it's saved to the server", async () => {
    // AAA
    fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, resolved: true})
    fakeAxios.onPost("/bugs").reply(200, { id: 1});

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server", async () => {
    // AAA
    fakeAxios.onPatch("/bugs/1").reply(500)
    fakeAxios.onPost("/bugs").reply(200, { id: 1});

    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    expect(bugSlice().list[0].resolved).not.toBe(true);
  });

  it("should add the bug to the store if it's saved to the server", async () => {

    const bug = {description: "a" };
    const savedBug = {...bug, id: 1};
    fakeAxios.onPost('/bugs').reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toContainEqual(savedBug);

  })
  it("should not add the bug to the store if it's saved to the server", async () => {

    const bug = {description: "a" };
    fakeAxios.onPost('/bugs').reply(500);

    await store.dispatch(addBug(bug));

    expect(bugSlice().list).toHaveLength(0);

  })
})

describe("selectors", () => {

  const createState = () => ({
    entities: {
      bugs: {
        list: []
      }
    }
  })

  it("getUnresolvedBugs", () => {
    const state = createState();
    state.entities.bugs.list = [{ id: 1, resolved: true },{ id: 1 },{ id: 1 }]

    const result = getUnresolvedBugs(state);

    expect(result).toHaveLength(2);
  });
});
// describe("bugsSlice", () => {
//   describe("action creators", () => {
//     it("addBug", () => {
//       const bug = { description: 'a' };
//       const result = addBug(bug);
//       const expected = {
//         type: apiCallBegan.type,
//         payload: {
//           url: '/bugs',
//           method: 'post',
//           data: bug,
//           onSuccess: bugAdded.type
//         }
//       }
//       expect(result).toEqual(expected);
//     })
//   })
// })