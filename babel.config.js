module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: '3.8.0',
        },
      ],
    ],
    plugins: [
      ['@babel/plugin-proposal-optional-chaining'],
      ['@babel/plugin-proposal-nullish-coalescing-operator'],
    ],
  };
};
