(function($, Drupal) {
    let humanBodyData = {};
    let dataResponse = [];
    let chart;

    Drupal.behaviors.gdcChartGdcChart = {
        attach: function(context, settings) {
            once('gdcChartGdcChart', 'html').forEach(function(element) {
                $(document).ready(function() {
                    initialize();
                });
            });
        },
    };

    async function initialize() {
        try {
            await getProjects();
            await getHumanBodyData();
            //displayChart();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

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
                animation: {
                    animateScale:true
                },
                onClick: function(event, elements) {
                    if (elements.length > 0) {
                        var url = 'https://portal.gdc.cancer.gov/';
                        window.open(url, '_blank');
                    }
                },
                onHover: function(event, elements) {
                    if (elements && elements.length) {
                        ctx.style.cursor = 'pointer';
                    } else {
                        ctx.style.cursor = 'default';
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
                                return ` ${currentSite['cases'].toLocaleString()} cases (${currentSite['files'].toLocaleString()} Files)`;
                            }
                        }
                    }
                }
            }
        });
    }

    async function getHumanBodyData() {
        try {
            const data = await $.get("/chart/diseasedata.json");
            const caseData = await getCaseData();
            processData(data, caseData);
        } catch (error) {
            console.error('Error fetching human body data:', error);
        }
    }

    function processData(data, caseData) {
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
        displayChart();
        //let newData = dataResponse.map(item => item.cases);
        //chart.data.datasets[0].data = newData;
        //chart.update();
    }

    async function getCaseData() {
        const url = 'https://api.gdc.cancer.gov/v0/graphql/HumanBody?hash=f17e72f7b92417006e341859e334b4fc';
        const body = {
            "query": "query HumanBody_relayQuery {\nviewer {\nrepository {\nfiles {\naggregations {\ncases__primary_site {\nbuckets {\ndoc_count\nkey\n}\n}\n}\n}\ncases {\naggregations {\nprimary_site {\nbuckets {\ndoc_count\nkey\n}\n}\n}\n}\n}\n}\n}",
            "variables": {}
        };

        try {
            const response = await $.post(url, body);
            const cases = {};
            const primarySites = response.data.viewer.repository.cases.aggregations.primary_site.buckets;
            const files = response.data.viewer.repository.files.aggregations.cases__primary_site.buckets;

            const fileCountsByKey = {};
            files.forEach(file => {
                fileCountsByKey[file.key] = file.doc_count;
            });

            primarySites.forEach(primarySite => {
                const key = primarySite.key;
                const docCount = primarySite.doc_count;
                const filesCount = fileCountsByKey[key] || 0;

                cases[key] = [docCount, filesCount];
            });

            const result = Object.entries(cases).map(([id, [doc_count, files]]) => ({
                key: id,
                doc_count: doc_count,
                files: files
            }));

            return result;
        } catch (error) {
            throw new Error('There was a problem fetching the case data');
        }
    }

    async function getProjects() {
        const humanbody_url = 'https://api.gdc.cancer.gov/projects?facets=project_id,primary_site,disease_type,program.name,summary.case_count,summary.file_count';
        try {
            const response = await fetch(humanbody_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            let aggregations = data.data.aggregations;
            $('#primarySites')[0].innerHTML = aggregations.primary_site.buckets.filter(item => item.key !== '_missing').length.toLocaleString();
            $('#projects')[0].innerHTML = aggregations.project_id.buckets.length.toLocaleString();
            $('#cases')[0].innerHTML = aggregations['summary.case_count']['stats']['sum'].toLocaleString();
            $('#programs')[0].innerHTML = aggregations['program.name']['buckets'].length.toLocaleString();
        } catch (error) {
            console.error('There was a problem fetching the human body data:', error);
        }
    }

})(jQuery, Drupal);

