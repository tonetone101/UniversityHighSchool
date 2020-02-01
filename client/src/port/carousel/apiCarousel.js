
export const create = (userId, token, carousel) => {
    return fetch(`/portcarousel/new/${userId}`, {
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
    return fetch(`/portcarousel`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const update = (carouselId, token, carousel) => {
    return fetch(`/portcarousel/edit/${carouselId}`, {
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
    return fetch(`/portcarousel/${carouselId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};