//Selecciono los elementos principales de la funcion
const cotizarSeguro=()=>{
    let marca = document.querySelector("#marca").value;
    let year = document.querySelector("#year").value;
    let basico1 = document.querySelector("#basico1");
    let completo2 = document.querySelector("#completo2");
    let divResumen = document.querySelector("#resumen");
    let divResultado = document.querySelector("#resultado");

let plan = ""

if (basico1.checked) {
    plan="Basico"
}else if(completo2.checked){
    plan="Completo"
}
        //Verifico que esten todos los datos puestos
        if (marca === "" || year=== ""|| plan=== "") { 
        mostrarError("#error","Falta seleccionar algun valor");
        
        return;
    }
    // Resumen de los datos seleccionados
    let cotizacion = [marca,year,plan];
    divResumen.style.backgroundColor="#FFF";
    divResumen.style.display="block";

    divResumen.innerHTML=`<div>
                            <img src= "cargando.gif" width= 300px height=300>
                            </div>`;
    setTimeout(()=>{
        Toastify({
            text: "Tu seguro ha sido cotizado",
            className: "info",
            gravity: "bottom",
            duration:2000,
            style: {
              background: "linear-gradient(to right, blue, green)",
            }
          }).showToast();
          //Modifico el HTML del resumen para que aparezca en  la pagina
        divResumen.style.backgroundColor="#fff"
        divResumen.innerHTML=`<h2> Resumen de cotizacion </h2>
                                <table>
                                    <tr>Marca: ${marca}</tr>
                                    <br>
                                    <tr>Año del auto: ${year}</tr>
                                    <br>
                                    <tr>Plan: ${plan}</tr>
                                </table>`
                        
    let cotizacionFinal=cotizar(cotizacion);

    divResultado.style.display="block"

    divResultado.innerHTML=`<p>$${cotizacionFinal}</p>`;
                     
    },2000);

    //Guardo en el LocalStorage los datos seleccionados 
    guardarCotizacionStorage(cotizacion);

}
const guardarCotizacionStorage = (cotizacion) => {
    localStorage.setItem("cotizacion", JSON.stringify(cotizacion));
};

const obtenerCotizacionStorage = () => {
    const cotizacionStorage = JSON.parse(localStorage.getItem("cotizacion"));
    cotizar(cotizacionStorage);
};

document.addEventListener("DOMContentLoaded",()=>{
    if (localStorage.getItem("cotizacion")) {
        obtenerCotizacionStorage();
    }
})
    // Funcion Principal del proyecto
const cotizar =(cotizacion)=>{
    // Inicializo el resultado en 4000
    const[marca,year,plan]=cotizacion;
    let resultado=4000;
    
    // a cada año se reduce un 3% el resultado del seguro
    const diferenciaYear=diferencia(year);
    resultado-=((diferenciaYear*3)*resultado)/100
    
    resultado=calcularMarca(marca)*resultado;
    
    const incrementoPlan=obtenerPlan(plan,resultado);

    resultado=parseFloat(incrementoPlan).toFixed(2)

    resultado=parseFloat(resultado).toFixed(2)

    return resultado;

}



// Si es basico se aumenta un 30% si es completo un 50%
const obtenerPlan = (plan,resultado)=>{
    if (plan==="Basico") {
        resultado *= 1.30;
    }else{
        resultado *=1.50
    }
    return resultado
}


    
const calcularMarca = marca =>{
    let incremento =1;

    switch(marca){
        case "Europeo": incremento= incremento*2;break;
        case "Americano": incremento= incremento* 1.60;break;
        case "Japones": incremento= incremento* 1.30;break;
    }
                             
    return incremento
     
}

const diferencia=(year)=>{
    return new Date().getFullYear()-year;

}

const pesosCointainer = document.getElementById(`pesos-cointainer`)
const pesosCantidad = document.getElementById(`pesos-cantidad`)

fetch(`https://criptoya.com/api/dolar`)
    .then(response => response.json())
    .then(data=> displayData(data));

const displayData = data =>{
    const pesos = data.blue;
    pesosCantidad.textContent=`1 USD = $${pesos} pesos argentinos (cotizacion blue)`

}

// Muestro un error en caso de que no seleccione todas las opciones
const mostrarError=(elemento,mensaje)=>{
    divError = document.querySelector(elemento);
    divError.innerHTML=`<p class="alerta-error">${mensaje}</p>`;
    setTimeout(()=>{divError.innerHTML="";},2000);
}
