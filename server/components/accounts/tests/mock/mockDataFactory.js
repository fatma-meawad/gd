// This file allows for easily differentiated tests, one with a full db data mock and one with an empty data mock
const fullMockBusinesses = require("./businesses.json");
const emptyMockBusinesses = require("./businesses_empty.json");

module.exports = {
	getMockBusinesses: (isEmpty = false) => {
   	return isEmpty ? emptyMockBusinesses : fullMockBusinesses;
  },
};