const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/webhooks/socket",
        destination: "/api/webhooks/socket",
      },
      // Add other rewrite rules as needed
    ];
  },
};

module.exports = nextConfig;
