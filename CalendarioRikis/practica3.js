
//Autor: Ricardo Esaú Martínez Bohórquez
//Grupo: 2CM9
//Versión: 2.6
//Fecha de modificiación: 15 de Marzo, 2019 

//Se crean las siguientes dos variables globales para poder colocar la fecha seleccionada en el input
//seleccionado y ótra para poder establecer el día actual para que este sea resaltado.
var inputActivo;
var actual = new Date();

//La siguiente función se encarga de mostar la tabla mediante la llamada de dos funciones mas
//las cuales están encargadas de dibujar la tabla y rellenarla con los días del mes correspediente.
function initTable()
{
	drawTable();
	fillTable();
}

//La siguiente funcion crea los elementos tipo tr que serán hijos del elemento tbody, los cuales son 7
//que son las filas necesarias para cualquier mes del año, Considerando que el mes puede iniciar en cualquier
//día de la semana
function createTr()
{
	let thead,tbody,tr,trhead;
	let body = document.getElementsByTagName('body')[0];
	let table = document.getElementById('calendar');

	for(let a = 0; a < 3; a++){
		thead = document.getElementById('prueba');
		trhead = document.createElement('tr');
		trhead.setAttribute('id',a);		

		if(a == 0)
		{		
			for(let b = 0; b < 3; b++)
			{
				let headY = document.createElement('th');
				if(b == 0)
				{
					let prevY = document.createElement('button');
					prevY.setAttribute('onclick','prevYear();');
					prevY.setAttribute('onclick','fillTable)();')
					headY.appendChild(prevY);
				}
				if(b == 1)
				{
					headY.setAttribute('id','numOfYear');
					headY.setAttribute('colspan','5');
					let textA = document.createTextNode("Año");	
					headY.appendChild(textA);
				}
				if(b == 2)
				{
					let nextY = document.createElement('button');
					nextY.setAttribute('onclick','nextYear();');
					nextY.setAttribute('onclick','fillTable)();')
					headY.appendChild(nextY);	
				}
				trhead.appendChild(headY);
			}
		}
		if(a == 1)
		{
			for(let c = 0; c < 3; c++)
			{
				let headM = document.createElement('th');
				if(c == 0)
				{
					let pM = document.createElement('button');
					pM.setAttribute('onclick','prevMonth();');
					pM.setAttribute('onclick','fillTable)();')
					headM.appendChild(pM);
				}
				if(c == 1)
				{
					headM.setAttribute('id','nameOfMonth');
					headM.setAttribute('colspan','5');
					let textM = document.createTextNode("Abril");	
					headM.appendChild(textM);

				}
				if(c == 2)
				{
					let nM = document.createElement('button');
					nM.setAttribute('onclick','prevMonth();');
					nM.setAttribute('onclick','fillTable)();')
					headM.appendChild(nM);
				}
				trhead.appendChild(headM);
			}
		}
		if(a == 2)
		{
			for(let d = 0; d < 7; d++)
			{
				let headD = document.createElement('th');
				trhead.appendChild(headD);
			}

		}	

		thead.appendChild(trhead);
	}

	for (let j = 0; j < 6; j++) 
	{
		tbody = document.getElementById('tb1');
		tr = document.createElement('tr');
		tr.setAttribute('id',j+'c')
		tbody.appendChild(tr);
	}

	table.appendChild(thead);
	table.appendChild(tbody);
	body.appendChild(table);
	

}

//En esta función, se crean los elementos td, que son hijos de un tr generado en la función createTr()
function drawTable(){
	var k = 0;
	var m = 0;
	var tbody,tr,td;
	
	createTr();
	
	for (var i = 0; i < 42; i++,k++) 
	{
		if (k<7) 
		{
			tr = document.getElementById(m.toString()+'c');
			td = document.createElement('td');

			td.setAttribute('id',i);
			td.setAttribute('onclick','pickedDay('+i+');');
			td.setAttribute('ondblclick','hideCalendar();');
			tr.appendChild(td);							 
		}
		else
		{
			tr = document.getElementById((m+1).toString()+'c');
			td = document.createElement('td');
			td.setAttribute('id',i);
			td.setAttribute('onclick','pickedDay('+i+');');
			td.setAttribute('ondblclick','hideCalendar();');
			tr.appendChild(td);
			m++;
			k = 0;
		}
	}
	
}

//La función se encarga de mostrar la tabla al activar el evento onclick en el input
//del html pidiendo el íd del input para asociarle un calendario
function showCalendar(id) 
{	
	inputActivo = document.getElementById(id);
	console.log(id);
	let m = new Array(); 
	m[0] = "Enero";
	m[1] = "Febrero";
	m[2] = "Marzo";
	m[3] = "Abril";
	m[4] = "Mayo";
	m[5] = "Junio";
	m[6] = "Julio";
	m[7] = "Agosto";
	m[8] = "Septiembre";
	m[9] = "Octubre";
	m[10] = "Noviembre";
	m[11] = "Diciembre";
	let dia = 0;
	let year = actual.getFullYear();
	let month = m[actual.getMonth()];


	document.getElementById('calendar').style.display = 'inline';
	document.getElementById('numOfYear').innerHTML = year;
	document.getElementById('nameOfMonth').innerHTML = month;

		for (var i = 0; i < 42; i++)
		{
			dia= document.getElementById(i.toString()).innerHTML;
			if(document.getElementById(i.toString()).innerHTML == actual.getDate())
				document.getElementById(i.toString()).innerHTML = '<div class="circulo">'+dia+'</div>';
		}

}

