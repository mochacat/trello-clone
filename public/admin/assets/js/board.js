$(function () {    
    $('#createBoard').submit(function(e){
        e.preventDefault();
        var board = {
          title : $('input[name=title]').val(),
          description: $('input[name=description]').val()
        };
        
        $.ajax({
          type: 'POST',
          data : JSON.stringify(board),
          contentType: 'application/json; charset=utf8',
          url: '/board'
        }).success(function(res){
          $('.form-group').removeClass('has-error');
          $('.alert-danger').remove();
    
          if (res.errors.length){
            
            res.errors.forEach(function(error, i){
               var input = res.errors[i].param;
               $('input[name='+input+']').parent().parent()
                .addClass('has-error')
                .before('<div class="alert alert-danger fade-in">' + res.errors[i].msg + '</div>');
            });
          } else {
            if (typeof res.redirect == 'string')
              window.location = res.redirect;
          }
        }).fail(function(){
          alert('Error: Cannot create poll.');
        });
      });
        
      var addList = function(e){
        if (e.which == 13 || e.type == 'click'){
        
          $('.add-list').removeClass('has-error');
          $('.add-list').removeClass('has-success');
          
          var board_id = $('input[name="board_id"]').val();
          var list = {
            title : $('.new-list').val()
          };
          $.ajax({
            type: 'POST',
            data : JSON.stringify(list),
            contentType: 'application/json; charset=utf8',
            url: '/board/'+board_id+'/list'
          }).success(function(res){
            if (res.errors){
              $('.add-list').addClass('has-error');
            } else {
            
              //create list
              $('.add-list').addClass('has-success');
              var list = $(newList(res));
              $('.card-columns').append(list);
              
              //scroll to list
              $('html, body').stop().animate({
                  scrollTop: list.offset().top - 160
              }, 400);
            }
          }).error(function(err){
            $('.add-list').addClass('has-error');
          })
        }
      }
      
      $('.btn-list').on('click', addList);
      $('.new-list').on('keypress', addList);
      
      var addCard = function(e){
    
        if (e.which == 13 || e.type == 'click'){
          $(this).closest('.add-card').removeClass('has-error');
          $(this).closest('.add-card').removeClass('has-success');
          
          var board_id = $('input[name="board_id"]').val();
          var list_id = $(this).closest('.add-card').find('input[name="list_id"]').val();
    
          var card = {
            title : $(this).closest('.add-card').find('.new-card').val()
          };
          
          $.ajax({
            context: this,
            type: 'POST',
            data : JSON.stringify(card),
            contentType: 'application/json; charset=utf8',
            url: '/board/'+board_id+'/list/'+list_id+'/card'
          }).success(function(res){
            if (res.errors){
              $(this).closest('.add-card').addClass('has-error');
            } else {
              $(this).closest('.add-card').addClass('has-success');
              var card = newCard(res);
              $(this).closest('.card-block').find('.list-content').prepend(card);
            }
          }).error(function(err){
            $(this).find('.add-list').addClass('has-error');
          })
        }
      }
        
      $('.card-columns').on('click', '.btn-add-card', addCard); 
      $('.card-columns').on('keypress', '.new-card', addCard);
        
      function newList(list){
        var html =  '<div class="card list">';
        
            html += '<div class="card-header">';
            html += '<div class="card-title list-title">' + list.title + '</div>';
            html += '</div>';
            
            html += '<div class="card-block">';
            html += '<div class="list-content"><div class="add-card-group">';
            html += '<div class="input-group form-group add-card">';
            html += '<input class="form-control new-card" name="card" type="text" placeholder="Add new card..">';
            html += '<input type="hidden" name="list_id" value="' + list._id +'">';
            html += '<span class="input-group-btn">';
            html += '<button class="btn btn-primary btn-add-card" type="button">';
            html += '<i class="fa btn-xs fa-pencil-square-o"></i>';
            html += '</button></span>';
            html += '</div></div></div>';
            html += '</div>';
            html += '</div>';
        return html;
      }
      
      function newCard(card){
        var html =  '<div class="list-card btn-primary form-control">';
            html += '<div class="list-card-title">' + card.title + '</div>';
            html += '</div>';
        
        return html;
      }
      
      //its dragging time
      //on draggable, test with new cards
      $('.list-card').draggable({
        connectToSortable: '.list-card',
        helper: function(e){
          var helper = $(this).clone();
          return helper.css({
            width: $(e.target).width()
          });
        },
        appendTo: 'body',
        zIndex: 100,
        start : function(e,ui){
          $(this).css('visibility', 'hidden');
        },
        revert: function(){
          $(this).css('visibility', 'visible');
          return true;
        }
      });
})
