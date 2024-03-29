 var copTimeBegan = null,
     copTimeStopped = null,
     copStoppedDuration = 0,
     copStarted = null,
	copBehavior = [],
    copBehavior_two = [];
var objectOne = "";
var objectTwo = "";

function setUpCop() {
 objectOne = document.getElementById("obj_one").value;
 objectTwo = document.getElementById("obj_two").value;
document.getElementById("in_obj_1").innerHTML=objectOne;
document.getElementById("in_obj_1_2").innerHTML=objectOne;
document.getElementById("in_obj_2_2").innerHTML=objectTwo;
document.getElementById("in_obj_2").innerHTML=objectTwo;
 }


 function track_beh_cop(stim) {
         time = document.getElementById("clock-area").innerHTML;
         if (stim == 'center') {
             copBehavior.push({
                 "stim": "center",
                 "time": time
             });
         }
         if (stim == 'inOne') {
             copBehavior.push({
                 "stim": "inOne",
                 "time": time
             });
         }
         if (stim == 'inTwo') {
             copBehavior.push({
                 "stim": "inTwo",
                 "time": time
             });
         }
         for (k = 0; k < copBehavior.join().length; k++) {
             var str = JSON.stringify(copBehavior[k]);
         }

             for (k = 0; k < copBehavior.length - 1; k++) {
             var str = JSON.stringify(copBehavior[k]);
             console.log("copBehavior"+str);
         }
     }

      function track_beh_cop_two(stim) {
         time = document.getElementById("clock-area").innerHTML;
         if (stim == 'centerTwo') {
             copBehavior.push({
                 "stim": "center",
                 "time": time
             });
         }
         if (stim == 'inOneTwo') {
             copBehavior.push({
                 "stim": "inOne",
                 "time": time
             });
         }
         if (stim == 'inTwoTwo') {
             copBehavior.push({
                 "stim": "inTwo",
                 "time": time
             });
         }
         for (k = 0; k < copBehavior_two.join().length; k++) {
             var str = JSON.stringify(copBehavior_two[k]);
         }

             for (k = 0; k < copBehavior_two.length - 1; k++) {
             var str = JSON.stringify(copBehavior_two[k]);
             console.log("copBehavior Two"+str);
         }
     }
 

 function startCop() {
    console.log("Start Called");
     document.getElementById("finish-test").disabled = true;
     document.getElementById("download-csv").disabled = true;
     if (copTimeBegan === null) {
         var myDate = new Date();
         var month = new Array();
         month[0] = "Jan";
         month[1] = "Feb";
         month[2] = "Mar";
         month[3] = "Apr";
         month[4] = "May";
         month[5] = "Jun";
         month[6] = "Jul";
         month[7] = "Aug";
         month[8] = "Sep";
         month[9] = "Oct";
         month[10] = "Nov";
         month[11] = "Dec";
         var hours = myDate.getHours();
         var minutes = myDate.getMinutes();
         var ampm = hours >= 12 ? 'pm' : 'am';
         hours = hours % 12;
         hours = hours ? hours : 12;
         minutes = minutes < 10 ? '0' + minutes : minutes;
         var strTime = hours + ':' + minutes + ampm;
         var srtDate = myDate.getDate() + " " + month[myDate.getMonth()] + " " + myDate.getFullYear() + " " + strTime;
         document.getElementById("date").value = srtDate;
         copTimeBegan = new Date();
     }
     if (copTimeStopped !== null) {
         copStoppedDuration += (new Date() - copTimeStopped);
     }
     copStarted = setInterval(clockRunningCop, 10);
     document.getElementById("startCop").disabled = true;
 }

function clockRunningCop() {
     var currentTime = new Date(),
         timeElapsed = new Date(currentTime - copTimeBegan - copStoppedDuration),
         hour = timeElapsed.getUTCHours(),
         min = timeElapsed.getUTCMinutes(),
         sec = timeElapsed.getUTCSeconds(),
         ms = timeElapsed.getUTCMilliseconds();
     	document.getElementById("clock-area").innerHTML = (min > 9 ? min : "0" + min) + ":" + (sec > 9 ? sec : "0" + sec);
 }


  function stopCop() {
     copTimeStopped = new Date();
     clearInterval(copStarted);
     document.getElementById("finish-test").disabled = false;
     document.getElementById("download-csv").disabled = false;
     document.getElementById("start").disabled = false;

 }

  function in_Object_One() {
     track_beh_cop("inOne");
}

  function in_Object_Two() {
     track_beh_cop("inTwo");
}

 function centerOne() {
     track_beh_cop("center");
}

