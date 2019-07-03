
export function getUserById(id) {
    return fetch('https://apibibliopoli.azurewebsites.net/consulta', {
            method: 'GET',
            headers: { user: id }
        }
    )
        .then(resp => resp.json())
        .catch(err => {
            console.log(err)
        })
}

export function registerUser(usuario) {
    return fetch('https://apibibliopoli.azurewebsites.net/saveUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        }
    )
        .then(resp => resp.json())
        .catch(error =>
            console.error('Error:', error)
        )
}

export function getAllCOuntry() {
    return fetch('https://restcountries.eu/rest/v2/all')
        .then(resp => resp.json())
        .catch(error =>
            console.error('Error:', error)
        )
}

export function getCountryById(code) {
    return fetch('https://restcountries.eu/rest/v2/alpha/'+ code)
        .then(resp => resp.json())
        .catch(error =>
            console.error('Error:', error)
        )
}