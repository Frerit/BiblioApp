
export function getBooksByPage(book, page) {
    return fetch('https://api.itbook.store/1.0/search/'+ book + '?page' + page)
        .then(resp => resp.json())
        .catch(err => {
            console.log(err)
        })
}

export function getBoosByUser(id) {
    return fetch('https://apibibliopoli.azurewebsites.net/consulta/reserva/', {
            method: 'GET',
            headers: { user: id }
        }
    )
        .then(resp => resp.json())
        .catch(err => {
            console.log(err)
        })
}