/*let somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hey. It worked!.');
        reject('Unable to fulfill promise');
    },2500);
});

somePromise.then((message) => { 
    console.log('success: ', message);
}, (errorMessage) => {
    console.log('Error: ', errorMessage);
});
// Solo puedes resolver o rechazar una promise una sola vez, si se resuelve no se puede rechazar luego.
//Y si se resuleve con un valor no puedes cambiar de opinion luego, por ejemplo si se tiene un mensaje
//de resolver y otro para rechazar, no puedo hacer ambos, solo uno de los dos, solo se puede hacer una vez 
//el resolve o el reject, no dos veces. 
*/

let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }
            else{
                reject('Arguments must be numbers.');
            }
        }, 1500);
    });
};

/*asyncAdd(4, 4).then((res) => {
    console.log('Result --> ', res);
    return asyncAdd(res, 2);
}, (errorMessage) => {
    console.log(errorMessage);
}).then((res) => {
    console.log('Should be 10 = ', res);
}, (errorMessage) => {
    console.log(errorMessage);
});
*/ //daba error porque si no le pasabas primero un numero, te decia que habia un error, pero si luego se
// lo pasabas, te daba el mensaje de correcto pero con undefined.

asyncAdd(4, 'hola').then((res) => {
    console.log('Result --> ', res);
    return asyncAdd(res, 2);
}).then((res) => {
    console.log('Should be 10', res); //catch es similar a then, pero coge una funcion y es el manejador de error.
}).catch((errorMessage) => {
    console.log(errorMessage);
}); //con esto se consigue que aunque previamente no fuesen correctos los datos, no va a imprimir un undefined
// ni algo que deberia estar bien cuando no lo está, sino el mensaje correcto.

// la libería request no soporta promises.