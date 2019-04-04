export const selected_theme = "selected_theme";

export default (theme = 'light', action) => {
    switch(action.type)
    {
        case selected_theme:
            return action.theme;
        default:
            return theme;
    }
}
