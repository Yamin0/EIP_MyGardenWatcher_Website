/*const log = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
    };

    return fetch("http://www.mygardenwatcher.fr:3001/auth/login", reqOpt)
        .then(handleResponse)
        .then((user) => {
            alert("Connexion réussie: " + mail);
        }, (err) => {
            alert("fail login" + err);
            return Promise.reject(err);
        })
};*/

const contactPro = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 5000);
});

const contactSingle = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, 5000);
});

/*function handleResponse(response: Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}*/

export const ContactService = {
    contactPro,
    contactSingle
};

