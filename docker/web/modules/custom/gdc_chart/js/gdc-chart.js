/**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
 * @file                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
 * gdc_chart behaviors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
 */



var humanBodyData = {};
var dataResponse = [];
 
var chart;


(function($, Drupal) {
    Drupal.behaviors.gdcChartGdcChart = {
        attach: function(context, settings) {
            once('gdcChartGdcChart', 'html').forEach(function(element) {
                $(document).ready(function() {
                    getProjects();
                    displayChart();
                    getHumanBodyData();
                });
            });
        },
    };

    function displayChart() {
        const ctx = document.getElementById('gdcChart');
        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: dataResponse.map(item => item.id),
                datasets: [{
                data: dataResponse.map(item => item.cases),
                borderWidth: 1,
                backgroundColor: ["#F0EE37", "#9E09DB", "#DF2EBD", "#F0773B", "#26C156", "#1f77b4", "#44D52D", "#1799E3", "#C736CF", "#E04B7B", "#1B72F6", "#3CA6CD", "#DEAF35", "#43DDCF", "red", "#F52AB6", "#69A1EC", "#BE302C", "#F5619A", "#348522", "#D7215D", "#DE3DD3", "#D7BC58", "#DA7D3A", "#9C9C9C", "#F08E1A", "#3DDFCC", "#E4DE3E", "#E96E1F", "#D58D00"],
                hoverBorderColor: '#000',
                hoverBorderWidth: 3,
                }],
            },
            options: {
                onClick: function(event, elements) {
                    if (elements.length > 0) {
                        var url = 'https://portal.gdc.cancer.gov/';
                        window.open(url, '_blank');
                    }
                },
                onHover: function(event, elements) {
                    if (elements && elements.length) {
                        document.getElementById('gdcChart').style.cursor = 'pointer';
                    } else {
                        document.getElementById('gdcChart').style.cursor = 'default';
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context, data) {
                                var currentSite = dataResponse[context.dataIndex];
                                var index = context.index;
                                label = ` ${currentSite['cases'].toLocaleString()} cases ( ${currentSite['files'].toLocaleString()} Files)`;
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function getHumanBodyData() {
        $.get( "/chart/diseasedata.json", function() {
        })
        .done(function(data) {
            getCaseData().then(caseData => {
                let cases = {};
                for (let key in data) {
                    cases[key] = [0, 0];
                    const siteArray = data[key]['byPrimarySite'];
                    siteArray.forEach(siteItem => {
                        caseData.forEach(caseItem => {
                            if (caseItem['key'].toLowerCase() === siteItem.toLowerCase()) {
                                cases[key][0] += parseInt(caseItem['doc_count']);
                                cases[key][1] += parseInt(caseItem['files']);
                            }
                        });
                    });
                }
                dataResponse = Object.entries(cases).map(([id, [cases, files]]) => ({
                    id,
                    cases,
                    files
                }));
                let newData = dataResponse.map(item => item.cases);
                chart.data.datasets[0].data = newData;
                chart.update();
            }).catch(error => {
                console.error('There was a problem fetching the case data:', error);
            });            
        })
        .fail(function() {
            console.log('error');
        });
    }


    function getCaseData() {                                                                                                                                                                                                                    
        const url = 'https://api.gdc.cancer.gov/v0/graphql/HumanBody?hash=f17e72f7b92417006e341859e334b4fc';                                                                                                                                    
        const body = {                                                                                                                                                                                                                          
            "query":"query HumanBody_relayQuery {\nviewer {\nrepository {\nfiles {\naggregations {\ncases__primary_site {\nbuckets {\ndoc_count\nkey\n}\n}\n}\n}\ncases {\naggregations {\nprimary_site {\nbuckets {\ndoc_count\nkey\n}\n}\n}\n}\n}\n}\n}\n","variables":{}                                                                            
        };                                                                                                   
                                                                                                             
        // Return a promise to properly handle the asynchronous nature of the AJAX request                   
        return new Promise(function(resolve, reject) {                                                       
            $.post(url, body, function(response) {                                                           
                const cases = {};                                                                            
                const primarySites = response.data.viewer.repository.cases.aggregations.primary_site.buckets;
                const files = response.data.viewer.repository.files.aggregations.cases__primary_site.buckets;
                                                                                         
                // Create a map of file counts by key                                    
                const fileCountsByKey = {};                                              
                files.forEach(file => {                                                    
                    fileCountsByKey[file.key] = file.doc_count;                            
                });                                                                                                 
                                                                                                                    
                // Iterate over primary sites to populate the cases object                                          
                primarySites.forEach(primarySite => {                                                               
                    const key = primarySite.key;                                                                    
                    const docCount = primarySite.doc_count;                                                         
                    const filesCount = fileCountsByKey[key] || 0;                                                   
                                                                                                                                                                   
                    cases[key] = [docCount, filesCount];                                                                                                           
                });                                                                                                                                                
                                                                                                                                                                   
                // Convert the cases object to an array of objects                                                                                                 
                const result = Object.entries(cases).map(([id, [doc_count, files]]) => ({                                                                          
                    key: id,                                                                                                                                       
                    doc_count: doc_count,                                                                                                                          
                    files: files                                                                                                                                   
                }));                                                                                                                                                                                                                            
                                                                                                                                                                   
                resolve(result); // Resolve the promise with the result                                                                                            
            }).fail(function() {                                                                                                                                   
                reject(new Error('There was a problem fetching the case data')); // Reject the promise with an error                                               
            });                                                                                                                                                    
        });                                                                                                                                                        
    } 
    

    function getProjects() {
        const humanbody_url = 'https://api.gdc.cancer.gov/projects?facets=project_id,primary_site,disease_type,program.name,summary.case_count,summary.file_count';
        fetch(humanbody_url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let aggregations = data.data.aggregations;
            $('#diseaseTypes')[0].innerHTML = aggregations.disease_type.buckets.length.toLocaleString();
            $('#primarySites')[0].innerHTML = aggregations.primary_site.buckets.length.toLocaleString();
            $('#projects')[0].innerHTML = aggregations.project_id.buckets.length.toLocaleString();
            $('#cases')[0].innerHTML = aggregations['summary.case_count']['stats']['sum'].toLocaleString();
            $('#programs')[0].innerHTML = aggregations['program.name']['buckets'].length.toLocaleString();
        })
        .catch(error => {
            console.error('There was a problem fetching the human body data:', error);
        });
    }



})(jQuery, Drupal);
