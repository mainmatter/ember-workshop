"use strict";

const getChannelURL = require("ember-source-channel-url");

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        name: "ember-release",
        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("release"),
          },
        },
      },
    ],
  };
};
