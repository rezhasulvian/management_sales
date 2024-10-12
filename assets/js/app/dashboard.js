var table;

// var height = parseInt(KTUtil.css(element, 'height'));
var labelColor = KTUtil.getCssVariableValue('--bs-gray-500');
var borderColor = KTUtil.getCssVariableValue('--bs-gray-200');
var baseColorRegional = KTUtil.getCssVariableValue('--bs-warning');
var baseColorBrand = KTUtil.getCssVariableValue('--bs-primary');
var secondaryColor = KTUtil.getCssVariableValue('--bs-gray-300');

function Dashboard() {

	var self = this;

	self.init = function() {

		loadChartMonthlyRegional();
		loadChartMonthlyBrand();

		var date = new Date();
		var pDateTime = moment(date).format("yyy MM dd HH:mm:ss");
		var currentMonth = moment(date).format('YYYY-MM');

        $('#generalSearch').keyup(function(){
            table.search($(this).val()).draw() ;
        });

        $('#monthRegion').flatpickr({
        	defaultDate: currentMonth,
        	plugins: [
		        new monthSelectPlugin({
		          shorthand: true, //defaults to false
		          dateFormat: "Y-m", //defaults to "F Y"
		          altFormat: "F Y", //defaults to "F Y"
		          theme: "dark" // defaults to "light"
		        })
		    ]
        });

        $('#monthBrand').flatpickr({
        	defaultDate: currentMonth,
        	plugins: [
		        new monthSelectPlugin({
		          shorthand: true, //defaults to false
		          dateFormat: "Y-m", //defaults to "F Y"
		          altFormat: "F Y", //defaults to "F Y"
		          theme: "dark" // defaults to "light"
		        })
		    ]
        });
	}
	
}

function loadChartMonthlyRegional() {
    const apexChart = ('#chartRegional');
    var options = {
    series: [{
    	name: 'Omzet',
      	data: [14400, 800, 0]
    }],
    chart: {
        fontFamily: 'inherit',
        type: 'bar',
        // height: height,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: ['30%'],
            endingShape: 'rounded'
        },
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['JAWA TENGAH DAN DIY', 'JAWA TENGAH', 'BANGKA BELITUNG'],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        },
        labels: {
            style: {
                colors: labelColor,
                fontSize: '10px'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: labelColor,
                fontSize: '10px'
            }
        }
    },
    fill: {
        opacity: 1
    },
    states: {
        normal: {
            filter: {
                type: 'none',
                value: 0
            }
        },
        hover: {
            filter: {
                type: 'none',
                value: 0
            }
        },
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: 'none',
                value: 0
            }
        }
    },
    tooltip: {
        style: {
            fontSize: '12px'
        },
        // y: {
        //     formatter: function (val) {
        //         return '$' + val + ' thousands'
        //     }
        // }

    },
    colors: [baseColorRegional, secondaryColor],
    grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
            lines: {
                show: true
            }
        }
    }
};

    // document.getElementById("doChangeMonthly").innerHTML = '<div id="chart_5"></div>';

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
}

function loadChartMonthlyBrand() {
    const apexChart = ('#chartBrand');
    var options = {
    series: [{
    	name: 'Omzet',
      	data: [4000, 8000, 3200, 0, 0, 800, 2400, 0, 800]
    }],
    chart: {
        fontFamily: 'inherit',
        type: 'bar',
        // height: height,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true,
            columnWidth: ['30%'],
            endingShape: 'rounded'
        },
    },
    legend: {
        show: false
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['RBB 16', 'RMB 16', 'RKS 16', 'DMI 12', 'DMR 12', 'JLS 12', 'CMR 12', 'STS 12', 'GC 12'],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false
        },
        labels: {
            style: {
                colors: labelColor,
                fontSize: '10px'
            }
        }
    },
    yaxis: {
        labels: {
            style: {
                colors: labelColor,
                fontSize: '10px'
            }
        }
    },
    fill: {
        opacity: 1
    },
    states: {
        normal: {
            filter: {
                type: 'none',
                value: 0
            }
        },
        hover: {
            filter: {
                type: 'none',
                value: 0
            }
        },
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: 'none',
                value: 0
            }
        }
    },
    tooltip: {
        style: {
            fontSize: '12px'
        },
        // y: {
        //     formatter: function (val) {
        //         return '$' + val + ' thousands'
        //     }
        // }

    },
    colors: [baseColorBrand, secondaryColor],
    grid: {
        borderColor: borderColor,
        strokeDashArray: 4,
        yaxis: {
            lines: {
                show: true
            }
        }
    }
};

    // document.getElementById("doChangeMonthly").innerHTML = '<div id="chart_5"></div>';

    var chart = new ApexCharts(document.querySelector(apexChart), options);
    chart.render();
}