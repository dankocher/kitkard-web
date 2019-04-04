export const set_session = "set_session";

export default (session = null, action) => {
    switch(action.type)
    {
        case set_session:
            return action.session;
        default:
            return session;
    }
}
