const Tarea = (function()
{
	const _id = new WeakMap();
	const _fechaInicio = new WeakMap();
	const _fechaTermino = new WeakMap();
	const _nombre = new WeakMap();
	const _tipo = new WeakMap();
	const _avance = new WeakMap();
	const _padre = new WeakMap();
	const _prdecesor = new WeakMap();
	const _hijos = new WeakMap();

	class Tarea
	{
		constructor(id, fechaInicio, fechaTermino, nombre, avance, predecesor)
		{
			_id.set(this, id);
			_fechaInicio.set(this, fechaInicio);
			_fechaTermino.set(this, fechaTermino);
			_nombre.set(this, nombre);
			_avance.set(this, avance);
			_prdecesor.set(this, predecesor);
			_padre.set(this, null);

			let array = [];
			_hijos.set(this, array);

			if(fechaInicio.getFullYear() == fechaTermino.getFullYear() && 
				fechaInicio.getMonth() == fechaTermino.getMonth() &&
				fechaInicio.getDate() == fechaTermino.getDate())

				_tipo.set(this, "Hito");

			else
				_tipo.set(this, "Tarea");
		}

		getId()
		{
			return _id.get(this);
		}

		getFechaInicio()
		{
			return _fechaInicio.get(this);
		}

		getFechaTermino()
		{
			return _fechaTermino.get(this);
		}

		getAvance()
		{
			return _avance.get(this);
		}

		getPadre()
		{
			return _padre.get(this);
		}

		getPredecesor()
		{
			return _prdecesor.get(this);
		}

		getTipo()
		{
			return _tipo.get(this);
		}

		getNombre()
		{
			return _nombre.get(this);
		}

		setPadre(id)
		{
			_padre.set(this, id);
		}

		setAvance(avance)
		{
			_avance.set(this, avance);
		}

		setPredecesor(id)
		{
			_prdecesor.set(this, id);
		}

		getHijoPorId(id)
		{
			let array = _hijos.get(this);
			
			for(let i = 0; i < array.length; i++)
			{
				if(array[i].getId() == id)
					return array[i];
			}

			return null;
		}

		getHijoPorIndice(indice)
		{
			let array = _hijos.get(this);
			return array[indice];
		}

		getTiempoRestante()
		{
			//Verificamos si el año de la fecha Inicial es el mismo de la fecha Termino 
			if(_fechaInicio.get(this).getFullYear() != _fechaTermino.get(this).getFullYear())
			{
				//Si no es el mismo año, se resta la Termino a la Inicial y lo guardamos
				let aniosRes = _fechaTermino.get(this).getFullYear() - _fechaInicio.get(this).getFullYear();
			}

			//Verificamos si el mes de la fecha Inicial es el mismo de la fecha Termino 
			if (_fechaInicio.get(this).getMonth() != _fechaTermino.get(this).getMonth()) 
			{
				//Si no es el mismo mes, se resta la Termino a la Inicial y lo guardamos
				let mesesRes = _fechaTermino.get(this).getMonth() - _fechaInicio.get(this).getMonth();
				
				//si es negativo, lo hacemos positivo
				if (mesesRes<0) 
				{
					mesesRes = mesesRes * (-1);
				}	
			}

			//Verificamos si el dia de la fecha Inicial es el mismo de la fecha Termino
			if (_fechaInicio.get(this).getDate() != _fechaTermino.get(this).getDate()) 
			{
				//Si no es el mismo dia, se resta la Termino a la Inicial y lo guardamos
				let diasRes = _fechaTermino.get(this).getDate() - _fechaInicio.get(this).getDate();
				
				//si es negativo, lo hacemos positivo
				if (diasRes<0) 
				{
					diasRes = diasRes * (-1);
				}	
			}
		}

		addHijo(tareaHija)
		{
			_tipo.set(this, "Agrupador");

			tareaHija.setPadre(_id.get(this));

			let array = _hijos.get(this);
			array.push(tareaHija);
			_hijos.set(this, array);
		}

		eliminarHijo(id)
		{
			let arrayOriginal = _hijos.get(this);
			let arrayNuevo = [];

			for(let i = 0; i < arrayOriginal.length; i++)
			{
				if(arrayOriginal[i].getId() != id)
					arrayNuevo.push(arrayOriginal[i]);
			}

			let fechaInicio = _fechaInicio.get(this), fechaTermino = _fechaTermino.get(this);

			if(arrayNuevo.length == 0)
			{
				if(fechaInicio.getFullYear() == fechaTermino.getFullYear() && 
				fechaInicio.getMonth() == fechaTermino.getMonth() &&
				fechaInicio.getDate() == fechaTermino.getDate())

					_tipo.set(this, "Hito");

				else
					_tipo.set(this, "Tarea");
			}

			_hijos.set(this, arrayNuevo);
		}
	}

	return Tarea;

}());

const Contenedor = (function()
{
	const _arrayTareas = new WeakMap();

	class Contenedor
	{
		constructor()
		{
			let array = [];

			_arrayTareas.set(this, array);
		}

		addTarea(tarea)
		{
			let array = _arrayTareas.get(this);

			array.push(tarea);

			_arrayTareas.set(this, array);
		}

		eliminarTarea(id)
		{
			let arrayOriginal = _arrayTareas.get(this);
			let arrayNuevo = [];

			for(let i = 0; i < arrayOriginal.length; i++)
			{
				if(arrayOriginal[i].getId() != id)
					arrayNuevo.push(arrayOriginal[i]);
			}

			_arrayTareas.set(this, arrayNuevo);
		}

		getTareaPorId(id)
		{
			let array = _arrayTareas.get(this);

			for(let i = 0; i < array.length; i++)
			{
				if(array[i].getId() == id)
					return array[i];
			}

			return null;
		}

		getTareaPorIndice(indice)
		{
			let array = _arrayTareas.get(this);
			return array[indice];
		}
	}

	return Contenedor;

}());

function crearTarea()
{
	let fecha1 = new Date(2019, 0, 25);
	let fecha2 = new Date(2020, 0, 25);
	let fecha3 = new Date(2021, 2, 10);
	let fecha4 = new Date(2022, 5, 15);

	let tarea1 = new Tarea(4, fecha1, fecha2, "Primera tarea", 10, null); //crear objeto
	let tarea2 = new Tarea(5, fecha3, fecha4, "Segunda tarea", 20, null);

	let contenedor = new Contenedor();

	contenedor.addTarea(tarea1);
	contenedor.addTarea(tarea2);

	alert(contenedor.getTareaPorId(4).getNombre());
	alert(contenedor.getTareaPorIndice(1).getNombre());
}