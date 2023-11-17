/** @type {import('next').NextConfig} */

const branchName = process.env.BRANCH_NAME ? "/" + process.env.BRANCH_NAME : "";

const nextConfig = {
  // output: 'standalone',
  output: 'export',
  reactStrictMode: true,
  assetPrefix: branchName,
  basePath: branchName,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // サーバーサイドでのみcanvasを使用する設定
      config.externals = config.externals.map((external) => {
        if (typeof external !== 'function') return external;
        return (context, request, callback) => {
          if (request === 'canvas') {
            // canvasをcommonjsモジュールとして扱う
            return callback(null, 'commonjs canvas');
          }
          return external(context, request, callback);
        };
      });
    }

    // バイナリファイル（.node）のローダーを追加
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader',
    });

    return config;
  },
};

module.exports = nextConfig;
