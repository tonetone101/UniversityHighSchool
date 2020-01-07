export const create = (userId, token, faculty) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerFaculty/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: faculty
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerFaculty`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
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

export const singleFaculty = (facultyId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerFaculty/${facultyId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (facultyId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerFaculty/delete/${facultyId}`, {
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

export const update = (facultyId, token, faculty) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerFaculty/edit/${facultyId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: faculty
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};