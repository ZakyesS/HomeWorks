console.log('Starting app');

setTimeout(() => { //se le pasa como primer parametro una callback function y como segundo los segundos que se quieran usar para esperar.
    console.log('Inside of callback');
}, 2000); //2000 miliseconds , que son 2 seg.

setTimeout(() => {
    console.log('Second set timeout works');
},0);
console.log('Finishing app');