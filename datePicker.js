var currentYear, currentMonth, currentDay, calendarYear, calendarMonth, startDay, numberOfDays, numberOfRows,sex;
var eventArray = [], firstTime = true, activeTextField;

//Ment to be implemente in the onclick or onfocus of the textfields that will use the datepicker, this function
//controls the rrelationship between the calendar and the diferent textfield it is implemented on, this by
//creating the table the first time a text field is used, and then changing the text field that the dat picker
//will act on
function calendar(atf)
{
	activeTextField = atf;

	if(firstTime)
	{
		firstTime = false;
		buildCalendarTable();
		initCalendar();
		writeCalendar();
		showCalendar();
	}

	else
	{
		var calendarTable = document.getElementById("calendarTable");
		activeTextField.insertAdjacentElement("afterend", calendarTable);
		showCalendar();
	}
}

//Build the structure for the calendar
function buildCalendarTable()
{
	//Creating table
	var calendarTable = document.createElement("TABLE");
	calendarTable.id = "calendarTable";

	//Creating the row that displays the year and huoses the buttons for the prior and next year
	var row = document.createElement("TR");

	var yearDisplay = document.createElement("TH");
	yearDisplay.id = "yearDisplay";
	yearDisplay.colSpan = "5";

	var priorYearImage = document.createElement("IMG");
	var aux0 = document.createTextNode("<");
	//priorYearImage.src = "img/atras.svg";
	var priorYear = document.createElement("TH");
	priorYear.addEventListener("click", priorYearFunction);
	priorYear.appendChild(aux0);

	var nextYearImage = document.createElement("IMG");
	var aux1 = document.createTextNode(">");
	//nextYearImage.src = "img/adelante.svg";
	var nextYear = document.createElement("TH");
	nextYear.addEventListener("click", nextYearFunction);
	nextYear.appendChild(aux1);

	row.appendChild(priorYear);
	row.appendChild(yearDisplay);
	row.appendChild(nextYear);
	calendarTable.appendChild(row);

	//Creating the row that displays the month and houses the buttons for prior and next month
	row = document.createElement("TR");

	var monthDisplay = document.createElement("TH");
	monthDisplay.id = "monthDisplay";
	monthDisplay.colSpan = "5";

	var priorMonthImage = document.createElement("IMG");
	//priorMonthImage.src = "img/atras.svg";
	var priorMonth = document.createElement("TH");
	priorMonth.addEventListener("click", priorMonthFunction);
	priorMonth.appendChild(aux0);

	var nextMonthImage = document.createElement("IMG");
	//nextMonthImage.src = "img/adelante.svg";
	var nextMonth = document.createElement("TH");
	nextMonth.addEventListener("click", nextMonthFunction);
	nextMonth.appendChild(aux1);

	row.appendChild(priorMonth);
	row.appendChild(monthDisplay);
	row.appendChild(nextMonth);
	calendarTable.appendChild(row);

	//Creating the row that shows the day of the week headers
	row = document.createElement("TR");
	
	appendDayOfTheWeek(row, "D");
	appendDayOfTheWeek(row, "L");
	appendDayOfTheWeek(row, "M");
	appendDayOfTheWeek(row, "M");
	appendDayOfTheWeek(row, "J");
	appendDayOfTheWeek(row, "V");
	appendDayOfTheWeek(row, "S");

	calendarTable.appendChild(row);

	appendDayCells(calendarTable);

	row = document.createElement("TR");
	var th = document.createElement("TH");
	th.colSpan = "7";
	th.innerHTML = "Ocultar";
	th.addEventListener("click", hideCalendar);

	row.appendChild(th);
	calendarTable.appendChild(row);

	activeTextField.insertAdjacentElement("afterend", calendarTable);
}

//Takes a tr element and a string and appends a th element with that day to dat tr
function appendDayOfTheWeek(row, day)
{
	var th = document.createElement("TH");
	th.innerHTML = day;
	row.appendChild(th);
}

