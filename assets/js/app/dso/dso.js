var table, regionalSelector, provinceSelector, citySelector;

const myModal = new bootstrap.Modal('#data-modal', {
 	backdrop: 'static',
	keyboard: true,
})

function Dso() {

	var self = this;

	self.init = function() {

		var date = new Date();
		var pDateTime = moment(date).format("yyy MM dd HH:mm:ss");
		
		table = $('#dt-dsos').DataTable({
			'responsive': true,
   //      	'processing': true,
      //   	'dom': 'Btip',
		    // 'buttons': [
		    //     'copy', 'excel', 'csv', 'pdf'
		    // ],
			'columnDefs': [
				{
					targets: 1,
					type: 'html',
					// render: function(data, type, full, meta) {
					// 	return '<span class="text-start">' + data + '</span>';
					// },
					render: function (data, type, full, meta) {
                        var result = '<div class="btn-group" role="group">';

                            result = result + '<button type="button" onclick="doDelete(\'' + meta.row + '\');" class="btn btn-light-danger btn-icon btn-sm" data-toggle="kt-tooltip" data-placement="top" title="Hapus"><i class="ki-outline ki-trash fs-4"></i></button>';
                        
                        //result = result + '<button type="button" onclick="showRevision(\'' + row.id + '\');" class="btn btn-light-info btn-icon btn-sm" data-toggle="kt-tooltip" data-placement="top" title="Audit Log"><i class="far fa-file-code"></i></button></div>';

                            result = result + '&nbsp;&nbsp;<a href="#" class="align-content-center" onclick="doEdit(\''+meta.row+'\');" title="Click for edit">'+data+'</a>';
                            // result = result + '&nbsp;&nbsp;' + data;
                        return result;
                    },
				},
				{
					targets: 14,
					render: function(data, type, full, meta) {
						var status = {
							1: {'title': 'AKTIF', 'class': ' badge-light-primary'},
							2: {'title': 'TIDAK AKTIF', 'class': ' badge-light-danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}
						return '<span class="badge py-3 px-4 fs-7' + status[data].class + '">' + status[data].title + '</span>';
					},
				},
				{
					targets: 15,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
				{
					targets: 16,
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

		regionalSelector = $('#data-form select[name="regionalId"]').select2({
            width: '100%',
            placeholder: "Pilih region...",
            dropdownParent: $("#data-modal")
        });

		provinceSelector = $('#data-form select[name="provinceId"]').select2({
            width: '100%',
            placeholder: "Pilih provinsi...",
            dropdownParent: $("#data-modal")
        });

        citySelector = $('#data-form select[name="cityId"]').select2({
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
	
	var exportButtons = () => {
        
    }
}

function doEdit(id) {

	console.log(table.row(id).data())

    $('#data-form input[name="dso"]').val(table.row(id).data()[2]);
    $('#data-form textarea[name="address"]').val(table.row(id).data()[3]);
	$('#data-form select[name="cityId"]').val(table.row(id).data()[4]).trigger("change");
	$('#data-form select[name="provinceId"]').val(table.row(id).data()[5]).trigger("change");
	$('#data-form select[name="regionalId"]').val(table.row(id).data()[6]).trigger("change");
	    
    $('#data-form input[name="spv"]').val(table.row(id).data()[7]);
    $('#data-form input[name="phone"]').val(table.row(id).data()[8]);
    $('#data-form input[name="hp"]').val(table.row(id).data()[9]);
    $('#data-form input[name="code"]').val(table.row(id).data()[10]);
    $('#data-form input[name="email"]').val(table.row(id).data()[11]);
    $('#data-form input[name="latLong"]').val(table.row(id).data()[12]);
    // $('#data-form input[name="long"]').val(table.row(id).data()[13]);


    if(table.row(id).data()[14] === "1")
        $('#data-form input[name=activeFlag]').attr('checked', 'checked');
    else
        $('#data-form input[name=activeFlag]').removeAttr('checked');

    myModal.show();

}

var doDelete = function(id) {

	console.log(table.row(id).data())

    swal.fire({
        title: "Konfirmasi",
        text: "Apakah kamu ingin yakin hapus data?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Batal"
    }).then(function(result) {
        if (result.value) {
                //swal.fire("Information", data.message, 'success');
                swal.fire({
                    position: 'top-right',
                    icon: 'info',
                    title: 'Information',
                    text: "Data berhasil dihapus",
                    showConfirmButton: false,
                    timer: 1500
                });
                table.row(id).remove().draw();

        } else {
            //swal.fire('Information', data.responseJSON.message, 'warning');
            //swal.fire('Information', data.message, 'warning');
            swal.fire({
                position: 'top-right',
                icon: 'warning',
                title: 'Information',
                text: "",
                showConfirmButton: false,
                timer: 1500
            });

        }
    });
}