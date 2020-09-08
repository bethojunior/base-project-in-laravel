let noteSelected;

elementProperty.getElement('.date',that => {
    if(that.getAttribute('id') !== '')
        that.innerHTML = Mask.setDateCrazy(that.getAttribute('id'));
});


elementProperty.addEventInElement('#description','oninput',function () {
    let keys = this.value.toUpperCase();
    elementProperty.getElement('.this-enterprise',notes => {
        let note = notes.getAttribute('value').toUpperCase();
        console.log(note)
        if(!note.startsWith(keys))
            return notes.style.display = 'none';

        return notes.style.display = '';

    });
});


elementProperty.addEventInElement('.this-enterprise','onclick',function () {
    noteSelected = JSON.parse(this.getAttribute('data'));
    console.log(noteSelected);
    $('#modal-notes').modal('show')

    elementProperty.getElement('#enterprise-note',these => {
        these.innerHTML = noteSelected.enterprise_name;
    });

    elementProperty.getElement('#content-modal-notes',these => {
        these.innerHTML = `
            <input name="id" class="away" value="${noteSelected.id}">
            <div class="form-group">
                <input name="title" class="form-control" value="${noteSelected.title}">
            </div>
            <div class="form-group">
                <textarea name="description" class="form-control">${noteSelected.description}</textarea>
            </div>
        `;
    });

});

elementProperty.addEventInElement('#edit-note','onclick')
