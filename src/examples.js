import { slice } from 'lodash';
import { compose, pipe} from 'lodash/fp';
import { Map } from 'immutable';
import { produce } from 'immer';

// let input = "  Javascript  ";
// let output = "<div>" + input.trim() + "</div";

// const trim = str => str.trim();
// //const wrapInDiv = str => `<div>${str}</div>`; // Old method
// const wrap = type => str => `<${type}>${str}</${type}>`;
// const toLowerCase = str => str.toLowerCase();

// const transform = pipe(trim, toLowerCase, wrap("div"));

// console.log(transform(input))

//const result = wrapInDiv(toLowerCase(trim(input))); // Old method

// const numbers = [1,2,3];

// const index = numbers.indexOf(2);
// const added = [
//                 ...numbers.slice(0,index),
//                 4,
//                 ...numbers.slice(index)
//               ]

// console.log(added);

//Removal
// const removed = numbers.filter(n => n !== 2);

// console.log(removed);

//Update
// const updated = numbers.map(n => n === 2 ? 20 : n);
// console.log(updated)

// Immutable

// let book = Map({title: "Harry Potter"});
// console.log(book.get("title"));

// function publish(book) {
//   return book.set("isPublished", true);
// }

// book = publish(book);

// console.log(book.toJS());

//Immer

// let book = {title: "Harry Potter"}

// function publish(book) {
//   return produce(book, draftBook => {
//     draftBook.isPublished = true;
//   });
// }
// let updated = publish(book);
// console.log(book);
// console.log(updated);

/**
 * Notes
 *
 * Pure functions alway return the same output given the same input
 * When building Redux applications, we have to make sure that our reducers are pure.
 *
 * Look up immutability
 * *Predictability
 * *Faster Change Detection
 * *Concurrency
 *
 * "const" prevents object reassignment
 *
 *
 * Object.assign : Object.assign({}, person, {name: Bob});
 * or const updated {...person, name: "Bob"}
 */





