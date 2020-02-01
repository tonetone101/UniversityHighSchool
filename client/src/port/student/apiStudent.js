export const create = (userId, token, student) => {
    return fetch(`/portstudent/new/${userId}`, {
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
    return fetch(`/portlink/new/${userId}`, {
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
    return fetch(`/portlinks`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (linkId, token) => {
    return fetch(`/portlink/${linkId}`, {
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
    return fetch(`/portlink/${linkId}`, {
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
    return fetch(`/portlink/${linkId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const comment = (userId, token, admissionId, comment) => {
    return fetch(`/portadmission/comment`, {
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
    return fetch(`/portadmission/uncomment`, {
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
    return fetch(`/portadmission/5e35fa05cf63779dcfd8f3d5`, {
        method: "GET",
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};