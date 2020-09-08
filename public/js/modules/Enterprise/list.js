elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});

elementProperty.addEventInElement('#search-enterprise','oninput',function () {
    let keys = this.value.toUpperCase();
    elementProperty.getElement('.through-enterprises',enterprises => {
        let enterprise = enterprises.getAttribute('value').toUpperCase();
        if(!enterprise.startsWith(keys))
            return enterprises.style.display = 'none';

        return enterprises.style.display = '';

    });
});
