const token_id = "app_token";   //Name of item in local storage

/* Class that contains methods to interact with token in localstorage */
class AuthenticationHelper {

    /* Sets the token in localstorage */
    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem(token_id, idToken);
    };

    /* Gets token from local storage */
    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem(token_id);
    };

    /* Removes token from local storage */
    removeToken = () => {
        localStorage.removeItem(token_id);
        window.location.reload();
    }

    /* Removes token from local storage without forcing a reload */
    removeTokenNoReload = () => {
        localStorage.removeItem(token_id);
    }
}

export default new AuthenticationHelper();