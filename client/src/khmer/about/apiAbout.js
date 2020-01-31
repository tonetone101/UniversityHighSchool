
export const create = (userId, token, about) => {
    return fetch(`/khmerabout/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: about
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`/khmerabout`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (aboutId, token, about) => {
    return fetch(`/khmerabout/edit/${aboutId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: about
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleAbout = (aboutId) => {
    return fetch(`/khmerabout/${aboutId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};