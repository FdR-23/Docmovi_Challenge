import { Meteor } from 'meteor/meteor';
import { UserCollection } from '../imports/api/newUsers';



Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await UserCollection.find().countAsync() === 0) {
  }
});
