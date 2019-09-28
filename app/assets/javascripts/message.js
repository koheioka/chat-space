$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img class="lower-info__image" src="${ message.image }">` : "";
    var html = `<div class="feature__body--right-center-comment" data-message-id=${message.id}>
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
      $('.feature__body--right-center').append(html);
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

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var group_id = $('.top__head--right-group-name').data('group-id');
      var last_message_id = $('.feature__body--right-center-comment:last').data('message-id'); 
      $.ajax({ 
        url: `/groups/${group_id}/api/messages`, 
        type: 'get', 
        dataType: 'json', 
        data: {id: last_message_id} 
      })
      .done(function (messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message)
          $('.feature__body--right-center').append(insertHTML);
          $('.feature__body--right-center').animate({ scrollTop: $('.feature__body--right-center')[0].scrollHeight});
        })
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    };
  }
  setInterval(reloadMessages, 5000);
});