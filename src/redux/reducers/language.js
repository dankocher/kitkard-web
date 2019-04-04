export const selected_language = "selected_language";

export default (language = 'none', action) => {
    switch(action.type)
    {
        case selected_language:
            return action.language;
        default:
            return language;
    }
}
