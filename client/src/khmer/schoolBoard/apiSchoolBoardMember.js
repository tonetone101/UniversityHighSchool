export const create = (userId, token, schoolBoardMember) => {
    return fetch(`/khmerschoolBoardMember/new/${userId}`, {
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
    return fetch(`/khmerschoolBoardMember`, {
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

export const singleschoolBoardMember = (schoolBoardMemberId) => {
    return fetch(`/khmerschoolBoardMember/${schoolBoardMemberId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (schoolBoardMemberId, token) => {
    return fetch(`/khmerschoolBoardMember/delete/${schoolBoardMemberId}`, {
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

export const update = (schoolBoardMemberId, token, schoolBoardMember) => {
    return fetch(`/khmerschoolBoardMember/edit/${schoolBoardMemberId}`, {
        method: "PUT",
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