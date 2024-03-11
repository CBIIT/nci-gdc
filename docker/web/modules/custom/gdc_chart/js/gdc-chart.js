/**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
 * @file                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
 * gdc_chart behaviors.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
 */



var humanBodyData = {
   "Bone Marrow and Blood":{
      "byPrimarySite":[
         "Hematopoietic and reticuloendothelial systems"
      ],
      "byTissueOrOrganOfOrigin":[
         "Blood",
         "Bone marrow",
         "Hematopoietic system, NOS",
         "Reticuloendothelial system, NOS",
         "Spleen"
      ]
   },   
   "Lung":{
      "byPrimarySite":[
         "Bronchus and lung"
      ],
      "byTissueOrOrganOfOrigin":[
         "Lower lobe, lung",
         "Lung, NOS",
         "Main bronchus",
         "Middle lobe, lung",
         "Overlapping lesion of lung",
         "Upper lobe, lung"
      ]
   }, 
   "Breast":{
      "byPrimarySite":[
         "Breast"
      ],
      "byTissueOrOrganOfOrigin":[
         "Axillary tail of breast",
         "Breast, NOS",
         "Central portion of breast",
         "Lower-inner quadrant of breast",
         "Lower-outer quadrant of breast",
         "Nipple",
         "Overlapping lesion of breast",
         "Upper-inner quadrant of breast",
         "Upper-outer quadrant of breast"
      ]
   },   
   "Colorectal":{
      "byPrimarySite":[
         "Colon",
         "Rectosigmoid junction",
         "Rectum"
      ],
      "byTissueOrOrganOfOrigin":[
         "Appendix",
         "Ascending colon",
         "Cecum",
         "Colon, NOS",
         "Descending colon",
         "Hepatic flexure of colon",
         "Overlapping lesion of colon",
         "Rectosigmoid junction",
         "Rectum, NOS",
         "Sigmoid colon",
         "Splenic flexure of colon",
         "Transverse colon"
      ]
   },  
   "Kidney":{
      "byPrimarySite":[
         "Kidney"
      ],
      "byTissueOrOrganOfOrigin":[
         "Kidney, NOS"
      ]
   }, 
   "Not Reported":{
      "byPrimarySite":[
         "Not Reported",
         "unknown"
      ],
      "byTissueOrOrganOfOrigin":[
         "Not Reported",
         "unknown"
      ]
   },
   "Ovary":{
      "byPrimarySite":[
         "Ovary"
      ],
      "byTissueOrOrganOfOrigin":[
         "Ovary"
      ]
   },   
   "Brain":{
      "byPrimarySite":[
         "Brain"
      ],
      "byTissueOrOrganOfOrigin":[
         "Brain stem",
         "Brain, NOS",
         "Cerebellum, NOS",
         "Cerebrum",
         "Frontal lobe",
         "Occipital lobe",
         "Overlapping lesion of brain",
         "Parietal lobe",
         "Temporal lobe",
         "Ventricle, NOS"
      ]
   },   
   "Pancreas":{
      "byPrimarySite":[
         "Pancreas"
      ],
      "byTissueOrOrganOfOrigin":[
         "Body of pancreas",
         "Head of pancreas",
         "Islets of Langerhans",
         "Other specified parts of pancreas",
         "Overlapping lesion of pancreas",
         "Pancreas, NOS",
         "Pancreatic duct",
         "Tail of pancreas"
      ]
   },  
   "Thyroid":{
      "byPrimarySite":[
         "Thyroid gland"
      ],
      "byTissueOrOrganOfOrigin":[
         "Thyroid gland"
      ]
   },    
   "Nervous System":{
      "byPrimarySite":[
         "Meninges",
         "Peripheral nerves and autonomic nervous system",
         "Spinal cord, cranial nerves, and other parts of central nervous system"
      ],
      "byTissueOrOrganOfOrigin":[
         "Acoustic nerve",
         "Autonomic nervous system, NOS",
         "Cauda equina",
         "Cerebral meninges",
         "Cranial nerve, NOS",
         "Meninges, NOS",
         "Nervous system, NOS",
         "Olfactory nerve",
         "Optic nerve",
         "Overlapping lesion of brain and central nervous system",
         "Overlapping lesion of peripheral nerves and autonomic nervous system",
         "Peripheral nerves and autonomic nervous system of abdomen",
         "Peripheral nerves and autonomic nervous system of head, face, and neck",
         "Peripheral nerves and autonomic nervous system of lower limb and hip",
         "Peripheral nerves and autonomic nervous system of pelvis",
         "Peripheral nerves and autonomic nervous system of thorax",
         "Peripheral nerves and autonomic nervous system of trunk, NOS",
         "Peripheral nerves and autonomic nervous system of upper limb and shoulder",
         "Spinal cord",
         "Spinal meninges"
      ]
   },   
   "Prostate":{
      "byPrimarySite":[
         "Prostate gland"
      ],
      "byTissueOrOrganOfOrigin":[
         "Prostate gland"
      ]
   },  
   "Stomach":{
      "byPrimarySite":[
         "Small intestine",
         "Stomach"
      ],
      "byTissueOrOrganOfOrigin":[
         "Body of stomach",
         "Cardia, NOS",
         "Duodenum",
         "Fundus of stomach",
         "Gastric antrum",
         "Greater curvature of stomach, NOS",
         "Ileum",
         "Jejunum",
         "Lesser curvature of stomach, NOS",
         "Meckel diverticulum",
         "Overlapping lesion of small intestine",
         "Overlapping lesion of stomach",
         "Pylorus",
         "Small intestine, NOS",
         "Stomach, NOS"
      ]
   }, 
   "Liver":{
      "byPrimarySite":[
         "Liver and intrahepatic bile ducts"
      ],
      "byTissueOrOrganOfOrigin":[
         "intrahepatic bile duct",
         "Liver"
      ]
   },  
   "Other and Ill-defined Sites":{
      "byPrimarySite":[
         "Anus and anal canal",
         "Gallbladder",
         "Other and ill-defined digestive organs",
         "Other and ill-defined sites within respiratory system and intrathoracic organs",
         "Other and ill-defined sites",
         "Other and unspecified female genital organs",
         "Other and unspecified male genital organs",
         "Other and unspecified urinary organs",
         "Other endocrine glands and related structures",
         "Penis",
         "Placenta",
         "Renal pelvis",
         "Retroperitoneum and peritoneum",
         "Unknown primary site",
         "Ureter",
         "Vagina",
         "Vulva"
      ],
      "byTissueOrOrganOfOrigin":[
         "Abdomen, NOS",
         "Anal canal",
         "Anus, NOS",
         "Aortic body and other paraganglia",
         "Body of penis",
         "Broad ligament",
         "Carotid body",
         "Clitoris",
         "Cloacogenic zone",
         "Craniopharyngeal duct",
         "Endocrine gland, NOS",
         "Epididymis",
         "Fallopian tube",
         "Female genital tract, NOS",
         "Gallbladder",
         "Gastrointestinal tract, NOS",
         "Glans penis",
         "Ill-defined sites within respiratory system",
         "Intestinal tract, NOS",
         "Labium majus",
         "Labium minus",
         "Lower limb, NOS",
         "Male genital organs, NOS",
         "Other ill-defined sites",
         "Other specified parts of female genital organs",
         "Other specified parts of male genital organs",
         "Overlapping lesion of digestive system",
         "Overlapping lesion of endocrine glands and related structures",
         "Overlapping lesion of female genital organs",
         "Overlapping lesion of ill-defined sites",
         "Overlapping lesion of male genital organs",
         "Overlapping lesion of penis",
         "Overlapping lesion of rectum, anus and anal canal",
         "Overlapping lesion of respiratory system and intrathoracic organs",
         "Overlapping lesion of retroperitoneum and peritoneum",
         "Overlapping lesion of urinary organs",
         "Overlapping lesion of vulva",
         "Parametrium",
         "Parathyroid gland",
         "Paraurethral gland",
         "Penis, NOS",
         "Peritoneum, NOS",
         "Pineal gland",
         "Pituitary gland",
         "Placenta",
         "Prepuce",
         "Renal pelvis",
         "Retroperitoneum",
         "Round ligament",
         "Scrotum, NOS",
         "Specified parts of peritoneum",
         "Spermatic cord",
         "Thorax, NOS",
         "Unknown primary site",
         "Upper limb, NOS",
         "Upper respiratory tract, NOS",
         "Ureter",
         "Urethra",
         "Urinary system, NOS",
         "Uterine adnexa",
         "Vagina, NOS",
         "Vulva, NOS"
      ]
   },   
   "Skin":{
      "byPrimarySite":[
         "Skin"
      ],
      "byTissueOrOrganOfOrigin":[
         "External ear",
         "Eyelid",
         "Overlapping lesion of skin",
         "Skin of lip, NOS",
         "Skin of lower limb and hip",
         "Skin of other and unspecified parts of face",
         "Skin of scalp and neck",
         "Skin of trunk",
         "Skin of upper limb and shoulder",
         "Skin, NOS"
      ]
   },   
   "Bladder":{
      "byPrimarySite":[
         "Bladder"
      ],
      "byTissueOrOrganOfOrigin":[
         "Anterior wall of bladder",
         "Bladder neck",
         "Bladder, NOS",
         "Dome of bladder",
         "Lateral wall of bladder",
         "Overlapping lesion of bladder",
         "Posterior wall of bladder",
         "Trigone of bladder",
         "Urachus",
         "Ureteric orifice"
      ]
   },       
   "Adrenal Gland":{
      "byPrimarySite":[
         "Adrenal gland"
      ],
      "byTissueOrOrganOfOrigin":[
         "Adrenal gland, NOS",
         "Cortex of adrenal gland",
         "Medulla of adrenal gland"
      ]
   },
   "Uterus":{
      "byPrimarySite":[
         "Corpus uteri",
         "Uterus, NOS"
      ],
      "byTissueOrOrganOfOrigin":[
         "Corpus uteri",
         "Endometrium",
         "Fundus uteri",
         "Isthmus uteri",
         "Myometrium",
         "Overlapping lesion of corpus uteri",
         "Uterus, NOS"
      ]
   },
   "Esophagus":{
      "byPrimarySite":[
         "Esophagus"
      ],
      "byTissueOrOrganOfOrigin":[
         "Abdominal esophagus",
         "Cervical esophagus",
         "Esophagus, NOS",
         "Lower third of esophagus",
         "Middle third of esophagus",
         "Overlapping lesion of esophagus",
         "Thoracic esophagus",
         "Upper third of esophagus"
      ]
   }, 
   "Cervix":{
      "byPrimarySite":[
         "Cervix uteri"
      ],
      "byTissueOrOrganOfOrigin":[
         "Cervix uteri",
         "Endocervix",
         "Exocervix",
         "Overlapping lesion of cervix uteri"
      ]
   },  
   "Lymph Nodes":{
      "byPrimarySite":[
         "Lymph nodes"
      ],
      "byTissueOrOrganOfOrigin":[
         "Intra-abdominal lymph nodes",
         "Intrathoracic lymph nodes",
         "Lymph node, NOS",
         "Lymph nodes of axilla or arm",
         "Lymph nodes of head, face and neck",
         "Lymph nodes of inguinal region or leg",
         "Lymph nodes of multiple regions",
         "Pelvic lymph nodes"
      ]
   },  
   "Pleura":{
      "byPrimarySite":[
         "Heart, mediastinum, and pleura"
      ],
      "byTissueOrOrganOfOrigin":[
         "Anterior mediastinum",
         "Heart",
         "Mediastinum, NOS",
         "Overlapping lesion of heart, mediastinum and pleura",
         "Pleura, NOS",
         "Posterior mediastinum"
      ]
   },      
   "Testis":{
      "byPrimarySite":[
         "Testis"
      ],
      "byTissueOrOrganOfOrigin":[
         "Descended testis",
         "Testis, NOS",
         "Undescended testis"
      ]
   },  
   "Bone":{
      "byPrimarySite":[
         "Bones, joints and articular cartilage of limbs",
         "Bones, joints and articular cartilage of other and unspecified sites",
         "Other and ill-defined sites"
      ],
      "byTissueOrOrganOfOrigin":[
         "Bone of limb, NOS",
         "Bone, NOS",
         "Bones of skull and face and associated joints",
         "Long bones of lower limb and associated joints",
         "Long bones of upper limb, scapula and associated joints",
         "Mandible",
         "Overlapping lesion of bones, joints and articular cartilage of limbs",
         "Overlapping lesion of bones, joints and articular cartilage",
         "Pelvic bones, sacrum, coccyx and associated joints",
         "Pelvis, NOS",
         "Rib, sternum, clavicle and associated joints",
         "Short bones of lower limb and associated joints",
         "Short bones of upper limb and associated joints",
         "Vertebral column"
      ]
   }, 
   "Head and Neck":{
      "byPrimarySite":[
         "Accessory sinuses",
         "Base of tongue",
         "Floor of mouth",
         "Gum",
         "Hypopharynx",
         "Larynx",
         "Lip",
         "Nasal cavity and middle ear",
         "Nasopharynx",
         "Oropharynx",
         "Other and ill-defined sites in lip, oral cavity and pharynx",
         "Other and ill-defined sites",
         "Other and unspecified major salivary glands",
         "Other and unspecified parts of mouth",
         "Other and unspecified parts of tongue",
         "Palate",
         "Parotid gland",
         "Pyriform sinus",
         "Tonsil",
         "Trachea"
      ],
      "byTissueOrOrganOfOrigin":[
         "Accessory sinus, NOS",
         "Anterior 2/3 of tongue, NOS",
         "Anterior floor of mouth",
         "Anterior surface of epiglottis",
         "Anterior wall of nasopharynx",
         "Base of tongue, NOS",
         "Border of tongue",
         "Branchial cleft",
         "Cheek mucosa",
         "Commissure of lip",
         "Dorsal surface of tongue, NOS",
         "Ethmoid sinus",
         "External lip, NOS",
         "External lower lip",
         "External upper lip",
         "Floor of mouth, NOS",
         "Frontal sinus",
         "Glottis",
         "Gum, NOS",
         "Hard palate",
         "Head, face or neck, NOS",
         "Hypopharyngeal aspect of aryepiglottic fold",
         "Hypopharynx, NOS",
         "Laryngeal cartilage",
         "Larynx, NOS",
         "Lateral floor of mouth",
         "Lateral wall of nasopharynx",
         "Lateral wall of oropharynx",
         "Lingual tonsil",
         "Lip, NOS",
         "Lower gum",
         "Major salivary gland, NOS",
         "Maxillary sinus",
         "Middle ear",
         "Mouth, NOS",
         "Mucosa of lip, NOS",
         "Mucosa of lower lip",
         "Mucosa of upper lip",
         "Nasal cavity",
         "Nasopharynx, NOS",
         "Oropharynx, NOS",
         "Overlapping lesion of accessory sinuses",
         "Overlapping lesion of floor of mouth",
         "Overlapping lesion of hypopharynx",
         "Overlapping lesion of larynx",
         "Overlapping lesion of lip, oral cavity and pharynx",
         "Overlapping lesion of lip",
         "Overlapping lesion of major salivary glands",
         "Overlapping lesion of nasopharynx",
         "Overlapping lesion of other and unspecified parts of mouth",
         "Overlapping lesion of palate",
         "Overlapping lesion of tongue",
         "Overlapping lesion of tonsil",
         "Overlapping lesions of oropharynx",
         "Palate, NOS",
         "Parotid gland",
         "Pharynx, NOS",
         "Postcricoid region",
         "Posterior wall of hypopharynx",
         "Posterior wall of nasopharynx",
         "Posterior wall of oropharynx",
         "Pyriform sinus",
         "Retromolar area",
         "Soft palate, NOS",
         "Sphenoid sinus",
         "Subglottis",
         "Sublingual gland",
         "Submandibular gland",
         "Superior wall of nasopharynx",
         "Supraglottis",
         "Tongue, NOS",
         "Tonsil, NOS",
         "Tonsillar fossa",
         "Tonsillar pillar",
         "Trachea",
         "Upper Gum",
         "Uvula",
         "Vallecula",
         "Ventral surface of tongue, NOS",
         "Vestibule of mouth",
         "Waldeyer ring"
      ]
   }, 
   "Thymus":{
      "byPrimarySite":[
         "Thymus"
      ],
      "byTissueOrOrganOfOrigin":[
         "Thymus"
      ]
   },  
   "Soft Tissue":{
      "byPrimarySite":[
         "Connective, subcutaneous and other soft tissues"
      ],
      "byTissueOrOrganOfOrigin":[
         "Connective, Subcutaneous and other soft tissues of abdomen",
         "Connective, Subcutaneous and other soft tissues of head, face, and neck",
         "Connective, Subcutaneous and other soft tissues of lower limb and hip",
         "Connective, Subcutaneous and other soft tissues of pelvis",
         "Connective, Subcutaneous and other soft tissues of thorax",
         "Connective, Subcutaneous and other soft tissues of trunk, NOS",
         "Connective, Subcutaneous and other soft tissues of upper limb and shoulder",
         "Connective, Subcutaneous and other soft tissues, NOS",
         "Overlapping lesion of connective, subcutaneous and other soft tissues"
      ]
   },
   "Eye":{
      "byPrimarySite":[
         "Eye and adnexa"
      ],
      "byTissueOrOrganOfOrigin":[
         "Choroid",
         "Ciliary body",
         "Conjunctiva",
         "Cornea, NOS",
         "Eye, NOS",
         "Lacrimal gland",
         "Orbit, NOS",
         "Overlapping lesion of eye and adnexa",
         "Retina"
      ]
   },          
   "Bile Duct":{
      "byPrimarySite":[
         "Other and unspecified parts of biliary tract"
      ],
      "byTissueOrOrganOfOrigin":[
         "Ampulla of Vater",
         "Biliary tract, NOS",
         "Extrahepatic bile duct",
         "Overlapping lesion of biliary tract"
      ]
   }
}

