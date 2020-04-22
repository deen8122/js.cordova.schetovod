var __view  = null;
var __data = null;
var isInput = false;
var __electvars = {};

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady () {
    document.addEventListener('hidekeyboard', onKeyboardHide, false);
    document.addEventListener('showkeyboard', onKeyboardShow, false);
    document.addEventListener("backbutton", onBackKeyDown, false);
}


function onBackKeyDown() {
    if(isInput){
        isInput= false;
        return false;
    }else {
        $('.back-btn').click();
        return true;
    }
    // Handle the back button
}
function onKeyboardHide() {
    
    //console.log('onKeyboardHide');
}

function onKeyboardShow() {
    //console.log('onKeyboardShow');
}


(function($, window) {$(init);}(jQuery, window));



/*
 * ИНИЦИАЛИЗАЦИЯ ПАРАМЕТРОВ И ПРИЛОЖЕНИЯ
 */
function init(){
    console.log('init');
    $('input').click(function(){isInput = true})
    FastClick.attach(document.body);
    $.mobile.autoInitializePage = false;
    $.mobile.defaultPageTransition = 'none';
     $.mobile.touchOverflowEnabled = false;
    __data = new DB();
    __data.SQL('CREATE TABLE IF NOT EXISTS DATA (id unique, data TEXT,date DATE,type TEXT)');        
     $( "#raschet" ).on( "pagebeforeshow", function( event ) { } )
}


function RaschetElectro(){
    var tarif1 = $('#tarif-elec-1').val();
    var tarif2 = $('#tarif-elec-2').val();
     if(tarif1==''){
        alert('Укажите тариф');
        return false;
    }
    tarif2 = '0.'+tarif2;
    tarif2 = parseFloat(tarif2);
    tarif1 = parseFloat(tarif1);
   
    var tarif = tarif1+1*tarif2;
     if(p_A1==''){
        alert('Укажите показание!');
        return false;
    }
    
    var p_A1 = $('#p_a-elec-1').val();
    var p_A2 = $('#p_a-elec-2').val();
        p_A2 = '0.'+p_A2;
        p_A2 = parseFloat(p_A2);
        p_A1 = parseFloat(p_A1);
    var pA = p_A1+1*p_A2;
    
   
    var p_B1 = $('#p_b-elec-1').val();
         if(p_B1==''){
        alert('Укажите показание!');
        return false;
    }
    if(p_A1 == p_B1){
        
         alert('Показания одинаковые!');
         return false;
    }
    var p_B2 = $('#p_b-elec-2').val();
        p_B2 = '0.'+p_B2;
        p_B2 = parseFloat(p_B2);
        p_B1 = parseFloat(p_B1);
    
    var pB = p_B1+1*p_B2;
    var ras =  Math.abs(pB - pA);
    
    var summa = tarif*ras;
    ras = Math.ceil(ras*100)/100;
    $('#itog-summa').html(summa.toFixed(2));
    $('#itog-tarif').html(tarif);
    $('#itog-pa').html(pA);
    $('#itog-pb').html(pB);
    $('#itog-ras').html(ras);
    var date = $('#date-elec').val();
    if(date==''){
         var now = new Date();
        date = now.getDate()  + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
    }
     __electvars ={ras:ras,tarif:tarif,summa:summa.toFixed(2),pA:pA,pB:pB,date:date};
    $('#pre-reaschet').show(500);
    $('html, body').animate({ scrollTop: $('#pre-reaschet').offset().top-100 }, 500); // анимируем скроолинг к элементу scroll_el
}





/*
 * 
 * @returns {undefined}
 * Сохранение данных
 */
function ElectroSaveData(){
    alert('Данные сохранены.');
    $('#pre-reaschet').hide(500);
    $('#p_a-elec-1').val( $('#p_b-elec-1').val() );
    $('#p_a-elec-2').val( $('#p_b-elec-2').val() );
    window.localStorage.setItem(idtxtCurrent+"tarif", __electvars.tarif);
    window.localStorage.setItem(idtxtCurrent+"pb", __electvars.pB);
    __data.insertData({
        type:idtxtCurrent,
        data:__electvars.tarif+'|'+__electvars.pA+'|'+__electvars.pB+'|'+__electvars.ras+'|'+__electvars.summa,
        date:__electvars.date},function(){ UpdateTable(1)});
    
}



var idtxtCurrent = '';

/*
 * 
 * -----------------------------------------------------------------------------
 */
