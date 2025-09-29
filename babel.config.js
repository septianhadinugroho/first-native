module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "tamagui-loader",
        {
          config: "./tamagui.config.ts",
          components: ["tamagui"],
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};