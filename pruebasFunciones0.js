function crearTarea()
{
	let fecha1 = new Date(2019, 2, 1);
	let fecha2 = new Date(2019, 2, 11);
	let fecha3 = new Date(2019, 2, 21);

	let tareaPadre = new Tarea(0, fecha1, fecha3, "Tarea Padre", 0, null);
	let tareaHija1 = new Tarea(1, fecha1, fecha2, "Hija 1", 100, null);
	let tareaHija2 = new Tarea(2, fecha1, fecha3, "Hija 2", 50, null);

	tareaPadre.addHijo(tareaHija1);
	tareaPadre.addHijo(tareaHija2);

	alert("newMarginO");
}

function muestraFormulario()
{
	alert("EPAsito");
}

function nuevaTarea()
{
	let proyectoMamalona = new Proyecto();

	proyectoMamalona.createHTMLTarea("00","PUTAAAA","NORMAL");

	console.log("HECHO");
}
/*
document.getElementById('body0').onload = function () 
{
	console.log("entra a kansfa");
	var proyecto = new Proyecto();
	var contenedor = new Contenedor();	
};
*/

console.log("entra a kansfa");
var proyecto = new Proyecto();
var contenedor = new Contenedor();
var flagHijo = 0;
var dady = null;

function capturaDatos(){
		//let i = document.getElementById('id0').value;
		let n = document.getElementById('nombre').value;
		let a = document.getElementById('avance').value;
		let c = document.getElementById('color').value;
		let fI = document.getElementById('_fIn').value;
		let fF = document.getElementById('_fFi').value;

		//Despues de obtener los datos del formulario lo metemos a un
		//objeto Tarea

		let tarea = new Tarea(proyecto.getIds(),n,a,null,fI,fF);
		contenedor.addTarea(tarea);

		//console.log(i);
		console.log(n);
		console.log(a);
		console.log(c);

		//Dibujamos en la pagina la nueva tarea creada, que es padre

		proyecto.createHTMLTarea('contenedor',n,a,c,fI,fF,tarea.getTipo(),tarea.getTiempoRestante());
		console.log("Capturados");
}

function wachaFuncion()
{
	//Esta funcion verifica si lo que se requiere es tener un padre o tener un hijo

	if (flagHijo == 1) 
	{
		//si el requerimiento es un hijo, llamamos a la funcion que crea el hijo
		crearHijo();
		flagHijo = 0;
	}
	else
	{
		//si el requerimiento no es hijo, llamamos a la funcion que crea un padre
		capturaDatos();
	}
}

function obtenerPadre(_padre)
{
	//Ponemos en el buffer el boton al que se le dio click
	dady = _padre;
}

function crearHijo()
{
	let n = document.getElementById('nombre').value;
	let a = document.getElementById('avance').value;
	let c = document.getElementById('color').value;
	let fI = document.getElementById('_fIn').value;
	let fF = document.getElementById('_fFi').value;

	//despues de tomar los valores del formulario se crea una nueva tarea 
	// y se agregan los valores tomados del formulario
	let tareaHijo = new Tarea(proyecto.getIds(),n,a,null,fI,fF);
	contenedor.addTarea(tareaHijo);

	let yeah = obtieneIdPadre("_p");

	//Obtenemos el nodo padre, con el id antes obtenido
	let tareaS = document.getElementById(''+yeah);

	//Dibujamos el nodo que será hijo de el nodo "tareaS", pero le pasamos el parametro
	//"yeah" donde es el id del nodo, para ya no tener que hacer un get
	proyecto.createHTMLTarea(yeah,n,a,c,fI,fF,tareaHijo.getTipo(),tareaHijo.getTiempoRestante());
	
	//Obtenemos el valor del margen-left del nodo padre para referencia del margen-left del
	//nodo hijo, para que dibuje una sangria
	let marginT = tareaS.style.marginLeft;

	console.log("marginT:"+marginT+", "+dady.id);

	//usamos un auxiliar el cual toma el margen-left del padre y le suma 20px para crear el efecto 
	//de sangria
	let auxT = parseInt(marginT);
	auxT = auxT + 20;

	//obtenemos el id de la ultima tarea creada, restandole 1 al contador de tareas asi obtenemos
	//el id de la tarea actual
	let prueba2 = parseInt(proyecto.getIds()) - 1;

	//Ponemos el valor correspondiente a la nueva tarea hija, con el respectivo efecto sangria
	let newMargin = new String(auxT+"px");
	document.getElementById(''+prueba2).style.marginLeft = newMargin;

	console.log(newMargin);
}

function limpiarFormulario()
{
	document.getElementById('_fIn').value = "";
	document.getElementById('_fFi').value = "";
	document.getElementById('nombre').value = "";
	document.getElementById('avance').value = "";
}

function ocultaHijos()
{
	//Obtenemos el id del boton, para despues quitarle el "_o" y nos dara el id del nodo padre
	let padreId = obtieneIdPadre("_o");

	//Obtenemos todos los nodos que sean de la clase tareas_padre para ocultarlas
	let tareasHijas = document.getElementById('contenedor').querySelectorAll(".tareas_"+padreId);
	let noTareasHijas = tareasHijas.length;
	console.log("noTareasHijas: "+noTareasHijas);

	for (var i = 0; i < noTareasHijas; i++) 
	{
		tareasHijas[i].style.display = "none";
	}

	dady.removeAttribute("onclick");
	dady.removeAttribute("value");
	dady.setAttribute("onclick","obtenerPadre(this); muestraHijos();");
	dady.setAttribute("value","+");
}

function muestraHijos()
{
	//Obtenemos el id del boton, para despues quitarle el "_o" y nos dara el id del nodo padre
	let padreId = obtieneIdPadre("_o");

	//Obtenemos todos los nodos que sean de la clase tareas_padre para ocultarlas
	let tareasHijas = document.getElementById('contenedor').querySelectorAll(".tareas_"+padreId);
	let noTareasHijas = tareasHijas.length;
	console.log("noTareasHijas: "+noTareasHijas);

	for (var i = 0; i < noTareasHijas; i++) 
	{
		tareasHijas[i].style.display = "block";
	}

	dady.removeAttribute("onclick");
	dady.removeAttribute("value");
	dady.setAttribute("onclick","obtenerPadre(this); ocultaHijos();");
	dady.setAttribute("value","-");
}

function obtieneIdPadre(tipo)
{
	//obtenemos el id del boton para despues quitarle el substring "_p"
	//con el cual nos queda el id del nodo padre
	let prueba = new String(dady.id);
	let id_pa = prueba.indexOf(tipo);
	let yeah = prueba.substring(0,parseInt(id_pa));
	console.log(yeah);

	return yeah;
}


