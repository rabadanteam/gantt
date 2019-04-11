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
