
export function getBooksByID(id) {
    return fetch('https://api.itbook.store/1.0/books/' + id)
        .then(resp => resp.json())
        .catch(err => {
            console.log(err)
        })
}