export const set_share = "set_share";

export default (share = null, action) => {
    switch(action.type)
    {
        case set_share:
            return action.share;
        default:
            return share;
    }
}
