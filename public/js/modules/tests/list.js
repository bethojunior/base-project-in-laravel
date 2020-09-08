elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});

elementProperty.addEventInElement('.this-enterprise','onclick',function () {
    // document.getElementById('who_insert').innerHTML = '';
    insertPreload();
    let data = JSON.parse(this.getAttribute('data'));
    let user = this.getAttribute('data-user');

    if(user !== ''){
        user = JSON.parse(user)
    }else{
        user = null;
    }

    $('#modal-test').modal('show');

    if(user !== null){
        elementProperty.getElement('#who_insert' , these => {
            these.innerHTML = `
                <b>Responsavel: <span class="badge badge-info">${user.name}</span></b>
            `;
        });
    }

    elementProperty.getElement('#test-id' , these => {
        these.setAttribute('value',data.id);
    });

    elementProperty.getElement('#title-test' , these => {
        these.innerHTML = data.enterprise_name;
    });

    elementProperty.getElement('#init-test',these => {
        these.value = data.title;
    });

    elementProperty.getElement('#description-test',these => {
        these.value = data.description;
    });

    mountTimelineTest();

    function mountTimelineTest(){
        elementProperty.getElement('#mount-time-line-by-id',timeline => {
            TestController.getTimeline(data.id).then(callback => {
                let response = callback.response;
                if(!response.status)
                    return swal('Erro ao listar timeline','Contate o suporte','error')


                let data = response.timeline_tests;
                if(data.length === 0)
                    return timeline.innerHTML = `
                        <div class="center">
                            <b style="color: black">Não há comentários sobre esse teste</b>
                        </div>
                    `;
                let content = '';
                content += data.map(item => {
                    let user = item.user;
                    return `
                    <div>
                        <div class="img-circle">
                            <img style="width: 3vw;height: 3vw" class="img-circle" src="${PATH_IMAGE+user.picture}" onerror="this.src = '/assets/images/icons/default.png'" >
                        </div>
                        <div class="timeline-item">
                            <span class="time"><i class="fas fa-clock"></i> ${Mask.setDateCrazy(item.updated_at)}</span>
                            <h3 class="timeline-header no-border"><a href="#">${user.name}</a> <hr> ${item.description}</h3>
                        </div>
                    </div>
                `;
                }).join('');
                timeline.innerHTML = content;
                $('.direct-chat-contacts').scrollTop(1000000);
            })
        })
    }

    elementProperty.addEventInElement('#insertCommentTimeline','onclick',function (){
        let formData = new FormData();
        let description = document.getElementById('description-timeline').value;
        if(description === '')
            return swal('Você precisa inserir uma descrição','','info');

        formData.append('test_id', data.id);
        formData.append('description', description);
        formData.append('status_test_id', data.status_test_id);
        formData.append('id_user', document.getElementById('user_id_logged').value);

        TestController.insertTimeline(formData).then(response => {
            if(!response.status)
                return swal('Erro ao inserir comentário','Contate o suporte','error');

            mountTimelineTest();
            document.getElementById('description-timeline').value = '';
            return SwalCustom.toast('Comentário inserido com sucesso');
        }).catch(error => {
           console.log(error);
        });

    });

});


elementProperty.addEventInElement('#status-test','onclick',function (e) {
    e.stopPropagation();
})

elementProperty.getElement('#status-test',these => {
    let current = these.getAttribute('status');
    elementProperty.getElement('.status-test' , these => {
        if(these.value === current)
            these.selected = true;
    })
})

elementProperty.addEventInElement('.enterprises_list','onchange',function () {
    elementProperty.getElement('.do-filter-tests',these => {
        these.disabled = false;
    });
})
