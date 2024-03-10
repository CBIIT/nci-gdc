/**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
 * @file                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
 * gdc_chart behaviors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
 */


var humanBodyData = {"Adrenal Gland":{"byPrimarySite":["Adrenal gland"],"byTissueOrOrganOfOrigin":["Adrenal gland, NOS","Cortex of adrenal gland","Medulla of adrenal gland"]},"Bile Duct":{"byPrimarySite":["Other and unspecified parts of biliary tract"],"byTissueOrOrganOfOrigin":["Ampulla of Vater","Biliary tract, NOS","Extrahepatic bile duct","Overlapping lesion of biliary tract"]},"Bladder":{"byPrimarySite":["Bladder"],"byTissueOrOrganOfOrigin":["Anterior wall of bladder","Bladder neck","Bladder, NOS","Dome of bladder","Lateral wall of bladder","Overlapping lesion of bladder","Posterior wall of bladder","Trigone of bladder","Urachus","Ureteric orifice"]},"Bone":{"byPrimarySite":["Bones, joints and articular cartilage of limbs","Bones, joints and articular cartilage of other and unspecified sites","Other and ill-defined sites"],"byTissueOrOrganOfOrigin":["Bone of limb, NOS","Bone, NOS","Bones of skull and face and associated joints","Long bones of lower limb and associated joints","Long bones of upper limb, scapula and associated joints","Mandible","Overlapping lesion of bones, joints and articular cartilage of limbs","Overlapping lesion of bones, joints and articular cartilage","Pelvic bones, sacrum, coccyx and associated joints","Pelvis, NOS","Rib, sternum, clavicle and associated joints","Short bones of lower limb and associated joints","Short bones of upper limb and associated joints","Vertebral column"]},"Bone Marrow and Blood":{"byPrimarySite":["Hematopoietic and reticuloendothelial systems"],"byTissueOrOrganOfOrigin":["Blood","Bone marrow","Hematopoietic system, NOS","Reticuloendothelial system, NOS","Spleen"]},"Brain":{"byPrimarySite":["Brain"],"byTissueOrOrganOfOrigin":["Brain stem","Brain, NOS","Cerebellum, NOS","Cerebrum","Frontal lobe","Occipital lobe","Overlapping lesion of brain","Parietal lobe","Temporal lobe","Ventricle, NOS"]},"Breast":{"byPrimarySite":["Breast"],"byTissueOrOrganOfOrigin":["Axillary tail of breast","Breast, NOS","Central portion of breast","Lower-inner quadrant of breast","Lower-outer quadrant of breast","Nipple","Overlapping lesion of breast","Upper-inner quadrant of breast","Upper-outer quadrant of breast"]},"Cervix":{"byPrimarySite":["Cervix uteri"],"byTissueOrOrganOfOrigin":["Cervix uteri","Endocervix","Exocervix","Overlapping lesion of cervix uteri"]},"Colorectal":{"byPrimarySite":["Colon","Rectosigmoid junction","Rectum"],"byTissueOrOrganOfOrigin":["Appendix","Ascending colon","Cecum","Colon, NOS","Descending colon","Hepatic flexure of colon","Overlapping lesion of colon","Rectosigmoid junction","Rectum, NOS","Sigmoid colon","Splenic flexure of colon","Transverse colon"]},"Esophagus":{"byPrimarySite":["Esophagus"],"byTissueOrOrganOfOrigin":["Abdominal esophagus","Cervical esophagus","Esophagus, NOS","Lower third of esophagus","Middle third of esophagus","Overlapping lesion of esophagus","Thoracic esophagus","Upper third of esophagus"]},"Eye":{"byPrimarySite":["Eye and adnexa"],"byTissueOrOrganOfOrigin":["Choroid","Ciliary body","Conjunctiva","Cornea, NOS","Eye, NOS","Lacrimal gland","Orbit, NOS","Overlapping lesion of eye and adnexa","Retina"]},"Head and Neck":{"byPrimarySite":["Accessory sinuses","Base of tongue","Floor of mouth","Gum","Hypopharynx","Larynx","Lip","Nasal cavity and middle ear","Nasopharynx","Oropharynx","Other and ill-defined sites in lip, oral cavity and pharynx","Other and ill-defined sites","Other and unspecified major salivary glands","Other and unspecified parts of mouth","Other and unspecified parts of tongue","Palate","Parotid gland","Pyriform sinus","Tonsil","Trachea"],"byTissueOrOrganOfOrigin":["Accessory sinus, NOS","Anterior 2/3 of tongue, NOS","Anterior floor of mouth","Anterior surface of epiglottis","Anterior wall of nasopharynx","Base of tongue, NOS","Border of tongue","Branchial cleft","Cheek mucosa","Commissure of lip","Dorsal surface of tongue, NOS","Ethmoid sinus","External lip, NOS","External lower lip","External upper lip","Floor of mouth, NOS","Frontal sinus","Glottis","Gum, NOS","Hard palate","Head, face or neck, NOS","Hypopharyngeal aspect of aryepiglottic fold","Hypopharynx, NOS","Laryngeal cartilage","Larynx, NOS","Lateral floor of mouth","Lateral wall of nasopharynx","Lateral wall of oropharynx","Lingual tonsil","Lip, NOS","Lower gum","Major salivary gland, NOS","Maxillary sinus","Middle ear","Mouth, NOS","Mucosa of lip, NOS","Mucosa of lower lip","Mucosa of upper lip","Nasal cavity","Nasopharynx, NOS","Oropharynx, NOS","Overlapping lesion of accessory sinuses","Overlapping lesion of floor of mouth","Overlapping lesion of hypopharynx","Overlapping lesion of larynx","Overlapping lesion of lip, oral cavity and pharynx","Overlapping lesion of lip","Overlapping lesion of major salivary glands","Overlapping lesion of nasopharynx","Overlapping lesion of other and unspecified parts of mouth","Overlapping lesion of palate","Overlapping lesion of tongue","Overlapping lesion of tonsil","Overlapping lesions of oropharynx","Palate, NOS","Parotid gland","Pharynx, NOS","Postcricoid region","Posterior wall of hypopharynx","Posterior wall of nasopharynx","Posterior wall of oropharynx","Pyriform sinus","Retromolar area","Soft palate, NOS","Sphenoid sinus","Subglottis","Sublingual gland","Submandibular gland","Superior wall of nasopharynx","Supraglottis","Tongue, NOS","Tonsil, NOS","Tonsillar fossa","Tonsillar pillar","Trachea","Upper Gum","Uvula","Vallecula","Ventral surface of tongue, NOS","Vestibule of mouth","Waldeyer ring"]},"Kidney":{"byPrimarySite":["Kidney"],"byTissueOrOrganOfOrigin":["Kidney, NOS"]},"Liver":{"byPrimarySite":["Liver and intrahepatic bile ducts"],"byTissueOrOrganOfOrigin":["intrahepatic bile duct","Liver"]},"Lung":{"byPrimarySite":["Bronchus and lung"],"byTissueOrOrganOfOrigin":["Lower lobe, lung","Lung, NOS","Main bronchus","Middle lobe, lung","Overlapping lesion of lung","Upper lobe, lung"]},"Lymph Nodes":{"byPrimarySite":["Lymph nodes"],"byTissueOrOrganOfOrigin":["Intra-abdominal lymph nodes","Intrathoracic lymph nodes","Lymph node, NOS","Lymph nodes of axilla or arm","Lymph nodes of head, face and neck","Lymph nodes of inguinal region or leg","Lymph nodes of multiple regions","Pelvic lymph nodes"]},"Nervous System":{"byPrimarySite":["Meninges","Peripheral nerves and autonomic nervous system","Spinal cord, cranial nerves, and other parts of central nervous system"],"byTissueOrOrganOfOrigin":["Acoustic nerve","Autonomic nervous system, NOS","Cauda equina","Cerebral meninges","Cranial nerve, NOS","Meninges, NOS","Nervous system, NOS","Olfactory nerve","Optic nerve","Overlapping lesion of brain and central nervous system","Overlapping lesion of peripheral nerves and autonomic nervous system","Peripheral nerves and autonomic nervous system of abdomen","Peripheral nerves and autonomic nervous system of head, face, and neck","Peripheral nerves and autonomic nervous system of lower limb and hip","Peripheral nerves and autonomic nervous system of pelvis","Peripheral nerves and autonomic nervous system of thorax","Peripheral nerves and autonomic nervous system of trunk, NOS","Peripheral nerves and autonomic nervous system of upper limb and shoulder","Spinal cord","Spinal meninges"]},"Not Reported":{"byPrimarySite":["Not Reported","unknown"],"byTissueOrOrganOfOrigin":["Not Reported","unknown"]},"Other and Ill-defined Sites":{"byPrimarySite":["Anus and anal canal","Gallbladder","Other and ill-defined digestive organs","Other and ill-defined sites within respiratory system and intrathoracic organs","Other and ill-defined sites","Other and unspecified female genital organs","Other and unspecified male genital organs","Other and unspecified urinary organs","Other endocrine glands and related structures","Penis","Placenta","Renal pelvis","Retroperitoneum and peritoneum","Unknown primary site","Ureter","Vagina","Vulva"],"byTissueOrOrganOfOrigin":["Abdomen, NOS","Anal canal","Anus, NOS","Aortic body and other paraganglia","Body of penis","Broad ligament","Carotid body","Clitoris","Cloacogenic zone","Craniopharyngeal duct","Endocrine gland, NOS","Epididymis","Fallopian tube","Female genital tract, NOS","Gallbladder","Gastrointestinal tract, NOS","Glans penis","Ill-defined sites within respiratory system","Intestinal tract, NOS","Labium majus","Labium minus","Lower limb, NOS","Male genital organs, NOS","Other ill-defined sites","Other specified parts of female genital organs","Other specified parts of male genital organs","Overlapping lesion of digestive system","Overlapping lesion of endocrine glands and related structures","Overlapping lesion of female genital organs","Overlapping lesion of ill-defined sites","Overlapping lesion of male genital organs","Overlapping lesion of penis","Overlapping lesion of rectum, anus and anal canal","Overlapping lesion of respiratory system and intrathoracic organs","Overlapping lesion of retroperitoneum and peritoneum","Overlapping lesion of urinary organs","Overlapping lesion of vulva","Parametrium","Parathyroid gland","Paraurethral gland","Penis, NOS","Peritoneum, NOS","Pineal gland","Pituitary gland","Placenta","Prepuce","Renal pelvis","Retroperitoneum","Round ligament","Scrotum, NOS","Specified parts of peritoneum","Spermatic cord","Thorax, NOS","Unknown primary site","Upper limb, NOS","Upper respiratory tract, NOS","Ureter","Urethra","Urinary system, NOS","Uterine adnexa","Vagina, NOS","Vulva, NOS"]},"Ovary":{"byPrimarySite":["Ovary"],"byTissueOrOrganOfOrigin":["Ovary"]},"Pancreas":{"byPrimarySite":["Pancreas"],"byTissueOrOrganOfOrigin":["Body of pancreas","Head of pancreas","Islets of Langerhans","Other specified parts of pancreas","Overlapping lesion of pancreas","Pancreas, NOS","Pancreatic duct","Tail of pancreas"]},"Pleura":{"byPrimarySite":["Heart, mediastinum, and pleura"],"byTissueOrOrganOfOrigin":["Anterior mediastinum","Heart","Mediastinum, NOS","Overlapping lesion of heart, mediastinum and pleura","Pleura, NOS","Posterior mediastinum"]},"Prostate":{"byPrimarySite":["Prostate gland"],"byTissueOrOrganOfOrigin":["Prostate gland"]},"Skin":{"byPrimarySite":["Skin"],"byTissueOrOrganOfOrigin":["External ear","Eyelid","Overlapping lesion of skin","Skin of lip, NOS","Skin of lower limb and hip","Skin of other and unspecified parts of face","Skin of scalp and neck","Skin of trunk","Skin of upper limb and shoulder","Skin, NOS"]},"Soft Tissue":{"byPrimarySite":["Connective, subcutaneous and other soft tissues"],"byTissueOrOrganOfOrigin":["Connective, Subcutaneous and other soft tissues of abdomen","Connective, Subcutaneous and other soft tissues of head, face, and neck","Connective, Subcutaneous and other soft tissues of lower limb and hip","Connective, Subcutaneous and other soft tissues of pelvis","Connective, Subcutaneous and other soft tissues of thorax","Connective, Subcutaneous and other soft tissues of trunk, NOS","Connective, Subcutaneous and other soft tissues of upper limb and shoulder","Connective, Subcutaneous and other soft tissues, NOS","Overlapping lesion of connective, subcutaneous and other soft tissues"]},"Stomach":{"byPrimarySite":["Small intestine","Stomach"],"byTissueOrOrganOfOrigin":["Body of stomach","Cardia, NOS","Duodenum","Fundus of stomach","Gastric antrum","Greater curvature of stomach, NOS","Ileum","Jejunum","Lesser curvature of stomach, NOS","Meckel diverticulum","Overlapping lesion of small intestine","Overlapping lesion of stomach","Pylorus","Small intestine, NOS","Stomach, NOS"]},"Testis":{"byPrimarySite":["Testis"],"byTissueOrOrganOfOrigin":["Descended testis","Testis, NOS","Undescended testis"]},"Thymus":{"byPrimarySite":["Thymus"],"byTissueOrOrganOfOrigin":["Thymus"]},"Thyroid":{"byPrimarySite":["Thyroid gland"],"byTissueOrOrganOfOrigin":["Thyroid gland"]},"Uterus":{"byPrimarySite":["Corpus uteri","Uterus, NOS"],"byTissueOrOrganOfOrigin":["Corpus uteri","Endometrium","Fundus uteri","Isthmus uteri","Myometrium","Overlapping lesion of corpus uteri","Uterus, NOS"]}}

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
        var data = humanBodyData;                              
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
            console.log('done2');
        }).catch(error => {
            console.error('There was a problem fetching the case data:', error);
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
            const fileCountsByKey = {};
            files.forEach(file => {
                fileCountsByKey[file.key] = file.doc_count;
            });                                                                                                                                                  
            const result = buckets.map(bucket => ({
                key: bucket.key,
                doc_count: bucket.doc_count,
                files: fileCountsByKey[bucket.key] || 0                      
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
