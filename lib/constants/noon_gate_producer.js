module.exports = {
  apiCallTimeoutConstant: process.env.NOON_GATE_RPC_TIMEOUT || 2000,
  noonGateRpcHostConstant: process.env.NOON_GATE_RPC_HOST || 'http://127.0.0.1',
  noonGateRpcPortConstant: process.env.NOON_GATE_RPC_PORT || 3007,
  noonGateRouteConstant: process.env.NOON_GATE_RPC_ROUTE || 'produceData'
};