//Esta función simplemente oculta la tabla con el id "calendar".
function hideCalendar()
{
	document.getElementById('calendar').style.display='none';
}

//Función encargada de cambíar el mes actual al anterior.
//Mediante un swich se ponen los meses para poder cambiar al anterior
//también cuando se llega al caso de enero, se indica mediente getElementById el 
//cambio de año y reiniciar la cuenta regresiva desde Diciembrebre 
function prevMonth()
{
	var month;

	month = document.getElementById('nameOfMonth').innerHTML;

	switch(month)
	{
		case 'Enero': month = 'Diciembre'; //cambia al año anterior
			document.getElementById('numOfYear').innerHTML--;
			fillTable();
			break;
		case 'Febrero': month = 'Enero';break;
		case 'Marzo': month = 'Febrero'; break;
		case 'Abril': month = 'Marzo'; break;
		case 'Mayo': month = 'Abril'; break;
		case 'Junio': month = 'Mayo'; break;
		case 'Julio': month = 'Junio'; break;
		case 'Agosto': month = 'Julio'; break;
		case 'Septiembre': month = 'Agosto'; break;
		case 'Octubre': month = 'Septiembre'; break;
		case 'Noviembre': month = 'Octubre'; break;
		case 'Diciembre': month = 'Noviembre'; break;
	}
	document.getElementById('nameOfMonth').innerHTML = month;
}

//Función encargada de cambíar el mes actual al siguiente.
//Mediante un swich se ponen los meses para poder cambiar al siguiente
//también cuando se llega al caso de diciembre, se indica mediente getElementById el 
//cambio de año y reiniciar la cuenta ascendente desde enero.
function nextMonth()
{
	var month;

	month = document.getElementById('nameOfMonth').innerHTML; //obtiene el mes en texto

	switch(month)
	{
		case 'Enero': month = 'Febrero';break;
		case 'Febrero': month = 'Marzo';break;
		case 'Marzo': month = 'Abril'; break;
		case 'Abril': month = 'Mayo'; break;
		case 'Mayo': month = 'Junio'; break;
		case 'Junio': month = 'Julio'; break;
		case 'Julio': month = 'Agosto'; break;
		case 'Agosto': month = 'Septiembre'; break;
		case 'Septiembre': month = 'Octubre'; break;
		case 'Octubre': month = 'Noviembre'; break;
		case 'Noviembre': month = 'Diciembre'; break;
		case 'Diciembre': month = 'Enero';
								 document.getElementById('numOfYear').innerHTML++;
								 fillTable();
								 break;
	}
	document.getElementById('nameOfMonth').innerHTML = month;
}

//Función que cambia el año actual al anterior tomando el id del elemento th
//se le resta 1 al valor tomado y es puesto en el elemento th
function prevYear()
{
	var year;
	year = document.getElementById('numOfYear').innerHTML; 
	year--; //le restamos 1
	document.getElementById('numOfYear').innerHTML = year;
}

//Función que cambia el año actual al siguiente tomando el id del elemento th
//se le suma 1 al valor tomado y es puesto en el elemento th
function nextYear()
{
	var year;
	year = document.getElementById('numOfYear').innerHTML;
	year++;
	document.getElementById('numOfYear').innerHTML = year;
}

//Determina si el año actual, siguiente y anterior es bisiesto
//devuelve 1 para bisiesto y 0 para el otro caso, este valor servirá para la siguiente función
function leapYear(year)
{
	if (year%400==0 || (year%4==0 && year%100 != 0))
		return 1;
	else
		return 0;
}

//
function maxDaysOfMonth0(month,leapYear)
{
	var noDays
	switch(month)
	{
		/* en este switch se asignan los días maximos de cada mes*/
		case 'Enero': noDays=0; break;
		case 'Febrero': 
			noDays=31;
			if (leapYear == 1)
				maxDay = 29;
			else
				maxDay = 28; 
			break;
		case 'Marzo': noDays=59+leapYear; break;
		case 'Abril': noDays=90+leapYear; break;
		case 'Mayo': noDays=120+leapYear; break;
		case 'Junio': noDays=151+leapYear; break;
		case 'Julio': noDays=181+leapYear; break;
		case 'Agosto': noDays=212+leapYear; break;
		case 'Septiembre': noDays=243+leapYear; break;
		case 'Octubre': noDays=273+leapYear; break;
		case 'Noviembre': noDays=304+leapYear; break;
		case 'Diciembre': noDays=334+leapYear;break;
	}
	return noDays;
}

