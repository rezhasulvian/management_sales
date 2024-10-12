var table, brandSelector;

const myModal = new bootstrap.Modal('#data-modal', {
 	backdrop: 'static',
	keyboard: true,
})

function DetailPromo() {

	var self = this;

	self.init = function() {
		
		table = $('#dt-detPromos').DataTable({
			'responsive': true,
			// 'dom': 'Btip',
			'columnDefs': [
				{
					targets: 1,
					type: 'html',
					// render: function(data, type, full, meta) {
					// 	return '<span class="text-start">' + data + '</span>';
					// },
					render: function (data, type, full, meta) {
                        var result = '<div class="btn-group" role="group">';

                            result = result + '&nbsp;&nbsp;<a href="#" onclick="doEdit(\''+meta.row+'\');" title="Click for edit">'+data+'</a>';
                            // result = result + '&nbsp;&nbsp;' + data;
                        return result;
                    },
				},
				// {
				// 	target: 2,
				// 	render: function(data, type, full, meta) {
				// 		return '<span class="badge py-3 px-4 fs-7' +data+ '</span>';
				// 	},
				// },
				{
					targets: 3,
					render: function(data, type, full, meta) {
						var status = {
							0: {'title': 'TIDAK AKTIF', 'class': ' badge-light-danger'},
							1: {'title': 'AKTIF', 'class': ' badge-light-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="badge py-3 px-4 fs-7' + status[data].class + '">' + status[data].title + '</span>';
					},
				},
				{
					targets: 4,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
				{
					targets: 5,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
			]

		});

		brandSelector = $('#data-form select[name="brandId"]').select2({
            width: '100%',
            placeholder: "Pilih brand...",
            dropdownParent: $("#data-modal")
        });


		$('#btnAdd').on('click', function(e) {
			e.preventDefault();

			// $('#employeeModal').modal("show");

			myModal.show()
		});

		$('#submit').on('click', function(e) {
            e.preventDefault();

            var sales = $('#data-form  input[name="sales"]').val();
            var brandId = $('#data-form  select[name="brandId"]').val();
            if($('#data-form input[name=activeFlag]').is(':checked'))
                activeFlag = $('#data-form input[name=activeFlag]').val(1);
            else
                activeFlag = $('#data-form input[name=activeFlag]').val(0);

            myModal.hide();

			// console.log(table.row().data());

            var createdBy = table.row().data()[5];
			var createdDate = table.row().data()[4];


            table.row($('#dt-detPromos').val()).data(["", sales, brandId, activeFlag[0].value, createdDate, createdBy, ""]).draw();

            swal.fire({
                position: 'top-right',
                type: 'info',
                title: 'Information',
                text: 'Data berhasil diinput',
                showConfirmButton: false,
                timer: 1500
            });

        });
	}
}

function doEdit(id) {

	console.log(table.row(id).data())

    $('#data-form input[name="sales"]').val(table.row(id).data()[1]);

    $('#data-form select[name="brandId"]').val(table.row(id).data()[2]).trigger("change");

    if(table.row(id).data()[3] === "1")
        $('#data-form input[name=activeFlag]').attr('checked', 'checked');
    else
        $('#data-form input[name=activeFlag]').removeAttr('checked');

    myModal.show();

}