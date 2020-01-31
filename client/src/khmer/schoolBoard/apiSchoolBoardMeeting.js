export const create = (userId, token, schoolBoardMeeting) => {
    return fetch(`/khmerschoolBoardMeeting/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: schoolBoardMeeting
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`k/hmerschoolBoardMeeting`, {
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

export const singleschoolBoardMeeting = (schoolBoardMeetingId) => {
    return fetch(`/khmerschoolBoardMeeting/${schoolBoardMeetingId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (schoolBoardMeetingId, token) => {
    return fetch(`/khmerschoolBoardMeeting/delete/${schoolBoardMeetingId}`, {
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

export const update = (schoolBoardMeetingId, token, schoolBoardMeeting) => {
    return fetch(`/khmerschoolBoardMeeting/edit/${schoolBoardMeetingId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: schoolBoardMeeting
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};