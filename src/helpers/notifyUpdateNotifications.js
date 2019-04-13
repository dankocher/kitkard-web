import SocketIOClient from "socket.io-client";
import {api, host} from "../constants/api";

export const notifyUpdateNotifications = async(room, updated) => {
    if (room !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: room}});
        socket.on('notifications_updated', () => {
            socket.disconnect();
        });
        socket.emit('notifications_updated', updated);
    }
};
