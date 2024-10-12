var table, genderSelector, religionSelector, maritalSelector, nationalitySelector, CitySelector, positionSelector;

function Receipt() {

	var self = this;

	self.init = function() {

		var date = new Date();
		var pDateTime = moment(date).format("yyy MM dd HH:mm:ss");
		var	today = moment(date).format("yyy MM");
		var firstMonth = moment().month(0).format('MMMM YY');
		var currentMonth = moment(date).format('MMMM YY');

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
					targets: 9,
					render: function(data, type, full, meta) {
						var status = {
							0: {},
							1: {},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						} else if (status[data] === 1) {}{
							return '<i class="ki-duotone ki-double-check text-success fs-1">' +
									 '<span class="path1"></span>' +
									 '<span class="path2"></span>' +
									'</i>';
						}
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

		exportButtons(today);


        $('#generalSearch').keyup(function(){
            table.search($(this).val()).draw() ;
        });

        const startDate = $('#startMonth').flatpickr({
        	defaultDate: firstMonth,
        	plugins: [
		        new monthSelectPlugin({
		          shorthand: true, //defaults to false
		          dateFormat: "F y", //defaults to "F Y"
		          altFormat: "F Y", //defaults to "F Y"
		          theme: "dark" // defaults to "light"
		        })
		    ]

        });


        const endMonth = $('#endMonth').flatpickr({
        	defaultDate: currentMonth,
        	plugins: [
		        new monthSelectPlugin({
		          shorthand: true, //defaults to false
		          dateFormat: "F y", //defaults to "F Y"
		          altFormat: "F Y", //defaults to "F Y"
		          theme: "dark" // defaults to "light"
		        })
		    ]

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

var exportButtons = function(today) {
	console.log("asdadfasd")
	const documentTitle = 'Transaksi Penerimaan Rokok - ' + today;
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
        }).container().appendTo($('#button-export'));

    // Hook dropdown menu click event to datatable export buttons
    const exportButtons = document.querySelectorAll('#kt-export [data-kt-export]');
    exportButtons.forEach(exportButton => {
        exportButton.addEventListener('click', e => {
            e.preventDefault();

            console.log("klkllkl")

            // Get clicked export value
            const exportValue = e.target.getAttribute('data-kt-export');
            const target = document.querySelector('.dt-buttons .buttons-' + exportValue);

            // Trigger click event on hidden datatable export buttons
            target.click();
        });
    });
}