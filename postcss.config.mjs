import postcssGlobalData from '@csstools/postcss-global-data';
import postcssCustomMedia from 'postcss-custom-media';
import postcssNested from 'postcss-nested';

export default {
  plugins: [
    postcssGlobalData({
      files: ['./src/styles/tokens/_breakpoints.css'],
    }),
    postcssCustomMedia(),
    postcssNested(),
  ],
};
