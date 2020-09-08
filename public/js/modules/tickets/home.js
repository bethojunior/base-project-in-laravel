let ticketSelected = '';

elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});

elementProperty.addEventInElement('.show-ticket','onclick',function () {
    let data = JSON.parse(this.getAttribute('data-browse'));
    ticketSelected = data.id;
    document.getElementById('ticket_id').value = data.id;
    $('#modal-ticket').modal('show');
    document.getElementById('modal-title').innerHTML = ` <label>${data.enterprise_name}</label> <label class="badge badge-info">${data.status}</label>`;
    elementProperty.getElement('#modal-body',these => {
        let content = '';
        content = `
            <div class="form-group">
                <input class="form-control" value="${data.title}" readonly>
            </div>
            <div class="form-group">
                <textarea readonly class="form-control">${data.description}</textarea>
            </div>
            <button id="open-ticket" data-browse="${data.id}" class="btn btn-outline-info">Ver timeline</button>
        `;
        these.innerHTML = content;

        elementProperty.addEventInElement('#open-ticket','onclick',function () {
            window.location.href = '/ticket/timeline/'+this.getAttribute('data-browse');
        });

    });
});

elementProperty.addEventInElement('#update-status-ticket','onclick',function () {
    let that = this;
    elementProperty.getElement('.preloader-ticket',these => {
        these.style.opacity = 1;
        that.disabled = true;
    });
    elementProperty.getElement('#status-tests',these => {
        let formData = new FormData();
        formData.append('id', ticketSelected);
        formData.append('status_ticket_id',these.value);
        formData.append('_method','PUT');
        TicketController.updateStatusTicket(formData).then(response => {
            swal('','Status alterado com sucesso','success')
            elementProperty.getElement('.preloader-ticket',these => {
                these.style.opacity = 0;
                that.disabled = false;
            });
            // $('#modal-ticket').modal('close');
        })
    })
})
