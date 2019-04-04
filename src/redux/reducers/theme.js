export const selected_theme = "selected_theme";

export default (cardIndex = 'light', action) => {
    switch(action.type)
    {
        case selected_theme:
            return action.theme;
        default:
            return cardIndex;
    }
}
