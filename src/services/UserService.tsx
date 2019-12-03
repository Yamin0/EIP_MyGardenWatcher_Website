import {createBrowserHistory} from "history";

const register = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, password})
    };

    return fetch("http://www.mygardenwatcher.fr:3001/auth/register", reqOpt)
        .then(handleResponse)
        .then((user) => {
            return login(mail, password);
        }, (err) => {
            alert("fail register:" + err);
            return Promise.reject(err);
        });
};

const login = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, password})
    };

    return fetch("http://www.mygardenwatcher.fr:3001/auth/login", reqOpt)
        .then(handleResponse)
        .then((user) => {
            setToken(user.token);
        }, (err) => {
            alert("fail login" + err);
            console.log(err);
            return Promise.reject(err);
        })
};

const getToken = () => window.localStorage.getItem("mgwAuthToken");

const setToken = (token: string) => {
    window.localStorage.setItem("mgwAuthToken", token);
};

const logout = () => {
    window.localStorage.removeItem("mgwAuthToken");
    const from ={ pathname: "/" };
    createBrowserHistory().push(from);
    window.location.reload();
};

function handleResponse(response: Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            logout();
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const UserService = {
    register,
    login,
    logout,
    getToken
};

