export const create = (userId, token, hr) => {
    return fetch(`/spanishhr/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: hr
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`/spanishhr`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (userId, token) => {
    return fetch(`/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singlehr = (hrId) => {
    return fetch(`/spanishhr/${hrId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (hrId, token) => {
    return fetch(`/spanishhr/delete/${hrId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (hrId, token, hr) => {
    return fetch(`/spanishhr/edit/${hrId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: hr
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};