export const TOKEN_KEY = "kreatoorsai_token"
export const USER_KEY = "kreatoorsai_user"
//export const baseUrl = "http://10.211.55.4/";
export const baseUrl = "https://backend-kreatoors.kobokistltd.com/";

export const isAuthenticated = () => {
    return !!localStorage.getItem(TOKEN_KEY);
};

export function logOutUser() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    window.location.href = "/";
}

export function getActiveStore() {
    return localStorage.getItem(TOKEN_KEY);
}
export function loginUser(payload) {
    localStorage.setItem(TOKEN_KEY, payload?.authToken);
    localStorage.setItem(USER_KEY, JSON.stringify(payload));

    window.location.href = "/dashboard";
}

export function isUserLoggedIn() {
    var isLoggedIn = getActiveStore();
    if (isLoggedIn) {
        window.location.href = "/dashboard";
    }
}

export function getUserToken() {
    return localStorage.getItem(TOKEN_KEY);
}