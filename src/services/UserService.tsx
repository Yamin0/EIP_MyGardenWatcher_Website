const register = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({mail, password})
    };

    return fetch("http://www.mygardenwatcher.fr:3001/auth/register", reqOpt)
        .then(handleResponse)
        .then((user) => {
            alert("Compte créé: " + user.mail);
            login(mail, password);
        }, (err) => {
            alert("fail register:" + err);
            return Promise.reject(err);
        })
};

const login = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({mail, password})
    };

    return fetch("http://www.mygardenwatcher.fr:3001/auth/login", reqOpt)
        .then(handleResponse)
        .then((user) => {
            alert("Connexion réussie: " + mail);
            saveTokenToStorage(user.token);
        }, (err) => {
            alert("fail login" + err);
            return Promise.reject(err);
        })
};

const saveTokenToStorage = (token: string) => {
    window.localStorage.setItem("mgwAuthToken", token);
};

const logout = () => {
    window.localStorage.removeItem("mgwAuthToken");
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
    logout
};