var dataResponse = [
    {
        id: 'Bone Marrow and Blood',
        cases: 8395,
        files: 174788
    },
    {
        id: 'Lung',
        cases: 5415,
        files: 96089
    },
    {
        id: 'Breast',
        cases: 4094,
        files: 79909
    },
    {
        id: 'Colorectal',
        cases: 2988,
        files: 50312
    },
    {
        id: 'Kidney',
        cases: 2427,
        files: 77674
    },
    {
        id: 'Not Reported',
        cases: 2051,
        files: 7700
    },
    {
        id: 'Ovary',
        cases: 1645,
        files: 34104
    },
    {
        id: 'Brain',
        cases: 1310,
        files: 59710
    },
    {
        id: 'Pancreas',
        cases: 1209,
        files: 26865
    },
    {
        id: 'Thyroid',
        cases: 1125,
        files: 40533
    },
    {
        id: 'Nervous System',
        cases: 1126,
        files: 3482
    },
    {
        id: 'Prostate',
        cases: 889,
        files: 31071
    },
    {
        id: 'Stomach',
        cases: 948,
        files: 28725
    },
    {
        id: 'Liver',
        cases: 855,
        files: 24883
    },
    {
        id: 'Other and Ill-defined Sites',
        cases: 1736,
        files: 19928
    },
    {
        id: 'Skin',
        cases: 838,
        files: 27536
    },
    {
        id: 'Bladder',
        cases: 763,
        files: 24581
    },
    {
        id: 'Adrenal Gland',
        cases: 721,
        files: 15701
    },
    {
        id: 'Uterus',
        cases: 1305,
        files: 47954
    },
    {
        id: 'Esophagus',
        cases: 682,
        files: 14021
    },
    {
        id: 'Cervix',
        cases: 669,
        files: 23029
    },
    {
        id: 'Lymph Nodes',
        cases: 538,
        files: 6963
    },
    {
        id: 'Pleura',
        cases: 387,
        files: 7413
    },
    {
        id: 'Testis',
        cases: 286,
        files: 10427
    },
    {
        id: 'Bone',
        cases: 1171,
        files: 12741
    },
    {
        id: 'Head and Neck',
        cases: 1683,
        files: 40296
    },
    {
        id: 'Thymus',
        cases: 191,
        files: 5286
    },
    {
        id: 'Soft Tissue',
        cases: 154,
        files: 7601
    },
    {
        id: 'Eye',
        cases: 114,
        files: 4653
    },
    {
        id: 'Bile Duct',
        cases: 92,
        files: 1129
    }
];

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
