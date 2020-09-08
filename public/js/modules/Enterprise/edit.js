let myModules  = {};
let myApps  = {};

elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});

elementProperty.getElement('#enterprise_id',these => {
    Mask.idUrl(2).then(resolve => {
        these.setAttribute('value', resolve);
    })
})

elementProperty.getElement('.mymodules', modules => {
    myModules[modules.getAttribute('value')] = modules.getAttribute('value');
});

elementProperty.getElement('.myApps', apps => {
    myApps[apps.getAttribute('value')] = apps.getAttribute('value');
});

elementProperty.addEventInElement('#open-modal-modules','onclick',function () {
    $('#modal-edit-modules').modal('show');
    elementProperty.getElement('.all-modules', these => {
        if(myModules[these.value])
            these.checked = true;
    });
});

elementProperty.addEventInElement('#open-modal-apps','onclick',function () {
    $('#modal-edit-apps').modal('show');
    elementProperty.getElement('.all-apps', these => {
        if(myApps[these.value])
            these.checked = true;
    });
});

elementProperty.addEventInElement('#state-id','onchange',function () {
    let stateSelected = this.value;
    elementProperty.getElement('#city-id',these => {
        EnterpriseController.getCityByState(stateSelected).then(response => {
            let content = '';
            content += response.map(item => {
                return `
                    <option value="${item.nome}">${item.nome}</option>
                `;
            });
            these.innerHTML = content;
        })
    })
});

elementProperty.addEventInElement('#add-cities','onclick',function () {
    $('#modal-add-cities').modal('show')
    elementProperty.getElement('#state-id',these => {
        EnterpriseController.getStates().then(response => {
            let content = '';
            content += response.map(item => {
                return `
                    <option value="${item.sigla}">${item.nome}</option>
                `;
            });
            these.innerHTML = content;
        })
    })
});

elementProperty.addEventInElement('#add-implementation','onclick',function () {
    $('#modal-implementation').modal('show');
})

elementProperty.addEventInElement('#save-implementation','onclick',function () {
    let formData = new FormData();
    formData.append('title', document.getElementById('title-implementation').value);
    formData.append('app_id', document.getElementById('app_id-implementation').value);
    formData.append('description', document.getElementById('description-implementation').value);
    formData.append('implementation_status_id', 1);
    EnterpriseController.insertImplementation(formData).then(resolve => {
        $('#modal-implementation').modal('hide');
        if(resolve.status)
            return swal('Implementação inserida com sucesso','','success');
        return swal('Erro ao inserir implementação','Contate o Juninho','error');
    });
})


