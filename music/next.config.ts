module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/melody/home',
        permanent: true,
      },
    ];
  },
};
