
export const create = (userId, token, about) => {
    return fetch(`/about/new/${userId}`, {
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
    return fetch(`/about`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (aboutId, token, about) => {
    return fetch(`/about/edit/${aboutId}`, {
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

export const singleabout = (aboutId) => {
    return fetch(`/about/${aboutId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};