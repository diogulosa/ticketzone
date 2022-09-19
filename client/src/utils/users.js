export async function updateUserName(id, fname, lname, cb){
    try {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({fname: fname.trim(), lname: lname.trim()}),
          };
        let res = await fetch('/users/update/' + id, requestOptions)
        let data = await res.json()
        if(data.success && typeof cb === 'function'){
            cb(data.data)
        }
        return data
    } catch (error) {
        console.log(error)
    } 
}