export const getUser = (state) => {
    const user = state.auth.user;
    return !user ? null : user;
}