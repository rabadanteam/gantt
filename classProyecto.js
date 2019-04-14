const Proyecto = (function()
{
	const _arrayIds = new WeakMap();

	class Proyecto
	{
		constructor()
		{
			let array = [];

			_arrayIds.set(this,array);
		}

		createHTMLTarea(_id,_nombre,_ava,_col)
		{
			let avance = " "+_ava+"% ";

			if (avance.length<6) 
			{
				for (var i = 0; avance.length < 6; i++) {
					avance = "_"+avance;
				}
			}

			/*
			======================================================
				Creamos los atributos de la tarea con sus 
				respectivos valores
			======================================================
			*/

			//== Creamos la tarea para la interfaz ==
			let _tarea = document.createElement("li");
			_tarea.setAttribute("id",_id);
			_tarea.setAttribute("class","tareas");

			//== Creamos el boton para mostrar u ocultar los hijos ==
			let t_hM = document.createElement("div");
			t_hM.setAttribute("class","buton");
			let t_hM_in = document.createElement("input");
			t_hM_in.setAttribute("type","button");
			t_hM_in.setAttribute("value","+");
			t_hM_in.setAttribute("name","plus");
			t_hM.appendChild(t_hM_in);

			//== Creamos el nodo para mostrar el id ==
			let t_id = document.createElement("div");
			t_id.setAttribute("class","t_id");
			let t_id_cont = document.createTextNode(_id);
			t_id.appendChild(t_id_cont);
			t_id.appendChild(t_hM);

			//== Creamos el nodo para mostrar el nombre ==
			let t_nom = document.createElement("div");
			t_nom.setAttribute("class","t_nom");
			let t_nom_cont = document.createTextNode(_nombre);
			t_nom.appendChild(t_nom_cont);

			//== Creamos el nodo para mostrar el tipo ==
			let t_tip = document.createElement("div");
			t_tip.setAttribute("class","t_tip");
			let t_tip_cont = document.createTextNode("-");
			t_tip.appendChild(t_tip_cont);

			//== Creamos el nodo para mostrar la Fecha de  Inicio ==
			let t_fIn = document.createElement("div");
			t_fIn.setAttribute("class","t_fIn");
			let t_fIn_inp = document.createElement("input");
			t_fIn_inp.setAttribute("type","text");
			t_fIn_inp.setAttribute("name","fecha");
			t_fIn_inp.setAttribute("onclick","");
			t_fIn.appendChild(t_fIn_inp);

			//== Creamos el nodo para mostrar la Fecha de Fin ==
			let t_fFi = document.createElement("div");
			t_fFi.setAttribute("class","t_fFi");
			let t_fFi_inp = document.createElement("input");
			t_fFi_inp.setAttribute("type","text");
			t_fFi_inp.setAttribute("name","fecha");
			t_fFi_inp.setAttribute("onclick","");
			t_fFi.appendChild(t_fFi_inp);

			//== Creamos el nodo para mostrar el tiempo restante ==
			let t_dRe = document.createElement("div");
			t_dRe.setAttribute("class","t_dRe");
			let t_dRe_cont = document.createTextNode("-");
			t_dRe.appendChild(t_dRe_cont);

			//== Creamos el nodo para mostrar el boton de agregar hijo ==
			let t_but = document.createElement("div");
			t_but.setAttribute("class","t_but");
			let t_but_in = document.createElement("input");
			t_but_in.setAttribute("type","button");
			t_but_in.setAttribute("value","Agregar hijo");
			t_but.appendChild(t_but_in);

			/*
			======================================================
				Creamos el nodo t_ava que guardara y mostrara los 
				avances asignados
			======================================================
			*/
			let t_ava = document.createElement("div");
			t_ava.setAttribute("class","t_ava");
			t_ava.setAttribute("style","display: unset;");

			//== Creamos el boton que aumentara el avance ==
			let t_ava_in = document.createElement("input");
			t_ava_in.setAttribute("type","button");
			t_ava_in.setAttribute("value","+");
			t_ava_in.setAttribute("name","plus");

			//== Creamos el contenedor que tendrá la barra ==
			let t_ava_bar = document.createElement("div");
			t_ava_bar.setAttribute("id","myProgress_"+_id);
			t_ava_bar.setAttribute("style","width: 6%; background-color: #ddd;"+
				"border-color: #ddd; display: inline-block;");

			//== Creamos la barra de color que aumentara ==
			let t_ava_bar_pro = document.createElement("div");
			t_ava_bar_pro.setAttribute("id","myBar_"+_id);

			let valor0 = new String(parseInt(_ava)+"%");
			console.log(valor0);

			t_ava_bar_pro.setAttribute("style","right: 90px; width: "+valor0+
				";height:  25px; background-color:"+_col+
				"; border-color: transparent;");

			//== Creamos el contenedor que muestra el avance en texto ==
			//let t_ava_txt = document.createElement("div");
			//t_ava_txt.setAttribute("class","avance");
			let t_ava_cont = document.createTextNode(avance);
			
			//== Asignamos los hijos correspondientes de los contenedores avace ==
			t_ava.appendChild(t_ava_in);
			t_ava.appendChild(t_ava_cont);
			//t_ava_txt.appendChild(t_ava_cont);
			t_ava.appendChild(t_ava_bar);

			//=====================================================
			//	Asignamos los correspondientes hijos, partiendo
			//	del contenedor principal al cual le asignamos 
			//	la tarea creada para despues a ese nodo tarea
			//	asignarle los hijos que son sus atributos
			//=====================================================

			let _cont = document.getElementById('contenedor');
			_cont.appendChild(_tarea);

			_tarea.appendChild(t_id);
			_tarea.appendChild(t_nom);
			_tarea.appendChild(t_tip);
			_tarea.appendChild(t_fIn);
			_tarea.appendChild(t_fFi);
			_tarea.appendChild(t_dRe);
			_tarea.appendChild(t_but);
			_tarea.appendChild(t_ava);
			t_ava.appendChild(t_ava_bar);
			t_ava_bar.appendChild(t_ava_bar_pro);

			console.log("EPAsi");
		}

		getIds()
		{
			return _ids.get(this);
		}


	}

	return Proyecto;
}());