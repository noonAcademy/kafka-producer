module.exports = {
  apiCallTimeoutConstant: process.env.NOON_GATE_TIMEOUT || process.env.NOON_GATE_RPC_TIMEOUT || 2000,
  noonGateRpcHostConstant: process.env.NOON_GATE_HOST || process.env.NOON_GATE_RPC_HOST || 'http://127.0.0.1',
  noonGateRouteConstant: process.env.NOON_GATE_ROUTE  || process.env.NOON_GATE_RPC_ROUTE || 'injest'
};
