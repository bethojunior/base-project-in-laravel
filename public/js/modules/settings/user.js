elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});

elementProperty.addEventInElement('#add-new-user','onclick',function () {
    $('#modal-add-user').modal('show');

    Mask.phone('#phone-new-user');

    elementProperty.addEventInElement('#input-profile-image-user','onchange',function () {
        if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById("profile-image-user").setAttribute('src', e.target.result);
                imageOne = e.target.result;
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    elementProperty.addEventInElement('#user_type_id','onchange',function () {
        if(this.value === '2'){
            return elementProperty.getElement('#mount-enterprises',enterprises => {
                enterprises.style.display = 'block';
            })
        }

        elementProperty.getElement('#profile-enterprise-user' ,these => {
            these.value = '';
        })

        return elementProperty.getElement('#mount-enterprises',enterprises => {
            enterprises.style.display = 'none';
        })
    });

    elementProperty.addEventInElement('#profile-name-user','oninput',function () {
        let keys = this.value;
        elementProperty.getElement('#mount-name',these => {
            these.innerHTML = keys;
        });
    });

    elementProperty.addEventInElement('#profile-email-user','oninput',function () {
        let keys = this.value;
        elementProperty.getElement('#mount-email',these => {
            these.innerHTML = keys;
        });
    });

    elementProperty.addEventInElement('#profile-enterprise-user','onchange',function () {
        let keys = $("#profile-enterprise-user :selected").val();
        let enterprise = document.getElementById(keys).getAttribute('data-enterprise')

        elementProperty.getElement('#mount-enterprise',these => {
            these.innerHTML = enterprise;
        });
    });

});

elementProperty.addEventInElement('.that-user', 'onclick', function () {
    let id = this.getAttribute('data-browse');
    window.location.href = "/settings/user/"+ id;
})
