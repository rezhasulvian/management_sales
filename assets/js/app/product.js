var table, factorySelector, typeSelector;

const myModal = new bootstrap.Modal('#data-modal', {
	backdrop: 'static',
	keyboard: true,
});


function Product() {

	var self = this;


	self.init = function() {
		
		table = $('#dt-products').DataTable({
			'responsive': true,
			// 'dom': 'Btip',
			'columnDefs': [
				// {
    //                 data: "nik",
    //                 render: function (data, type, row) {
    //                     var result = '<div class="btn-group" role="group">';

    //                     if (cfg.IS_ALLOW_DELETE) {
    //                         result = result + '<button type="button" onclick="doDelete(\'' + row.id + '\');" class="btn btn-light-danger btn-icon btn-sm" data-toggle="kt-tooltip" data-placement="top" title="Hapus"><i class="flaticon2-trash"></i></button>';
    //                     }
    //                     //result = result + '<button type="button" onclick="showRevision(\'' + row.id + '\');" class="btn btn-light-info btn-icon btn-sm" data-toggle="kt-tooltip" data-placement="top" title="Audit Log"><i class="far fa-file-code"></i></button></div>';

    //                     if (cfg.IS_ALLOW_EDIT) {
    //                         result = result + '&nbsp;&nbsp;<a href="#" onclick="doEdit(\''+row.id+'\');" title="Click for edit">'+data+'</a>';
    //                     } else {
    //                         result = result + '&nbsp;&nbsp;' + data;
    //                     }
    //                     return result;
    //                 },
    //                 className: 'font-weight-bolder'
    //             },
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

                            result = result + '&nbsp;&nbsp;<a href="#" class="align-self-center" onclick="doEdit(\''+meta.row+'\');" title="Click for edit">'+data+'</a>';
                            // result = result + '&nbsp;&nbsp;' + data;
                        return result;
                    },
				},
				{
					targets: 16,
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
					targets: 17,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
				{
					targets:18,
					render: function(data, type, full, meta) {
						return '<span class="text-muted">' + data + '</span>';
					},
				},
			]

		});

		$('#btnAdd').on('click', function(e) {
			e.preventDefault();

			// $('#employeeModal').modal("show");

			myModal.show()
		});

		factorySelector = $('#data-form select[name="factoryId"]').select2({
            width: '100%',
            placeholder: "Pilih pabrik...",
            dropdownParent: $("#data-modal")
        });

		typeSelector = $('#data-form select[name="typeId"]').select2({
            width: '100%',
            placeholder: "Pilih jenis jenis...",
            dropdownParent: $("#data-modal")
        });


	    $('#modalId').keyup(function(e) {
	    	e.preventDefault();

	        $(this).val(formatRupiah(this.value));
	    });
	    $('#regionalId').keyup(function(e) {
	    	e.preventDefault();

	        $(this).val(formatRupiah(this.value));
	    });
	    $('#maId').keyup(function(e) {
	    	e.preventDefault();

	        $(this).val(formatRupiah(this.value));
	    });
	    $('#wsId').keyup(function(e) {
	    	e.preventDefault();

	        $(this).val(formatRupiah(this.value));
	    });
	    $('#retailId').keyup(function(e) {
	    	e.preventDefault();

	        $(this).val(formatRupiah(this.value));
	    });
	    $('#userId').keyup(function(e) {
	    	e.preventDefault();

	        $(this).val(formatRupiah(this.value));
	    });


        // $('#submit').on('click', function(e) {
        //     e.preventDefault();

        //     var sales = $('#data-form  input[name="sales"]').val();
        //     var brandId = $('#data-form  select[name="brandId"]').val();
        //     var activeFlag = '';
        //     if(data.data.activeFlag === 1)
        //         activeFlag = $('#data-form input[name=activeFlag]').attr('checked', 'checked');
        //     else
        //         activeFlag = $('#data-form input[name=activeFlag]').removeAttr('checked');

        //     myModal.hide();

        //     table.row.add([sales, brandId, activeFlag,  ""]).draw();

        //     swal.fire({
        //         position: 'top-right',
        //         type: 'info',
        //         title: 'Information',
        //         text: 'Data berhasil diinput',
        //         showConfirmButton: false,
        //         timer: 1500
        //     });

        // });
	}	
}

function formatRupiah(number, prefix) {
    var number_string = number.replace(/[^,\d]/g, '').toString(),
        split    = number_string.split(','),
        sisa     = split[0].length % 3,
        rupiah     = split[0].substr(0, sisa),
        ribuan     = split[0].substr(sisa).match(/\d{3}/gi);
        
    if (ribuan) {
        separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
    }
    
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}

function doEdit(id) {

	console.log(table.row(id).data())

    $('#data-form input[name="code"]').val(table.row(id).data()[1]);
    $('#data-form input[name="brand"]').val(table.row(id).data()[3]);
    $('#data-form input[name="short"]').val(table.row(id).data()[3]);
    $('#data-form input[name="1Bal"]').val(table.row(id).data()[4]);
    $('#data-form input[name="1Press"]').val(table.row(id).data()[5]);
    $('#data-form input[name="1Bks"]').val(table.row(id).data()[6]);
    $('#data-form input[name="stem"]').val(table.row(id).data()[7]);
    $('#data-form input[name="modalId"]').val(table.row(id).data()[9]);
    $('#data-form input[name="regionalId"]').val(table.row(id).data()[10]);
    $('#data-form input[name="maId"]').val(table.row(id).data()[11]);
    $('#data-form input[name="wsId"]').val(table.row(id).data()[12]);
    $('#data-form input[name="retailId"]').val(table.row(id).data()[13]);
    $('#data-form input[name="userId"]').val(table.row(id).data()[14]);
    $('#data-form textarea[name="desc"]').val(table.row(id).data()[15]);

    $('#data-form select[name="factoryId"]').val(table.row(id).data()[2]).trigger("change");
    $('#data-form select[name="typeId"]').val(table.row(id).data()[9]).trigger("change");

    if(table.row(id).data()[16] === "1")
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