//Todo: Make a second track beh cop, how should we do exp title

  function in_Object_One_Two() {
     track_beh_cop_two("inOneTwo");
}

  function in_Object_Two_Two() {
     track_beh_cop_two("inTwoTwo");
}

 function centerTwo() {
     track_beh_cop_two("centerTwo");
}



 function finishTestCop() {
    document.getElementById("copParagraphFlags").innerHTML = flags;
    document.getElementById("copResultsHeader").innerHTML=document.getElementById("experiment_title").value+" Results";
    document.getElementById("inOne").innerHTML=objectOne;
    document.getElementById("inTwo").innerHTML=objectTwo;

     var date = "null";
     var female = "null";
     var stud = "null";
     var date = document.getElementById("date").innerHTML;
     var female = document.getElementById("female").innerHTML;
     var stud = document.getElementById("stud").innerHTML;
     var columns = ["inOne", "center", "inTwo"];
    // var resultTable = document.getElementById("coptableresults");
     var resultTable = document.getElementById("copTestBody");
      var resultTableTwo = document.getElementById("copTwoTestBody");

     var numberRows = 0;
     var row;
     var i = 0;
     var j = 0;
     while (j <= copBehavior.length) {
         while (i <= columns.length) {
             if (i == 3 || numberRows == 0) {
                 row = resultTable.insertRow(numberRows);
                 numberRows++;
                 i = 0;
             }
             if (columns[i] == copBehavior[j]['stim']) {
                 var cell = row.insertCell(i);
                 cell.setAttribute('contentEditable', 'true');
                     cell.innerHTML = copBehavior[j]['time'];
                     i++;
                     j++;
                 
             } else {
                 var cell = row.insertCell(i);
                 cell.setAttribute('contentEditable', 'true');
                 cell.innerHTML = "&nbsp";
                 i++;
             }

             console.log("j is" + j + " copBehavior length is " + copBehavior.length);
             if (j == copBehavior.length) {
                 break;
             }
         }
         if (j == copBehavior.length) {
             break;
         }

     }

console.log("FDSDSFDFSDFSDFDS");

    var numberRowsTwo = 0;
     var row;
     var i = 0;
     var j = 0;
     while (j <= copBehavior_two.length) {
         while (i <= columns.length) {
             if (i == 3 || numberRowsTwo == 0) {
                 row = resultTableTwo.insertRow(numberRowsTwo);
                 numberRowsTwo++;
                 i = 0;
             }
             if (columns[i] == copBehavior_two[j]['stim']) {
                 var cell = row.insertCell(i);
                 cell.setAttribute('contentEditable', 'true');
                     cell.innerHTML = copBehavior_two[j]['time'];
                     i++;
                     j++;
                 
             } else {
                 var cell = row.insertCell(i);
                 cell.setAttribute('contentEditable', 'true');
                 cell.innerHTML = "&nbsp";
                 i++;
             }

             console.log("j is" + j + " copBehavior_two length is " + copBehavior_two.length);
             if (j == copBehavior_two.length) {
                 break;
             }
         }
         if (j == copBehavior_two.length) {
             break;
         }

     }

}


            

 function copDownloadCSV() {
     var date = document.getElementById("date").value;
     var female = document.getElementById("female").value;
     var stud = document.getElementById("stud").value;
     var filename = document.getElementById("experiment_title").value;
     var time = document.getElementById("display-area").innerHTML;
     var table = document.getElementById("coptableresults");

     var data = [
      ["Date", " ", date],
         ["Female", " ", female],

         []
     ];

     var csvContent = "data:text/csv;charset=utf-8,";
     data.forEach(function(infoArray, index) {
         dataString = infoArray.join(",");
         csvContent += index < data.length ? dataString + "\n" : dataString;
     });

csvContent+=objectOne+",";
csvContent+="Center,";
csvContent+=objectTwo +", \n";

     // csvContent+="Left,Center,Out, \n"
    var rows = $("#copTestBody > tr");

    console.log(rows.length);
    for (var i = 0; i < rows.length; ++i) {
        var cells = $(rows[i]).find("> td");
        console.log(cells.length);
        for (var j = 0; j < cells.length; ++j) {
            if (j != 0) csvContent += ",";
  
            var str = cells[j].innerHTML;
            str = str.substr(str.indexOf("</b>")+4);
            if (str.charAt(0) == "&")
                str = str.substr(6);
            csvContent += str;
            
        }
        csvContent += "\n";
    }
     var encodedUri = encodeURI(csvContent);
     var link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", filename + "_data.csv");
     document.body.appendChild(link); // Required for FF
     link.click();

 }

  