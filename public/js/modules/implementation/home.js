let implementationSelected;

elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'),true);
});

elementProperty.addEventInElement('.implementation','onclick',function () {
    let data = JSON.parse(this.getAttribute('data-browse'));
    implementationSelected = data.id;
    $('#modal-implementation').modal('show');
    document.getElementById('status-implementation-modal').innerHTML = data.implementation_status.name;
    document.getElementById('enterprise-implementation-modal').innerHTML = data.app.enterprise.name;
    document.getElementById('title-implementation-modal').innerHTML = data.title;
    document.getElementById('description-implementation-modal').innerHTML = data.description;
});

elementProperty.addEventInElement('#update-status-implementation','onclick',function () {
    SwalCustom.dialogConfirm('Deseja alterar o status da implementação?','',status => {
        if(!status)
            return $('#modal-implementation').modal('hide');

        let formData = new FormData();
        formData.append('id', implementationSelected);
        formData.append('implementation_status_id', document.getElementById('mount-enterprises').value);

        ImplementationController.updateStatus(formData).then(resolve => {
            if(!resolve.status)
                return swal('Erro ao atualizar status da implementação','Contate o Juninho','info');

            swal('Status da implementação atualizada com sucesso','','success');
            $('#modal-implementation').modal('hide');
        });
    })
});