//Esta función se encarga de determinar el número de días
//que un mes puede terner, dependiendo del año, es decir, si es bisiesto o no.
function maxDayOfMonth1(month,leapYear)
{
	var maxDay = 31;
	switch(month)
	{
		case 'Febrero': 
			if (leapYear == 1)
				maxDay = 29;
			else
				maxDay = 28; 
			break;
		case 'Abril': maxDay = 30; break;
		case 'Junio': maxDay = 30; break;
		case 'Septiembre': maxDay = 30; break;
		case 'Noviembre':  maxDay = 30; break;
	}

	return maxDay;
}
//Función que, dependiendo el resultado que tenga la variable x, se le asigna un entero que corresponde a un dia
//que a su vez, corresponde al dato inicial para llenar la tabla
function dayOfWeek(x)
{
	var finalDay;

	switch(x)
	{
		case 0: finalDay = 4; break; //viernes
		case 1: finalDay = 5; break; //sabado
		case 2: finalDay = 6; break; //domingo
		case 3: finalDay = 0; break; //lunes
		case 4: finalDay = 1; break; //martes
		case 5: finalDay = 2; break; //miercoles
		case 6: finalDay = 3; break; //jueves
	}

	return finalDay;
}

//Función que limpia la tabla calendario mediante la insersción
//de espacioes en blanco en todas las celdas de la tabla, usand un ciclo for
// que va desde la poscisión 0 hasta la 42 que es el valor máximo de celdas. 
function cleanTable()
{
	for (var k = 0; k < 42; k++) 
	{
		document.getElementById(k.toString()).innerHTML = "";				
	}
}

//Esta función se encarga de llenar el calendario usado los parametros
//finalDay y maxDAy que previemente fueron calculados y asignados. Se asigna 1 a "j"
//para empezar desde e día seleccionado hasta el día máximo del mes.
function fillCalendar(finalDay,maxDay)
{
	var j=1;
	var aux=0;
	for (aux = finalDay; j < maxDay+1; aux++) 
	{
		document.getElementById(aux.toString()).innerHTML = j;
		j++;				
	}
}

//Función encargada de llenar la tabla con los valores que ya se han calculado y asginado anteriormente
//se ontiene el año actual del elemento th y se determina si es bisiesto llamando a la función ya creada,
//se obtene el mes del siguiente elemento th y le son asignados los días que puede tener así como se determina en qué día
//comienza el mes.
function fillTable()
{
	var year, month;
	var l = 0;
	var noDays, aux;
	var day, e, y, x, finalDay;
	var maxDay = 31;

	year = document.getElementById('numOfYear').innerHTML;
	l = leapYear(year); 		
    month = document.getElement('nameOfMonth').innerHTML;

	noDays = maxDaysOfMonth0(month,l);
	maxDay = maxDayOfMonth1(month,l);

	
	day = noDays+1;
	e = parseInt((year-1)/4);
	y = parseInt(day) + parseInt(year) + parseInt(e);
	x = parseInt(y%7);

	finalDay = dayOfWeek(x);
	cleanTable();
	fillCalendar(finalDay,maxDay);
	setDay(month,year);
}

//La siguiente función esta encargada de mantener día actual resaltado en 
//en circulo para que cuando se cambie de mes o año.
function setDay(month, year)
{
	let m = new Array(); 
	m[0] = "Enero";
	m[1] = "Febrero";
	m[2] = "Marzo";
	m[3] = "Abril";
	m[4] = "Mayo";
	m[5] = "Junio";
	m[6] = "Julio";
	m[7] = "Agosto";
	m[8] = "Septiembre";
	m[9] = "Octubre";
	m[10] = "Noviembre";
	m[11] = "Diciembre";
	let dia = 0;
	let a = actual.getFullYear();
	let b = m[actual.getMonth()];
	let c = actual.getDate();

	if(month == b){

		for(let i = 0; i < 42; i++)
		{
			dia = document.getElementById(i.toString()).innerHTML; 
			if(dia == c)
			document.getElementById(i.toString()).innerHTML = '<div class="circulo">'+dia+'</div>';
		}
	}
}

//Función encargada de establecer la fecha de la celda seleccionada en el input
//que este activo, es decir, el input que ha iniciado al calendario no selecciona
//celdas vacías
function pickedDay(day)
{
	var year,month;
	year = document.getElementById('numOfYear').innerHTML;  
	month = document.getElementById('nameOfMonth').innerHTML;  
	var dL = document.getElementById(day.toString()).innerHTML; 
	if (dL != "")
	{
		var pD = dL+"-"+month+"-"+year;
		inputActivo.value = pD;
		inputActivo.style = 'background-color: lightgreen;';
	}
	else
	{
		inputActivo.value = "";
		inputActivo.style = 'background-color: none;';
		alert("Seleccione un día válido");
	}
}
