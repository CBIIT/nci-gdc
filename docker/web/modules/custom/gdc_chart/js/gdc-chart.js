/**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
 * @file                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
 * gdc_chart behaviors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
 */


var dataResponse = [{
    id: 'Adrenal Gland',
    cases: 721,
    files: 15701
}, {
    id: 'Bile Duct',
    cases: 92,
    files: 1129
}, {
    id: 'Bladder',
    cases: 763,
    files: 24581
}, {
    id: 'Bone',
    cases: 1171,
    files: 12741
}, {
    id: 'Bone Marrow and Blood',
    cases: 8395,
    files: 174788
}, {
    id: 'Brain',
    cases: 1310,
    files: 59710
}, {
    id: 'Breast',
    cases: 4094,
    files: 79909
}, {
    id: 'Cervix',
    cases: 669,
    files: 23029
}, {
    id: 'Colorectal',
    cases: 2988,
    files: 50312
}, {
    id: 'Esophagus',
    cases: 682,
    files: 14021
}, {
    id: 'Eye',
    cases: 114,
    files: 4653
}, {
    id: 'Head and Neck',
    cases: 1683,
    files: 40296
}, {
    id: 'Kidney',
    cases: 2427,
    files: 77674
}, {
    id: 'Liver',
    cases: 855,
    files: 24883
}, {
    id: 'Lung',
    cases: 5415,
    files: 96089
}, {
    id: 'Lymph Nodes',
    cases: 538,
    files: 6963
}, {
    id: 'Nervous System',
    cases: 1126,
    files: 3482
}, {
    id: 'Not Reported',
    cases: 2051,
    files: 7700
}, {
    id: 'Other and Ill-defined Sites',
    cases: 1736,
    files: 19928
}, {
    id: 'Ovary',
    cases: 1645,
    files: 34104
}, {
    id: 'Pancreas',
    cases: 1209,
    files: 26865
}, {
    id: 'Pleura',
    cases: 387,
    files: 7413
}, {
    id: 'Prostate',
    cases: 889,
    files: 31071
}, {
    id: 'Skin',
    cases: 838,
    files: 27536
}, {
    id: 'Soft Tissue',
    cases: 154,
    files: 7601
}, {
    id: 'Stomach',
    cases: 948,
    files: 28725
}, {
    id: 'Testis',
    cases: 286,
    files: 10427
}, {
    id: 'Thymus',
    cases: 191,
    files: 5286
}, {
    id: 'Thyroid',
    cases: 1125,
    files: 40533
}, {
    id: 'Uterus',
    cases: 1305,
    files: 47954
}];

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
                    backgroundColor: ["#BE2F2C", "#FFFFFF", "#82B9FF", "#B5B5B5", "#FFFF4F", "#1599E3", "#DF2EBD", "#D7205D", "#FF9053", "#4D9E3B", "#FFFFFF", "#FEA734", "#28C156", "#5BF6E8", "#9E08DB", "#F755EB", "#348BFF", "#3890CD", "#FF0000", "#5DEE46", "#DF4FE8", "#F0D570", "#55BFE6", "#FF42CF", "#FDF757", "#DEAF35", "#F39553", "#55F8E5", "#E04B7B", "#FF79B2"],
                    hoverBorderColor: '#000',
                    hoverBorderWidth: 3,
                }],

            },
            options: {
                onClick: function(event, elements) {
                    if (elements.length > 0) {
                        var url = 'https://portal.gdc.cancer.gov/'; // Define your URL for each segment here
                        window.open(url, '_blank'); // Open link in a new tab
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
                                // var value = data.datasets[datasetIndex].data[index].toLocaleString();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
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
        const humanbody_url = '/system/files/public/file/humanbody.json';
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
                // Call getCaseData() and handle its response                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
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
                    chart.options.animation = {duration: 0};
                    chart.update();
                }).catch(error => {
                    console.error('There was a problem fetching the case data:', error);
                });

            })
            .catch(error => {
                console.error('There was a problem fetching the human body data:', error);
            });
    }

    function getCaseData() {
        const url = 'https://api.gdc.cancer.gov/v0/graphql/HumanBody?hash=f17e72f7b92417006e341859e334b4fc';
        const body = {
            "query": "query HumanBody_relayQuery {\nviewer {\nrepository {\nfiles {\naggregations {\ncases__primary_site {\nbuckets {\ndoc_count\nkey\n}\n}\n}\n}\ncases {\naggregations {\nprimary_site {\nbuckets {\ndoc_count\nkey\n}\n}\n}\n}\n}\n}\n}\n",
            "variables": {}
        }

        return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const buckets = data.data.viewer.repository.cases.aggregations.primary_site.buckets;
                const files = data.data.viewer.repository.files.aggregations.cases__primary_site.buckets;
                // Create a map to store file counts by key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                const fileCountsByKey = {};
                files.forEach(file => {
                    fileCountsByKey[file.key] = file.doc_count;
                });
                // Map the buckets array and add file counts for each key                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                const result = buckets.map(bucket => ({
                    key: bucket.key,
                    doc_count: bucket.doc_count,
                    files: fileCountsByKey[bucket.key] || 0 // If no matching file count found, default to 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                }));
                return result;
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