//takes the table and appends the cells where days are held
function appendDayCells(table)
{
	var row;
	var td;
	for(var i = 0; i < 6; i++)
	{
		row = document.createElement("TR");
		row.colSpan = 7;
		row.id = "row" + i;

		for(var j = 0; j < 7; j++)
		{
			td = document.createElement("TD");
			td.id = (i * 7) + j;
			td.addEventListener("click", selectDate);
			row.appendChild(td);
		}

		table.appendChild(row);
	}
}

//Makes the hole calendar table not visible
function hideCalendar()
{
	document.getElementById("row4").style.display = "";
	document.getElementById("row5").style.display = "";
	document.getElementById("calendarTable").style.display = "none";
}

//Initiates all the parameters necesary to the calendar to the current date
function initCalendar()
{
	var date = new Date();

	currentYear = date.getFullYear();
	currentMonth = date.getMonth();
	currentDay = date.getDate();
	calendarYear = currentYear;
	calendarMonth = currentMonth;
	startDay = getStartDay(currentYear, currentMonth);
	numberOfDays = getDaysPerMonth(currentYear, currentMonth);
	numberOfRows = getNumberOfRows(startDay, numberOfDays);
}

//Using the global parameters alredy set by other functions, writes inside the calendar table the values needed
function writeCalendar()
{
	for(var i = 0; i < 42; i++)
		document.getElementById(i).innerHTML = "";

	document.getElementById("yearDisplay").innerHTML = calendarYear;
	document.getElementById("monthDisplay").innerHTML = monthToString(calendarMonth);

	for(var i = startDay, j = 1; i < (startDay + numberOfDays); i++, j++)
		document.getElementById(i).innerHTML = j;

	for(var i = 0; i < eventArray.length; i++)
	{
		var e = eventArray[i];
		if(e.eventYear == calendarYear && e.eventMonth == calendarMonth)
		{
			document.getElementById(startDay).innerHTML = e.eventDay;
		}
	}
}

//Takes a number from 0 to 11, 0 being january and 11 being december, and returns a string with the name of
//that month
function monthToString(m)
{
	var monthName;

	switch(m)
	{
		case 0: monthName = "Enero"; break;
		case 1: monthName = "Febrero"; break;
		case 2: monthName = "Marzo"; break;
		case 3: monthName = "Abril"; break;
		case 4: monthName = "Mayo"; break;
		case 5: monthName = "Junio"; break;
		case 6: monthName = "Julio"; break;
		case 7: monthName = "Agosto"; break;
		case 8: monthName = "Septiembre"; break;
		case 9: monthName = "Octubre"; break;
		case 10: monthName = "Noviembre"; break;
		case 11: monthName = "Diciembre"; break;
	}

	return monthName;
}

function monthToInt(m)
{
	var monthName;

	switch(m)
	{
		case "Enero": monthName = "01"; break;
		case "Febrero": monthName = "02"; break;
		case "Marzo": monthName = "03"; break;
		case "Abril": monthName = "04"; break;
		case "Mayo": monthName = "05"; break;
		case "Junio": monthName = "06"; break;
		case "Julio": monthName = "07"; break;
		case "Agosto": monthName = "08"; break;
		case "Septiembre": monthName = "09"; break;
		case "Octubre": monthName = "10"; break;
		case "Noviembre": monthName = "11"; break;
		case "Diciembre": monthName = "12"; break;
	}

	return monthName;
}


//Takes two numbers, the fistone is a year using 4 digit format, and the second is a number from 0 to 11,
//0 being january and 11 being december and returns a number from 0 to 6 that representes in which day of
//the week that month of that year started with 0 being sunday and 6 being saturday
function getStartDay(y, m)
{
	var auxYear = y - 2012;
	var leapYears = Math.floor((auxYear + 3)/4);
	var dayOfYear = 0;

	for (var i = 0; i < m; i++)
		dayOfYear += getDaysPerMonth(y, i);

	var totalDays = (auxYear * 365) + leapYears + dayOfYear;

	return totalDays % 7;
}

