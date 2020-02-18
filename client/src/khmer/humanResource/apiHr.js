export const create = (userId, token, hr) => {
    return fetch(`/khmerhr/new/${userId}`, {
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
    return fetch(`/khmerhr`, {
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
    return fetch(`/khmerhr/${hrId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (hrId, token) => {
    return fetch(`/khmerhr/delete/${hrId}`, {
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
    return fetch(`/khmerhr/edit/${hrId}`, {
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