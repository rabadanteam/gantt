/*
Clase Rol
Recibe:
-cadena: nombre.
*/
function Rol(nombre)
{
	let _nombre = nombre;

	/*Asigna el nombre del rol
	Recibe:
	-cadena: nombre*/
	let setNombre = function(nombre)
	{
		_nombre = nombre;
	}

	/*Devuelve el nombre del rol
	Devuelve: cadena: nombre*/
	this.getNombre = function()
	{
		return _nombre;
	}
}



/*Clase Responsable
Recibe:
-cadena: nombre
-objeto Rol: rol*/
function Responsable(nombre, rol)
{
	let _nombre = nombre, _rol = rol;

	/*Asigna el nombre del responsable
	Recibe:
	-cadena: nombre*/
	let setNombre = function(nombre)
	{
		_nombre = nombre;
	}

	/*Devuelve el nombre del responsable
	Devuelve: cadena: nombre*/
	this.getNombre = function()
	{
		return _nombre;
	}

	/*Asigna el rol del responsable
	Recibe:
	-objeto Rol: rol*/
	this.setRol = function(rol)
	{
		_rol = rol;
	}

	/*Devuelve el rol del responsable
	Devuelve: objeto Rol: rol*/
	this.getRol = function()
	{
		return _rol;
	}
}



/*Clase Tarea
Recibe:
-Date: fechaInicio
-Date: fechaTermino
-cadena: nombre
-cadena: tipo
-numero: avance
-Responsable: responsable*/
function Tarea(nombre, fechaInicio, fechaTermino, tipo, responsable, avance)
{
	let _fechaInicio = new Date();
	let _fechaTermino = new Date();
	let _nombre = "";
	let _tipo = "";
	let _avance = 0;
	let _responsable = new Responsable();

	/*Función que calcula los días que tiene un més de un año en específico
	Recibe:
	-numero: anio
	-numero: mes
	Devuelve: numero: dias que tiene el mes*/
	let getDiasDelMes = function (anio, mes)
	{
		let n;

		switch(mes)
		{
			case 0: n = 31; break;
			case 1:
				if(anio % 4 == 0)
					n = 29;
				else
					n = 28;
			break;
			case 2: n = 31; break;
			case 3: n = 30; break;
			case 4: n = 31; break;
			case 5: n = 30; break;
			case 6: n = 31; break;
			case 7: n = 31; break;
			case 8: n = 30; break;
			case 9: n = 31; break;
			case 10: n = 30; break;
			case 11: n = 31; break;
		}
		return n;
	}

	/*Función que verifica si una fecha existe o no
	Recibe:
	-Date: fecha
	Devuelve: booleano: verdadero sí la fecha es válida, falso sí no*/
	let fechaEsValida = function(fecha)
	{
		let anio = fecha.getFullYear();
		let mes = fecha.getMonth();
		let dia = fecha.getDate();
	}	
}


/*function Tarea()
{
	

	//Recibe tres números que representan día, mes y año y verifica si la fecha construida
	//por esos parámetros existe o no.
	let validarFecha = function(dia, mes, anio)
	{
		if(dia < 1 || mes < 0 || mes > 11)
			return false;

		if(dia > getDiasDelMes(mes, anio))
			return false;
		else
			return true;
	}

	//Recibe una fecha y devuelve el número del día con respecto al año.
	let getDiaDelAnio = function(dia, mes, anio)
	{
		let n = 0;
		for(let i = 0; i < mes; i++)
		{
			n += getDiasDelMes(i, anio);
		}

		n += dia;

		return n;
	}

	//Verifica que la fecha de inicio sea válida y si es así, la asigna al objeto.
	this.setFechaInicio = function(dia, mes, anio)
	{
		if(validarFecha(dia, mes, anio))
		{
			_fechaInicio.dia = dia;
			_fechaInicio.mes = mes;
			_fechaInicio.anio = anio;
		}
		else
			alert("Error: fecha de inicio no existe.");
	}

	//Devuelve la fecha de inicio de una tarea.
	this.getFechaInicio = function()
	{
		return _fechaInicio;
	}

	//Verifica que la fecha de término sea válida y si es así, la asigna al objeto.
	this.setFechaTermino = function(dia, mes, anio)
	{
		if(validarFecha(dia, mes, anio))
		{
			_fechaTermino.dia = dia;
			_fechaTermino.mes = mes;
			_fechaTermino.anio = anio;
		}
		else
			alert("Error: fecha de término no existe.")
	}

	//Devuelve la fecha de término de una tarea.
	this.getFechaTermino = function()
	{
		return _fechaTermino;
	}

	//Asigna el nombre a la tarea.
	this.setNombre = function(nombre)
	{
		_nombre = nombre;
	}

	//Devuelve el nombre de la tarea
	this.getNombre = function()
	{
		return _nombre;
	}

	//Verifica que el tipo de tarea sea válido y si es así, lo asigna a la tarea.
	this.setTipo = function(tipo)
	{
		if(tipo == "Agrupador" || tipo == "Hito" || tipo == "Tarea")
			_tipo = tipo;
		else
			alert("Error: tipo de tarea desconocido.")
	}

	//Devuelve el tipo de la tarea.
	this.getTipo = function()
	{
		return _tipo;
	}

	//Verifica si el avance es válido y si es así lo asigna a la tarea.
	this.setAvance = function(avance)
	{
		if(avance >= 0 && avance <= 100)
			_avance = avance;
		else
			alert("Error: el avance solo toma valores entre 0 y 100.")
	}

	//Devuelve el avance de la tarea.
	this.getAvance = function()
	{
		return _avance;
	}

	this.getTiempoRestante = function()
	{
		let n = 0;

		for(let i = _fechaInicio.anio; i < _fechaTermino.anio; i++)
		{
			if(i % 4 == 0)
				n += 366;
			else
				n += 365;
		}

		n -= getDiaDelAnio(_fechaInicio.dia, _fechaInicio.mes, _fechaInicio.anio);
		n += getDiaDelAnio(_fechaTermino.dia, _fechaTermino.mes, _fechaTermino.anio);

		return n;
	}


}*/


function inicial()
{
	
}