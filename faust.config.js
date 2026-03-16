const { setConfig } = require("@faustwp/core");
const templates = require("./src/wp-templates").default;
const possibleTypes = require("./possibleTypes.json");

setConfig({
  templates,
  possibleTypes,
});

