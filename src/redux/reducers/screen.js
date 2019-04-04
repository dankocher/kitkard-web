export const selected_screen = "selected_screen";

export default (screen = 'my_cards', action) => {
    switch(action.type)
    {
        case selected_screen:
            return action.screen;
        default:
            return screen;
    }
}
