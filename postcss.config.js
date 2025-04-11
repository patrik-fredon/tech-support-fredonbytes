module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      flexbox: 'no-2009',
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
