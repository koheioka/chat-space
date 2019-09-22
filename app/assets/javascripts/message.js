$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="feature__body--right-center-comment">
                  <div class="feature__body--right-center-comment-box">
                    <div class="feature__body--right-center-comment-box-member">
                      ${message.user_name}
                    </div>
                    <div class="feature__body--right-center-comment-box-date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="feature__body--right-center-comment-message">
                    <p class="feature__body--right-center-comment-message-text">
                      ${content}
                    </p>
                    ${image}
                  </div>
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.feature__body--right-center').append(html)
      $("#new_message")[0].reset();
      $('.feature__body--right-center').animate({ scrollTop: $('.feature__body--right-center')[0].scrollHeight});
      return false
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.feature__body--right-bottom-box-text-send').prop('disabled', false);
    })
  })
});