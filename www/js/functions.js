function initDB() {
        var localData = JSON.parse(localStorage.getItem('ARR_DATA'));
        if(localData == null){
          
        }else {
            $.each(localData, function(key, value){ARR_DATA[ key ] = value;});
        }
    }
    
  function OpenPage(page){
        $.ajax({
            type: 'GET',
            url: page,
            dataType: "text",
            success: function(jsonText) {
                $('#default_content').html(jsonText);
            },
            error: function(xhr, textStatus, errorThrown) {
                //l(errorThrown);
            }
        });
    }	
/*
 *Выбор фото по камере
 */
function getImageCamera(){
    navigator.camera.getPicture(SetImage, function(message) {
        //alert('Отмена');
        },{
            quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: 1
        }
        );
}
// из галереи
function getImageGallery(){
    navigator.camera.getPicture(SetImage, function(message) {
        //alert('Отмена');
        },{
            quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
        );
}

function uploadPhoto(imageURI,win,fail) {
	
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";
 
    var params = new Object();
    params.devicename = device.name;
    params.devicemodel = device.model;
    params.deviceplatform = device.platform;
    params.deviceuuid = device.uuid;
 
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI,  SITE+'?api=send_img&', win, fail, options);
}


















function getDeviceParam() {
        var element = document.getElementById('deviceProperties');
        element.innerHTML = 'Device Name: '     + device.name     + '<br />' +
                            'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />';
    }

