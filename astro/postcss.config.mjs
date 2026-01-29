import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';

export default {
  plugins: [
    postcssGlobalData({
      files: ['./src/styles/tokens/_breakpoints.css'],
    }),
    postcssCustomMedia(),
  ],
};
