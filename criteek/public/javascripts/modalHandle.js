$('#critModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var id = button.data('id')
  $('#id').val(id)
  
  $('#critModal').css('z-index', 1050)
  $('#postModal').css('z-index', 1000)
});

$('#critModal').on('hidden.bs.modal', function (event) {
  $('.modal-backdrop').remove()
  $('#postModal').modal('hide')
});

$('#delete_conf').on('show.bs.modal', function (event) {
  $('#myModal').css('z-index', 1000)
  $('#postModal').css('z-index', 1000)
  $('#critModal').css('z-index', 1000)
  $('#delete_conf').css('z-index', 1050)
  
  var button = $(event.relatedTarget) // Button that triggered the modal
  var id = button.data('id')
  
  $('#delete_data').val(id);
  
});

$('#myModal').on('show.bs.modal', function (event) {
  $('#myModal').css('z-index', 1050)
  $('#postModal').css('z-index', 1000)
  $('#critModal').css('z-index', 1000)
  $('#delete_conf').css('z-index', 1000)
});

$('#postModal').on('show.bs.modal', function (event) {
  $('#myModal').css('z-index', 1000)
  $('#postModal').css('z-index', 1050)
  $('#critModal').css('z-index', 1000)
  $('#delete_conf').css('z-index', 1000)
 
  var button = $(event.relatedTarget) // Button that triggered the modal
  var img = button.data('img') // Extract info from data-* attributes
  var title = button.data('title') 
  var user = button.data('user') 
  var descript = button.data('descript') 
  var question = button.data('question')
  var id = button.data('id')
  
  var crituser = button.data('crituser')
  var arrCritUser = crituser.slice(1, -1).split(':')
  var crit = button.data('crit')
  var arrCrit = crit.slice(1, -1).split(':')
  
  $('.post_btn').data('id',id)
  
  var modal = $(this)
  
  modal.find('.modal-body .pic img').attr('src', img)
  modal.find('.modal-body .details .modal_title').text(title)
  modal.find('.modal-body .details .modal_user').text("by " + user)
  modal.find('.modal-body .details .modal_descript').text(descript)
  modal.find('.modal-body .details .modal_question').text(question)
  
  if (arrCrit.length == 1 && arrCrit[0] == '') {
    $(".crit_post").append('<div class="row tempo text-center"><div class="col-xs-10 col-xs-offset-1"><h5 style="margin-bottom: 0; color: lightgrey; ">No Criteeks Yet =[</h5></div></row>')
  }
  else{
    
    var ct = 0;
    for(var i = 0; i < arrCrit.length; i++) {
      $(".crit_post").append('<div class="col-xs-1 tempo"><i class="fa fa-user-circle-o " style="padding-top: 16px;" aria-hidden="true"></i></div>')
      $(".crit_post").append('<div class="col-xs-11 tempo crit_poster" style"padding-right: 0;"><h6>' + arrCritUser[i] + '</h6></div>')
      $(".crit_post").append('<div class="row tempo"><div class="col-xs-11"><p class="crit_det">' + arrCrit[i] +'</p></div></div>')
      $(".crit_post").append('<hr class="tempo" style="margin-top: 0; margin-bottom: 0;"></hr>')
      ct++;
    }
    
    if(ct >= 3){
      $(".crit_post").append('<div class="col-xs-11 tempo crit_poster" style"padding-right: 0;"><h6>' + " " + '</h6></div>')
      $(".crit_post").append('<div class="row tempo"><div class="col-xs-11"><p class="crit_det">' + " " +'</p></div></div>')
    }
    
  }
  
});

$('#postModal').on('hide.bs.modal', function(event){
  $(".tempo").remove();
  $(".modal_crit").attr('max-height', 300)
});