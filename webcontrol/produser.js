;var produser = ( function(){
  'use strict'
  function produser(){
    if (produser.instance_) return produser.instance_; // sngltn
    //produser.instance_ = this;
    produser.prototype.about = "digital interface control musical instrument and mediadata, based on tracker playing and communicate over midi";
    // vars for data
    //produser.data = null; // data for playing
    produser.data = JSON.parse('[{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2,"5":5}},{"track":{"1":1,"2":2}},{"track":{"1":1,"2":2}},{"track":{"1":1,"2":2}},{"track":{"1":1,"2":2}},{"track":{"1":1,"2":2}}]'); // data for playing

    // vars for visualisation

    window.onload = function(){
      produser.createVisual();
      produser.loadTrackerPan();
    }
    console.log("produser is loaded");
  }

  produser.params = {
    bpm : 120,      // beat per min
    frame : 0,      // curent line
    fpsmb : 0,      // [piece of note]
    delay : 0
  };

  produser.lengthnote = {
    1 : 1,
    2 : 0.5,
    4 : 0.25,
    8 : 0.125,
    16 : 0.0625,
    32 : 0.03125,
    64 : 0.015625,
    128 : 0.0078125
  };

  produser.createVisual = function(){
    produser.setStyleWindow();
    produser.createWindow();
    // control elements
    produser.createBPMinp();
    produser.createTrackerPan();
  }

  produser.setStyleWindow = function(){
    //document.getElementsByTagName('html').style.cssText += 'color:red;background-color:yellow';
    document.head.insertAdjacentHTML("beforeend",
      `<style>
        html,body{
          width:100%;
          height:100%;
          margin:0;
          padding:0;
          position:absolute;
          color:white;
          background:#08071f;
        }
        table {
          border: 2px solid #ffe200;  /* граница всей таблицы */
          text-align:center;
        }
        tr {
          border: 1px solid #ccc;  /* границы между строками */
        }
        tr:nth-child(even) { background-color: #333452; }
        tr:nth-child(odd) { background-color: #474872; }
        /*tr:hover:nth-child(even) { background-color: #3334FF; }*/
        tr:hover { background-color: #018190; }

        td, th {
          border: 1px solid transparent;
        }
        th{
          padding: 3px 10px;
          background:#9b0000;
          position: -webkit-sticky;
          position: sticky;
          top: 0;
        }

       </style>`);
    //document.body.style.cssText += "radial-gradient(at center bottom, rgb(108 3 53) 0%, rgb(9, 10, 15) 100%);";
    //document.body.style.cssText += '';


  }

  /* FUNC of Visualation of player*/
  produser.createWindow = function(){
    let p = document.createElement("div");
    p.style.cssText = "";
    p.id = "produser";
    p.style.cssText += '';
    document.body.append(p);
  }

  produser.createBPMinp = function(){
    let p = document.createElement("div");
    p.style.cssText = "";
    p.id = "panelBPM";
    // <input type="number" id="quantity" name="quantity" min="1" max="5">
    let i = document.createElement('input');
    i.setAttribute('type',"number");
    i.setAttribute("min","10");
    i.setAttribute("max","300");
    i.style.cssText += 'display:inline;margin:1%;';
    p.append(i);
    i = document.createElement('div');
    i.innerHTML ='BPM';
    i.style.cssText += 'display:inline; margin:1%;';
    p.append(i);
    p.style.cssText += "display:inline;margin:1%;";
    document.getElementById("produser").append(p);
  }

  produser.createTrackerPan = function(){
    let p = document.createElement("div");
    p.id = "TrackerPan";
    document.getElementById("produser").append(p)
  }
  /* end FUNC of Visualation of player */

  /* func of tracking player */
  produser.loadTrackerPan = function(){
    let data = produser.data;// || openFile()
    let len  = data.length;

    let numbline = 0;

    let table = document.createElement('TABLE');
    let tBody = document.createElement('TBODY');

    // header of table
    let lenl = Object.keys(data[0]['track']).length
    for (let k = 0; k < lenl; k++){
      let th = document.createElement('th');
      let txt = '';
      if(k == 0) { txt = 'line'; }
      else if (k == 1) { txt = 'control'; }
      else { txt = 'channel '+ (k-2); }
      th.appendChild(document.createTextNode(txt))
      table.appendChild(th);
    }
    //
    //body
    for(let i = 0; i < len; i++){   // line
      let row = table.insertRow();
      let datl =  data[i];
      let lenl = Object.keys(datl['track']).length

      for (let k = 0; k < lenl; k++){    // cell
        let td = row.insertCell();
        td.appendChild(document.createTextNode(numbline));
      }
      //table.appendChild(tBody);
      numbline++;
    }

    document.getElementById("TrackerPan").appendChild(table);
  }
  /* end func of tracking player */

  /* FUNC of PLAYER*/
  produser.play = function(){
    //produser.status = 'play';

    produser.timerId = setInterval(function() {
      //if(produser.status == 'play'){

      produser.line++;
      //}
    }, produser.params.delay);
  }

  produser.stop = function(){
    produser.line = 0;
    clearInterval(produser.timerId);
  }
  produser.pause = function(){
    clearInterval(produser.timerId);
  }
  /* end FUNC of PLAYER*/

  /*  MATH  */
  produser.__getTimePerFrame = function(){
    //produser.params.delay = ( (4 * 60000) / produser.params.bpm ) * produser.params.fpsmb
    //return produser.params.delay;
    return ( (4 * 60000) / produser.params.bpm ) * produser.params.fpsmb
  }
  /*  end MATH  */

  /* some function */
  produser.__updInputData = function(){

  }

  produser.sendData = function(){return 1;}


  /* end  some function */

  /* FUNCTIONS for Clip track */
  produser.showElement   = function(){return 1;}
  produser.showScene     = function(){return 1;}
  produser.hideElement   = function(){return 1;}
  produser.hideScene     = function(){return 1;}
  produser.deleteElement = function(){return 1;}
  produser.deleteScene   = function(){return 1;}
  /* end FUNCTIONS for Clip track */


  return produser;
} .call());
new produser();
