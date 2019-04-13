import SocketIOClient from "socket.io-client";
import {api, host} from "../constants/api";

export const notifyUpdateFriends = async(room, updated) => {
    if (room !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: room}});
        socket.on('friends_updated', () => {
            socket.disconnect();
        });
        socket.emit('friends_updated', updated);
    }
};
