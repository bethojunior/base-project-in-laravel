elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});

elementProperty.addEventInElement('#input-image','onchange',function () {
    if (this.files && this.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("image-user").setAttribute('src', e.target.result);
            imageOne = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    }
})
