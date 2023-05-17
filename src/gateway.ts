import { SocketControllers } from "socket-controllers";
import { Server } from "socket.io";
import { Logger } from "tslog";
import { Container } from "typedi";
import { GatewayEventsToClient } from "./controller/dto/gatewayDTO.js";
import { GatewayController } from "./controller/GatewayController.js";

const logger = new Logger({ name: "gateway-main" });

export const GatewayServer = new Server<GatewayEventsToClient>();

const sc = new SocketControllers({
	io: GatewayServer,
	container: Container,
	controllers: [GatewayController],
});

GatewayServer.listen(parseInt(process.env.PORT_WS ?? "3002"));

logger.info("Gateway iniciada! Porta", parseInt(process.env.PORT_WS ?? "3002"));
