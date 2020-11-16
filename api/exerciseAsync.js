// REGION CALLBACK FUNC
// console.log("Begin");
// getUser(1, (user) => {
//     console.log(user);

//     getRepo(user.username, (repos) => {
//         console.log(repos);
//     });
// });
// console.log("After");

// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log("Call to DB to get Data User");
//         callback({id:id, username: "test user"});
//     }, 2000);
// }

// function getRepo(username, callback) {
//     setTimeout(() => {
//         console.log("Call to DB to get User Repo");
//         callback(["repo1", "repo2", "repo3"]);
//     }, 2000);
// }
//END

// REGION PROMISE
// console.log('Begin');
// getUser(1).then(user => {
//     console.log(user);
//     getRepo(user.username);
// }).then(repos => {
//     console.log(repos);
// }).catch(err => console.log('Error:', err.message));
// console.log("After");
//END

//REGION ASYNC AWAIT
console.log('Begin');
async function runAsync() {
    const user = await getUser(1);
    console.log(user);
    const repos = await getRepo(user.username);
    console.log (repos);
}
runAsync();
console.log("After");
//END

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Call to DB to get Data User");
            resolve({id:id, username: "test user"});
        }, 2000);
    });
}

function getRepo(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Call to DB to get ${username} Repo`);
            resolve(["repo1", "repo2", "repo3"]);
        }, 2000);
    });
}