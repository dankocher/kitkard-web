import { api, host } from "../constants/api";
import {isMyCard} from "./isMyCard";
import {saveCard} from "../redux/actions";
import SocketIOClient from "socket.io-client";
import ajax from "../utils/ajax";

export const syncCard = async (props, card) => {
    const user = props.user;

    const res = await ajax(api.sync_card, {cardname: card.cardname});

    if (res.ok && res.status === "updated") {
        const updated = card.updated || card.date;
        const s_updated = res.updated;
        console.log("  updated", updated);
        console.log("s_updated", s_updated);
        if (s_updated > updated) {
            // console.log(card.cardname);
            const res = await getCardFromServer(card.cardname);
            if (res.ok) {
                console.log(res);
                props.saveCard(res.card);
            }
        } else if (s_updated < updated && isMyCard(props, card.cardname)) {
            await saveCardToServer(card);
        }
    }
    // return null;
};

export const getCardFromServer = async (cardname) => {
    return await ajax(api.get_card, {cardname: cardname});
};

const saveCardToServer = async card => {
    let res = await ajax(api.save_card, {cardname: card.cardname, card: card});
    if (res.ok) {
        notifyToSocketUpdateCard(card.cardname);
    }
    console.log("saveCardToServer:", res.status);
};

export const notifyToSocketCreatedNewCard = async(username) => {
    if (username !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: username}});
        socket.on('created', () => {
            socket.disconnect();
        });
        socket.emit('created');
    }
};

export const notifyToSocketUpdateCard = async(username) => {
    if (username !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: username}});
        socket.on('updated', () => {
            socket.disconnect();
        });
        socket.emit('updated');
    }
};

export const notifyToSocketSyncCardholder = async(username) => {
    if (username !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: username}});
        socket.on('c_updated', () => {
            socket.disconnect();
        });
        socket.emit('c_updated');
    }
};
export const notifyToSocketDeletedCard = async(cardname) => {
    if (cardname !== undefined) {
        const socket = SocketIOClient(host.uri + api.socket_room_card, {query: {room: cardname}});
        socket.on('deleted', () => {
            socket.disconnect();
        });
        socket.emit('deleted');
    }
};
