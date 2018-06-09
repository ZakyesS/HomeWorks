
function eventListener() {
    document.getElementById('enterWeather').addEventListener('click', addItem);
    document.addEventListener('keypress', event => {
        if (event.keyCode === 13 || event.which === 13) {
            addItem(event);
        }
    });
};

let datos = document.getElementById('inputAdress').value;



// mostrar datos introducidos por el user y devuelve al server lo recogido.
function showInputAdress(inputAdress) {
    console.log('inputAdress vale: ', inputAdress);
    let showAdress = document.getElementById('showAdress');
    showAdress.innerHTML = 'Datos recogidos: ' + inputAdress;
    // return inputAdress;
};
 
// recoger datos introducidos por user y pasárselo a showInputAdress 
function addItem(e){
    e.preventDefault();

    // let newItem;
    let inputAdress = document.getElementById('inputAdress').value;


    let request = new XMLHttpRequest();
    let path = '../server/server.js'
    request.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
    request.open('POST', path, true);
    request.send('hola');
    // function pruebita(request, resolve){
    //     try{
    //         let recogida = request;
    //         console.log('recogida vale: ', recogida);
    //         // let response = res('enviando respuesta:', recogida);
    //         // return recogida

    //         let pru = jQuery('#inputAdress').val();
    //         console.log('Pru: ', pru);
    //         form(action='/post', mehot='POST', type='hola');
    //         // console.log('Pru es de tipo: ', typeof(pru));
    //         // function enviar (req, res){
    //         //     console.log('Me meto en enviar');
    //         // //   resolve.send('Hola');
    //         //         let enviar = {texto: req};
    //         //         res.send({text: texto});
         
    //         // };
    //         // enviar(pru);

    //     } catch(e){
    //         console.log('Error: ', e);
    //     }
    // } 
    // pruebita(inputAdress);  

    // 1. Get the field input data
    // showInputAdress(inputAdress);

    // ------------ ajax --------------------
    // $.ajax({
    //     // url: '/post',
    //     // type: 'post',
    //     // data: {text: inputAdress}
    //     url: 'index.hbs',
    //     method: 'post',
    //     data: {text: inputAdress},
    //     dataType: 'JSON'

    //   }).done(function(consulta){
    //      alert('Enviando datos:  ' + consulta)
    //   })

};



eventListener();
// pruebita(datos);

exports = {eventListener, showInputAdress, addItem};
