export const create = (userId, token, student) => {
    return fetch(`/khmerStudent/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: student
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const createLink = (userId, token, link) => {
    return fetch(`/khmerLink/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: link
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`/khmerLinks`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (linkId, token) => {
    return fetch(`/khmerLink/${linkId}`, {
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

export const update = (linkId, token, link) => {
    return fetch(`/khmerLink/${linkId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: link
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

export const singleLink = (linkId) => {
    return fetch(`/khmerLink/${linkId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const comment = (userId, token, admissionId, comment) => {
    return fetch(`/khmeradmission/comment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, admissionId, comment})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const uncomment = (userId, token, admissionId, comment) => {
    return fetch(`/khmeradmission/uncomment`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, admissionId, comment})
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getAdmission = () => {
    return fetch(`/khmeradmission/5e35ef1dfd3edf98ae409203`, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
