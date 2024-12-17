import type { AddonOptionsWebpack } from '@storybook/addon-coverage';
import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const coverageConfig: AddonOptionsWebpack = {
  istanbul: {
    include: ['**/stories/**'],
    exclude: ['**/node_modules/**'],
    extension: [".tsx"]
  }
};

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-react-native-web",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-coverage",
      options: coverageConfig
    }
  ],
  framework: "@storybook/react-webpack5",
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
    }

    return config;
  },
};
export default config;
