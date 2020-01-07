
export const create = (userId, token, carousel) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerCarousel/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: carousel
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerCarousel`, {
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

export const update = (carouselId, token, carousel) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerCarousel/edit/${carouselId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: carousel
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleCarousel = (carouselId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerCarousel/${carouselId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};