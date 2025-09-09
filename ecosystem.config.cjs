module.exports = {
  apps: [
    // Development
    {
      name: 'nuxt-4-dev',
      exec_mode: 'fork', // can be 'cluster' or 'fork', default fork
      instances: 1, // can be a number of instances or 'max', default 1
      script: 'node',
      args: './node_modules/nuxt/bin/nuxt.mjs dev',
      watch: true,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
    },

    // Production
    {
      name: 'nuxt-4-prod',
      exec_mode: 'cluster', // can be 'cluster' or 'fork', default fork
      instances: 1, // can be a number of instances or 'max', default 1
      // script: 'node',
      // args: '.output/server/index.mjs',
      script: '.output/server/index.mjs',
      interpreter: 'node', // node hỗ trợ esm
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOST: '0.0.0.0',
      },
    },
  ],
};
