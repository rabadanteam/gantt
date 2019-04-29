const Proyecto = (function()
{
	const _ids = new WeakMap();

	class Proyecto
	{
		constructor()
		{
			let u_id = 0;

			_ids.set(this,u_id);
		}

		createHTMLTarea(_padre,arg_tarea)
		{
			/*
			=====================================================
				Obtenemos los valores de la tarea en el 
				argumento y si es el caso, se obtiene el
				id del padre de la tarea
			=====================================================
			*/

			let _nombre = arg_tarea.getNombre();
			let _ava = arg_tarea.getAvance();
			let _col = arg_tarea.getColor();
			let _fIn = arg_tarea.getFechaInicio();
			let _fFi = arg_tarea.getFechaTermino();
			let _tip = arg_tarea.getTipo();
			let _res = arg_tarea.getTiempoRestante();
			let _pre = arg_tarea.getPredecesor();

			/*
			======================================================
				Obtenemos el id correspondiente del contador 
				para dibujarla a la nueva tarea que se va a 
				crear, aparte de el avance se va a dibujar con
				el "%"  y si hay espacio se agrega un caracter
				para que no se vea feo xD
			======================================================
			*/

			let _id = _ids.get(this); 

			let avance = " "+_ava+"% ";

			/*
			======================================================
				Creamos los atributos de la tarea con sus 
				respectivos valores
			======================================================
			*/

			//== Creamos la tarea para la interfaz ==
			let _tarea = document.createElement("li");
			_tarea.setAttribute("id",_id);
			_tarea.setAttribute("style","margin-left: 1px;");

			//== Creamos el boton para mostrar u ocultar los hijos ==
			let t_hM = document.createElement("div");
			t_hM.setAttribute("class","buton");
			let t_hM_in = document.createElement("input");
			t_hM_in.setAttribute("type","button");
			t_hM_in.setAttribute("id",_id+"_o");
			t_hM_in.setAttribute("value","-");
			t_hM_in.setAttribute("name","plus");
			t_hM_in.setAttribute("onclick","obtenerPadre(this); ocultaHijos();");
			t_hM.appendChild(t_hM_in);

			//== Creamos el boton para eliminar tarea ==
			let t_del_in = document.createElement("input");
			t_del_in.setAttribute("type","button");
			t_del_in.setAttribute("id",_id+"_d");
			t_del_in.setAttribute("value","X");
			t_del_in.setAttribute("name","plus");
			t_del_in.setAttribute("onclick","eliminarTareas(this)");
			t_hM.appendChild(t_del_in);


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
			t_tip.setAttribute("id","t_tip_"+_id);
			let t_tip_cont = document.createTextNode(_tip);
			t_tip.appendChild(t_tip_cont);

			//== Creamos el nodo para mostrar la Fecha de  Inicio ==
			let t_fIn = document.createElement("div");
			t_fIn.setAttribute("class","t_fIn");
			let t_fIn_txt = document.createTextNode(_fIn);
			t_fIn.appendChild(t_fIn_txt);

			//== Creamos el nodo para mostrar la Fecha de Fin ==
			let t_fFi = document.createElement("div");
			t_fFi.setAttribute("class","t_fFi");
			let t_fFi_txt = document.createTextNode(_fFi);
			t_fFi.appendChild(t_fFi_txt);

			//== Creamos el nodo para mostrar el tiempo restante ==
			let t_dRe = document.createElement("div");
			t_dRe.setAttribute("class","t_dRe");
			let t_dRe_cont = document.createTextNode(_res);
			t_dRe.appendChild(t_dRe_cont);

			//== Creamos el nodo para mostrar el boton de agregar hijo ==
			let t_but = document.createElement("div");
			t_but.setAttribute("class","t_but");
			let t_but_in = document.createElement("a");
			//t_but_in.setAttribute("type","button");
			//t_but_in.setAttribute("value","Agregar hijo");
			t_but_in.setAttribute("href","#popup");
			t_but_in.setAttribute("id",_id+"_p");
			t_but_in.setAttribute("class","popup-link");
			t_but_in.setAttribute("onclick","flagHijo = 1; obtenerPadre(this);");
			let t_but_txt = document.createTextNode("Agregar Hijo");
			t_but.appendChild(t_but_in);
			t_but_in.appendChild(t_but_txt);

			/*
			======================================================
				Creamos el nodo t_ava que guardara y mostrara los 
				avances asignados
			======================================================
			*/

			let t_ava = document.createElement("div");
			t_ava.setAttribute("class","t_ava");
			t_ava.setAttribute("style","display: unset; left: 100px;");

			let span_ava = document.createElement("span");
			span_ava.setAttribute("id","t_ava_"+_id);

			//== Creamos el boton que aumentara el avance ==
			let t_ava_in = document.createElement("input");
			t_ava_in.setAttribute("type","button");
			t_ava_in.setAttribute("onclick","aumentaAvance(this)");
			t_ava_in.setAttribute("value","+");
			t_ava_in.setAttribute("id",_id+"_b");
			t_ava_in.setAttribute("name","plus");

			//== Creamos el contenedor que tendrá la barra ==
			let t_ava_bar = document.createElement("div");
			t_ava_bar.setAttribute("id","myProgress_"+_id);

			//==Sacamos la tarea predecesora==
			let marginNew = 0;
			if (_pre != "") 
			{
				let tareaPre = document.getElementById('myProgress_'+_pre);
				let marginPre = tareaPre.style.marginLeft;
				console.log("MARGEN DEL PREDESOR: "+marginPre);
				marginNew = parseInt(marginPre)+9;
				console.log("nuevo margen mamalon: "+marginNew);
			}
			
			if (_padre == 'contenedor')
			{
				t_ava_bar.setAttribute("style","width: 9%; background-color: #ddd;"+
				"border-color: #ddd; display: inline-block; margin-left: "+marginNew+"%");
			}

			else
			{
				t_ava_bar.setAttribute("style","width: 6%; background-color: #ddd;"+
				"border-color: #ddd; display: inline-block; margin-left: "+marginNew+"%");
			}
			

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
			t_ava.appendChild(span_ava);
			span_ava.appendChild(t_ava_cont);
			//t_ava_txt.appendChild(t_ava_cont);
			t_ava.appendChild(t_ava_bar);

			//=====================================================
			//	Asignamos los correspondientes hijos, partiendo
			//	del contenedor principal al cual le asignamos 
			//	la tarea creada para despues a ese nodo tarea
			//	asignarle los hijos que son sus atributos
			//=====================================================

			let _cont = document.getElementById(_padre);

			if (_padre == 'contenedor') 
			{
				//Va a ser padre
				_tarea.setAttribute("class","tareas");
				_tarea.style.backgroundColor = "#949494";
				_cont.appendChild(_tarea);
				
			}

			else
			{
				//Va a ser hijo
				_tarea.setAttribute("class","tareas_"+_padre);
				_tarea.style.backgroundColor = "#B6B6B6";
				_cont.insertAdjacentElement("afterend",_tarea);
			}
			

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

			let auxId = parseInt(_id) + 1;
			_ids.set(this,auxId);
		}

		getIds()
		{
			return _ids.get(this);
		}


	}

	return Proyecto;
}());