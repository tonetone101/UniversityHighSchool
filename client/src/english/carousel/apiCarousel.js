
export const create = (userId, token, carousel) => {
    return fetch(`${process.env.REACT_APP_API_URL}/carousel/new/${userId}`, {
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
    return fetch(`${process.env.REACT_APP_API_URL}/carousel`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (carouselId, token, carousel) => {
    return fetch(`${process.env.REACT_APP_API_URL}/carousel/edit/${carouselId}`, {
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
    return fetch(`${process.env.REACT_APP_API_URL}/carousel/${carouselId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};