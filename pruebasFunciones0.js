console.log("entra a kansfa");
var proyecto = new Proyecto();
var contenedor = new Contenedor();
var flagHijo = 0;
var dady = null;
var flagPrede = 0;

function capturaDatos(){
		//let i = document.getElementById('id0').value;
		let n = document.getElementById('nombre').value;
		let a = document.getElementById('avance').value;
		let c = document.getElementById('color').value;
		let fI = document.getElementById('_fIn').value;
		let fF = document.getElementById('_fFi').value;
		let pre = document.getElementById('predecesor').value;

		//Despues de obtener los datos del formulario lo metemos a un
		//objeto Tarea

		let tarea = new Tarea(proyecto.getIds(),n,a,pre,fI,fF,c);
		contenedor.addTarea(tarea);

		//console.log(i);
		console.log(n);
		console.log(a);
		console.log(c);

		//Dibujamos en la pagina la nueva tarea creada, que es padre

		proyecto.createHTMLTarea('contenedor',tarea);
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
	let pre = document.getElementById('predecesor').value;

	//despues de tomar los valores del formulario se crea una nueva tarea 
	// y se agregan los valores tomados del formulario
	let tareaHijo = new Tarea(proyecto.getIds(),n,a,pre,fI,fF,c);
	contenedor.addTarea(tareaHijo);

	//Obtenemos el ID del padre
	let _padreId = obtieneIdPadre("_p");

	//Obtenemos el objeto tarea en el contenedor
	let tareaPa = contenedor.getTareaPorId(_padreId);

	//Asignamos el hijo al padre
	tareaPa.addHijo(tareaHijo);

	//Asignamos el tipo "Agrupador" al padre
	tareaPa.setTipo("Agrupador");
	document.getElementById('t_tip_'+_padreId).innerHTML = "Agrupador";

	//Obtenemos el nodo padre, con el id antes obtenido
	let tareaS = document.getElementById(''+_padreId);

	//Dibujamos el nodo que será hijo de el nodo "tareaS", pero le pasamos el parametro
	//"yeah" donde es el id del nodo, para ya no tener que hacer un get
	proyecto.createHTMLTarea(_padreId,tareaHijo);
	
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
	document.getElementById('predecesor').value = "";

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

function aumentaAvance(botonOnClick)
{
	/*  En esta funcion se obtiene el id de la tarea que se le da click
		para despues obtener el objeto tarea del cual obtenemos el avance
		y le sumamos 1 unidad para guardarlo de nuevo en el objeto tarea
		y aumentar en la barrita xd
	*/
	let aux0 = new String(botonOnClick.id);
	let aux1 = aux0.indexOf("_b");
	let id = aux0.substring(0,parseInt(aux1));

	console.log("ID Tarea: ",id);

	let tarea = contenedor.getTareaPorId(id);

	let avaInicial = tarea.getAvance();

	console.log("Tarea "+id+", avance: ",avaInicial);

	if (avaInicial != 100) 
	{
		avaInicial = parseInt(avaInicial) + 1;

		console.log("avance: ",avaInicial);

		tarea.setAvance(avaInicial);

		avaFin = tarea.getAvance();

		document.getElementById('t_ava_'+id).innerHTML = avaFin + " % ";

		document.getElementById('myBar_'+id).style.width = new String (avaFin + "%");
	}

	

}

function eliminarTareas(botonOnClick)
{
	let aux0 = new String(botonOnClick.id);
	let aux1 = aux0.indexOf("_d");
	let id = aux0.substring(0,parseInt(aux1));

	//Obtenemos del contenedor la tarea
	let tarea = contenedor.getTareaPorId(id);

	//Obtenemos todos los nodos que sean de la clase tareas_padre para eliminarlas
	let tareasHijas = document.getElementById('contenedor').querySelectorAll(".tareas_"+id);
	let noTareasHijas = tareasHijas.length;
	console.log("noTareasHijas: "+noTareasHijas);

	for (var i = 0; i < noTareasHijas; i++) 
	{
		tareasHijas[i].style.display = "none";
	}

	document.getElementById(id).style.display = "none";

	contenedor.eliminarTarea(id);
}
