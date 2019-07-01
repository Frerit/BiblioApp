
export function loginUserById(id) {
    return fetch('https://apibibliopoli.azurewebsites.net/login', {
            method: 'GET',
            headers: { userLog: id }
        }
    )
        .then(resp => resp.json())
        .catch(err => {
            console.log(err)
        })
}