export const create = (userId, token, schoolBoardMember) => {
    return fetch(`/spanishschoolBoardMember/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: schoolBoardMember
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`/spanishschoolBoardMember`, {
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

export const singlespanishschoolBoardMember = (spanishschoolBoardMemberId) => {
    return fetch(`/spanishschoolBoardMember/${spanishschoolBoardMemberId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (spanishschoolBoardMemberId, token) => {
    return fetch(`/spanishschoolBoardMember/delete/${spanishschoolBoardMemberId}`, {
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

export const update = (spanishschoolBoardMemberId, token, spanishschoolBoardMember) => {
    return fetch(`/spanishschoolBoardMember/edit/${spanishschoolBoardMemberId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: spanishschoolBoardMember
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};