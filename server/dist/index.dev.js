"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  type Todo {\n    title: String\n    status: String\n    lastUpdatedAt: String\n    createdAt: String\n  }\n\n  type Query {\n    todos: [Todo]\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var _require = require("apollo-server"),
    ApolloServer = _require.ApolloServer,
    gql = _require.gql;

var typeDefs = gql(_templateObject());
var resolvers = {
  Query: {
    get: function get() {
      return todos;
    }
  }
};
var server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});
server.listen().then(function (_ref) {
  var url = _ref.url;
  console.log("Listening on ".concat(url));
});