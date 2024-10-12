var table, genderSelector, religionSelector, maritalSelector, nationalitySelector, CitySelector, positionSelector;

function Android() {

	var self = this;

	self.init = function() {

		var date = new Date();
		var pDateTime = moment(date).format("yyy MM dd HH:mm:ss");

		const myModal = new bootstrap.Modal('#data-modal', {
		 	backdrop: 'static',
			keyboard: true,
		})
		
		table = $('#dt-androids').DataTable({
			// 'responsive': true,
   //      	'processing': true,
      //   	'dom': 'Btip',
		    // 'buttons': [
		    //     'copy', 'excel', 'csv', 'pdf'
		    // ],
			'columnDefs': [
				{
					targets: 1,
					render: function(data, type, full, meta) {
                        var result = '<div class="btn-group" role="group">';

                            result = result + '&nbsp;&nbsp;<a href="#" title="Click for edit">'+data+'</a>';
                        return result;
                    }
				},	
				{
					targets: 2,
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
					targets: 3,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
				{
					targets: 4,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
			]

		});


        $('#generalSearch').keyup(function(){
            table.search($(this).val()).draw() ;
        });

        // const documentTitle = 'Customer Orders Report';
        // var buttons = new $.fn.dataTable.Buttons(table, {
        //     buttons: [
        //         {
        //             extend: 'copyHtml5',
        //             title: documentTitle
        //         },
        //         {
        //             extend: 'excelHtml5',
        //             title: documentTitle
        //         },
        //         {
        //             extend: 'csvHtml5',
        //             title: documentTitle
        //         },
        //         {
        //             extend: 'pdfHtml5',
        //             title: documentTitle
        //         }
        //     ]
        // }).container().appendTo($('#kt_datatable_example_buttons'));

        // // Hook dropdown menu click event to datatable export buttons
        // const exportButtons = document.querySelectorAll('#kt_datatable_example_export_menu [data-kt-export]');
        // exportButtons.forEach(exportButton => {
        //     exportButton.addEventListener('click', e => {
        //         e.preventDefault();

        //         // Get clicked export value
        //         const exportValue = e.target.getAttribute('data-kt-export');
        //         const target = document.querySelector('.dt-buttons .buttons-' + exportValue);

        //         // Trigger click event on hidden datatable export buttons
        //         target.click();
        //     });
        // });

		positionSelector = $('#data-form select[name="positionId"]').select2({
            width: '100%',
            placeholder: "Pilih jabatan...",
            dropdownParent: $("#data-modal")
        });

		genderSelector = $('#data-form select[name="genderId"]').select2({
            width: '100%',
            placeholder: "Pilih jenis kelamin...",
            dropdownParent: $("#data-modal")
        });

        religionSelector = $('#data-form select[name="religionId"]').select2({
            width: '100%',
            placeholder: "Pilih agama...",
            dropdownParent: $("#data-modal")
        });

        maritalSelector = $('#data-form select[name="maritalId"]').select2({
            width: '100%',
            placeholder: "Pilih perkawinan...",
            dropdownParent: $("#data-modal")
        });

        nationalitySelector = $('#data-form select[name="nationalityId"]').select2({
            width: '100%',
            placeholder: "Pilih kewarganegaraan...",
            dropdownParent: $("#data-modal")
        });

        CitySelector = $('#data-form select[name="cityId"]').select2({
            width: '100%',
            placeholder: "Pilih kota...",
            dropdownParent: $("#data-modal")
        });

		$('#btnAdd').on('click', function(e) {
			e.preventDefault();

			myModal.show()
		});

		$('#submit').on('click', function(e) {
			e.preventDefault();

		    var name = $('#data-form  input[name="name"]').val();
		    var phone = $('#data-form  input[name="phone"]').val();
		    var address = $('#data-form  textarea[name="address"]').val();
		    var city = $('#data-form  input[name="city"]').val();


		    var position = $('#data-form  select[name="positionId"] option:selected').val();
			var gender = $('#data-form  select[name="genderId"] option:selected').val();
			var religion = $('#data-form  select[name="religionId"] option:selected').val();
			var marital = $('#data-form  select[name="maritalId"] option:selected').val();
			var nationality = $('#data-form  select[name="nationalityId"] option:selected').val();
			// var city = $('#data-form  select[name="cityId"] option:selected').val();


			var createdBy = "Developer";
			var createdDate = pDateTime;
			var status = '<span class="badge py-3 px-4 fs-7 badge-light-primary">ACTIVE</span>'

			myModal.hide();

		    table.row.add([name, position, address, city, phone, status, createdDate, createdBy,  ""]).draw();

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