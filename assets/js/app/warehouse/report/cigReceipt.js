var table, brandSelector;

function Receipt() {

	var self = this;

	self.init = function() {

		var date = new Date();
		var pDateTime = moment(date).format("yyy MM dd HH:mm:ss");

		const myModal = new bootstrap.Modal('#data-modal', {
		 	backdrop: 'static',
			keyboard: true,
		})
		
		table = $('#dt-receipts').DataTable({
			'responsive': true,
   //      	'processing': true,
      //   	'dom': 'Btip',
		    // 'buttons': [
		    //     'copy', 'excel', 'csv', 'pdf'
		    // ],
			'columnDefs': [
				{
					targets: 3,
					render: function(data, type, full, meta) {
						return '<span class="badge fs-7 badge-light-success">' + data + '</span>';
					},
				},
				
				{
					targets: 9,
					render: function(data, type, full, meta) {
						var status = {
							0: {'title': 'TIDAK AKTIF', 'class': ' badge-light-danger'},
							1: {'title': 'AKTIF', 'class': ' badge-light-primary'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="badge fs-7' + status[data].class + '">' + status[data].title + '</span>';
					},
				},
				{
					targets: 10,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
				{
					targets: 11,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
			]

		});

        exportButtons();

        $('#generalSearch').keyup(function(){
            table.search($(this).val()).draw() ;
        });

        $('#startDate').flatpickr({
        	enableTime: false,
            dateFormat: "d F Y"
        });

        $('#endDate').flatpickr({
        	enableTime: false,
            dateFormat: "d F Y"
        });

        brandSelector = $('#brandId').select2({
            width: '100%',
            placeholder: "Pilih brand...",
            dropdownParent: $("#kt_app_body")
        });


        $('#jumlah').text(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format($('#jumlah').text()))
        $('#total').text(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format($('#total').text()))

		$('#btnSearch').on('click', function(e) {
			e.preventDefault();

			table.hide();
		});

		$('#submit').on('click', function(e) {
			e.preventDefault();

		    var code = $('#data-form input[name="code"]').val();
		    var name = $('#data-form  input[name="name"]').val();
		    var phone = $('#data-form  input[name="phone"]').val();
		    var address = $('#data-form  textarea[name="address"]').val();


		    var position = $('#data-form  select[name="positionId"] option:selected').val();
			var gender = $('#data-form  select[name="genderId"] option:selected').val();
			var religion = $('#data-form  select[name="religionId"] option:selected').val();
			var marital = $('#data-form  select[name="maritalId"] option:selected').val();
			var nationality = $('#data-form  select[name="nationalityId"] option:selected').val();
			var city = $('#data-form  select[name="cityId"] option:selected').val();

			var createdBy = "Developer";
			var createdDate = pDateTime;
			var status = '<span class="badge py-3 px-4 fs-7 badge-light-primary">ACTIVE</span>'
			var pgw = '<div class="form-check form-check-sm form-check-custom form-check-solid">' +
						'<input class="form-check-input" type="checkbox" value="1" checked />'  +
					'</div>';

			myModal.hide();

		    table.row.add([code, name, position, address, city, phone, pgw, status, createdDate, createdBy,  ""]).draw();

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
	
	var exportButtons = () => {
    	const documentTitle = 'Laporan Stok Gudang Rokok';
        var buttons = new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: documentTitle
                },
                {
                    extend: 'excelHtml5',
                    title: documentTitle
                },
                {
                    extend: 'csvHtml5',
                    title: documentTitle
                },
                {
                    extend: 'pdfHtml5',
                    title: documentTitle
                }
            ]
        }).container().appendTo($('#export-button'));

        // Hook dropdown menu click event to datatable export buttons
        const exportButtons = document.querySelectorAll('#export-menu [data-kt-export]');
        exportButtons.forEach(exportButton => {
            exportButton.addEventListener('click', e => {
                e.preventDefault();

                // Get clicked export value
                const exportValue = e.target.getAttribute('data-kt-export');
                const target = document.querySelector('.dt-buttons .buttons-' + exportValue);

                // Trigger click event on hidden datatable export buttons
                target.click();
            });
        });
    }
}