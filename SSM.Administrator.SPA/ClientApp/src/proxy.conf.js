const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:59922/',
    secure: false,
    logLevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
