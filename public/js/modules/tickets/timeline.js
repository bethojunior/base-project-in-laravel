$('.tools').tooltip({ boundary: 'window' })
$('#timeline').scrollTop(1000000);

elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'),false);
});
elementProperty.getElement('.hour',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.returnHour(that.getAttribute('id'));
});


elementProperty.addEventInElement('#insert-feedback','onclick',function () {
    let that = this;
    if(document.getElementById('description-timeline').value === '' )
        return swal('Voce precisa inserir uma descrição','','info');

    let formData = new FormData();
    formData.append('ticket_id', document.getElementById('ticket_id').value);
    formData.append('status_ticket_id', document.getElementById('status_tickets_id').value);
    formData.append('description', document.getElementById('description-timeline').value);
    formData.append('user_id', parseInt(document.getElementById('user_id').value));

    TicketController.insertTimeline(formData).then(resolve => {
        if(resolve.status){
            mountListTimeline(resolve.response[0]);
            return SwalCustom.toast('','Mensagem inserida com sucesso','success');
        }
        return swal('','Erro ao inserir mensagem','error');
    })
    document.getElementById('description-timeline').innerHTML = ' ';
    document.getElementById('description-timeline').value = ' ';

});

function mountListTimeline(data) {
    data = data.timeline_ticket;
    elementProperty.getElement('#timeline',these => {
        let content = '';
        data.map(item => {
            let user = item['user'];
            content += `
                    <div class="timeline">
                        <div class="time-label">
                            <span id="{{ $that->created_at }}" class="bg-red date">${Mask.setDateCrazy(item.created_at,false)}</span>
                        </div>
                        <div>
                            <img style="height: 6vw; width: 6vw" class="profile-user-img img-fluid img-circle" src="${PATH_IMAGE+user['picture']}" onerror="this.src = '/assets/images/icons/default.png'" >
                            <div class="timeline-item">
                                <span class="time"><i class="fas fa-clock"></i><label id="{{ $that->created_at }}" class="hour">${Mask.returnHour(item.created_at)}</label> </span>
                                <h3 class="timeline-header"><a href="#">${user.name}</a></h3>
                                <div class="timeline-body">
                                    ${item.description}
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        }).join('')
        these.innerHTML = content;
        $('#timeline').scrollTop(1000000);
    });
}
