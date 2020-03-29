//selectpicker
$('.selectpicker').selectpicker({
  iconBase: 'fa',
  tickIcon: 'fa-check'
});

//Galleryupload
(() => {
        var fileInput = document.getElementById('image');
        fileInput.onchange = () => {
        $('#submit').disabled = true;
        var maxSize = fileInput.dataset.maxSize;
        const file = fileInput.files[0];
        if(file == null){
        return alert('No file selected.');
        }else{
        if(file.size>maxSize){
            toastr.error('Archivo muy pesado! El peso debe ser menor a 1MB');
            return false;
        }else{
            uploadImage(file, "gallery");
            fileInput.val = "";
        }
    }
  };
})();

//FeaturedImageUpload
(() => {
        var featInput = document.getElementById('uploadfeatured');
        featInput.onchange = () => {
        $('#submit').attr("disabled", "true");
        var maxSize = featInput.dataset.maxSize;
        const file = featInput.files[0];
        if(file == null){
        return alert('No file selected.');
        }else{
            if(file.size>maxSize){
                toastr.errror('Archivo muy pesado! El peso debe ser menor a 1MB');
                return false;
            }else{
                uploadImage(file, "featured");
                featInput.val = "";
            }
        }
    };
})();

function uploadImage(file, type){
  console.log('upload');
  var formdata = new FormData();
  formdata.append("image",file);
  $.ajax({
    url:'/admin/properties/upload-image', 
    data: formdata,
    type: 'POST',
    processData: false, 
    contentType: false,
    success: (data) =>{
      toastr.success("Imagen subida");
      let response = JSON.parse(data);
      $('#submit').removeAttr("disabled");

      if(type === "gallery"){
          appendToGallery(response.fileName);
      }else{
          valueToFeatured(response.fileName);
      }
    },
    error: (data)=>{
      alert("Error al subir imagen");
      $('#submit').removeAttr("disabled");
      console.log(data);
    }
  });
}

function appendToGallery(filename){
    var count = $('#gallery img').length + 1;
    $('#gallery').append(`<div class="col-2" id="imggal${count}"><img id="${filename}" src="/uploads/props/${filename}" height="80px"><button type="button" class="btn btn-danger dltbtn" onclick="deleteImage('${count}')"><i class="fa fa-times"></i></button><input type="hidden" name="imageurl" id="imageurl${count}" value="${filename}"></div>`);
}

function valueToFeatured(filename){
    $('#featured input').val(filename);
    $('#featured img').attr('src', `/uploads/props/${filename}`);
}

function deleteImage(i){
  $('#imggal'+i).remove();
}

function addfeatrow(){
  let i = $('#addfeat').data("count")+1;
  $('#features').append('<div class="form-row" id="ftrow'+i+'"><div class="form-group col-5"><input type="text" class="form-control" name="ftlbl" placeholder="Titulo"></div><div class="col-1 form-group text-center">=</div><div class="col-5 form-group"><input type="text" class="form-control" name="fttxt" placeholder="Valor"></div><div class="col-1 form-group"><button type="button" class="btn btn-danger" onclick="deleterow('+i+')">X</button></div></div>');
  $('#addfeat').data("count", i);
  }

  function deleterow(i){
    $('#ftrow'+i).remove();
  }