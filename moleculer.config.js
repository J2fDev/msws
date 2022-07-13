/**
 * Moleculer ServiceBroker configuration file
 *
 * More info about options: https://moleculer.services/docs/0.13/broker.html#Broker-options
 *
 * Overwrite options in production:
 * ================================
 * 	You can overwrite any option with environment variables.
 * 	For example to overwrite the "logLevel", use `LOGLEVEL=warn` env var.
 * 	To overwrite a nested parameter, e.g. retryPolicy.retries, use `RETRYPOLICY_RETRIES=10` env var.
 *
 * 	To overwrite brokerâs deeply nested default options, which are not presented in "moleculer.config.js",
 * 	via environment variables, use the `MOL_` prefix and double underscore `__` for nested properties in .env file.
 * 	For example, to set the cacher prefix to `MYCACHE`, you should declare an env var as `MOL_CACHER__OPTIONS__PREFIX=MYCACHE`.
 */
module.exports = {
    // Namespace of nodes to segment your nodes on the same network.
    namespace: "desenvolvimento",
    // Unique node identifier. Must be unique in a namespace.
    nodeID: null,

    transporter: {
        type: "TCP",
    },

    // Enable/disable logging or use custom logger. More info: https://moleculer.services/docs/0.13/logging.html
    logger: true,
    // Log level for built-in console logger. Available values: trace, debug, info, warn, error, fatal
    logLevel: "info",
    // Log formatter for built-in console logger. Available values: default, simple, short. It can be also a `Function`.
    logFormatter: "default",
    // Custom object & array printer for built-in console logger.
    logObjectPrinter: null,
};
