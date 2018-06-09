/*let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Yune'
    };
    callback(user);
};

getUser(27, (userObject) => {
    console.log(userObject);
});
*/
// Second ------------

let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Yune'
    };
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(27, (userObject) => {
    console.log(userObject);
});