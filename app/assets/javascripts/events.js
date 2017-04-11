var Event = {}
Event.Calender = {
  Setup: {
    full_calender: function(){
      $.LoadingOverlaySetup({
        color: "rgba(0, 0, 0, 0.4)",
      });
      $('#calendar').fullCalendar({
        header:{
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,list'
              },
        droppable: true,
        editable: true,
        eventDrop: function(event, delta, revertFunc){
                    $.LoadingOverlay("show");
                    $.ajax({
                      url: '/events/'+event.id,
                      type: 'PUT',
                      data:  {event: {start_time: event.start.format(),end_time: event.start.format()}},
                      dataType: 'json'});
                      $.LoadingOverlay("hide");
                   },
        loading: function(bool){
          if (bool) {
            $.LoadingOverlay("show");
          }
          else{
            delete progress;
            $.LoadingOverlay("hide");
          }
        },
        eventClick: function(calEvent, jsEvent, view) {
          return false;
        },
        events: '/events.json',
        eventColor: '#378006',
        eventTextColor: '#fff',
        eventLimit: true,
            views: {
            month: {
                eventLimit: 4 // adjust to 6 only for agendaWeek/agendaDay
            }
        },
        eventLimitText: "More"
      });
      $('.fc-day').on('click',function(){
          // alert($(this).data('date'));
      });
    }
  }
}

