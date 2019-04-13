import {syncCard} from "./sync";


export const saveCardSync = async (props, card) => {
    card.updated = new Date().getTime();
    await props.saveCard(card);
    await syncCard(props, card);
};