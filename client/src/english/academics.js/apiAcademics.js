
export const create = (userId, token, about) => {
    return fetch(`/academics/new/${userId}`, {
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
    return fetch(`/academics`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (aboutId, token, about) => {
    return fetch(`/academics/edit/${aboutId}`, {
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

export const singleAcademics = (aboutId) => {
    return fetch(`/academics/${aboutId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};