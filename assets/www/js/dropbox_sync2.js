var app1 = (function() {

    var w = $("#content").width(),
        h = $("#content").height(),
        localFileFullPath = '',
        is_dropbox_linked=0;

    var listFolder = function() {
        var i,
            l,
            html = "",
            file;
        dropbox.listFolder(app1.path).done(function (files) {
            
            l = files.length;
            if (l > 0) {
                $("#noFiles").hide();
            } else {
                $("#noFiles").show();
            }
            for (i=0; i<l; i++) {
                file = files[i];
              if (file.isFolder) {
                   html += '<li fo="fo">' +
                   '<a href="#' + encodeURIComponent(file.path) + '" class="folder">' +
                   '<img src="img/icon-folder.png" />' +
                    file.path.substr(file.path.lastIndexOf("/") + 1)  + '</a></li>';
              } else {
                   html += '<li fi="fi" onclick="dropbox_sync_read_file()">' +
                   '<a href="#' + encodeURIComponent(file.path) + '" class="file">' +
                   '<img src="img/icon-file.png" />' +
                   file.path.substr(file.path.lastIndexOf("/") + 1)  + '</a></li>';
              }
            }
            $("#fileList").html(html);
            //sort the list now
            var fileList = $('#fileList');
            var folderItems = fileList.children('li[fo="fo"]').get();
            var fileItems = fileList.children('li[fi="fi"]').get();
            fileList.html('');
            sortAndAppendList(folderItems, fileList);
            sortAndAppendList(fileItems, fileList);
            hidelaoder();
        });
    }


    
    /*
    $(window).on('hashchange', function() {
        app1.path = decodeURIComponent(window.location.hash.substr(1));
        $("#path").html(app1.path ? app1.path : "/");
        listFolder();
    });
    
    $(window).on('orientationchange', function(event) {
       setTimeout(function() {
           h = $('#content').height();
           w = $('#content').width();
           $('#image').css({'max-width':w, 'max-height':h});
       }, 300);
       switch(window.orientation) {
         case -90:
         case 90:
            // landscape
            $('#loader').css('left', '90px');
         break; 
         default:
            //portrait
            $('#dropboxView').is(':visible') ? $('#loader').css('left', '60px') : $('#loader').css('left', '70px');
         break; 
      }
    });
    */
    document.addEventListener("deviceReady", function() {   // ready for kickoff
        dropbox.checkLink().done(function(){
            app1.is_dropbox_linked=1;
         }).fail(function(){
            app1.is_dropbox_linked=0;
         });
    });
    
    function sortAndAppendList(items, list) {
       items.sort(function(a, b) {
           return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        });
       $.each(items, function(idx, itm) { 
          list.append(itm); 
       });
    }
    
    
    function showConfirm(message, title, labels, success) {
        navigator.notification.confirm(
            message, // message string
            success, // callback to invoke with index of button pressed
            title,   // title string
            labels   // buttonLabels array
        );
    }
    
    function showLoader() {
        $("#loader").show();
    }
    
    function hideLoader() {
        $("#loader").hide();
    }

    return {
        path:       "/",
        listFolder:   listFolder,
        showLoader:      showLoader,
        hideLoader:      hideLoader
    }
    
}());

// Called from onActivityResult in the app's main activity (dropboxAndroidCordova)
function dropbox_linked() {
         alert("successfully linked");
         app1.is_dropbox_linked=1;
         $("#btn-unlink").show();
         $("#btn-link").hide();
         dropbox.addObserver("/");
}

function dropbox_linked_fail(){	
         app1.is_dropbox_linked=0;
         alert("dropbox linking failed");
}

//Called by observer in DropboxSync plugin when there's a change to the status of background synchronization (download/upload)
function dropbox_onSyncStatusChange(status) {
    status == 'none' ? app1.hideLoader() : app1.showLoader();
}

// Called by observer in DropboxSync plugin when a file is changed
function dropbox_fileChange() {
    app1.showloader();
    app1.listFolder();
}
