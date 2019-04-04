export const save_picture = "save_picture";
export const delete_picture = "delete_picture";
export const delete_all_pictures = "delete_all_pictures";

export default (pictures = {}, action) => {
    switch(action.type)
    {
        case save_picture:
            const picture = action.picture;
            return {
                ...pictures,
                [picture.id]: {
                    ...pictures[picture.id],
                    [picture.size]: picture.data
                }
            };
        case delete_picture:
            delete pictures[action.picture.id];
            return pictures;
        case delete_all_pictures:
            return {};
        default:
            return pictures;
    }
}
