import postcssGlobalData from '@csstools/postcss-global-data';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssCustomMedia from 'postcss-custom-media';

export default {
  plugins: [
    postcssGlobalData({
      files: ['./src/styles/tokens/_breakpoints.css'],
    }),
    autoprefixer(),
    cssnano({ preset: 'default' }),
    postcssCustomMedia(),
  ],
};
