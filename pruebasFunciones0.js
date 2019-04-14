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

	alert("SEXO");
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

function capturaDatos(){
		let i = document.getElementById('id0').value;
		let n = document.getElementById('nombre').value;
		let a = document.getElementById('avance').value;
		let c = document.getElementById('color').value;

		let tarea = new Tarea(id0,n,a,null);
		contenedor.addTarea(tarea);

		console.log(i);
		console.log(n);
		console.log(a);
		console.log(c);

		proyecto.createHTMLTarea(i,n,a,c);
		console.log("Capturados");
}

function limpiarFormulario(){
	document.getElementById('id0').value = "";
	document.getElementById('nombre').value = "";
	document.getElementById('avance').value = "";
}
