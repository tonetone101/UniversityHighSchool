export const create = (userId, token, partners) => {
    return fetch(`/spanishPartners/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: partners
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`/spanishPartners`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singlePartner = (partnersId) => {
    return fetch(`/spainshPartners/${partnersId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (partnersId, token) => {
    return fetch(`/spanish/partners/delete/${partnersId}`, {
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

export const update = (partnersId, token, partners) => {
    return fetch(`/spanishPartners/edit/${partnersId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: partners
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};