//Takes two numbers, the fistone is a year using 4 digit format, and the second is a number from 0 to 11,
//0 being january and 11 being december and returns the number of days that month of that year has.
function getDaysPerMonth(y, m)
{
	var n;

	switch(m)
	{
		case 0: n = 31; break;
		case 1:
			if(y % 4 == 0)
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

//Takes two numbers, the first one a number from 0 to 6 that representes in which day of the week that month
//of that year started with 0 being sunday and 6 being saturday, the second, the number of days that month has
//and returns the number of rows it will take to represent that month in the calendar
function getNumberOfRows(s, n)
{
	var end = s + n;

	return Math.floor((end - 1)/7);
}

//Makes the calendar table visible and also shows the minimum number of rows needed to represent the month that
//is currently set
function showCalendar()
{
	var row4 = document.getElementById("row4");
	var row5 = document.getElementById("row5");

	document.getElementById("calendarTable").style.display = "";

	if (numberOfRows == 3)
	{
		row4.style.display = "none";
		row5.style.display = "none";
	}
	else if (numberOfRows == 4)
	{
		row4.style.display = "";
		row5.style.display = "none";
	}
	else
	{
		row4.style.display = "";
		row5.style.display = "";
	}

	var todayCell = document.getElementById(getStartDay(currentYear, currentMonth) + currentDay - 1);

	if(calendarYear == currentYear && calendarMonth == currentMonth)
		todayCell.style.backgroundColor = "rgb(0, 177, 89)";
	else
		todayCell.style.backgroundColor = "";
}

//Sets the parameters of the calendar to the prior month's parameters and then writes the calendar
function priorMonthFunction()
{
	if(calendarMonth == 0)
	{
		calendarMonth = 11;
		calendarYear--;
	}
	else
		calendarMonth--;

	startDay = getStartDay(calendarYear, calendarMonth);
	numberOfDays = getDaysPerMonth(calendarYear, calendarMonth);
	numberOfRows = getNumberOfRows(startDay, numberOfDays);

	writeCalendar();
	showCalendar();
}

//Sets the parameters of the calendar to the next month's parameters and then writes the calendar
function nextMonthFunction()
{
	if(calendarMonth == 11)
	{
		calendarMonth = 0;
		calendarYear++;
	}
	else
		calendarMonth++;

	startDay = getStartDay(calendarYear, calendarMonth);
	numberOfDays = getDaysPerMonth(calendarYear, calendarMonth);
	numberOfRows = getNumberOfRows(startDay, numberOfDays);

	writeCalendar();
	showCalendar();
}

//Sets the parameters of the calendar to the prior year and writes it
function priorYearFunction()
{
	if(calendarYear == 2012)
		alert("No puedes regresar más atras");
	else
	{
		calendarYear--;

		startDay = getStartDay(calendarYear, calendarMonth);
		numberOfDays = getDaysPerMonth(calendarYear, calendarMonth);
		numberOfRows = getNumberOfRows(startDay, numberOfDays);

		writeCalendar();
		showCalendar();
	}
}

//Sets the parameters of the calendar to the prior year and writes it
function nextYearFunction()
{
	calendarYear++;

	startDay = getStartDay(calendarYear, calendarMonth);
	numberOfDays = getDaysPerMonth(calendarYear, calendarMonth);
	numberOfRows = getNumberOfRows(startDay, numberOfDays);

	writeCalendar();
	showCalendar();
}

//Writes the selected day in the selected textField
function selectDate()
{
	var dayContent = this.innerHTML;
	var monthContent = document.getElementById("monthDisplay").innerHTML;
	var monthChido = monthToInt(monthContent);
	var yearContent = document.getElementById("yearDisplay").innerHTML;
	console.log("Wacha-> "+activeTextField.id);

	if(dayContent != "")
	{
		let auxx = new String(monthChido + "/" + dayContent + "/" + yearContent);
		console.log(auxx);
		document.getElementById(''+activeTextField.id).value = auxx;
		hideCalendar();
	}
}