
export function getBooksByID(id) {
    return fetch('https://api.itbook.store/1.0/books/' + id)
        .then(resp => resp.json())
        .catch(err => {
            console.log(err)
        })
}

export function registerReserva(reserva) {
    return fetch('https://apibibliopoli.azurewebsites.net/saveReserva', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reserva)
        }
    )
        .then(resp => resp.json())
        .catch(error =>
            console.error('Error Reserva:', error)
        )
}