function StartRaschet(idtxt){
    idtxtCurrent = idtxt;
    var obj = {idtxt:idtxtCurrent};
    var title = '';
    var tarifizmerenie = '';
    switch(idtxtCurrent){
        case "svet":           
            obj.tarif = '2.15';
            title = 'Электроэнергия';
            tarifizmerenie = 'руб./кВт*ч';
            $('#primer-kak').show();
            break;
        case "gas":           
            obj.tarif = '6.72';
            title = 'Газ';
            tarifizmerenie = 'руб./м3';
            $('#primer-kak').hide();
             $('.izmerenie').html('м3');
            break;
        case "hvoda":           
            obj.tarif = '20.00';
            title = 'Холодная вода';
            tarifizmerenie = 'руб./м3';
            $('#primer-kak').hide();
            $('.izmerenie').html('м3');
            break;
        case "gvoda":           
            obj.tarif = '20.00';
            title = 'Горячая вода';
            tarifizmerenie = 'руб./м3';
            $('#primer-kak').hide();
            $('.izmerenie').html('м3');
            break;
           case "kanal":           
            obj.tarif = '50.00';
            title = 'Канализация';
            tarifizmerenie = 'руб./м3';
            $('#primer-kak').hide();
            $('.izmerenie').html('м3');
            break;
        default: 
            alert('Не задан идетификатор обьекта');
            return false;
            break
        
    }
    //ЗАГОЛОВОК
    $('#raschet-h2').html(title);    
    $('#tarif-izmerenie').html(tarifizmerenie);
    //ТАРИФ
    var tarif =  window.localStorage.getItem(idtxtCurrent+"tarif");
    if(tarif == undefined){
        tarif = obj.tarif;
    }
     console.log(tarif);
         tarif = tarif.split('.');
         $('#tarif-elec-1').val(tarif[0]);
         $('#tarif-elec-2').val(tarif[1]);
     //ПОКАЗАНИЯ
    var pb =  window.localStorage.getItem(idtxtCurrent+"pb");
      console.log(pb);
     if(pb!=undefined){
         pb = pb.split('.');
          console.log(pb);
         if(pb[0]==''){
             pb[0] = pb;
         }
          if(pb[1]==null){
             pb[1] = 0;
         }
         $('#p_a-elec-1').val(pb[0]);
         $('#p_a-elec-2').val(pb[1]);
         $('#p_b-elec-1').val(pb[0]);
         $('#p_b-elec-2').val(pb[1]);

     }
    //УСТАНОВКА ДАТЫ
    var now = new Date();
    var month =now.getMonth()+1;
    if(month<10)month='0'+month;
    var   date =now.getFullYear()+'-'+ month + '-'+ now.getDate()  ;
    $('#date-elec').val(date);
    UpdateTable();
     
}
//------------------------------------------------------------------------------

function UpdateTable(mark){
    
    __data.getData(idtxtCurrent,function(arr){
       // alert('ElectroUpdateTable callback');
       // $('#electrotable').append('l=');
        //alert(arr[0].data);
       var tr = '<table  class="table-stroke my-table">';
       var data = '';
       tr+='<tr class="th">';
           tr+='<td>N</td>';
           tr+='<td>тариф</td>';
           tr+='<td>показ.</td>';
          // tr+='<td>разн.</td>';
           tr+='<td>сумма.</td>';
           tr+='<td>дата</td>';
           tr+='</tr>';
       for(var i = 0; i < arr.length; i++){
           data = arr.item(i).data;
           data = data.split('|');
           tr+='<tr>';
           tr+='<td>'+(i+1)+'</td>';
           tr+='<td>'+data[0]+'</td>';
           tr+='<td>А:'+data[1]+'<br>B:'+data[2]+'<br>&#916;:'+data[3]+'</td>';
          // tr+='<td>'+data[3]+'</td>';
            tr+='<td>'+data[4]+'</td>';
           tr+='<td>'+arr.item(i).date+'</td>';
           tr+='</tr>';
       }
       tr+='</table>';
      // console.log(tr);
         $('#electrotable').html(tr);
         if(mark==1){
             $('.my-table tr').eq(1).css('color','red');
         }
          //alert();
    })
   // $('#electrotable').append('ElectroUpdateTable callback2');
    
}








































//-------------------------------------------------------------------------------





function ElectroUpdateTable(mark){
    
    __data.getData('elect',function(arr){
       // alert('ElectroUpdateTable callback');
       // $('#electrotable').append('l=');
        //alert(arr[0].data);
       var tr = '<table  class="table-stroke my-table">';
       var data = '';
       tr+='<tr class="th">';
           tr+='<td>N</td>';
           tr+='<td>тариф</td>';
           tr+='<td>показ.</td>';
           tr+='<td>разн.</td>';
           tr+='<td>сумма.</td>';
           tr+='<td>дата</td>';
           tr+='</tr>';
       for(var i = 0; i < arr.length; i++){
           data = arr.item(i).data;
           data = data.split('|');
           tr+='<tr>';
           tr+='<td>'+(i+1)+'</td>';
           tr+='<td>'+data[0]+'</td>';
           tr+='<td>А:'+data[1]+'<br>B:'+data[2]+'</td>';
           tr+='<td>'+data[3]+'</td>';
            tr+='<td>'+data[4]+'</td>';
           tr+='<td>'+arr.item(i).date+'</td>';
           tr+='</tr>';
       }
       tr+='</table>';
      // console.log(tr);
         $('#electrotable').html(tr);
         if(mark==1){
             $('.my-table tr').eq(1).css('color','red');
         }
          //alert();
    })
   // $('#electrotable').append('ElectroUpdateTable callback2');
    
}



/*
 * Установка параметров!
 */
function onPageRaschet(id){
    $('#primer-kak').show();
     if(id==null)id="electro";
     // ИНИЦИАЛИЗАЦИЯ ЭЛЕКТРО ЭНЕРГИИ
     var electrotarif =  window.localStorage.getItem("electrotarif");
     if(electrotarif!=undefined){
         electrotarif = electrotarif.split('.');
         $('#tarif-elec-1').val(electrotarif[0]);
         $('#tarif-elec-2').val(electrotarif[1]);
     }
      var electropb =  window.localStorage.getItem("electropb");
      console.log(electropb);
     if(electropb!=undefined){
         electropb = electropb.split('.');
          console.log(electropb);
         if(electropb[0]==''){
             electropb[0] = electropb;
         }
          if(electropb[1]==null){
             electropb[1] = 0;
         }
         $('#p_a-elec-1').val(electropb[0]);
         $('#p_a-elec-2').val(electropb[1]);
         $('#p_b-elec-1').val(electropb[0]);
         $('#p_b-elec-2').val(electropb[1]);

     }
    console.log('onPageRaschet');
    $('#raschet-h2').html('Электроэнергия');
       var now = new Date();
    var month =now.getMonth()+1;
    if(month<10)month='0'+month;
     var   date =now.getFullYear()+'-'+ month + '-'+ now.getDate()  ;
    // alert(date);
    $('#date-elec').val(date);
    ElectroUpdateTable();
}


