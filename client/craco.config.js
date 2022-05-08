const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#55ab80',
              '@table-header-bg': '#55ab80',
              '@table-header-color': 'white',
              '@table-border-radius-base': '4px',
              '@font-family': 'Quicksand, sans-serif',
              '@font-size-base': '14px',
              '@text-color': '#505050',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
