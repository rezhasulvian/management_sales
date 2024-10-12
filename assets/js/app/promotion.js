var table, promoSelector;

function Promotion() {

	var self = this;


	self.init = function() {
		
		$('#dt-promotions').DataTable({
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

                            result = result + '<a href="detailPromo.html" class="btn btn-light-warning btn-icon btn-sm" title="Hapus"><i class="ki-outline ki-notepad-bookmark fs-4"></i></a>';

                            result = result + '&nbsp;&nbsp;<span class="align-content-center">'+data+'</span>';
                            // result = result + '&nbsp;&nbsp;' + data;
                        return result;
                    },
				},
				{
					targets: 11,
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
					targets: 12,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
				{
					targets: 13,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
			]

		});

		promoSelector = $('#promoId').select2({
            width: '100%',
            placeholder: "Pilih promo",
            dropdownParent: $("#kt_app_body")
        });

        $('#startDate').flatpickr({
        	enableTime: !0,
            dateFormat: "d, M Y, H:i"
        });

        $('#endDate').flatpickr({
        	enableTime: !0,
            dateFormat: "d, M Y, H:i"
        });

		$('#btnAdd').on('click', function(e) {
			e.preventDefault();

			// $('#employeeModal').modal("show");

			const myModal = new bootstrap.Modal('#data-modal', {
			 	backdrop: 'static',
				keyboard: true,
			})

			myModal.show()
		});



	}
	

}