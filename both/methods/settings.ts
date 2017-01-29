// import {Settings} from '../tables/settings'
//
// Meteor.methods({
//   '/todos/delete': function (todoId) {
//     Settings.delete().where({id: todoId}).run();
//   },
//   '/todos/setChecked': function (todoId, checked) {
//     Settings.update({checked: checked}).where({id: todoId}).run();
//   },
//   '/todos/setText': function (todoId, newText) {
//     Settings.update({text: newText}).where({id: todoId}).run();
//   }
// });