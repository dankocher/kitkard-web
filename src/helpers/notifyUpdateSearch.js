import SocketIOClient from "socket.io-client";
import {api, host} from "../constants/api";

export const notifyUpdateSearch = async(room, updated) => {
    if (room !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: room}});
        socket.on('search_updated', () => {
            socket.disconnect();
        });
        socket.emit('search_updated', updated);
    }
};
