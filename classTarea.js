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
	const _color = new WeakMap();

	class Tarea
	{
		constructor(id,nombre, avance, predecesor,fechaInicio0,fechaTermino0, color)
		{
			_id.set(this, id);
			_nombre.set(this, nombre);
			_avance.set(this, avance);
			_prdecesor.set(this, predecesor);
			_padre.set(this, null);
			_color.set(this,color);

			let array = [];
			_hijos.set(this, array);

			let _fIn = new Date(fechaInicio0);
			let _fFi = new Date(fechaTermino0);

			_fechaInicio.set(this,_fIn);
			_fechaTermino.set(this,_fFi);

			if(_fIn.getFullYear() == _fFi.getFullYear() && 
				_fIn.getMonth() == _fFi.getMonth() &&
				_fIn.getDate() == _fFi.getDate())

				_tipo.set(this, "Hito");

			else
				_tipo.set(this, "Tarea");


		}

		getId()
		{
			return _id.get(this);
		}

		getColor()
		{
			return _color.get(this);
		}

		getFechaInicio()
		{
			let dia = _fechaInicio.get(this).getDate();
			let mes = _fechaInicio.get(this).getMonth();
			let anio = _fechaInicio.get(this).getFullYear();

			let fechaCom = mes + "/" + dia + "/" + anio;
			return fechaCom;
		}

		getFechaTermino()
		{
			let dia = _fechaTermino.get(this).getDate();
			let mes = _fechaTermino.get(this).getMonth();
			let anio = _fechaTermino.get(this).getFullYear();

			let fechaCom = mes + "/" + dia + "/" + anio;

			return fechaCom;		
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
			let tipo = _tipo.get(this);
			console.log(tipo);

			if(tipo == 'Agrupador')
			{
				let array = _hijos.get(this);
				let duracionTotal = 0;
				let diasAvanzados = 0;

				for(let i = 0; i < array.length; i++)
				{
					duracionTotal += array[i].getDuracion();
					diasAvanzados += array[i].getDuracion() * array[i].getAvance() / 100;
				}
				avance = parseInt(avance);
				let aux = (diasAvanzados / duracionTotal) * 100;
				_avance.set(this, parseInt(avance+aux));
				alert(parseInt(avance+aux));
			}

			_avance.set(this, avance);
		}

		setPredecesor(id)
		{
			_prdecesor.set(this, id);
		}

		setTipo(tipo0)
		{
			_tipo.set(this,tipo0);
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

		getDuracion()
		{
			let n = 0;
			let diasRes = 0;
			let aniosResD = 0;
			let mesesResD = 0;

			//Verificamos si el año de la fecha Inicial es el mismo de la fecha Termino 
			if(_fechaInicio.get(this).getFullYear() != _fechaTermino.get(this).getFullYear())
			{
				//Si no es el mismo año, se resta la Termino a la Inicial y lo guardamos
				let aniosRes = _fechaTermino.get(this).getFullYear() - _fechaInicio.get(this).getFullYear();
				aniosResD = aniosRes * 365;
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

				mesesResD = mesesRes * 30;	
			}

			//Verificamos si el dia de la fecha Inicial es el mismo de la fecha Termino
			if (_fechaInicio.get(this).getDate() != _fechaTermino.get(this).getDate()) 
			{
				//Si no es el mismo dia, se resta la Termino a la Inicial y lo guardamos
				diasRes = _fechaTermino.get(this).getDate() - _fechaInicio.get(this).getDate();
				
				//si es negativo, lo hacemos positivo
				if (diasRes<0) 
				{
					diasRes = diasRes * (-1);
				}	
			}

			return aniosResD+mesesResD+diasRes;
		}

		getTiempoRestante()
		{
			let n = 0;
			let diasRes = 0;
			let aniosResD = 0;
			let mesesResD = 0;
			let f = new Date();

			//Verificamos si el año de la fecha Inicial es el mismo de la fecha actual
			if(_fechaInicio.get(this).getFullYear() <= f.getFullYear())
			{
				//Si no es el mismo año, se resta la Termino a la Inicial y lo guardamos
				let aniosRes = _fechaTermino.get(this).getFullYear() - f.getFullYear();
				aniosResD = aniosRes * 365;
			}

			//Verificamos si el mes de la fecha Inicial es el mismo de la fecha Termino 
			if (_fechaInicio.get(this).getMonth() <= f.getMonth()) 
			{
				//Si no es el mismo mes, se resta la Termino a la Inicial y lo guardamos
				let mesesRes = _fechaTermino.get(this).getMonth() - f.getMonth(); 
				
				//si es negativo, lo hacemos positivo
				if (mesesRes<0) 
				{
					mesesRes = mesesRes * (-1);
				}

				mesesResD = mesesRes * 30;	
			}

			//Verificamos si el dia de la fecha Inicial es el mismo de la fecha Termino
			if (_fechaInicio.get(this).getDate() <= f.getDate()) 
			{
				//Si no es el mismo dia, se resta la Termino a la Inicial y lo guardamos
				diasRes = _fechaTermino.get(this).getDate() - f.getDate();
				
				//si es negativo, lo hacemos positivo
				if (diasRes<0) 
				{
					diasRes = diasRes * (-1);
				}	
			}

			if ((aniosResD+mesesResD+diasRes) == 0) 
			{
				return "-";
			}

			else
				return aniosResD+mesesResD+diasRes;
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
