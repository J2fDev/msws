const Server = require("socket.io").Server;

const conf = require("../consts");

// Create the "gateway" service
module.exports = {
    // Define service name
    name: "ws",
    mixins: [],
    settings: {
        arrSockets: new Map(),
        arrUsers: new Map()
    },

    actions: {
        socket: {
            rest: "GET /socket",
            description: "Retorna as informaćões de IP e porta para conectar no socket desse servidor",
            auth: true,
            async handler(ctx) {
                return conf;
            }
        },


        test: {
            rest: "GET /test/:id",
            description: "Envia uma mensagem de teste para o socket",
            async handler(ctx) {
                this.logger.info(ctx.params.id);

                if ( this.settings.arrSockets.has(ctx.params.id) ) {
                    this.logger.info("Disparando");
                    this.settings.arrSockets.get(ctx.params.id).emit("message", "Mensagem de teste disparada a pedido do servidor");
                    return "disparado";
                } else {
                    return "Usuario nao localizado";
                }
            }
        }

    },

    //https://rxjs.dev/guide/subject

    started() {
        this.logger.info("INICIADA WS SERVICE");

        const io = new Server(conf.port, {
            cors: {
                origin: "http://localhost:4200", // Provavelmente vai liberar geral
                methods: ["GET", "POST"]
            }
        });

        io.on("connection", async (socket) => {
            this.logger.info("NOVA CONEXAO ESTABELECIDA");
            this.logger.info(socket.handshake.auth);

            try {
                let user = await this.broker.call("auth.resolveToken", {token: socket.handshake.auth.token});

                this.settings.arrSockets.set(user._id.toString(), socket);
                this.settings.arrUsers.set(socket.id, user._id.toString());

                this.logger.info(JSON.stringify(this.settings.arrSockets));

                socket.emit("wellcome", {ok: true, message: "Conectado com sucesso"});
            } catch ( e ) {
                this.logger.error(e);
                socket.emit("wellcome", {ok: false, message: "Falha na conexao"});
            }

            socket.on('disconnect', () => {
                this.logger.info("socket fechado");
                if ( this.settings.arrUsers.has(socket.id) ) {
                    this.logger.info("socket do usuario " + this.settings.arrUsers.get(socket.id));
                    this.settings.arrSockets.delete(this.settings.arrUsers.get(socket.id));
                    this.settings.arrUsers.delete(socket.id)
                }
            });
        });

    }
};