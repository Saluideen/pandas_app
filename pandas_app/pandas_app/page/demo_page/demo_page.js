frappe.pages['demo-page'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Dashboard',
        single_column: true
    });

    // Create the HTML structure for the cards with a filter input
    $(wrapper).find('.layout-main-section').html(`
        <div class="container">
            <div class="row mb-3">
                <div class="col-md-4">
                    <input type="text" id="filter-input" class="form-control form-control-sm" style="max-width: 200px;" placeholder="Filter by item">
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Bar Chart</h5>
                            <div id="bar-chart" style="height: 250px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Dashboard Chart</h5>
                            <div id="dashboard-chart" style="height: 250px;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Custom Table</h5>
                            <div id="table-container"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

    // Fetch initial data
    fetch_data();

    // Add event listener to the filter input
    $('#filter-input').on('input', function() {
        fetch_data($(this).val());
    });

    function fetch_data(filter='') {
        frappe.call({
            method: 'pandas_app.pandas_app.page.demo_page.demo_page.get_data',
            args: {
                filter: filter
            },
            callback: function(r) {
                if (r.message) {
                    var response = JSON.parse(r.message);
                    console.log('Data fetched from server:', response);
                    render_dashboard(response.table_data);
                    if (response.chart_data) {
                        render_dashboard_chart(response.chart_data);
                    } else {
                        console.error('No chart data available');
                    }
                } else {
                    console.error('Failed to fetch data');
                }
            }
        });
    }

    function render_dashboard(data) {
        // Parse the data
        var df = data;
        console.log('Parsed data:', df);

        // Bar Chart
        var bar_chart = new frappe.Chart("#bar-chart", {
            data: {
                labels: df.index,
                datasets: [
                    {
                        name: "Amount 1",
                        chartType: 'bar',
                        values: df.data.map(d => d[1])
                    },
                    {
                        name: "Amount 2",
                        chartType: 'bar',
                        values: df.data.map(d => d[2])
                    }
                ]
            },
            title: "Amounts Bar Chart",
            type: 'bar',
            height: 250
        });

        // Custom Table
        var table_html = '<div style="height: 200px; overflow-y: auto;"><table class="table table-bordered"><thead><tr>';
        df.columns.forEach(col => {
            table_html += `<th>${col}</th>`;
        });
        table_html += '</tr></thead><tbody>';
        df.data.forEach(row => {
            table_html += '<tr>';
            row.forEach(cell => {
                table_html += `<td>${cell}</td>`;
            });
            table_html += '</tr>';
        });
        table_html += '</tbody></table></div>';

        $('#table-container').html(table_html);

        // Check if the table is rendered
        if ($('#table-container table').length) {
            console.log('Table rendered successfully');
        } else {
            console.error('Failed to render table');
        }
    }

    function render_dashboard_chart(chart_data) {
        console.log('Rendering dashboard chart:', chart_data);

        if (chart_data.data && chart_data.data.length > 0) {
            var chart = new frappe.Chart("#dashboard-chart", {
                title: chart_data.chart_name,
                data: chart_data,
                type: chart_data.type,
                height: 250,
                colors: ['#7cd6fd', '#743ee2']
            });

            // Check if the chart is rendered
            if ($('#dashboard-chart svg').length) {
                console.log('Dashboard chart rendered successfully');
            } else {
                console.error('Failed to render dashboard chart');
            }
        } else {
            console.error('No data available for dashboard chart');
        }
    }
}
