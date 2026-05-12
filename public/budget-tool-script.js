// ════════════════════════════════════════
// DATA
// ════════════════════════════════════════
var ROLES = [
  {r:'Principal Investigator (PI)',            lv:'PI', sal:150000, indOnly:true},
  {r:'Project Manager',                        lv:'8',  sal:55692},
  {r:'Research Associate',                     lv:'8',  sal:55692},
  {r:'Laboratory Manager',                     lv:'10', sal:69852},
  {r:'Research Assistant',                     lv:'7',  sal:49722},
  {r:'Clinical Research Coordinator (level 6)',lv:'6',  sal:44408},
  {r:'CRC – Baccalaureate Nurse',              lv:'8',  sal:55692},
  {r:'Clinical Research Nurse',                lv:'8',  sal:55692},
  {r:'Nurse',                                  lv:'6',  sal:44408},
  {r:'Coordinator',                            lv:'4',  sal:41551},
  {r:'Administrative Technician',              lv:'5',  sal:45300},
  {r:'Lab Technician',                         lv:'4',  sal:41551},
  {r:'Lab Assistant',                          lv:'1',  sal:29375},
  {r:'Lab Aid',                                lv:'1',  sal:29375},
  {r:'Medical Imaging Technologist',           lv:'6',  sal:44408},
  {r:'Monitor',                                lv:'—',  sal:85000},
  {r:'Programmer',                             lv:'8',  sal:55692},
  {r:'Methodologist',                          lv:'10', sal:69852},
  {r:'Biostatistician – BCU (RI-MUHC, $80/hr)',lv:'—',  sal:0, hr:80},
  {r:'Biostatistician – ACT-CTU OHRI ($250/hr)',lv:'—', sal:0, hr:250},
  {r:'Senior Program Analyst',                 lv:'9',  sal:62390},
  {r:'Data Analyst',                           lv:'7',  sal:49722},
  {r:'Data Entry Clerk',                       lv:'2',  sal:34980},
  {r:'Administrative Assistant',               lv:'4',  sal:41551},
  {r:'Senior Clerk',                           lv:'3',  sal:38129},
  {r:'Junior Assistant',                       lv:'2',  sal:34980},
  {r:'Clinical Research Clerk',                lv:'2',  sal:34980},
  {r:'Clerical Assistant',                     lv:'1',  sal:29375},
  {r:'Postdoc',                                lv:'—',  sal:70000},
  {r:'PhD student',                            lv:'—',  sal:30000},
  {r:'Masters student',                        lv:'—',  sal:28500},
  {r:'Summer student',                         lv:'—',  sal:29000}
];

var SVC_CIM_DATA = [
  {label:"ELECTROCARDIOGRAM",group:"platform",items:[["Supine 12-lead resting ECG - no physician interpretation",16.0,38.0]]},
  {label:"VITAL SIGNS",group:"platform",items:[["Heart rate, blood pressure, SpO2, breathing frequency, temperature",null,20.0],["Arterial stiffness - AtCor SphygmoCor XCEL et CvMS",20.0,82.0],["Blood perfusion and tcpO2/tcpCO2- Perimed PeriFlux 5000 doppler laser",20.0,82.0],["Flow-mediated dilation measures by ultrasound (coming soon)",null,122.0]]},
  {label:"NON-INVASIVE VASCULAR ASSESSMENTS",group:"platform",items:[["Retial vascular assessment- IMEDOS Static Vascular Analysis",null,82.0],["Ankle-brachial blood pressure index- Huntleigh Dopplex",20.0,60.0],["24-hours blood pressure monitoring- Mobil-O-Graph PWA",20.0,60.0],["Spirometry - pre bronchodilator",34.0,43.0],["Add on spirometry - post bronchodilator",17.0,43.0],["Lung volumes by body plethysmography",34.0,43.0],["Lung diffusion capacity (DLCO)",34.0,43.0],["Complete pulmonary function testing (PFT)",69.0,129.0],["Airway resistance and impulse oscilometry",23.0,32.0]]},
  {label:"PULMONARY FUNCTION TEST",group:"platform",items:[["Maximal inspiratory and expiratory pressures (MIP&MEP)",23.0,32.0],["Maximal voluntary ventilation (MVV)",23.0,32.0],["Multiple breath washout",null,80.0],["Aerochamber",6.0,6.0],["Other (e.g. FeNO, nasal peak flow, holter, travel time) hourly rate",null,61.0],["6-min walk test",null,60.0],["Sit to stand test",null,15.0],["4-square step test",null,15.0],["Bailey-III screening test for infant and toddler development",null,60.0],["Performance of upper limb (PUL) test",null,60.0],["Short Physical Performance Battery (SPPB)",null,60.0],["Hand grip strenght test",null,15.0],["Cardio-pulmonary exercise test (CPET) with cycle ergometer",137.0,212.0]]},
  {label:"FUNCTIONAL TEST and EXERCISE PHYSIOLOGY",group:"platform",items:[["Cardio-pulmonary exercise test (CPET) with treadmill",137.0,212.0],["Isokinetic cycle ergometer",null,29.0],["Resting energy expenditure",137.0,212.0],["Exercise training equipment (per training session)",5.0,null],["Other (travel time) hourly rate",null,61.0],["Other (start-up, training) hourly rate",null,61.0],["Other (inspiratory capacity data cleaning, data analysis) hourly rate",null,61.0],["Other (questionnaires, data transfer) hourly rate",null,61.0]]},
  {label:"BIOELECTRICAL IMPEDANCE ANALYSIS (InBody570)",group:"platform",items:[["BIA total body composition",15.0,26.0],["DXA femur bone density",65.0,94.0],["DXA forearm bone density",65.0,94.0]]},
  {label:"DUAL X-RAY ABSORPTIOMETRY",group:"platform",items:[["DXA spine bone density",65.0,94.0],["DXA total body composition",65.0,94.0],["DXA phantom",65.0,94.0],["pQCT tibia",65.0,94.0]]},
  {label:"PERIPHERAL QUANTITATIVE COMPUTED TOMOGRAPHY (pQCT)",group:"platform",items:[["pQCT femur",65.0,94.0],["pQCT radius",65.0,94.0]]},
  {label:"MAGNETIC RESONANCE IMAGING (MRI)",group:"platform",items:[["Head -",null,550.0],["Head +",null,675.0],["Technical assistance",null,65.0],["Head -",null,328.0],["Head +",null,385.0],["Neck -",null,328.0],["Neck +",null,385.0],["Chest -",null,328.0],["Chest +",null,385.0],["Abdomen -",null,328.0],["Abdomen +",null,385.0],["Pelvis -",null,328.0],["Pelvis +",null,385.0],["Chest/abdomen -",null,504.0],["Chest/abdomen +",null,562.0],["Chest/abdomen-pelvis -",null,504.0],["Chest/abdomen-pelvis +",null,562.0]]},
  {label:"COMPUTERIZED TOMOGRAPHY (CT) SCAN",group:"platform",items:[["Abdomen-pelvis -",null,390.0],["Abdomen-pelvis +",null,447.0],["Neck/chest/abdomen -",null,603.0],["Neck/chest/abdomen +",null,660.0],["Neck/chest/abdomen-pelvis -",null,603.0],["Neck/chest/abdomen-pelvis +",null,660.0],["Upper or lower extremity -",null,328.0],["Upper or lower extremity +",null,385.0],["Spine (each segment) -",null,328.0],["Spine (each segment) +",null,385.0],["Extra charge - multiphase CT",null,104.0],["Other (e.g. anonymization and upload of images) hourly rate",null,59.0],["DICOM image copy on a CD",null,13.0],["Study start-up fee",null,520.0],["Only radiologist reading fee - per body area",null,156.0],["Blood draw - above 9 years old - vacutainers not included",null,14.0],["Blood draw - above 9 years old - vacutainers included",null,19.0],["Blood draw - below 9 years old - vacutainers not included",null,19.0],["Blood draw - below 9 years old - vacutainers included",null,23.0],["Extra charge - blood draw for venous blood gas",null,14.0],["Extra charge - blood draw from IV line",null,2.0]]},
  {label:"SPECIMEN COLLECTION",group:"platform",items:[["Extra charge - IV catheter insertion",null,9.0],["Phlebotomy kit preparation (each)",null,5.0],["Nasopharyngeal swabs",null,19.0],["Urine collection",null,13.0],["Urine rapid test- kit not included (such as pregnancy or pH)",null,19.0],["Dry ice",null,41.0],["Specimen processing hourly rate",null,55.0],["Specimen shipping services hourly rate",null,55.0],["Ambiant shipping",null,27.5]]},
  {label:"SPECIMEN PROCESSING AND SHIPPING",group:"platform",items:[["Frozen shipping (dry ice sold separately)",null,27.5],["Refrigerated shipping",null,27.5],["Combo shipping (dry ice sold separately)",null,41.25],["Other (travel time) hourly rate",null,55.0],["Other (start-up, training) hourly rate",null,55.0]]},
  {label:"SLEEP LAB",group:"platform",items:[["Other (e.g. PSG analysis, data transfer) hourly rate",null,61.0]]},
  {label:"APHERESIS - Optia Terumo",group:"platform",items:[["Apheresis system (supply kits not included)",55.0,null]]},
  {label:"BRONCHOSCOPY / GASTROSCOPY / ENDOSCOPY",group:"platform",items:[["Bronchoscopy, Gastroscopy or Endoscopy",437.0,645.0],["Other (e.g. patient monitoring) hourly rate",null,59.0]]},
  {label:"OPERATING ROOM",group:"platform",items:[["14- Echocardiogram ultrasound machine (per exam)",42.0,61.0],["24- Data management",47.0,69.0],["3 - Add on charge for simple transthoracic echocardiogram image acquisition by technologist",79.0,114.0]]},
  {label:"CARDIAC ECHO",group:"platform",items:[["7 - Add on charge for report simple echo measures",105.0,152.0],["9 - Add on charge for image upload",32.0,44.0],["10 - Add on charge for a copy of an exam on an external media (DVD, CD, USB key)",13.0,18.0],["11 - If needed, technical assistance (hourly rate)",79.0,110.0],["12 - If needed, manual anonymization of images (hourly rate)",79.0,110.0],["13 - If needed, training, start up activities, other (houly rate)",79.0,110.0],["Ethics submissions - Lead or single site",null,1350.0],["Ethics submission - Particpating site",null,785.0]]},
  {label:"SUBMISSION SERVICES",group:"support",items:[["Annual renewal",null,395.0],["Submission of annual renewals to REB approval",165.0,null],["Negotiations of start up budget (1-2 arms)",null,830.0],["Negotiations of start up budget (3 plus)",null,1350.0]]},
  {label:"BUDGET SERVICES",group:"support",items:[["Nurse",68.0,85.0]]},
  {label:"TRIAL CONDUCT RESOURCES",group:"support",items:[["Coordinator",58.0,75.0],["Monitor",62.0,62.0],["Project Manager",70.0,70.0]]}
];

var SVC_PHARMA = [
  ['Administrative start-up fee (industry)', null, 3163],
  ['Administrative start-up fee (non-industry)', 1582, null],
  ['Pharmacy unblinded CT', 586, 586],
  ['Maintenance fee (industry) — annual', null, 1289],
  ['Maintenance fee (non-industry) — annual', 644, null],
  ['Dispensing — without clean room (per dispense)', 71, 71],
  ['Dispensing — with clean room (per dispense)', 118, 118],
  ['Documentation of standard-of-care stock dispensing', 17, 17],
  ['Training of all site pharmacists for on-call studies', 878, 878],
  ['On-call pharmacist (per 8-hour shift)', 141, 141],
  ['Call-back by on-call pharmacy', 586, 586],
  ['Multi-site IP management', 878, 878],
  ['Multisite IP shipping + courier fee if applicable', 88, 88],
  ['Non-formulary medication / supply ordering', 88, 88],
  ['Remote monitoring', 175, 175],
  ['Remote final accountability / COV', 351, 351],
  ['Evaluation of protocol amendment', 161, 161],
  ['Evaluation of pharmacy manual (or equivalent) amendment', 53, 53]
];

var SVC_IT = [
  ['Computer Support — Antivirus management', 65, 65],
  ['Computer Support — Baseline image', 130, 130],
  ['Computer Support — Data backup (one-time)', 65, 65],
  ['Computer Support — Data destruction', 65, 65],
  ['Computer Support — Data restore (one-time)', 65, 65],
  ['Computer Support — Installation', 65, 65],
  ['Computer Support — Operating system updates', 65, 65],
  ['Computer Support — Storage space', 250, 250],
  ['Computer Support — Troubleshooting', 65, 65],
  ['Computer Support — Printing (per page)', 0.07, 0.07],
  ['Server Support — Antivirus management', 65, 65],
  ['Server Support — Data backup (one-time)', 85, 85],
  ['Server Support — Data restore (one-time)', 85, 85],
  ['Server Support — Operating system updates', 130, 130],
  ['Server Support — System monitoring', 340, 340],
  ['Server Support — Troubleshooting', 85, 85],
  ['Projects — Server hosting', 90, 90]
];

var SVC_MUHC = [
  ['Administrative services (analytics extraction) — hourly', null, 200],
  ['Nursing services (outpatient, excl. oncology ODC) — hourly', null, 168.93],
  ['Inpatient admission (per day)', null, 6858]
];

var LAB_DATA = [["10000", "Cold agglutinins (screen) (qualitative) auto-controls included", 3.19, 4.35], ["10001", "Cold agglutinins (thermal amplitude titration) auto-controls included", 47.3, 64.5], ["10002", "Cold agglutinins (titration) (quantitative) auto-controls included", 24.2, 33.0], ["10007", "Irregular antibodies (manual identification)", 33.0, 45.0], ["10008", "Allo or auto hot adsorption", 74.8, 102.0], ["10009", "Allo or auto cold adsorption", 106.7, 145.5], ["10020", "Fetal cells (agglutination) (screening) (qualitative)", 21.45, 29.25], ["10021", "Fetal cells (quantitative) (Kleihauer)", 21.56, 29.4], ["10024", "Compatibility (manual or automated)", 5.5, 7.5], ["10028", "Coombs direct polyspecific or monospecific (automated)", 2.97, 4.05], ["10032", "Polyspecific or monospecific direct coombs (tube technique) (manual)", 8.69, 11.85], ["10034", "Polyspecific or monospecific direct coombs (gel technique) (manual)", 5.72, 7.8], ["10040", "IgG-IgM Differentiation (dithiothreitol-DTT)", 8.03, 10.95], ["10041", "Division of labile blood product", 11.44, 15.6], ["10042", "Division of stable blood product or breast millk", 11.77, 16.05], ["10044", "Donath Landsteiner", 11.66, 15.9], ["10045", "Thawing of blood product or breast milk", 1.87, 2.55], ["10060", "Elution (eluate identification included)", 83.6, 114.0], ["10085", "ABO-Rh blood group (automated)", 6.05, 8.25], ["10086", "ABO-Rh blood group (manual)", 7.59, 10.35], ["10110", "Irradiation of blood product in the establishment", 11.33, 15.45], ["10111", "Irregular antibodies (automated identification)", 31.9, 43.5], ["10115", "Investigation of weak RhD", 26.4, 36.0], ["10133", "Pooling labile blood products", 28.6, 39.0], ["10134", "Common or rare erythrocyte phenotype (patient or product / antigen / including controls) (automated)", 4.95, 6.75], ["10135", "Pooling of stable blood products", 19.03, 25.95], ["10136", "Common erythrocyte phenotype (patient or product / antigen / excluding ABO, D / including controls) (manual)", 12.65, 17.25], ["10137", "Rare erythrocyte phenotype (patient or product / antigen / including controls) (manual", 13.97, 19.05], ["10150", "Irregular antibodies (manual search)", 8.8, 12.0], ["10151", "Paroxysmal nocturnal haemoglobinuria (PNH)", 103.4, 141.0], ["10152", "Reconstitution of stable blood product (ex .: clotting factor, immunoglobulins, etc.)", 12.98, 17.7], ["10153", "Irregular antibodies (automated search)", 5.06, 6.9], ["10170", "Antibody titration (per antibody) (including anterior serum titration)", 39.6, 54.0], ["10173", "Cell treatment (EGA KIT method)", 60.5, 82.5], ["10174", "Enzymatic treatment (i.e. ficine) for antibody identification", 137.5, 187.5], ["10177", "Removing supernatant", 28.6, 39.0], ["10178", "Reconstitution of a labile blood product", 11.0, 15.0], ["10179", "Syringe insertion of labile blood product", 14.63, 19.95], ["10505", "Management of confirmation of administration or transfusion", 2.86, 3.9], ["10510", "Receiving and handling an unanalyzed sample at reception (for the exclusive use of the blood bank)", 3.3, 4.5], ["10511", "Emission of labile or stable blood products, tissue or breast milk", 5.17, 7.05], ["10512", "Prior donation study (by case) (done by a technologist)", 7.92, 10.8], ["10513", "Transfusion reaction study (done by a technologist)", 15.73, 21.45], ["10515", "Monitoring of blood product demand (performed by a technologist)", 7.26, 9.9], ["10531", "Rejection of blood product, tissue or breast milk (done by a technologist)", 2.09, 2.85], ["10532", "Packaging of a product (labile or stable)", 10.45, 14.25], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["10533", "Packaging for shipment of blood product (labile or stable) OR return back to the supplier", 6.82, 9.3], ["10534", "Packaging of products for home administration and collection by the user at the hospital", 11.99, 16.35], ["10700", "Reception of labile blood product", 2.2, 3.0], ["10701", "Reception of a blood product (stable), tissue or maternal milk", 2.64, 3.6], ["10702", "Quarantine and investigation (including cold chain and recall)", 10.45, 14.25], ["10704", "Autologous donation reception, designated or directed (H-Q)", 8.14, 11.1], ["10730", "Blood group confirmation", 1.87, 2.55], ["19007", "Anti-HLA (screening for anti-HLA class I by Luminex)", 1.1, 1.5], ["19008", "Anti-HLA (identification of anti-HLA class I by Luminex)", 1.1, 1.5], ["19010", "Anti-HPA and HLA (screening and identification of antibodies by Luminex)", 332.2, 453.0], ["19030", "Freezing autologous stem cells", 1.1, 1.5], ["19044", "REF tests sent externally", 1.1, 1.5], ["19045", "Complete erythrocyte genotyping (SSO)", 220.0, 300.0], ["19050", "HPA-2 genotyping by SSP", 1.1, 1.5], ["19051", "HPA-3 genotyping by SSP", 1.1, 1.5], ["19052", "HPA-4 genotyping by SSP", 1.1, 1.5], ["19053", "HPA-5 genotyping by SSP", 1.1, 1.5], ["19054", "HPA-15 genotyping by SSP", 1.1, 1.5], ["19065", "Genotyping of low RhD type 1,2,3 and 42", 212.3, 289.5], ["19073", "HLA genotyping: Locus A low resolution (Luminex SSO)", 122.1, 166.5], ["19075", "HLA genotyping: Low resolution locus B (Luminex SSO)", 122.1, 166.5], ["19077", "HLA genotyping: Low resolution C locus (Luminex SSO)", 170.5, 232.5], ["19080", "HLA genotyping: Low resolution DRB1 locus (Luminex SSO) including DRB3 / 4/5", 134.2, 183.0], ["19082", "HPA-1 genotyping by SSP", 1.1, 1.5], ["19085", "Pseudogenic Rh (D), Rh (D) genotyping by SSP", 1.1, 1.5], ["19092", "HLA genotyping: Low resolution DQA1 / B1 locus (Luminex SSO)", 183.7, 250.5], ["19095", "HLA genotyping: Low resolution DPA1 / B1 locus (Luminex SSO)", 170.5, 232.5], ["19098", "IDHPA Complete Platelet Genotyping (Luminex SSO)", 231.0, 315.0], ["19099", "R&D genotyping", 1.1, 1.5], ["19110", "Quarantine and investigation (including cold chain and recall)", 374.0, 510.0], ["19111", "HLA tests sent externally", 1.1, 1.5], ["19302", "Transport of the CSP graft to the hospital on request (by returned graft)", 1.1, 1.5], ["19303", "Semi-quantitative determination of IgA", 1.1, 1.5], ["19304", "ABO Group", 1.1, 1.5], ["19305", "Rh Group (D)", 1.1, 1.5], ["19306", "Globular ABO", 1.1, 1.5], ["19307", "RhD Group 37", 1.1, 1.5], ["19308", "RhD AGH Group", 1.1, 1.5], ["19309", "ABO 22 mismatch", 1.1, 1.5], ["19310", "ABO 4 mismatch", 1.1, 1.5], ["19311", "Preheated serum ABO mismatch", 1.1, 1.5], ["19312", "ABO glob discordance Hot washed red blood cells", 1.1, 1.5], ["19313", "ABO discordance of enzymated red blood cells", 1.1, 1.5], ["19314", "ABO serum sedimentation discrepancy", 1.1, 1.5], ["19315", "Preheated serum ABO discordance sedim", 1.1, 1.5], ["19316", "EGA globular ABO mismatch", 1.1, 1.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["19317", "ABO globular mismatch 22", 1.1, 1.5], ["19318", "Globular ABO mismatch 4", 1.1, 1.5], ["19319", "ABO serum AB mismatch", 1.1, 1.5], ["19320", "ABO lectin A1 phenotype", 1.1, 1.5], ["19321", "ABO lectin H phenotype", 1.1, 1.5], ["19322", "RhD discrepancy Hot washed red blood cells", 1.1, 1.5], ["19323", "RhD EGA mismatch", 1.1, 1.5], ["19324", "RhD discrepancy 2e source", 1.1, 1.5], ["19325", "RhD discrepancy 3e source", 1.1, 1.5], ["19326", "ADD (direct antiglobulin test)", 1.1, 1.5], ["19327", "TDA detailed tube", 1.1, 1.5], ["19328", "Hot washed TDA", 1.1, 1.5], ["19329", "Detailed hot washed TDA", 1.1, 1.5], ["19330", "Identification of erythrocyte antibodies", 1.1, 1.5], ["19331", "Eluat erythrocyte antibody identification", 1.1, 1.5], ["19332", "Erythrocyte compatibility test", 1.1, 1.5], ["19333", "Inactivation / Inhibition", 1.1, 1.5], ["19334", "Titration 1 erythrocyte antibody", 1.1, 1.5], ["19335", "Titration of 2 erythrocyte antibodies", 1.1, 1.5], ["19336", "Titration of 3 erythrocyte antibodies", 1.1, 1.5], ["19337", "Titration of 4 erythrocyte antibodies", 1.1, 1.5], ["19338", "Titration of 5 erythrocyte antibodies", 1.1, 1.5], ["19339", "Parallel erythrocyte antibody titration 1 Ab (pregnancy)", 1.1, 1.5], ["19340", "Parallel erythrocyte antibody titration 2 Ab (pregnancy)", 1.1, 1.5], ["19341", "Parallel erythrocyte antibody titration 3 Ab (pregnancy)", 1.1, 1.5], ["19342", "Parallel erythrocyte antibody titration 4 and above Ab (pregnancy)", 1.1, 1.5], ["19343", "Regular phenotype: C", 1.1, 1.5], ["19344", "Regular phenotype: E", 1.1, 1.5], ["19345", "Regular phenotype: c", 1.1, 1.5], ["19346", "Regular phenotype: e", 1.1, 1.5], ["19347", "Regular phenotype: K", 1.1, 1.5], ["19348", "Regular phenotype: S", 1.1, 1.5], ["19349", "Regular phenotype: s", 1.1, 1.5], ["19350", "Regular phenotype: Fya", 1.1, 1.5], ["19351", "Regular phenotype: Fyb", 1.1, 1.5], ["19352", "Regular phenotype: Jka", 1.1, 1.5], ["19353", "Regular phenotype: Jkb", 1.1, 1.5], ["19354", "Other regular phenotype: Cw", 1.1, 1.5], ["19355", "regular phenotype other: M", 1.1, 1.5], ["19356", "Other regular phenotype: N", 1.1, 1.5], ["19357", "Other regular phenotype: P1", 1.1, 1.5], ["19358", "Other regular phenotype: Lea", 1.1, 1.5], ["19359", "Other regular phenotype: Leb", 1.1, 1.5], ["19360", "Regular phenotype other: k", 1.1, 1.5], ["19361", "Other regular phenotype: Kpa", 1.1, 1.5], ["19362", "Other regular phenotype: Kpb", 1.1, 1.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["19363", "Other regular phenotype: Lua", 1.1, 1.5], ["19364", "Other regular phenotype: Lub", 1.1, 1.5], ["19365", "Other regular phenotype: Wra", 1.1, 1.5], ["19366", "Special erythrocyte phenotype", 1.1, 1.5], ["19367", "Treatment of EGA red blood cells", 1.1, 1.5], ["19368", "Identification of high frequency erythrocyte antibodies", 1.1, 1.5], ["19369", "Identification of different enzyme erythrocyte antibodies", 1.1, 1.5], ["19370", "Identification of solid phase erythrocyte antibody", 1.1, 1.5], ["19371", "Red blood cell antibody identification tube technique", 1.1, 1.5], ["19372", "Identification of erythrocyte antibody collection cells", 1.1, 1.5], ["19373", "Auto adsorption (erythrocyte)", 1.1, 1.5], ["19374", "Allo differential adsorption (erythrocyte)", 1.1, 1.5], ["19375", "Adsorption Rest / HPC", 1.1, 1.5], ["19376", "Adsorption / elution (erythrocyte)", 1.1, 1.5], ["19377", "Donath-Landsteiner test", 1.1, 1.5], ["19378", "Thermal amplitude test (erythrocyte)", 1.1, 1.5], ["19379", "Anti-GPIIb / IIIa by MAIPA (regular method)", 1.1, 1.5], ["19380", "Anti-GPIa / IIa by MAIPA (regular method)", 1.1, 1.5], ["19381", "Anti-GPIb / IX by MAIPA (regular method)", 1.1, 1.5], ["19382", "Anti-Gov by MAIPA (regular method)", 1.1, 1.5], ["19383", "Anti-GPIIb / IIIa by MAIPA (optimized method)", 1.1, 1.5], ["19384", "Anti-GPIa / IIa by MAIPA (optimized method)", 1.1, 1.5], ["19385", "MAIPA with serum treatment", 1.1, 1.5], ["19386", "PLT analyzes sent externally", 1.1, 1.5], ["19387", "Anti-HLA (class I anti-HLA screening by Luminex, DTT pre-treatment", 1.1, 1.5], ["19388", "Anti-HLA (class I anti-HLA screening by Luminex, EDTA pre-treatment", 1.1, 1.5], ["19389", "Anti-HLA (screening for anti-HLA class I by Luminex, pre-treatment dilution", 1.1, 1.5], ["19390", "Anti-HLA (screening for anti-HLA class II by Luminex", 1.1, 1.5], ["19391", "Anti-HLA (anti-HLA class II screening by Luminex, DTT pre-treatment", 1.1, 1.5], ["19392", "Anti-HLA (screening for anti-HLA class II by Luminex, EDTA pre-treatment", 1.1, 1.5], ["19393", "Anti-HLA (screening for anti-HLA class II by Luminex, pre-treatment dilution", 1.1, 1.5], ["19394", "Anti-HLA (identification of anti-HLA class I by Luminex, DTT pre-treatment", 1.1, 1.5], ["19395", "Anti-HLA (identification of anti-HLA class I by Luminex, EDTA pre-treatment", 1.1, 1.5], ["19396", "Anti-HLA (identification of anti-HLA class I by Luminex, pre-treatment dilution", 1.1, 1.5], ["19397", "Anti-HLA (identification of anti-HLA class II by Luminex", 1.1, 1.5], ["19398", "Anti-HLA (identification of anti-HLA class II by Luminex, DTT pre-treatment", 1.1, 1.5], ["19399", "Anti-HLA (identification of anti-HLA class II by Luminex, EDTA pre-treatment", 1.1, 1.5], ["19400", "Anti-HLA (identification of anti-HLA class II by Luminex, pre-treatment dilution", 1.1, 1.5], ["19402", "HLA genotyping: high-resolution Locus A (SNG)", 282.7, 385.5], ["19403", "HLA genotyping: high-resolution Locus B (SNG)", 282.7, 385.5], ["19404", "HLA genotyping: high-resolution Locus C (SNG)", 282.7, 385.5], ["19405", "HLA genotyping: high-resolution DRB1 locus (SNG)", 282.7, 385.5], ["19406", "HLA genotyping: high-resolution DRB3 locus (SNG)", 162.8, 222.0], ["19407", "HLA genotyping: high-resolution DRB4 locus (SNG)", 162.8, 222.0], ["19408", "HLA genotyping: high-resolution DRB5 locus (SNG)", 162.8, 222.0], ["19409", "HLA genotyping: high-resolution DQA1 locus (SNG)", 273.9, 373.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["19410", "HLA genotyping: Locus DQB1 high resolution NGS, kit A", 282.7, 385.5], ["19411", "HLA genotyping: high-resolution DPA1 locus (SNG)", 273.9, 373.5], ["19412", "HLA genotyping: high-resolution DPB1 locus (SNG)", 282.7, 385.5], ["19424", "Screening for anti-IgA (R&D test)", 1.1, 1.5], ["19425", "CEAG genotyping by RFLP", 1.1, 1.5], ["19426", "Knops genotyping by RFLP", 1.1, 1.5], ["19427", "Yka Genotyping By SSP", 1.1, 1.5], ["19428", "RhD Position 48 genotyping by RFLP", 1.1, 1.5], ["19429", "MMA (R&D testing)", 1.1, 1.5], ["19431", "Complete erythrocyte genotyping (Bioarray)", 1.1, 1.5], ["19432", "Complete platelet genotyping (Bioarray)", 1.1, 1.5], ["20000", "Platelet Aggregation", 50.6, 69.0], ["20001", "Alpha-2 macroglobulin (antigen)", 16.5, 22.5], ["20003", "Anticardiolipin antibodies", 12.65, 17.25], ["20005", "Anticardiolipin antibody (total)", 34.1, 46.5], ["20006", "Screening for anticoagulant lupus with antiphospholipid-sensitive APTT reagent (including correction with norm", 0.0, 0.0], ["20007", "Anti-heparin (platelet aggregation method)", 86.9, 118.5], ["20008", "Anti Beta-2 glycoprotein 1 IgG or IgM", 13.09, 17.85], ["20009", "Anti Von Willebrand Factor (anti-VWF)", 69.3, 94.5], ["20011", "Heparin Platelet Factor 4 (PF4)", 66.0, 90.0], ["20013", "Antiplasmin (activity)", 38.5, 52.5], ["20014", "Antithrombin (activity)", 14.74, 20.1], ["20015", "Antithrombin (antigen)", 9.46, 12.9], ["20019", "Anti-saccharomyces IgA or IgG (ASCA)", 22.0, 30.0], ["20020", "Anti-centromere Protein B (CENP-B)", 10.12, 13.8], ["20022", "Anti-C1 inhibitor antibody (ELISA) (quantitative)", 90.2, 123.0], ["20040", "Ristocetin cofactor", 26.4, 36.0], ["20044", "Cryofibrinogen", 5.72, 7.8], ["20060", "D-Dimer (semi-quantitative or qualitative or on slide)", 12.1, 16.5], ["20061", "D-Dimer (ELISA)", 24.2, 33.0], ["20062", "D-Dimer", 16.17, 22.05], ["20064", "HLA-B27 (TaqMan)", 24.2, 33.0], ["20077", "Selection with microbeads of lymphocyte subpopulations for molecular analysis CD3 and CD33 (including Fico", 388.3, 529.5], ["20080", "Coagulation factors (II, V, VII, VIII, IX, X, XI et XII) (activity)", 7.26, 9.9], ["20086", "Factor VII (antigen)", 25.3, 34.5], ["20088", "Factor Von Willebrand (activity) (ELISA)", 22.0, 30.0], ["20089", "Factor Von Willebrand (antigen)", 16.28, 22.2], ["20090", "Factor Von Willebrand (multimers)", 95.7, 130.5], ["20092", "Factor X (antigen)", 28.6, 39.0], ["20098", "Factor XIII (activity) (quantitative)", 84.7, 115.5], ["20101", "Fibrinogen (antigen)", 168.3, 229.5], ["20102", "Fibrinogen", 5.5, 7.5], ["20103", "Platelet function at luminescence (by agent)", 35.2, 48.0], ["20106", "Factor XIII (solubility test)", 7.37, 10.05], ["20107", "ADAMTS-13 - activity (quantitative assay)", 265.1, 361.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["20108", "Anti-IIa-activity (quantitative dosage) (Dabigatran)", 26.4, 36.0], ["20109", "Anti-Xa-activity (quantitative dosage) (Rivaroxaban)", 61.6, 84.0], ["20110", "Anti-Factor XIII (quantitative assay) (ELISA)", 90.2, 123.0], ["20111", "Factor XIII (subunit A) (quantitative assay) (ELISA)", 39.6, 54.0], ["20113", "Anti-Xa-activity (quantitative dosage) (Edoxaban)", 272.8, 372.0], ["20114", "Antigenic factor I (ELISA) (quantitative)", 258.5, 352.5], ["20115", "Anti-Xa-activity (quantitative dosage) (Apixaban)", 34.1, 46.5], ["20116", "Anti-factor H (ELISA) (quantitative)", 55.0, 75.0], ["20118", "Factor IX (determination of concentration) (chromogenic method)", 62.7, 85.5], ["20122", "Factor VIII (determination of concentration) (chromogenic method)", 41.8, 57.0], ["20130", "Heparin Low Molecular Weight Anti-Xa", 21.67, 29.55], ["20140", "Factor Inhibitor (qualitative)", 39.6, 54.0], ["20141", "Factor Inhibitor (quantitative)", 79.2, 108.0], ["20142", "Porcine factor VIII inhibitor", 121.0, 165.0], ["20143", "Anti-factor VIII (detection) (ELISA)", 8.69, 11.85], ["20144", "Anti-factor IX (detection) (ELISA)", 8.69, 11.85], ["20145", "Anti-glucocerebrosidase (detection)", 90.2, 123.0], ["20146", "ADAMTS-13 - antigen (quantitative assay) (ELISA)", 165.0, 225.0], ["20147", "Anti-ADAMTS-13 antibody (ELISA) (quantitative)", 70.4, 96.0], ["20160", "Kaolin clotting time (KCT)", 20.13, 27.45], ["20170", "Lysis of euglobulins", 14.85, 20.25], ["20190", "Plasma Activator Inhibitor 1(PAI-1)", 38.5, 52.5], ["20191", "Plasminogen", 10.56, 14.4], ["20194", "Prekallikrein (activity)", 13.09, 17.85], ["20196", "Protein C (activity)", 16.28, 22.2], ["20197", "Protein C (antigen)", 14.08, 19.2], ["20198", "Protein S (activity)", 6.6, 9.0], ["20199", "Protein S free", 72.6, 99.0], ["20200", "Total S protein (antigen)", 69.3, 94.5], ["20220", "Resistance to activated protein C", 6.38, 8.7], ["20221", "Resistance to activated protein C (with calculation of 3 ratios)", 25.3, 34.5], ["20222", "Clot retraction on platelet-rich plasma", 15.73, 21.45], ["20238", "Thromboelastography (platelet mapping)", 390.5, 532.5], ["20240", "Activated Partial Thrombin Time (APTT) or Thrombin Time (TT) or Prothrombin Time (Quick Time) (INR) on a", 3.41, 4.65], ["20241", "Activated partial thromboplastin time or partial thromboplastin time (PTT) + activator (ACT)", 1.43, 1.95], ["20242", "Partial thromboplastin time after heparin neutralization (ACT)", 12.98, 17.7], ["20243", "Prothrombin Time (PT & INR) including derived Fibrinogen", 4.4, 6.0], ["20244", "Reptilase Time", 7.48, 10.2], ["20245", "In Vitro bleeding time (per agent) (PFA-100)", 29.7, 40.5], ["20246", "In vivo bleeding time", 40.7, 55.5], ["20247", "Diluted Stypven Time (DRVVT or Russell Time) (including confirmation)", 9.13, 12.45], ["20248", "Thrombine time (TT)", 2.42, 3.3], ["20249", "Collagen VWF binding assay", 102.3, 139.5], ["20250", "FVIII to VWF binding assay", 12.54, 17.1], ["20251", "Phospholipid Neutralization Test (PNP)", 5.61, 7.65], ["20252", "Diluted Tissue Thromboplastin Inhibition Test", 7.92, 10.8], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["20254", "Thromboelastography", 82.5, 112.5], ["20255", "Tissue plasminogen activator (activity) (tPA)", 245.3, 334.5], ["20259", "Neutralization of phospholipids in the hexagonal phase (coagulometry)", 0.0, 0.0], ["20300", "Assistance with infusion of CPH / DLI (excluding displacement)", 10.45, 14.25], ["20303", "Ecarin clotting test (ECT)", 245.3, 334.5], ["20304", "Plasma Eculizumab (Quantitative Assay) (ELISA)", 223.3, 304.5], ["20320", "Fluid cytology (manual)", 22.0, 30.0], ["20321", "Cell Count Body Fluid with differential", 19.03, 25.95], ["20342", "Eosinophils (nasal secretions or urine)", 9.46, 12.9], ["20360", "Sickle formation (test for) Thiosulfite", 23.1, 31.5], ["20361", "CBC with automated differential", 6.6, 9.0], ["20362", "Differential formula (manual) (including staining)", 5.72, 7.8], ["20363", "Evaluation of red blood cells and platelets (orientation smear) (including staining)", 3.19, 4.35], ["20364", "Complete blood count (FSC) or Hb-Ht-plaq. micro-method (automated)", 1.87, 2.55], ["20380", "Leucocytes (blood) (manual)", 4.62, 6.3], ["20381", "Automated sedimentation", 1.87, 2.55], ["20390", "Haptoglobin", 5.39, 7.35], ["20391", "Plasma free hemoglobin (excluding dipstick)", 8.8, 12.0], ["20430", "Bone marrow (Differential done by a medical technologist, including the reading of 2 slides)", 35.2, 48.0], ["20450", "Platelets (blood) (manual)", 12.87, 17.55], ["20470", "Reticulocytes (automated)", 1.87, 2.55], ["20471", "Reticulocytes (manual)", 2.75, 3.75], ["20472", "Reticulocytes (semi-automated including pretreatment)", 6.82, 9.3], ["20490", "Sedimentation (manual)", 2.09, 2.85], ["20494", "Sickle-forming (test for) metabisulphite", 6.27, 8.55], ["20574", "Receipt of fresh CPH or DLI units", 93.5, 127.5], ["20575", "Receipt of CPH or DLI cryo units", 156.2, 213.0], ["20580", "Evaluation of fresh CPH (or CT) grafts (internal or external)", 139.7, 190.5], ["20582", "CPH cryopreservation (auto or allo) 1st bag", 614.9, 838.5], ["20583", "Cryopreservation of CPH apheresis (auto and allo) extra bag", 58.3, 79.5], ["20585", "Thawing a graft in the cell therapy laboratory", 731.5, 997.5], ["20588", "Adjustment of graft concentration in the cell therapy laboratory by dilution", 215.6, 294.0], ["20590", "Graft filtration in the cell therapy laboratory", 96.8, 132.0], ["20592", "Distribution of CPH grafts to the care unit", 95.7, 130.5], ["20593", "Distribution and assistance with infusion of a cryopreserved graft in the care unit (1st bag)", 232.1, 316.5], ["20594", "Distribution and assistance with infusion of a cryopreserved graft in the care unit (additional bag)", 60.5, 82.5], ["20598", "Sending fresh or cryopreserved grafts outside the hospital (1st bag)", 119.9, 163.5], ["20599", "Sending fresh or cryopreserved grafts outside the hospital (additional bag)", 25.3, 34.5], ["20603", "Plasma, volume or erythrocyte reduction of a graft with Sepax", 1348.6, 1839.0], ["20615", "Dressing with personal protective equipment (PPE) for cleanroom and grade B applications", 89.1, 121.5], ["20620", "Cryopreservation of CD3 or CD34 or MNC (aliquot)", 68.2, 93.0], ["20622", "Complete cell culture of hematopoietic progenitors: aspiration of bone marrow or blood", 386.1, 526.5], ["20624", "Cell culture of BFU-E or CFU-GEMM (with therapeutic agents)", 661.1, 901.5], ["20628", "Cell culture of hematopoietic progenitors: units of CPH (apheresis, bone marrow, cord blood)", 117.7, 160.5], ["20629", "BFU-E cell culture with and without erythropoietin", 231.0, 315.0], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["20640", "Centrifugation of CPH", 39.6, 54.0], ["20641", "Complement inactivation at 56 ° C", 3.19, 4.35], ["20647", "Isolation of mononuclear cells by density gradient centrifugation", 34.1, 46.5], ["20649", "Enumeration of hematopoietic progenitor cells (CD34)", 63.8, 87.0], ["20651", "Preparation of autologous eye drops for dry eye", 183.7, 250.5], ["20663", "Negative selection of TCRab+ and CD19+ cells with magnetic beads on CliniMacs", 31626.1, 43126.5], ["20664", "ANCA Neutrophil Anti-Cytoplasm", 34.1, 46.5], ["20665", "Selection + or - of blood or bone marrow cells with microbeads", 119.9, 163.5], ["20667", "Simple positive selection of CD34+ cells with magnetic beads on CliniMacs", 15998.4, 21816.0], ["20668", "Double positive selection of CD34+ cells with magnetic beads on CliniMacs", 29295.2, 39948.0], ["20669", "Hepatitis B (HBsAg); microparticulate chemiluminescence immunoassay (CMIA) (quantitative)", 16.94, 23.1], ["20670", "Hepatitis A (HAV) Specific IgM", 17.6, 24.0], ["20671", "Hepatitis A (HAV) IgG or total Ab", 9.9, 13.5], ["20672", "Hepatitis B (antibody surface antigen) (anti-HBs) IgG or total Ab", 7.7, 10.5], ["20673", "Hepatitis B (anti-HBc) IgG or total Ab", 8.8, 12.0], ["20674", "Hepatitis B (anti-HBc) Specific IgM", 11.0, 15.0], ["20675", "Hepatitis B (anti-HBe) IgG or total Ab", 7.7, 10.5], ["20676", "Hepatitis B (surface antigen) (HbsAg)", 8.8, 12.0], ["20677", "Hepatitis B (HbeAg) (antigen)", 6.49, 8.85], ["20678", "Hepatitis C (anti-HCV) IgG or total Ab", 11.0, 15.0], ["20680", "Neutrophil activation", 99.0, 135.0], ["20682", "Anti-DNA (ELISA)", 5.94, 8.1], ["20683", "Anti-DNA (immunofluorescence) (Crithidia luciliae)", 7.37, 10.05], ["20684", "Parietal Cell Antibodies", 14.85, 20.25], ["20685", "Anti-centromeres", 5.61, 7.65], ["20686", "Anti-cochlea", 77.0, 105.0], ["20691", "Intrinsic Factor Antibody", 8.47, 11.55], ["20694", "Anti-histone (ELISA)", 5.83, 7.95], ["20696", "Langherans anti-islets", 24.2, 33.0], ["20698", "Anti-Jo-1", 10.89, 14.85], ["20699", "Anti-LKM (anti-liver kidney microsomes)", 14.96, 20.4], ["20701", "Antiglomerular Basement Membrane Antibody", 12.21, 16.65], ["20702", "Mitochondrial antibodies", 14.85, 20.25], ["20703", "Smooth Muscle antibodies", 14.85, 20.25], ["20704", "Anti-striated muscle", 31.9, 43.5], ["20705", "Anti-myeloperoxidase (anti-MPO) ANCA", 6.16, 8.4], ["20709", "Anti-proteinase 3 (anti-PR3) ANCA", 6.38, 8.7], ["20710", "Anti-ribonucleoproteins (RNP) (MUHC: Anti-Extractable Nuclear Antigen)", 6.38, 8.7], ["20711", "Anti-ScL 70 (topoisomerase)", 7.26, 9.9], ["20712", "Anti Sm (MUHC: Anti-Extractable Nuclear Antigen)", 5.94, 8.1], ["20713", "Anti-SSA (Ro) (MUHC: Anti-Extractable Nuclear Antigen)", 7.37, 10.05], ["20714", "Anti-SSB (La) (MUHC: Anti-Extractable Nuclear Antigen)", 5.94, 8.1], ["20716", "Anti-adrenal", 33.0, 45.0], ["20717", "Anti-Nuclear (ANA) (Immunofluorescence Screening) (by dilution)", 10.01, 13.65], ["20718", "Anti-cyclic citrulinated peptides (Anti-CCP)", 10.23, 13.95], ["20719", "Anti-nuclear (ENA) (screening by ELISA)", 7.81, 10.65], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["20720", "Anti-reticulin", 17.05, 23.25], ["20721", "Anti-edge brush", 17.05, 23.25], ["20722", "Anti-gall canaliculus", 17.05, 23.25], ["20723", "Anti-muscle-cardiac", 115.5, 157.5], ["20724", "Anti-endomysium", 21.12, 28.8], ["20725", "Anti-skin basement membrane and anti-intercellular substance", 46.2, 63.0], ["20765", "Hemoglobin chromatography", 13.53, 18.45], ["20768", "Cellular Compatibility by Flow Cytometry (Flow x-match)", 304.7, 415.5], ["20769", "Complement components (activity)", 85.8, 117.0], ["20771", "Total serum supplement (CH50) (activity)", 23.1, 31.5], ["20772", "Circulating immune complexes", 13.75, 18.75], ["20773", "Heinz bodies", 6.6, 9.0], ["20774", "Cryoglobulins (qualitative)", 9.13, 12.45], ["20775", "Cryoglobulins (quantitative)", 81.4, 111.0], ["20776", "Complement C3 (antigen)", 5.61, 7.65], ["20777", "Complement C4 (antigen)", 5.61, 7.65], ["20778", "Activation of TLRs (2, 4) by cleavage of CD62L", 288.2, 393.0], ["20781", "Fas Ligand (dosage) (serum)", 6.71, 9.15], ["20784", "IL-12 Induced Interferon Gamma (Secretion) (Assay) (ELISA)", 613.8, 837.0], ["20800", "Plasma or erythrocyte depletion by CPH centrifugation and evaluation", 39.6, 54.0], ["20820", "Hemoglobin electrophoresis (agarose or capillary)", 21.01, 28.65], ["20825", "Erythrocyte enzymes (by enzyme) (G6PD, 6PGD, PK, HX, GPI)", 24.2, 33.0], ["20827", "Erythropoietin (ELISA) (quantitative)", 15.84, 21.6], ["20828", "Non-specific esterases", 12.98, 17.7], ["20829", "Specific esterases", 17.71, 24.15], ["20850", "Complement Factor B (antigen)", 127.6, 174.0], ["20852", "Medullary iron (Prussian blue)", 6.38, 8.7], ["20900", "Hemoglobin (electrophoresis of globin chains)", 9.9, 13.5], ["20902", "Hemoglobin A2", 15.51, 21.15], ["20918", "HLA-DRB1 (genotyping) (SSP-high resolution)", 226.6, 309.0], ["20928", "HLA-DQB1 (genotyping) (SSP-low resolution)", 59.4, 81.0], ["20929", "HLA-DQB1 (genotyping) (SSP-high resolution)", 110.0, 150.0], ["20932", "HLA-DRB1 (genotyping) (SSP-low resolution)", 59.4, 81.0], ["20935", "HLA-B27, surface marker", 23.1, 31.5], ["20941", "HLA-A or -B or -C (genotyping) (SSP-high resolution)", 229.9, 313.5], ["20942", "HLA-A or -B or -C (genotyping) (SSP-low resolution)", 85.8, 117.0], ["20947", "HLA (sequencing) (resolution of ambiguities)", 119.9, 163.5], ["20949", "HLA-DPB1 (genotyping) (SSP-high resolution)", 128.7, 175.5], ["20950", "HLA-A or -B or -C (genotyping) (high resolution SSO)", 158.4, 216.0], ["20952", "HLA-DPA1 / DPB1 (genotyping) (low resolution SSO)", 79.2, 108.0], ["20953", "HLA-DQA1 / DQB1 (genotyping) (low resolution SSO)", 84.7, 115.5], ["20954", "HLA-DRB1 (genotyping) (high resolution SSO)", 72.6, 99.0], ["20956", "HLA-DRB3 / 4/5 (genotyping) (low resolution SSO)", 111.1, 151.5], ["20958", "T lymphocyte surface markers (CD3 / 4/8/45)", 42.9, 58.5], ["20959", "T-B-NK lymphocyte surface markers (CD3 / 4/8/19/16 + 56/45)", 122.1, 166.5], ["20961", "Complement-C1 inhibitor (antigen)", 9.13, 12.45], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["20962", "Nephritic C3 factor (activity) (C3NEF)", 253.0, 345.0], ["20966", "Complement-Inhibitor of C1 (activity)", 62.7, 85.5], ["20968", "HLA-A or -B or -C or -DRB1 or -DQB1 (genotyping) (next generation sequencing) (high resolution)", 696.3, 949.5], ["20969", "NK lymphoproliferative syndromes characterization panel (NK-CLPD panel)", 178.2, 243.0], ["20971", "Anti-HLA specificity class I", 162.8, 222.0], ["20972", "Anti-HLA class II specificity", 137.5, 187.5], ["20973", "LLA-B minimal residual disease panel (MRD LLA-B panel)", 302.5, 412.5], ["20974", "B lymphoproliferative syndrome characterization panel (B-CLPD panel)", 191.4, 261.0], ["20975", "Acute B lymphoid leukemia characterization panel (LLA-B panel)", 294.8, 402.0], ["20976", "Acute T lymphoid leukemia characterization panel (LLA-T panel)", 257.4, 351.0], ["20977", "Acute myeloid leukemia / MDS characterization panel (AML / MDS panel)", 393.8, 537.0], ["20978", "Surface or intracellular labelling (by marker)", 11.33, 15.45], ["20979", "Plasma cell dyscrasias (multiple myeloma) panel (PCD panel)", 145.2, 198.0], ["20983", "Bone marrow (staining)", 2.09, 2.85], ["20993", "Bone marrow (fixation without staining)", 1.54, 2.1], ["20994", "Proliferation of T-cells (PHA)", 118.8, 162.0], ["20995", "Complement activation (ELISA)", 18.59, 25.35], ["20996", "Complement C1q (antigen)", 30.8, 42.0], ["20997", "Complement-Factor H (antigen)", 77.0, 105.0], ["20998", "Isolation of T or B lymphocytes from whole blood by negative selection", 58.3, 79.5], ["20999", "Devic Disease (Optic Neuromyelitis) (anti-NMO) (Immunofluorescence)", 67.1, 91.5], ["21000", "Myositis anti antigen detection (Mi-2a, Mi-2b, Ku, Pm-Scl-100, SRP, Pm-Scl-75, Jo-1 (Myos), Pl-7, Pl-12, EJ,", 64.9, 88.5], ["21002", "Fetal hemoglobin test (flow cytometry)", 20.46, 27.9], ["21004", "T-B-NK lymphocyte surface markers (CD3/4/8/19/16+56/45RA/45RO, CD31)", 122.1, 166.5], ["21005", "Systemic scleroderma (SSc); Detection of IgG directed against 7 antigens (Scl-70, CENP-A, CENP-B, RP11,", 70.4, 96.0], ["21020", "Periodic Acid Schiff (P.A.S.)", 9.35, 12.75], ["21023", "Myeloperoxidase", 8.25, 11.25], ["21026", "Intra-leukocyte alkaline phosphatase", 12.1, 16.5], ["21028", "Analysis of chimerism (STR) pre or post graft (NAAT)", 135.3, 184.5], ["21030", "Anti-HLA Screening (FLOW-PRA) (by class)", 42.9, 58.5], ["21032", "Intracellular acid phosphatase (tartrate reduction)", 33.0, 45.0], ["21033", "Characterization panel for T lymphoproliferative syndromes (T-CLPD panel)", 264.0, 360.0], ["21034", "Acute leukemia referral tube (ALOT tube)", 94.6, 129.0], ["21035", "Lymphoid cell (lymphoproliferative syndromes) screening tube (LST tube)", 104.5, 142.5], ["21036", "Tube for specimen poor in cells (cerebrospinal fluid and vitreous fluid) (SST tube)", 185.9, 253.5], ["21037", "Hemaphagocytic lymphohistiocytosis (LHH); NK cell degranulation (CD107a marker)", 689.7, 940.5], ["21072", "Sudan black B", 6.82, 9.3], ["21094", "Lymphoblastic transformation", 249.7, 340.5], ["25002", "Alpha thalassemia; HBA1, HBA2 (-α3.7 / αα, -α4.2 / αα, -α20.5 / αα, --SEA / αα, --MED / αα, --FIL / αα, --THA", 115.5, 157.5], ["25004", "Mutational analysis of the kinase domain of the BCR-ABL fusion protein (sequencing)", 154.0, 210.0], ["25007", "Hereditary spherocytosis; eosin-5'-maleimide (EMA) (flow cytometry)", 75.9, 103.5], ["25009", "Factor VII (sequencing)", 281.6, 384.0], ["25011", "Sickle cell anemia; HBB (HbS-HbC); (Sequencing)", 217.8, 297.0], ["25015", "Beta-thalassemia; HBB; (sequencing, complete coding regions)", 364.1, 496.5], ["25017", "Quebec platelet disorder; PLAU gene (duplication) (NAAT)", 28.6, 39.0], ["25019", "L-Ferritin gene (FTL) iron response element (IRE) (sequencing)", 145.2, 198.0], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["25021", "Factor V Leiden (NAAT)", 19.69, 26.85], ["25022", "Factor VIII haplotype (hemophilia A) (NAAT)", 273.9, 373.5], ["25024", "Hemoglobin S diag. carrier and diag. prenatal (sequencing)", 206.8, 282.0], ["25026", "Hemophilia A Factor VIII; inversion intron 22 (IVS22 inv) (NAAT)", 300.3, 409.5], ["25028", "Hemophilia A or B (carrier and prenatal diagnosis, known mutation) (sequencing)", 204.6, 279.0], ["25038", "AML Leukemia and Myelo Dysplastic Syndromes, (GATA2) (sequencing)", 228.8, 312.0], ["25040", "Factor II Prothrombin (g.20210G>A)", 19.58, 26.7], ["25044", "Mutation of protein C; 3363 INS.C (common to French Canadians) (TAAN)", 39.6, 54.0], ["25046", "Mutation of protein C; individual mutations Arg178Gln or Thr298Met (common to French Canadians) (NAAT)", 39.6, 54.0], ["25054", "Angioedema (detection of 5 genetic variations: APP g.2953-3127del and c.-2399C> A, ACE I / D, PAI-1 c.-81", 291.5, 397.5], ["25056", "Protein C (sequencing)", 414.7, 565.5], ["25060", "Thiopurine methyltransferase (TPMT) enzyme (TPMT * 2 (Gly238Cys), TPMT * 3A (Gly460Ala and A719G), T", 134.2, 183.0], ["25070", "Von Willebrand type 2 (2A, 2B, 2M, 2N); VWF (exons 18 to 21 and 28 to 31) associated mutations (sequencin", 276.1, 376.5], ["25080", "Hemophilia A and von Willebrand disease (F8 and VWF genes) (SNG)", 671.0, 915.0], ["30005", "Beta-hydroxybutyrate (whole blood)", 1.98, 2.7], ["30008", "Delta aminolevulinic acid (delta-ALA) (HPLC)", 193.6, 264.0], ["30009", "Folic acid (folate)", 3.74, 5.1], ["30010", "Lactic acid (colorimetric) Lactate Acid", 4.29, 5.85], ["30011", "Mycophenolic acid including glucuronides (MUHC: Mycophenolate-MMF (MPA) )", 19.91, 27.15], ["30012", "Pyruvic acid (dosage only) Pyruvate Acid", 14.3, 19.5], ["30013", "Uric acid", 1.81, 2.48], ["30016", "Alanine amino-transférase (ALT)", 1.81, 2.48], ["30017", "Albumin", 1.81, 2.48], ["30018", "Alcohols (ethanol, methanol, ethylene glycol, isopropanol, acetone, N-propanol, 1,2-butanediol) (quantitative) (", 42.9, 58.5], ["30019", "Aldolase", 11.0, 15.0], ["30020", "Aldosterone (serum)", 13.75, 18.75], ["30021", "Aldosterone (urine)", 33.0, 45.0], ["30022", "Alpha Fetoprotein (AFP) (Maternal-Serum or Tumor Marker)", 4.18, 5.7], ["30024", "Alpha-1-antitrypsin (stool)", 90.2, 123.0], ["30028", "Aluminium", 26.4, 36.0], ["30029", "Ammonia", 4.4, 6.0], ["30030", "Amylase, total", 1.81, 2.48], ["30032", "Pancreatic amylase", 1.43, 1.95], ["30034", "Androstenedione", 9.24, 12.6], ["30035", "Anti-21 hydroxylase", 51.7, 70.5], ["30038", "Carcinoembryonic Antigen (CEA)", 4.4, 6.0], ["30039", "Prostate Specific Antigen (PSA)", 4.51, 6.15], ["30040", "Anti-gliadins (IgA)", 12.76, 17.4], ["30041", "Anti-gliadins (IgG)", 12.76, 17.4], ["30044", "Acetylcholine Receptor Antibodies", 42.9, 58.5], ["30045", "TSH-Receptor Antibody", 39.6, 54.0], ["30047", "Anti-thyroglobulin", 10.34, 14.1], ["30048", "Anti-thyroperoxydase (anti-TPO)", 6.27, 8.55], ["30049", "Anti-transglutaminase", 8.8, 12.0], ["30052", "Apolipoprotein AI", 11.0, 15.0], ["30054", "Apolipoprotein B", 9.9, 13.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["30060", "Aspartate amino transferase (AST)", 1.81, 2.48], ["30065", "Alpha-1-antitrypsin (serum)", 7.92, 10.8], ["30068", "Ant-glutamic acid decarboxylase (GAD) (serum) (MUHC: Anti-Gad Antibodies)", 10.34, 14.1], ["30069", "POCT administration", 0.22, 0.3], ["30070", "Glucose by glucometer", 1.54, 2.1], ["30072", "Maintenance of a non-laboratory blood gas device (complete assessment including cleaning and control)", 31.9, 43.5], ["30073", "Leflunomide (Arava®)", 23.1, 31.5], ["30075", "Indocyanine green (proof)", 71.5, 97.5], ["30076", "Lactic acid (by specific electrode)", 2.31, 3.15], ["30077", "Adrenal block (pregnenolone, 17-OH pregnenolone, 17-OH progesterone and 11-deoxycortisol)", 33.0, 45.0], ["30078", "Procalcitonin", 25.3, 34.5], ["30079", "Urinalysis (automated microscopy)", 1.98, 2.7], ["30080", "Beta-2 microglobulin (ß2-M)", 6.16, 8.4], ["30081", "Beta-2 Transferrin (CSF and serum)", 160.6, 219.0], ["30082", "Beta-Hydroxybutyrate (serum) (MUHC: quantitative)", 7.26, 9.9], ["30083", "Bilirubin, direct (conjugated)", 1.81, 2.48], ["30084", "Bilirubin, total", 1.81, 2.48], ["30085", "BNP (Brain Natriuretic Peptide)", 14.08, 19.2], ["30086", "Oligoclonal bands (by focalisation) (CSF and serum)", 49.5, 67.5], ["30087", "Flecainide (Flecainide®)", 95.7, 130.5], ["30088", "Ganciclovir (Cytovene®)", 27.5, 37.5], ["30089", "Milrinone (Primacor®)", 60.5, 82.5], ["30090", "Posaconazole (Posanol®)", 63.8, 87.0], ["30092", "Thiopurine S-methyltransferase (TPMT)", 39.6, 54.0], ["30095", "NT-PRO-BNP (Brain Natriuretic Peptide)", 17.6, 24.0], ["30096", "Itraconazole - hydroxyitraconazole (Sporanox®)", 82.5, 112.5], ["30099", "Isavuconazole (CresembaMC)", 63.8, 87.0], ["30100", "CA 125", 6.71, 9.15], ["30101", "CA 15-3 or 27-29", 7.48, 10.2], ["30102", "CA 19-9", 6.05, 8.25], ["30103", "Caffeine", 29.7, 40.5], ["30104", "Calcitonin", 33.0, 45.0], ["30105", "Calcium", 1.81, 2.48], ["30106", "Calcium, ionized", 6.6, 9.0], ["30107", "Renal stones (colorimetry)", 37.4, 51.0], ["30108", "Renal stones (spectrometry)", 14.63, 19.95], ["30111", "Total carotenes (quantitative)", 9.24, 12.6], ["30112", "Catecholamines (plasma)", 26.4, 36.0], ["30113", "Catecholamines (urine)", 38.5, 52.5], ["30114", "Ceruloplasmin", 5.83, 7.95], ["30115", "Chloride", 1.81, 2.48], ["30116", "Cholesterol-HDL (MUHC: includes LDL)", 1.81, 2.48], ["30117", "Cholesterol - LDL (measured)", 3.41, 4.65], ["30119", "Cholesterol, total", 1.81, 2.48], ["30120", "Chylomicrons (visual examination after 24 hours)", 1.1, 1.5], ["30121", "Citrates (urine)", 3.74, 5.1], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["30122", "Enzymatic CK-MB", 0.88, 1.2], ["30123", "CK-MB mass", 2.86, 3.9], ["30124", "CO2 or Bicarbonate (dosage only)", 0.99, 1.35], ["30127", "Cortisol, free (urine) (including extraction)", 8.47, 11.55], ["30128", "Cortisol (Serum or urinary) without extraction", 6.6, 9.0], ["30130", "Creatinine Kinase (CK total)", 1.81, 2.48], ["30131", "CK (electrophoresis)", 25.3, 34.5], ["30132", "Creatinine", 1.81, 2.48], ["30133", "Crystals (synovial fluid)", 20.9, 28.5], ["30135", "Cystine (qualitative)", 6.82, 9.3], ["30136", "Cystine (HPLC) (Also done when Homocysteine HPLC is requested)", 40.7, 55.5], ["30137", "Chromogranin A", 25.3, 34.5], ["30138", "D-lactate", 55.0, 75.0], ["30140", "Free estriol", 6.6, 9.0], ["30150", "Dehydroepiandrosterone (DHEA)", 15.73, 21.45], ["30151", "Dehydroepiandrosterone (sulfate) (DHEA-S)", 7.15, 9.75], ["30153", "Single refractometry density (excludes strip)", 0.77, 1.05], ["30155", "Micro-method settling", 3.41, 4.65], ["30170", "Fecal Elastase", 45.1, 61.5], ["30171", "Lipoprotein electrophoresis", 25.3, 34.5], ["30173", "Protein electrophoresis (serum)", 6.05, 8.25], ["30174", "Protein electrophoresis (urine)", 17.71, 24.15], ["30176", "Angiotensin-converting enzyme (ACE)", 7.59, 10.35], ["30177", "Ethanol (ethyl alcohol) enzymatic", 2.64, 3.6], ["30178", "Ethosuximide (Zarontin®)", 56.1, 76.5], ["30181", "Protein electrophoresis by capillary method", 8.36, 11.4], ["30182", "Immunofixation with pentavalent serum", 14.19, 19.35], ["30183", "Protein A associated with pregnancy (PAPP-A)", 11.44, 15.6], ["30186", "Sweat (la test) (conductivity)", 13.31, 18.15], ["30190", "Iron (binding capacity) (UIBC or TIBC)", 2.75, 3.75], ["30191", "Iron (serum)", 2.2, 3.0], ["30193", "Ferritin", 7.7, 10.5], ["30194", "Premature labor test (fetal fibronectin)", 152.9, 208.5], ["30195", "Erythrocyte folic acid", 5.06, 6.9], ["30196", "Fructosamine", 1.76, 2.4], ["30197", "FGF23 assay: chemiluminescence immunoassay (CLIA)", 122.1, 166.5], ["30198", "Membrane rupture test", 62.7, 85.5], ["30208", "Lamellar Body Count", 34.1, 46.5], ["30209", "Carbohydrate-deficient transferrin (CDT)", 26.4, 36.0], ["30210", "GGT", 1.81, 2.48], ["30211", "Gastrin", 10.78, 14.7], ["30212", "Blood gas (pO2, pCO2, pH, HCO3, COHb, metHb, oxyHb, SulfHb, CO2 total)", 3.63, 4.95], ["30214", "Glucose", 1.81, 2.48], ["30215", "Free glycerol", 2.31, 3.15], ["30216", "Faecal fat (quantitative)", 67.1, 91.5], ["30230", "Fetal or adult hemoglobin (APT test) (stool)", 9.46, 12.9], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["30233", "Hemosiderin (urine)", 13.09, 17.85], ["30234", "Homocysteine (HPLC) (Done if total homocysteine is > 25umol/L)", 38.5, 52.5], ["30235", "Homocysteine (immuno-enzymatic)", 12.43, 16.95], ["30237", "Adrenocorticotropic hormone (ACTH)", 9.02, 12.3], ["30239", "Human growth Hormone (HGH)", 7.26, 9.9], ["30240", "FSH (Follicle stimulating hormone)", 2.97, 4.05], ["30241", "Human chorionic gonadotropin (HCG) (urine) (qualitative) (MUHC: Beta hCG (urine) qualitative)", 4.51, 6.15], ["30242", "Human chorionic gonadotropin (HCG) (serum) (quantitative) (MUHC: Beta hCG (serum) quantitative)", 4.95, 6.75], ["30243", "Luteinizing Hormone (LH)", 3.08, 4.2], ["30244", "Parathyroid hormone (PTH)", 5.94, 8.1], ["30245", "5-HIAA -HVA-VMA", 18.7, 25.5], ["30246", "Hydrogen breath test (lactose intolerance)", 29.7, 40.5], ["30248", "Glycated hemoglobin (HbA1c)", 3.63, 4.95], ["30249", "Glycated hemoglobin (HbA1c) pretreatment only", 0.77, 1.05], ["30262", "Interleukin-6 (IL-6)", 17.49, 23.85], ["30268", "Protein Immunofixation, serum", 48.4, 66.0], ["30269", "Protein Immunofixation, urine", 52.8, 72.0], ["30273", "Immunoglobulin IgA", 3.3, 4.5], ["30274", "Immunoglobulin IgD", 47.3, 64.5], ["30276", "Immunoglobulin IgE total", 12.1, 16.5], ["30277", "Immunoglobulin IgG", 3.19, 4.35], ["30278", "Immunoglobulin IgG (sub-classes)", 7.48, 10.2], ["30279", "Immunoglobulin IgM", 3.3, 4.5], ["30280", "Alkaline Immunophosphatase (APAAP) (per slide)", 30.8, 42.0], ["30282", "Inhibin A", 14.08, 19.2], ["30283", "Insulin", 7.7, 10.5], ["30285", "Free light chains (Kappa/Lambda) (serum)", 34.1, 46.5], ["30286", "Specific IgE immunoglobulins (RAST or specific allergen) (common allergens)", 16.39, 22.35], ["30287", "Specific IgE immunoglobulins (RAST or specific allergen) (occasional allergens)", 20.13, 27.45], ["30288", "Specific IgE immunoglobulins (RAST or specific allergen) (molecular allergens)", 28.6, 39.0], ["30300", "Lactate deshydrogenase (electrophoresis) (LD)", 56.1, 76.5], ["30301", "Lactate deshydrogenase (LD or LDH)", 0.77, 1.05], ["30306", "Lipase", 1.43, 1.95], ["30308", "Lipoprotein a (Lp(a))", 3.85, 5.25], ["30310", "Lysozyme (muramidase)", 47.3, 64.5], ["30329", "Free Catecholamines and metanephrines (urine)", 37.4, 51.0], ["30330", "Macro-enzyme or Macro prolactin (research) (precipitation)", 17.49, 23.85], ["30332", "Magnesium", 3.3, 4.5], ["30335", "Azathioprine (6MMP, 6-TG) / Mercaptopurine (6MP) (including pretreatment) (Imuran® / Purinethol®)", 40.7, 55.5], ["30336", "Metanephrines (urine)", 25.3, 34.5], ["30337", "Microalbumin (urine)", 7.15, 9.75], ["30340", "Myoglobin (urine)", 9.68, 13.2], ["30360", "Estradiol-17B", 4.62, 6.3], ["30361", "Estrone (plasma)", 4.29, 5.85], ["30362", "Osmolality", 4.4, 6.0], ["30363", "Osteocalin", 9.9, 13.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["30364", "Oxalate (urine)", 13.09, 17.85], ["30370", "Anti-phospholipase A2 receptor (anti-PLA2R) circulating antibody (ELISA) (quantitative)", 51.7, 70.5], ["30371", "Anti-phospholipase A2 receptor (anti-PLA2R) circulating antibody (IIFT) (qualitative)", 86.9, 118.5], ["30382", "Peptide C", 9.02, 12.3], ["30383", "pH (biological fluid)", 2.09, 2.85], ["30386", "ALP (Alkaline phosphatase)", 1.81, 2.48], ["30388", "Alkaline phosphatase (electrophoresis)", 71.5, 97.5], ["30389", "Placental Alkaline Phosphatase (PAPLA)", 18.04, 24.6], ["30391", "Phosphate", 2.2, 3.0], ["30393", "Porphobilinogen (PBG) (quantitative)", 166.1, 226.5], ["30394", "Porphyrins (plasma) (quantitative)", 63.8, 87.0], ["30395", "Porphyrins (urine) (qualitative)", 19.8, 27.0], ["30397", "Porphyrins (uro or copro) (urine) (quantitative)", 39.6, 54.0], ["30398", "Potassium", 1.81, 2.48], ["30399", "Pre-albumin", 3.3, 4.5], ["30400", "Progestérone", 3.52, 4.8], ["30401", "Progesterone (17-hydroxy)", 11.11, 15.15], ["30402", "Prolactin", 3.41, 4.65], ["30404", "Protein, total (body fluids)", 5.5, 7.5], ["30405", "Protein, total (serum)", 1.81, 2.48], ["30406", "Erythrocyte protoporphyrins", 112.2, 153.0], ["30407", "Prostate-specific antigen (PSA)", 6.49, 8.85], ["30409", "Pseudocholinesterase (typing) (FN + DN)", 34.1, 46.5], ["30410", "Pseudocholinesterase total only", 16.83, 22.95], ["30412", "C-reactive protein (CRP) (includes ultrasensitive) (MUHC: hCRP)", 2.86, 3.9], ["30450", "Renin", 24.2, 33.0], ["30452", "Porphyrins (stool) (fractional dosage) (quantitative)", 105.6, 144.0], ["30469", "Fecal Occult Blood (Immunochemical Test)", 7.37, 10.05], ["30470", "Blood in body fluids (qualitative)", 4.51, 6.15], ["30471", "Occult blood stool (qualitative)", 3.85, 5.25], ["30472", "Squamous cell carcinoma (SCC)", 10.45, 14.25], ["30473", "Stool (microscopic exam, fat, starch, fibres) (qualitative)", 7.59, 10.35], ["30474", "Stools (24 hour weight measurement)", 3.63, 4.95], ["30476", "Serotonin (HPLC)", 113.3, 154.5], ["30477", "Sex hormone binding globulin (SHBG)", 4.29, 5.85], ["30478", "Sodium", 1.81, 2.48], ["30479", "Somatomedin C (IGF-1)", 7.92, 10.8], ["30482", "Sweat Chloride Analysis (stimulation, procurement)", 62.7, 85.5], ["30485", "Trisomie 21 -prenatal screen (data management)", 24.2, 33.0], ["30500", "T3 total (total triiodothyronine) or free T3", 3.19, 4.35], ["30502", "FT4 (thyroxine free)", 2.09, 2.85], ["30504", "Télopeptides (C ou N) (sérum)", 9.24, 12.6], ["30506", "Testosterone total", 6.38, 8.7], ["30508", "Thyroglobulin", 10.56, 14.4], ["30510", "Tumor necrosing factor (TNF-alpha)", 25.3, 34.5], ["30511", "Transferrin", 1.98, 2.7], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["30512", "Triglycerides", 1.81, 2.48], ["30513", "Troponin I", 4.4, 6.0], ["30515", "Tryptase", 33.0, 45.0], ["30516", "TSH (thyroid stimulating hormone)", 6.6, 9.0], ["30517", "Sweat (test) (chloride assay) (titration) (MUHC: Sweat Chloride Analysis )", 10.01, 13.65], ["30518", "Dosage of serum testosterone by LC-MS/MS", 8.36, 11.4], ["30530", "Lipoproteins (ultracentrifugation)", 55.0, 75.0], ["30531", "Urea", 1.81, 2.48], ["30532", "Urine (microscopy)", 3.63, 4.95], ["30533", "Urinalysis Includes: appearance, color, pH, specific gravity, glucose, ketones (for acetone), protein, nitrate, bil", 2.75, 3.75], ["30534", "Urine volume for timed urines", 3.3, 4.5], ["30535", "Total bile acids (dosage) (MUHC: Bile acids)", 16.94, 23.1], ["30536", "Fecal Calprotectin (dosage, excluding extraction)", 13.2, 18.0], ["30537", "Fecal calprotectin (extraction)", 5.72, 7.8], ["30550", "Plasma viscosity", 10.78, 14.7], ["30551", "Vitamin A + E (HPLC) (includes β-carotene)", 25.3, 34.5], ["30553", "Vitamin B12", 2.97, 4.05], ["30554", "Vitamin C", 37.4, 51.0], ["30555", "Vitamin D 1-25 diOH", 53.9, 73.5], ["30556", "Vitamin D 25 OH", 8.14, 11.1], ["30557", "Vitamine hydrosolubles (B1, B2, B6 & C) (quantitative) (HPLC)", 14.74, 20.1], ["30580", "CSF Xanthochromia (measured)", 8.14, 11.1], ["30581", "Xylose", 22.0, 30.0], ["30583", "Bone alkaline phosphatase", 5.61, 7.65], ["30584", "Cortisol (saliva)", 11.55, 15.75], ["30585", "Inhibin B", 62.7, 85.5], ["30586", "Metanephrines, Free plasma", 128.7, 175.5], ["30587", "Anti Müllerian hormone (AMH)", 27.5, 37.5], ["30588", "3-methoxytyramine (serum)", 166.1, 226.5], ["30589", "Parathyroid-related protein (PTHrP) assay", 119.9, 163.5], ["30600", "Acetaminophen", 3.41, 4.65], ["30601", "Valproic acid", 6.27, 8.55], ["30602", "Amikacin", 8.69, 11.85], ["30603", "Amiodarone", 95.7, 130.5], ["30604", "Amphetamine Screen /Methamphetamine (other than dipstick) (automated)", 5.83, 7.95], ["30607", "Tricyclic antidepressants (other than dipstick) (automated) (immunoenzyme)", 4.51, 6.15], ["30608", "Tricyclic and non tricyclic antidepressors (GC 9 results)", 69.3, 94.5], ["30610", "Flucytosine (5-FC) (Ancotil®)", 113.3, 154.5], ["30619", "Ethylglucoronide and ethylsulfate (LC-MS / MS)", 51.7, 70.5], ["30620", "Barbiturate Screen (other than dipstick) (automated)", 4.73, 6.45], ["30621", "Benzodiazepine Screen (other than dipstick) (automated)", 4.84, 6.6], ["30623", "Busulfan (Myleran®)", 125.4, 171.0], ["30625", "Buprenorphine (homogeneous enzyme-linked immunosorbent assay, semi-quantitative)", 11.77, 16.05], ["30630", "Carbamazépine", 10.01, 13.65], ["30631", "Cyclosporine (Neoral®)", 11.99, 16.35], ["30632", "Clozapin & nor-clozapin (Clozaril®)", 23.1, 31.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["30640", "Digoxin (Lanoxin®)", 6.93, 9.45], ["30642", "Anti-retroviral (ARV) / programme provincial de dosage des médicaments antirétroviraux", 30.8, 42.0], ["30660", "Clobazam (Frisium®)", 53.9, 73.5], ["30671", "Gentamicine", 4.51, 6.15], ["30680", "Oral hypoglycemic agents", 20.13, 27.45], ["30690", "Lamotrigine (Lamictal®)", 45.1, 61.5], ["30691", "Lidocaine (Xylocaïne®)", 78.1, 106.5], ["30692", "Lithium (Li)", 4.73, 6.45], ["30693", "Intra-erythrocytic lithium (Li) (Carbolith®)", 8.25, 11.25], ["30695", "Adalimumab (Humira®)", 62.7, 85.5], ["30696", "Anti-Adalimumab antibodies (Humira®)", 67.1, 91.5], ["30701", "Methadone Screen (other than dipstick) (automated)", 6.38, 8.7], ["30702", "Methotrexate", 36.3, 49.5], ["30703", "Mitotane (Lysodren®)", 8.58, 11.7], ["30711", "Nitisinoma (NTBC) (Orfadin®)", 14.19, 19.35], ["30720", "Olanzapine (Zyprexa®)", 30.8, 42.0], ["30730", "Phenobarbital", 8.91, 12.15], ["30731", "Phenytoin", 6.16, 8.4], ["30732", "Phenytoin libre (Dilantin®)", 64.9, 88.5], ["30733", "Primidone (including phenobarbital) (Mysoline®)", 40.7, 55.5], ["30759", "Everolimus (Afinitor®)", 102.3, 139.5], ["30760", "Salicylates", 3.74, 5.1], ["30761", "Sirolimus (Rapamune®)", 17.49, 23.85], ["30770", "Tacrolimus (FK-506) (Prograf®)", 11.44, 15.6], ["30771", "Theophylline", 2.2, 3.0], ["30773", "Tobramycin", 9.9, 13.5], ["30780", "Vancomycin", 4.4, 6.0], ["30781", "Voriconazole (Vfend®)", 40.7, 55.5], ["30782", "Measurement of L-Asparaginase activity", 45.1, 61.5], ["30831", "Cannabinoid Screen (THC) (other than dipstick) (automated)", 11.0, 15.0], ["30834", "Cocaine Screen (other than dipstick) (automated)", 5.39, 7.35], ["30850", "Drugs (cannabis-THC, benzoylecgonine-cocaïne) (HPLC or GCMS)", 74.8, 102.0], ["30851", "Street Drugs / dipstick / drug", 2.86, 3.9], ["30860", "Iron (analysis in biopsies)", 57.2, 78.0], ["30883", "Oxycodone (other than dipstick) (automated)", 20.13, 27.45], ["30890", "Opiate (other than screen) (automated)", 11.0, 15.0], ["30891", "PCP (other than screen) (automated)", 2.09, 2.85], ["30893", "General toxicological screening (GC MS / NPD) (serum-plasma-urine-gastric fluid)", 92.4, 126.0], ["30920", "Thiocyanate (serum)", 9.9, 13.5], ["30980", "Zinc", 6.38, 8.7], ["31042", "Anti-neuronal antibody panel (anti-HU, anti-RI, anti-YO, anti-CV2, anti-PMNA2 and anti-amphiphysin) (immuno", 59.4, 81.0], ["31050", "Anti-neuronal antibody panel (anti-HU, anti-RI, anti-YO, anti-CV2, anti-PMNA2 and anti-amphiphysin) (immuno", 18.15, 24.75], ["31098", "Infliximab (Remicade®)", 58.3, 79.5], ["31099", "Antibodies anti-Infliximab (Remicade®)", 58.3, 79.5], ["40005", "Helicobacter pylori (antigen in stool)", 30.8, 42.0], ["40007", "Clostridioides difficile (Ag) glutamate dehydrogenase (membrane ELISA) (rapid test) (stool)", 19.14, 26.1], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["40008", "Helicobacter pylori (urea breath test) (isotope ratio mass spectrometry)", 4.4, 6.0], ["40018", "Carbapenemase (NAAT) (unapproved kit)", 30.8, 42.0], ["40020", "Gram negative multi-resistant bacteria ( beta-lactamase-ESBL, carbapenemase) (screening)", 7.26, 9.9], ["40021", "Helicobacter pylori (culture on gastric biopsie)", 8.91, 12.15], ["40022", "Helicobacter pylori (rapid urease on gastric biopsie)", 5.17, 7.05], ["40025", "Bronchoscopy (quantitative culture )", 11.0, 15.0], ["40026", "Bronchoscopy (semi-quantitative culture)", 6.6, 9.0], ["40045", "Chlamydia (shell vial)", 37.4, 51.0], ["40046", "Minimum inhibitory concentration (MIC) (dilution in broth) (per bacterium)", 11.33, 15.45], ["40047", "Minimal inhibition Concentration(MIC) microplaque / automated card (per bacteria)", 14.3, 19.5], ["40048", "Minimal inhibition Concentration by diffusion (MIC) (strip) (per antibiotic and per bacteria)", 14.52, 19.8], ["40049", "Catheter (culture semi-quantitative)", 6.27, 8.55], ["40051", "Minimum inhibitory concentration (MIC) (dilution in agar) (steer) (by bacteria)", 21.23, 28.95], ["40053", "Inoculation without identification", 1.21, 1.65], ["40063", "Vancomycin resistant Enterococcus (VRE) (specific culture ) (Chromogenic agar screening)", 4.4, 6.0], ["40065", "Sputum (bacteriology) (including specimens rejected after Gram)", 7.81, 10.65], ["40080", "Throat (Culture for Strep A,C,G or beta hemolytic)", 6.49, 8.85], ["40101", "Blood culture (1 bottle : aerobic or anaerobic)", 3.19, 4.35], ["40102", "Blood culture (2 bottles : aerobic & anaerobic)", 7.48, 10.2], ["40103", "Identification of bacteria, from a blood culture, to genus or species", 1.76, 2.4], ["40124", "Identification of an bacteria to Genus and/ or species (MALDI-TOF)", 1.76, 2.4], ["40125", "Identification of an microorganism to Genus or species (API)", 17.82, 24.3], ["40126", "Identification of an microorganism to Genus or species (Automated identification cards such as VITEK®, Pho", 7.7, 10.5], ["40127", "Oreintation tests required for the identification of a microorganism (on a colony)", 4.07, 5.55], ["40128", "Set of orientation tests prior to the identification of a microorganism (by MALDI-TOF)", 4.07, 5.55], ["40130", "Gram stain (on a colony)", 3.96, 5.4], ["40140", "Kirby Bauer (per bacteria) (senistivities by diffusion)", 6.05, 8.25], ["40160", "Legionella (urinary antigen)", 45.1, 61.5], ["40161", "Legionella (culture on clinical specimen)", 17.71, 24.15], ["40164", "CSF culture", 10.23, 13.95], ["40165", "Body fluid (other than CSF) culture", 24.2, 33.0], ["40182", "Mycoplasma hominis, Ureaplasma (culture)", 7.59, 10.35], ["40200", "Neisseria gonorrhoeae (culture) (all sites)", 9.13, 12.45], ["40201", "Staphylococcus aureus (nose) (culture) (excluding MRSA)", 6.71, 9.15], ["40202", "Nocardia (culture)", 18.7, 25.5], ["40220", "Ear Discharge bacterial culture", 7.15, 9.75], ["40240", "Pneumococcus (urinary antigen) (urine or CSF)", 37.4, 51.0], ["40242", "Deep Wound (Culture for anaerobes, including Actinomyces)", 9.02, 12.3], ["40243", "Wound/skin (Bacterial culture, excluding anaerobes)", 5.39, 7.35], ["40260", "Eye - Bacterial culture", 8.47, 11.55], ["40261", "Sputum (Culture) - Endotracheal aspiration", 9.46, 12.9], ["40262", "Vaginal secretions (culture, wet prep, KOH)", 3.74, 5.1], ["40263", "Stool culture", 14.96, 20.4], ["40264", "Clostridium difficile (toxins A and B) (rapid test) (membrane ELISA) (stool)", 30.8, 42.0], ["40265", "Sputum culture (Cystic fibrosis)", 21.56, 29.4], ["40266", "Methicillin resistant Stapylococcus aureus (MRSA) culture", 3.74, 5.1], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["40268", "Group A Streptococcus (antigen detection) (rapid clinical specimen test)", 9.79, 13.35], ["40269", "Streptococcus group B recto-vaginal culture", 6.49, 8.85], ["40270", "Streptococcus group B recto-vaginal culture (agglutination on broth)", 10.78, 14.7], ["40271", "Sterility (blood product)", 23.1, 31.5], ["40280", "Vaginal secretions (Gram direct for vaginosis)", 10.78, 14.7], ["40285", "Stool Preparation for Feces Transplantation (without encapsulation)", 84.7, 115.5], ["40286", "Stool Preparation for Feces Transplantation (with encapsulation)", 270.6, 369.0], ["40310", "Urine culture (all methods of collection)", 2.75, 3.75], ["40330", "Stool (verocytotoxin E. coli) (cell culture)", 31.9, 43.5], ["40352", "Clostridioides difficile (GDH) + (toxins A and B) (membrane ELISA) (rapid test) (stool)", 23.1, 31.5], ["40355", "Completing and transferring a form to the LSPQ as part of mandatory monitoring (done by a laboratory emplo", 3.41, 4.65], ["40400", "Environmental culture (clinical specimen) stertility (per ampoule or caps) (ATTEST)", 4.62, 6.3], ["40401", "Environmental culture by site (air)", 4.07, 5.55], ["40403", "Preparation for environmental culture by site (water) (intra-hospital)", 8.91, 12.15], ["40405", "Environmental Culture for Aspergillus", 5.61, 7.65], ["40420", "Environmental culture (other) (intra-hospital)", 4.95, 6.75], ["40450", "Environmental Culture for Legionella", 28.6, 39.0], ["40480", "Sterility (pharmaceutical preparation)", 10.56, 14.4], ["40511", "Antiviral Susceptibility Testing for HSV, CMV, VVZ (IC50) (per virus)", 91.3, 124.5], ["40599", "Adenovirus (rapid detection on clinical specimen) (stool) (ELISA)", 19.58, 26.7], ["40602", "Aspergillus IgG or total Ac (per Ag) (counter-immunoelectrophoresis)", 6.82, 9.3], ["40603", "Diphteria (IgG or total antibodies)", 28.6, 39.0], ["40604", "Hemophilus influenzae (IgG or total antibodies)", 36.3, 49.5], ["40605", "Pneumococcus (IgG or total antibodies)", 179.3, 244.5], ["40606", "Tetanus (IgG or total antibodies)", 28.6, 39.0], ["40630", "Coronavirus (SARS-CoV-2) (IgG or total antibodies)", 16.17, 22.05], ["40641", "Cytomegalovirus (CMV) (IgG or total antibodies) (ELISA)", 9.24, 12.6], ["40642", "Cytomegalovirus (CMV) IgM specific (ELISA)", 11.99, 16.35], ["40647", "Cytomegalovirus (CMV) specific IgG (measure of avidity)", 55.0, 75.0], ["40661", "Epstein Barr Virus (EBV-EA) IgG or Total Antibodies (immunofluorescence)", 39.6, 54.0], ["40662", "Epstein Barr Virus (EBV) (EBNA) IgG or Total Antibodies (ELISA)", 8.58, 11.7], ["40663", "Epstein Barr Virus (EBV) (EBNA) IgG or total antibodies (immunofluorescence)", 22.0, 30.0], ["40665", "Epstein Barr Virus (EBV) (VCA) IgG or total antibodies (ELISA)", 8.58, 11.7], ["40666", "Epstein Barr Virus (EBV) (VCA) IgG or total antibodies (immunofluorescence)", 23.1, 31.5], ["40667", "Epstein Barr Virus (EBV) (VCA) specific IgM (ELISA)", 10.56, 14.4], ["40680", "Q fever : Coxiella burnettii IgG -IgM", 74.8, 102.0], ["40681", "Bartonella, cat scratch disease (antibodies)", 24.2, 33.0], ["40690", "Helicobacter pylori (IgG or total antibodies)", 7.37, 10.05], ["40693", "Herpes simplex (IgG or total antibodies) (ELISA)", 10.56, 14.4], ["40695", "Herpes simplex (IgG specific type 1 or 2) (per Ag) (ELISA)", 7.04, 9.6], ["40698", "HTLV 1 & 2 IgG or total Ab (ELISA)", 8.36, 11.4], ["40730", "Legionella IgG or total Ab (ELISA)", 16.17, 22.05], ["40740", "Mononucleosis heterophile antibody (agglutination)", 10.56, 14.4], ["40744", "Mycoplasma pneumoniae IgM specfic (ELISA)", 17.93, 24.45], ["40750", "Mumps (IgG or total antibodies) (ELISA)", 7.37, 10.05], ["40751", "Mumps (IgM specific) (ELISA)", 9.35, 12.75], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["40772", "Parvovirus (parvo B-19) IgM specific (ELISA)", 21.56, 29.4], ["40773", "Parvovirus (parvo B-19) (IgG or total antibodies) (ELISA)", 17.27, 23.55], ["40791", "Measles (IgG or total Antibodies) (ELISA)", 8.36, 11.4], ["40792", "Measles (IgM specific Antibodies) (ELISA)", 9.57, 13.05], ["40794", "Rubella (IgG or total antibodies) (ELISA)", 7.59, 10.35], ["40797", "Rubella (IgM specific Antibodies) (ELISA)", 8.91, 12.15], ["40800", "RA (rheumatoid factor)", 7.59, 10.35], ["40811", "Anti-streptolysin O group A streptococci (ASO) IgG or total Ac (quantitative) (nephelometry)", 2.53, 3.45], ["40812", "Anti-streptolysin O group A streptococcus (ASO) IgG or total Ab (quantitative) (manual)", 12.65, 17.25], ["40813", "Streptozyme Group A IgG or Total Ab", 13.86, 18.9], ["40814", "Syphilis non-treponemal antigen (RPR) IgG or total Ab", 8.47, 11.55], ["40815", "Syphilis screen (EIA)", 7.7, 10.5], ["40816", "Streptococcus Group A (qualitative) on slide", 6.27, 8.55], ["40832", "Toxoplasmosis IgG or total antibodies (ELISA)", 7.37, 10.05], ["40833", "Toxoplasmosis IgM specific (ELISA)", 15.18, 20.7], ["40840", "HIV IgG or total antibodies (rapid test)", 22.0, 30.0], ["40850", "HIV IgG or total antibodies and p24 antigen screen (ELISA)", 7.7, 10.5], ["40853", "Herpes virus Varicella-Zoster (VZV) IgG specific (ELISA)", 11.77, 16.05], ["40855", "Herpes virus Varicella-Zoster (VZV) IgM specific (ELISA)", 9.35, 12.75], ["40900", "Mycobacteria (blood culture)", 17.6, 24.0], ["40901", "Mycobacteria (culture on liquid media only)", 33.0, 45.0], ["40902", "Mycobacteria (culture on liquid and solid media)", 36.3, 49.5], ["40904", "Mycobacteria (direct examination on clinical specimen) (auramine)", 11.99, 16.35], ["40907", "Mycobacteria (direct examination on clinical specimen) (Ziehl)", 26.4, 36.0], ["40920", "Mycobacterium tuberculosis (PPD) (induration and reading) (done by a technologist)", 4.29, 5.85], ["40921", "Mycobacterium tuberculosis (gamma interferon release test, IGRA)", 33.0, 45.0], ["40922", "Identification of a mycobacterium to the genus or species (mass spectrometry - MALDI-TOF)", 1.76, 2.4], ["41000", "Antifungal minimum inhibitory concentration (MIC): agar strip diffusion (e.g. E-TEST or Liofilchem)", 0.0, 0.0], ["41001", "Galactomannan (Aspergillus antigen) (ELISA)", 36.3, 49.5], ["41020", "Cryptococcus (Ag) (serum or CSF) (agglutination)", 10.12, 13.8], ["41031", "Fungus (blood culture)", 10.01, 13.65], ["41050", "Yeast (specific culture)", 6.27, 8.55], ["41051", "Multiresistant yeast (Candida auris) (screening)", 6.49, 8.85], ["41055", "Antifungal minimum inhibitory concentration (MIC): broth microdilution - CLSI method or YeastOne Sensititre (", 59.4, 81.0], ["41056", "Antifungal minimum inhibitory concentration (MIC): disk diffusion on agar (Kirby Bauer) - CLSI method", 13.31, 18.15], ["41070", "Mycology (direct examination on clinical specimen) (including wet prep, KOH, calcofluor)", 11.55, 15.75], ["41071", "Deep fungus (including yeasts)", 31.9, 43.5], ["41072", "Superficial fungus (dermatophyte) (including yeasts)", 21.89, 29.85], ["41073", "Antifungal minimum inhibitory concentration (MIC): automated microplate (per yeast)", 0.0, 0.0], ["41076", "Filamentous fungi (manual identification)", 27.5, 37.5], ["41077", "Identification of filamentous fungi by genus or species (mass spectrometry - MALDI-TOF)", 1.76, 2.4], ["41078", "Identification of yeasts to the genus or species (mass spectrometry - MALDI-TOF)", 1.76, 2.4], ["41120", "Malaria (rapid detection of Ag) (immunochromatography)", 15.4, 21.0], ["41121", "Malaria (smear + thick drop) (preparation and staining)", 10.23, 13.95], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["41122", "Malaria (reading and identification, including% parasitaemia)", 33.0, 45.0], ["41140", "Pinworms (search by sticky tape)", 8.58, 11.7], ["41150", "Parasites in blood, tissues and body fluids (detection) (except malaria, Trichomonas)", 50.6, 69.0], ["41151", "Fecal parasites (Giardia, Cryptosporidium) (immunofluorescence)", 27.5, 37.5], ["41152", "Fecal parasites (by permanent stains, except iodine staining or wet prep)", 15.18, 20.7], ["41153", "Fecal parasites (by concentration, wet prep or iodine staining including reading)", 15.84, 21.6], ["41154", "Pneumocystis jirovecii (detection) (direct immunofluorescence)", 70.4, 96.0], ["41160", "Strongyloidosis (specific culture)", 28.6, 39.0], ["41170", "Trichomonas vaginalis (culture)", 15.73, 21.45], ["41171", "Trichomonas vaginalis (antigen detection)", 12.1, 16.5], ["41180", "Ectoparasites and worms (identification)", 5.5, 7.5], ["41223", "Cytomegalovirus (CMV) (tube culture)", 99.0, 135.0], ["41224", "Cytomegalovirus (CMV) (Shell vial)", 74.8, 102.0], ["41281", "Herpes simplex type I and II (cell culture and typing)", 55.0, 75.0], ["41282", "Herpes simplex type I or II (rapid detection on a clinical specimen including typing) (by immunofluorescence)", 25.3, 34.5], ["41301", "Influenza (including A and B) (rapid detection on clinical specimen) (ELISA)", 31.9, 43.5], ["41370", "Rotavirus (rapid detection) (ELISA)", 20.35, 27.75], ["41371", "Respiratory syncytial virus (RSV) (rapid detection in clinical specimen) (ELISA)", 34.1, 46.5], ["41380", "Clostridioides difficile (toxins A and B) (cell culture) (stool)", 34.1, 46.5], ["41382", "Clostridioides difficile (toxins A and B) (ELISAon microplate) (stool)", 23.1, 31.5], ["41397", "Mumps (cell culture)", 108.9, 148.5], ["41398", "Rhinovirus (acidity test)", 124.3, 169.5], ["41399", "Measles (cell culture)", 207.9, 283.5], ["41403", "Virus-respiratory specimen (cell culture)", 88.0, 120.0], ["41405", "Virus-Normally sterile specimen (biopsy, CSF, body fluid) (cell culture)", 107.8, 147.0], ["41406", "Virus-Urinary specimen (cell culture)", 128.7, 175.5], ["41410", "Varicella-Zoster virus (VZV) (cell culture in microplate)", 68.2, 93.0], ["41411", "Varicella-Zoster virus (VZV) (cell culture in tube)", 102.3, 139.5], ["41412", "Varicella-Zoster virus (VZV) (Shell vial)", 80.3, 109.5], ["41413", "Varicella-Zoster virus (VZV) (rapid detection on clinical specimen) (immunofluorescence)", 24.2, 33.0], ["41417", "Dressing with personal protective equipment (PPE) for Ebola virus disease/severe respiratory infectious disea", 0.0, 0.0], ["45002", "Anti-glutamate receptor (NMDA) (antibody search)", 104.5, 142.5], ["45004", "Adenovirus; viral load (NAAT) (quantitative) on blood", 41.8, 57.0], ["45008", "BK / JC polyomavirus; viral load (NAAT) (quantitative) on clinical specimen", 106.7, 145.5], ["45010", "Bordetella pertussis, Bordetella parapertussis, Mycoplasma pneumoniae and Chlamydophila pneumoniae; det", 39.6, 54.0], ["45011", "Bordetella pertussis and Bordetella parapertussis; detection (NAAT) (approved kit) on clinical specimen", 66.0, 90.0], ["45017", "Carbapenemase (NAAT) (registered kit)", 1.1, 1.5], ["45018", "Chlamydia trachomatis and Neisseria gonorrhoeae; detection (NAAT) (multiplex) on urinary specimen", 5.17, 7.05], ["45020", "Chlamydia trachomatis and Neisseria gonorrhoeae; detection (NAAT) (multiplex) on extra-genital specimen", 5.17, 7.05], ["45022", "Chlamydia trachomatis and Neisseria gonorrhoeae; detection (NAAT) (multiplex) on genital specimen", 5.17, 7.05], ["45023", "Trichomonas vaginalis (TAAN )", 11.0, 15.0], ["45024", "Mycoplasma genitalium (NAAT)", 18.59, 25.35], ["45025", "Enteric pathogens; multiplex detection (viruses, bacteria and parasites) (NAAT) (registered kit) on clinical spe", 118.8, 162.0], ["45026", "Clostridioides difficile; detection of the toxin B gene (NAAT) on a clinical specimen", 35.2, 48.0], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["45027", "Coronavirus (SARS-CoV-2); detection (NAAT) (approved kit) on clinical specimen (m2000/Alinity-m platform)", 0.0, 0.0], ["45028", "Coronavirus (SARS-CoV-2); detection (NAAT) (approved kit) on clinical specimen (Cobas 6800/8800 platform", 21.56, 29.4], ["45029", "Coronavirus (SARS-CoV-2); detection (NAAT) (approved kit) on clinical specimen (Seegene Platform)", 17.49, 23.85], ["45030", "Cytomegalovirus (CMV) resistance to ganciclovir and / or foscarnet (sequencing)", 154.0, 210.0], ["45031", "Coronavirus (SARS-CoV-2); detection (NAAT) (approved kit) on clinical specimen", 34.1, 46.5], ["45032", "Cytomegalovirus (CMV) viral load (NAAT) (quantitative) on clinical specimen", 42.9, 58.5], ["45033", "Coronavirus (SARS-CoV-2); detection (NAAT) (rapid test, approved kit) on clinical specimen", 73.7, 100.5], ["45034", "Coronavirus (SARS-CoV-2); detection (NAAT) (non-approved kit) on clinical specimen", 15.18, 20.7], ["45035", "Vancomycin resistant enterococcus (VRE); detection (NAAT) (non-approved kit or test developed by the labor", 4.18, 5.7], ["45036", "Vancomycin-resistant enterococcus (VRE); detection (NAAT) (approved kit) on clinical specimen", 40.7, 55.5], ["45037", "Coronavirus (SARS-CoV-2): general screening of enhanced surveillance variant", 26.4, 36.0], ["45038", "Enterovirus; detection (NAAT) on cerebrospinal fluid (CSF)", 39.6, 54.0], ["45039", "Coronavirus (SARS-CoV-2): variant specific screening with enhanced surveillance", 26.4, 36.0], ["45040", "Shiga toxin producing Escherichia coli (STEC); detection (NAAT) on enrichment broth", 16.83, 22.95], ["45041", "Bacterial gastroenteritis; multiple bacterial detection (NAAT) (multiplex, approved kit) on clinical specimen", 33.0, 45.0], ["45043", "Bacterial gastroenteritis; multiplex detection 7 bacteria: Salmonella, Shigella, Shiga-toxin producing bacteria, Y", 14.19, 19.35], ["45045", "Viral gastroenteritis; multiplex 5 virus detection: adenovirus 40/41 and total, rotavirus, norovirus, sapovirus, as", 50.6, 69.0], ["45046", "Influenza A; subtyping (eg H1N1) (NAAT) (non-approved kit or test developed by the laboratory) on clinical sp", 26.4, 36.0], ["45047", "Vancomycin-resistant Enterococcus (VRE) and Gram-negative carbapenemase-producing bacteria (GNPC) (", 42.9, 58.5], ["45048", "Influenza A and B; detection (NAAT) (multiplex) (approved kit) on clinical specimen", 48.4, 66.0], ["45050", "Influenza A and B; with or without subtyping including extraction and amplification (NAAT) (multiplex) (unappro", 24.2, 33.0], ["45051", "Coronavirus (SARS-CoV-2), Influenza A and B and RSV; detection (NAAT) (multiplex) (approved kit) on clinic", 119.9, 163.5], ["45052", "Coronavirus (SARS-CoV-2), Influenza A and B and RSV; detection (NAAT) (multiplex) (unlicensed kit) on clini", 27.5, 37.5], ["45053", "Coronavirus (SARS-CoV-2) and Influenza A and B; detection (NAAT) (multiplex) (approved kit) on clinical spe", 62.7, 85.5], ["45054", "Coronavirus (SARS-CoV-2) and Influenza A and B; detection (NAAT) (multiplex) (unlicensed kit) on clinical sp", 26.4, 36.0], ["45055", "Coronavirus (SARS-CoV-2) and respiratory viruses; multiplex detection 8 to 23 viruses (NAAT) (multiplex) (ap", 181.5, 247.5], ["45056", "Hepatitis B (HBV); viral load (NAAT) (quantitative) on clinical specimen", 34.1, 46.5], ["45058", "Hepatitis C (HCV); screening (NAAT) (qualitative) on clinical specimen", 74.8, 102.0], ["45060", "Hepatitis C (HCV); viral load (NAAT) (quantitative) on clinical specimen", 29.7, 40.5], ["45062", "Hepatitis E (HEV); viral load (NAAT) (quantitative) on clinical specimen", 70.4, 96.0], ["45064", "Herpes simplex type 1 or 2 (HSV1 or HSV2); (NAAT) (unapproved kit or test developed by the laboratory) on", 39.6, 54.0], ["45065", "Herpes simplex type 1, Herpes simplex type 2 (HSV1, HSV2) and Varicella-Zoster virus (VVZ); (NAAT) (unlic", 7.26, 9.9], ["45066", "Herpes simplex type 1 or 2 (HSV1 or HSV2); (NAAT) (approved kit) on clinical specimen", 52.8, 72.0], ["45068", "Herpes virus; multiplex detection 7 viruses: HSV1, HSV2, CMV, EBV, VVZ, HHV6, HHV7 (NAAT) (multiplex)", 177.1, 241.5], ["45072", "HLA-B * 57: 01 Detection (NAAT) on blood", 28.6, 39.0], ["45074", "Plasmodium falciparum (Malaria); detection (LAMP) (NAAT) on clinical specimen", 36.3, 49.5], ["45076", "Bacterial meningitis; multiplex detection 5 bacteria: S. pneumoniae, N.meningitidis, S. agalactiae, L. monocyto", 149.6, 204.0], ["45077", "Meningoencephalitis; multiplex detection 14 pathogens: 6 bacteria, 7 viruses and yeast (NAAT) (multiplex) on", 184.8, 252.0], ["45080", "Mycobacteria; (hybridization) (accuprobe) on solid or liquid culture mycobacteria", 71.5, 97.5], ["45082", "Mycobacteria; (NAAT) (approved kit) on clinical specimen", 82.5, 112.5], ["45084", "Mycobacterium tuberculosis (BK); identification (NAAT) on solid or liquid culture", 50.6, 69.0], ["45086", "Mycoplasma hominis, Mycoplasma genitalium and Ureaplasma spp .; detection (NAAT) (multiplex) on clinical", 34.1, 46.5], ["45088", "Mycoplasma pneumoniae and Chlamydophila pneumoniae; (NAAT) (multiplex) on clinical specimen other than", 17.49, 23.85], ["45092", "Parechovirus viral load (NAAT) (quantitative) on clinical specimen", 45.1, 61.5], ["45094", "Parvovirus B 19; (NAAT) on clinical specimen", 62.7, 85.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["45098", "Enteric protozoa; (NAAT) (multiplex) (approved kit) on clinical specimen", 40.7, 55.5], ["45099", "Methicillin-resistant Staphylococcus aureus (MRSA); detection (NAAT) (non-approved kit or test developed by", 4.18, 5.7], ["45100", "Methicillin-resistant Staphylococcus aureus (MRSA); detection (NAAT) on clinical specimen", 38.5, 52.5], ["45104", "Tropheryma whipplei; detection (NAAT) on clinical specimen", 100.1, 136.5], ["45110", "Varicella-Zoster virus (VVZ); detection (NAAT) (unapproved kit or laboratory-developed test) on clinical speci", 0.0, 0.0], ["45111", "Measles virus; detection (NAAT) on clinical specimen", 28.6, 39.0], ["45112", "Human Immunodeficiency Virus (HIV) Viral Load (NAAT) (Quantitative) on Blood", 31.9, 43.5], ["45113", "Varicella-Zoster Virus (VVZ); detection (NAAT) (approved kit) on clinical specimen", 48.4, 66.0], ["45114", "Human immunodeficiency virus (HIV) Integrase genotyping (sequencing) on blood", 158.4, 216.0], ["45116", "Human Immunodeficiency Virus (HIV) Genotyping Tropism (Sequencing) on Blood", 269.5, 367.5], ["45118", "Human immunodeficiency virus (HIV) genotyping for antiretroviral resistance (sequencing) on blood", 246.4, 336.0], ["45120", "Epstein-Barr Virus (EBV); viral load (NAAT) (quantitative) on clinical specimen", 41.8, 57.0], ["45124", "Human papillomavirus (HPV); detection of oncogenic groups (NAAT) (multiplex) on a clinical specimen", 18.15, 24.75], ["45130", "Respiratory syncytial virus (RSV); detection (NAAT) (non-approved kit or test developed by the laboratory) on", 25.3, 34.5], ["45131", "Respiratory virus; multiplex detection 3 viruses (influenza A, influenza B and RSV) (NAAT) (multiplex) (approv", 41.8, 57.0], ["45132", "Respiratory viruses; multiplex detection 8 to 20 viruses (NAAT) (multiplex) (approved kit) on clinical specimen", 163.9, 223.5], ["45134", "Respiratory viruses; multiplex detection 12 to 15 viruses: influenza A, influenza B, synvotic respiratory virus (R", 59.4, 81.0], ["45140", "Kaposi's Sarcoma Virus (HHV8); detection (NAAT) on clinical specimen", 124.3, 169.5], ["45141", "Septic arthritis and bacterial pleural infection; multiplex detection 4 bacteria: Kingella kingae, Streptococcus ag", 25.3, 34.5], ["45142", "Streptococcus agalactiae (Streptococcus group B-SGB); prenatal screening (NAAT) on clinical specimen", 9.9, 13.5], ["50055", "CGH on microchips - Comparative genomic hybridization", 635.8, 867.0], ["50105", "Quantitative post-CGH analysis for confirmation or family screening", 154.0, 210.0], ["50390", "Amino acids (quantitative) (LC-MS)", 70.4, 96.0], ["50400", "Precursor of cholesterol or profile of plasma sterols", 31.9, 43.5], ["50401", "AcetylCoA: glucosaminide N-acetyltransferase (MPS III C)", 280.5, 382.5], ["50404", "Methylmalonic acid", 55.0, 75.0], ["50405", "Orotic acid", 56.1, 76.5], ["50407", "Pipecolic acid", 27.5, 37.5], ["50409", "Methylmalonic Acidemia + Homocysteinemia, Cell Complementarity Diagnosis", 1257.3, 1714.5], ["50410", "Methylmalonic acidemia with homocysteinemia, cobalamin cofactor assay", 905.3, 1234.5], ["50411", "Amino acids (qualitative)", 5.61, 7.65], ["50412", "Amino acids (quantitative)", 46.2, 63.0], ["50415", "Organic acids (quantitative and qualitative analysis)", 117.7, 160.5], ["50416", "Sialic acid", 64.9, 88.5], ["50417", "Acylcarnitines and free carnitine (serum profile) (MS-MS)", 20.68, 28.2], ["50419", "Alpha-fucosidase (fucosidosis)", 150.7, 205.5], ["50420", "Alpha-galactosidase A (Fabry)", 148.5, 202.5], ["50421", "Alpha-glucosidase (GSD II)", 158.4, 216.0], ["50422", "Alpha-iduronidase (MPS I)", 228.8, 312.0], ["50423", "Alpha-mannosidase (mannosidose)", 159.5, 217.5], ["50424", "Alpha-N-acetyl-D-glucosaminidase (MPS III B)", 204.6, 279.0], ["50425", "Alpha-N-acetylgalactosaminidase (Schindler)", 223.3, 304.5], ["50429", "Arylsulfatase A (metachromatic leukodystrophy)", 163.9, 223.5], ["50432", "Free fatty acids (automated enzymatic colorimetric)", 16.83, 22.95], ["50433", "Type 1 glutaric aciduria (GA-1); Determination of 3-hydroxyglutaric acid in urine specimen (GC-MS)", 126.5, 172.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["50440", "Urinary acylglycines (LC-MS / MS)", 139.7, 190.5], ["50450", "Beta-galactocerebrosidase (Krabbe)", 320.1, 436.5], ["50451", "Beta-galactosidase (MPS IV B / GM1 gangliosidosis)", 138.6, 189.0], ["50452", "Beta-glucosidase (Left-handed)", 167.2, 228.0], ["50453", "Beta-glucuronidase (MPS VII)", 166.1, 226.5], ["50454", "Beta-hexosaminidase A (gangliosidosis GM2) (assay with sulfated substrate)", 154.0, 210.0], ["50455", "Total beta-hexosaminidase, A and B (gangliosidosis GM2)", 233.2, 318.0], ["50456", "Beta-mannosidase (mannosidosis)", 167.2, 228.0], ["50457", "Biotinidase", 139.7, 190.5], ["50472", "Carnitine, Free and esterified (LC-MS / MS)", 50.6, 69.0], ["50476", "Culture of fibroblast cells for genetic study (including Mycoplasma research)", 862.4, 1176.0], ["50477", "Cystinosis-lysosome (lysosomal disease)", 217.8, 297.0], ["50483", "Spinal muscular atrophy (SMA), Severe combined immunodeficiency (SCID); Kit A (TREC; SMN1); (TAAN) o", 53.9, 73.5], ["50484", "Spinal muscular atrophy (SMA); Kit B (TREC; SMN1) - 2nd-line test; (TAAN) on dried blood", 1.1, 1.5], ["50485", "Spinal muscular atrophy (SMA); Kit C1 (SMN1) - 2nd-line test, part 2; (NAAT) on dried blood", 1.1, 1.5], ["50486", "Spinal muscular atrophy (SMA); Kit C2 (SMN2) - 2nd-line test, part 2; (NAAT) on dried blood", 1.1, 1.5], ["50487", "Severe combined immunodeficiency (SCID); Kit B (TREC; SMN1) - 2nd-line test; (NAAT) on dried blood", 1.1, 1.5], ["50488", "Newborn screening for major sickle cell syndromes (HPLC)", 2.75, 3.75], ["50489", "Newborn screening for major sickle cell syndromes - 2nd line test (capillary electrophoresis)", 11.55, 15.75], ["50490", "Neonatal screening for metabolic diseases on urine (qualitative)", 5.83, 7.95], ["50520", "Galactosamine-6-sulfatase (MPS IV A)", 172.7, 235.5], ["50521", "Galactose-1-phosphate (enzymatic)", 315.7, 430.5], ["50523", "Guanidinoacetate creatine", 13.97, 19.05], ["50524", "Urinary globotriaosylceramide (Gb3) (LC-MS / MS)", 35.2, 48.0], ["50530", "Heparan sulfate sulfatase (MPS III A)", 306.9, 418.5], ["50540", "Iduronate sulfatase (MPS II)", 300.3, 409.5], ["50550", "Acid lipase (Wolman / CESD)", 167.2, 228.0], ["50561", "Methylenetetrahydrofolate reductase (MTHFR) MTHF incorporation index", 910.8, 1242.0], ["50562", "Mucopolysaccharides (glycosaminoglycans) (LC MS-MS)", 21.34, 29.1], ["50565", "Mucopolysaccharides (glycosaminoglycans) (quantitative)", 66.0, 90.0], ["50570", "N-acetylglucosamine 6-sulfate sulfatase (MPS III D)", 308.0, 420.0], ["50580", "Oligosaccharides", 31.9, 43.5], ["50600", "Phenylalanine on dried blood", 0.99, 1.35], ["50601", "Protein Assay for Biochemical Genetic Testing", 68.2, 93.0], ["50602", "Leukocyte isolation for biochemical genetic testing", 78.1, 106.5], ["50603", "Total hexosaminidase only", 138.6, 189.0], ["50604", "Propionyl-coA-carboxylase, propionate incorporation index", 853.6, 1164.0], ["50605", "Purines and pyrimidines", 19.69, 26.85], ["50608", "Long chain fatty acids (full profile) (GC / MS)", 36.3, 49.5], ["50620", "Sialidase / neuraminidase (sialidosis)", 172.7, 235.5], ["50621", "Sphingomyelinase (Niemann-pick A and B)", 265.1, 361.5], ["50624", "Succinylacetone (quantitative) (GC-MS)", 51.7, 70.5], ["50640", "Urinary metabolic tests (DNPH - sulfitest)", 22.0, 30.0], ["50641", "Thyroxine (T4) total on dried blood", 5.72, 7.8], ["50642", "Transcobalamin II", 1065.9, 1453.5], ["50645", "Tyrosine on dried blood", 0.99, 1.35], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["50646", "Trypsin immunoreactive (IRT) on dried blood", 4.95, 6.75], ["50648", "Chorionic villus dissection and culture", 166.1, 226.5], ["50649", "Chorionic villus karyotype using direct technique", 255.2, 348.0], ["50710", "Karyotype (amniotic fluid)", 431.2, 588.0], ["50711", "Karyotype (blood)", 341.0, 465.0], ["50712", "Karyotype (tissue)", 533.5, 727.5], ["50713", "Karyotype for hematological diseases (marrow and blood)", 679.8, 927.0], ["50714", "Karyotype for solid tumor", 807.4, 1101.0], ["50715", "Karyotype chorionic villi after culture", 437.8, 597.0], ["50716", "Special staining in cytogenetics (C-Q-DAPI-NOR band)", 163.9, 223.5], ["50717", "Cell culture with cytogenetic functional study X inactivation", 672.1, 916.5], ["50718", "Cell culture for genetic diagnosis (cells in suspension)", 86.9, 118.5], ["50719", "FISH on interphasic nucleus for detection of rearrangement in oncology with fusion or separation probe", 222.2, 303.0], ["50720", "FISH Interphase for number anomaly", 266.2, 363.0], ["50722", "FISH on metaphase", 236.5, 322.5], ["50723", "Cell culture freezing for genetic study", 26.4, 36.0], ["50724", "Thawing and re-culturing cells for genetic study", 21.12, 28.8], ["50728", "Cell culture for genetic diagnosis (adherent cells)", 218.9, 298.5], ["50729", "FISH on waxed tissue", 286.0, 390.0], ["50740", "Diagnosis of chromosomal breaks (Fanconi, Bloom, etc.)", 793.1, 1081.5], ["50800", "TSH on dried blood", 2.2, 3.0], ["50802", "Neonatal screening for inborn errors of metabolism (8 to 15 diseases)", 12.98, 17.7], ["55002", "Apolipoprotein E; APOE (Cys112Arg et Arg158Cys) (NAAT)", 47.3, 64.5], ["55008", "Familial hypercholesterolemia (LDL receptor gene) (del 5-15 Kb) (NAAT)", 85.8, 117.0], ["55010", "Familial hypercholesterolemia (HF), R-LDL Panel 1 gene (del 5, del 15 kb, Trp66Gly, Cys646Tyr) (NAAT)", 89.1, 121.5], ["55012", "Familial Hypercholesterolemia (HF), R-LDL Panel 2 Gene (Glu207Lys, Cys152Trp, Arg329Xaa, Cys347Arg, T", 136.4, 186.0], ["55014", "Lipoprotein lipase (LPL gene) Panel 1 (Pro207Leu, Gly188Glu, Asp9Asn) (NAAT)", 55.0, 75.0], ["55016", "Lipoprotein lipase (LPL gene) Panel 2 (Asp9Asn, Asp250Asn, Asn291Ser) (NAAT)", 23.1, 31.5], ["55018", "Familial hypercholesterolemia (HF), R-LDL gene (NAAT, single mutation)", 161.7, 220.5], ["55039", "Targeted sequencing of genes associated with hereditary cardiomyopathies/arrhythmias/aortopathies (cardiog", 951.5, 1297.5], ["55041", "Targeted sequencing of genes associated with familial hypercholesterolemia, familial hyperchylomicronemia, f", 926.2, 1263.0], ["55042", "Virtual panel of genes associated with cardiomyopathies (cardiogenetics) (interpretation only)", 267.3, 364.5], ["55043", "Virtual gene panel based on existing SNG data for familial hypercholesterolemia, familial hyperchylomicronem", 425.7, 580.5], ["55044", "Search for familial deletions and duplications or confirmation of deletions and duplications (cardiogenetics)", 178.2, 243.0], ["55045", "Search for familial deletions and duplications or confirmation of deletions and duplications (familial dyslipidemi", 178.2, 243.0], ["55067", "Virtual panel of genes associated with hereditary arrhythmias (cardiogenetics) (interpretation only)", 267.3, 364.5], ["55068", "Virtual panel of genes associated with hereditary aortopathies (cardiogenetics) (interpretation only)", 267.3, 364.5], ["55069", "Familial SNV or confirmation of SNV (cardiogenetic)", 178.2, 243.0], ["55070", "Familial nucleotide variant (SNV) testing or SNV confirmation (familial dyslipidemia)", 178.2, 243.0], ["55081", "Hereditary cardiac amyloidosis TTR; TTR; (sequencing, complete coding regions)", 227.7, 310.5], ["55111", "Familial hypercholesterolemia (HF); LDLR; (search for large genetic variations by MLPA)", 111.1, 151.5], ["55126", "Achondroplasia - hypochondroplasia (exons 10 and 13) (FGFR3) (sequencing)", 154.0, 210.0], ["55132", "Methylmalonic acidemia with homocystinuria; MMACHC, LMBR1D (sequencing)", 239.8, 327.0], ["55133", "Spinal muscular atrophy (SMA); exon 7 deletion SMN1, SMN2 (TAAN)", 1.1, 1.5], ["55134", "Spinal muscular atrophy (SMA); exon 7 SMN1 deletion; (MLPA)", 290.4, 396.0], ["55136", "Spinal atrophy (SMA); SMN1 (exon 7-8 del) (NAAT)", 234.3, 319.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["55138", "Spinal atrophy (SMA); SMN1; (family study by genetic linkage)", 1157.2, 1578.0], ["55142", "Friedreich's ataxia (FA); FXN (expansion of trinucleotides); (NAAT)", 60.5, 82.5], ["55146", "Colon Cancer; MLH1, MSH2, MSH6, PMS2, EPCAM; (MLPA, deletion and duplication analysis)", 108.9, 148.5], ["55148", "Colon Cancer; MLH1, MSH2, MSH6, PMS2; (sequencing, individual mutation)", 189.2, 258.0], ["55152", "Colon Cancer; MLH1, MSH2, MSH6; search for a mutation, (TPT)", 317.9, 433.5], ["55154", "Colon Cancer; MLH1; complete coding regions (sequencing)", 765.6, 1044.0], ["55156", "Colon Cancer; MLH1; promoter methylation (NAAT)", 148.5, 202.5], ["55158", "Colon Cancer; MSH2; complete coding regions (sequencing)", 694.1, 946.5], ["55160", "Colon Cancer; MSH6; complete coding regions (sequencing)", 694.1, 946.5], ["55162", "Colon Cancer; MSH6; mutation search, (TPT)", 535.7, 730.5], ["55164", "Colon Cancer; PMS2; mutation search, (TPT)", 575.3, 784.5], ["55166", "Breast cancer, ovarian cancer; BRCA1, BRCA2; Ashkenazi Jewish mutations (NAAT)", 206.8, 282.0], ["55167", "Breast cancer, ovarian cancer; PALB2; detection of the Q775X allele (sequencing)", 172.7, 235.5], ["55168", "Breast cancer, ovarian cancer; BRCA1, BRCA2; (individual transfer)", 149.6, 204.0], ["55170", "Breast cancer, ovarian cancer; BRCA1, BRCA2; (French-Canadian transfers)", 508.2, 693.0], ["55171", "Breast cancer, ovarian cancer, hereditary; BRCA1 and BRCA2 - search for mutations (SNG)", 602.8, 822.0], ["55172", "Multiple endocrine neoplasia type II (MEN II); RET; (7 exons) (sequencing)", 540.1, 736.5], ["55174", "X-linked Charcot-Marie-Tooth type 1 (CMTX1); GJB1; (sequencing, complete coding regions)", 258.5, 352.5], ["55176", "Charcot-Marie-Tooth type 1A (CMT1A); PMP22; (Quantitative NAAT)", 254.1, 346.5], ["55178", "North Native American Infantile Cirrhosis (NAIC); CIRHIN (CIRH1A); Arg565Trp; (NAAT)", 140.8, 192.0], ["55180", "Craniosynostosis, Apert syndrome; FGFR2 (Ser252Trp and Pro253Arg); (NAAT)", 166.1, 226.5], ["55182", "Craniosynostosis, Muenke syndrome; FGFR3 (Pro250Arg); (NAAT)", 156.2, 213.0], ["55194", "Congenital glycosylation deficiency type 1b (CDG-Ib); MPI (Arg295His)", 16.06, 21.9], ["55196", "Medium-chain acyl-CoA dehydrogenase (MCAD) deficiency; ACADM (Lys304Glu/Lys329Glu) (SNG)", 0.0, 0.0], ["55198", "Alpha-1 antitrypsin deficiency (AATD); SERPINA1 (Arg101His, Ala213Val, Glu264Val, Glu342Lys and Glu376", 192.5, 262.5], ["55204", "Rapid detection of aneuploidy by QF-PCR (chromosomes 13, 18, 21, X and Y) (NAAT)", 209.0, 285.0], ["55208", "Hydrotic ectodermal dysplasia or Clouston syndrome; GJB6 (Gly11Arg, Val37Glu, Asp50Asm and Ala88Val)", 185.9, 253.5], ["55209", "Thanatophoric dysplasia types I and II (Exons 7, 10, 15 and 19) (FGFR3) (sequencing)", 303.6, 414.0], ["55212", "Duchenne muscular dystrophy and Becker muscular dystrophy; DMD; (deletion / duplication)", 310.2, 423.0], ["55214", "Steinert's myotonic dystrophy; (expansion of trinucleotides)", 306.9, 418.5], ["55218", "Cystic Fibrosis (CF); CFTR; (sequencing, individual mutation)", 171.6, 234.0], ["55219", "Cystic fibrosis (CF); CFTR; (panel of 71 mutations) on dried blood", 116.6, 159.0], ["55221", "Cystic fibrosis (CF); CFTR (SNG)", 325.6, 444.0], ["55222", "Cystic fibrosis (CF); CFTR; (NAAT, individual mutation)", 31.9, 43.5], ["55223", "Familial Mediterranean fever (FMF); MEFV (Glu148Gln, Met680Ile, Met694Val, Met694Ile and Val726Ala) (TA", 229.9, 313.5], ["55224", "Type I hereditary hemochromatosis; HFE (C282Y, H63D) (NAAT)", 25.3, 34.5], ["55228", "Male infertility Y chromosome microdeletion", 260.7, 355.5], ["55236", "Leukoencephalitis Cree (CL); TREX1: Arg164Xaa, (NAAT)", 19.47, 26.55], ["55238", "Cree Leukoencephalopathy; elF2B5: (Arg195His) (NAAT)", 19.47, 26.55], ["55244", "Huntington's disease (HD); HTT (expansion of trinucleotides)", 381.7, 520.5], ["55250", "Tay-Sachs disease or GM2 variant B gangliosidosis; HEXA; (SNG, complete coding regions and recurrent Fre", 0.0, 0.0], ["55252", "Ashkenazi Jewish diseases: Canavan disease (CD), Tay-Sachs disease, familial dysautonomia; (Ashkenazi J", 0.0, 0.0], ["55254", "Mitochondrial disease, enzymatic activity", 853.6, 1164.0], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["55255", "Mitochondrial disease, detection of complexes I to V (BN-PAGE)", 499.4, 681.0], ["55256", "Mitochondrial disease, mtDNA (SNG)", 820.6, 1119.0], ["55266", "Phenylketonuria (PKU); PAH (SNG)", 968.0, 1320.0], ["55268", "Phenylketonuria (PKU); PAH; (sequencing, individual mutation)", 171.6, 234.0], ["55274", "Colonic adenomatous polyposis; APC; (MLPA) search for duplication / deletion", 114.4, 156.0], ["55276", "Colonic adenomatous polyposis; APC, exon 15 (TPT)", 708.4, 966.0], ["55280", "Multiple intestinal polyposis; MUTYH (REB), panel of mutations", 189.2, 258.0], ["55288", "Non-syndromic deafness; GJB2, Connexin 26; (sequencing, complete coding regions)", 266.2, 363.0], ["55290", "Non-syndromic deafness; GJB2, GJB6; (sequencing, individual mutation)", 171.6, 234.0], ["55292", "Non-syndromic deafness; GJB6, Connexin 30, 2 deletions (NAAT)", 60.5, 82.5], ["55294", "Fragile X syndrome; FMR1 (expansion of trinucleotides)", 97.9, 133.5], ["55298", "Prader-Willi syndrome, Angelman syndrome; (MS-TAAN, methylation profiling and copy number detection by", 0.0, 0.0], ["55300", "RETT syndrome, MECP2 gene (sequencing and MLPA)", 513.7, 700.5], ["55302", "Triple H syndrome or hyperornithinaemia-hyperammonemia-homocitrullinuria syndrome (SLC25A15: p.Phe18", 207.9, 283.5], ["55305", "Non-invasive prenatal genomic test (TGPNI)", 442.2, 603.0], ["55311", "Population supply - Four recessive diseases in Saguenay - Lac-Saint-Jean; (SACS 6594ΔT, SACS 5254C> T", 27.5, 37.5], ["55312", "Population supply - Four recessive diseases in Saguenay – Lac-Saint-Jean; (ALC-SLSJ; TH1; NSM / ACC; A", 27.5, 37.5], ["55313", "Four recessive diseases of Saguenay – Lac-Saint-Jean; (SACS 6594ΔT, SACS 5254C> T, LRPPRC C1061T", 34.1, 46.5], ["55314", "Four recessive diseases of Saguenay – Lac-Saint-Jean; (ALC-SLSJ; TH1; NSM / ACC; ARSACS) (NAAT) - d", 41.8, 57.0], ["55315", "Mucolipidosis type II (MLII); GNPTAB: c.3503_3504delTC (sequencing, individual mutation)", 216.7, 295.5], ["55318", "Hereditary diseases; familial mutation for confirmation or familial screening (sequencing)", 218.9, 298.5], ["55319", "Hereditary diseases; family mutation for confirmation or family screening (SNG))", 1.1, 1.5], ["55320", "Hereditary tyrosinemia type 1; FAH (14 exons) (Sanger sequencing)", 358.6, 489.0], ["55330", "Targeted virtual panel of genes associated with muscular dystrophies analyzed from exome sequencing data", 267.3, 364.5], ["55332", "Targeted virtual panel of genes associated with congenital myopathies analyzed from exome sequencing data", 267.3, 364.5], ["55334", "Targeted virtual panel of genes associated with congenital myasthenia gravis analyzed from exome sequencin", 267.3, 364.5], ["55336", "Targeted virtual panel of genes associated with malignant hyperthermia analyzed from exome sequencing dat", 239.8, 327.0], ["55338", "Targeted virtual panel of rhabdomyolysis-associated genes analyzed from exome sequencing data (interpreta", 267.3, 364.5], ["55340", "Global virtual panel of genes associated with muscle diseases from exome sequencing data (interpretation on", 294.8, 402.0], ["55350", "Targeted virtual panel of genes associated with amyotrophic lateral sclerosis analyzed from exome sequencin", 267.3, 364.5], ["55352", "ATXN2 repeat expansion analysis (NAAT)", 117.7, 160.5], ["55354", "C9orf72 repeat expansion analysis (NAAT)", 215.6, 294.0], ["55356", "Sequencing of SOD1, FUS and TARDBP (SNG) genes", 415.8, 567.0], ["55360", "Targeted virtual panel of genes associated with intellectual disability analyzed from exome sequencing data (in", 239.8, 327.0], ["55365", "Sequencing of genes related to Noonan syndrome/RASopathy (prenatal and postnatal) (NGS)", 559.9, 763.5], ["55370", "Targeted virtual panel of genes associated with mitochondrial diseases linked to nuclear DNA mutations analy", 239.8, 327.0], ["55372", "Targeted virtual panel of genes associated with polymalformation syndromes analyzed from exome sequencin", 377.3, 514.5], ["55374", "Hereditary cancer panel for solid tumors (core panel) (SNG) (technique and interpretation)", 0.0, 0.0], ["55376", "Targeted virtual panel of breast cancer-associated genes analyzed from hereditary cancer panel data (interpr", 1.1, 1.5], ["55378", "Targeted virtual panel of ovarian cancer-associated genes analyzed from hereditary cancer panel data (interp", 1.1, 1.5], ["55380", "Targeted virtual panel of pancreatic cancer-associated genes not associated with hereditary chronic pancreati", 1.1, 1.5], ["55382", "Targeted virtual panel of prostate cancer-associated genes analyzed from hereditary cancer panel data (interp", 1.1, 1.5], ["55384", "Targeted virtual panel of endometrial cancer-associated genes analyzed from hereditary cancer panel data (in", 1.1, 1.5], ["55386", "Targeted virtual panel of colon cancer-associated genes analyzed from hereditary cancer panel data (interpret", 1.1, 1.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["55388", "Targeted virtual panel of genes associated with colorectal polyposis analyzed from data from the panel of here", 1.1, 1.5], ["55390", "Targeted virtual panel of genes associated with hereditary gastric cancers analyzed from the data of the hered", 1.1, 1.5], ["55392", "Targeted virtual panel of pediatric solid tumor predisposition genes; analyzed from exome sequencing data (in", 218.9, 298.5], ["55393", "Targeted virtual panel of predisposition genes for pediatric hematological tumors, cytopenia, bone marrow fail", 218.9, 298.5], ["55400", "Verification of sample identity (SNaPshot genotyping) (DNA)", 48.4, 66.0], ["55402", "Verification of sample identity (SNaPshot genotyping) (RNA)", 78.1, 106.5], ["60000", "Creutzfeldt-Jakob autopsy assistance (including all samples)", 246.4, 336.0], ["60002", "Assistance with metabolic autopsy or sudden infant death (including radiology, evisceration and all samples) (r", 267.3, 364.5], ["60003", "Anti-sperm (semen / serum) (IgG and IgA)", 31.9, 43.5], ["60005", "Storage of sperm straws (sperm bank)", 3.85, 5.25], ["60006", "Cryopreservation (sperm) (transformation)", 72.6, 99.0], ["60030", "Autopsy assistance (including evisceration and all samples, excluding spinal cord removal)", 309.1, 421.5], ["60031", "Fetal autopsy assistance (including placenta and all samples)", 174.9, 238.5], ["60040", "Non-small cell lung cancer (NSCLC); PD-L1 (immunohistochemistry)", 130.9, 178.5], ["60041", "Non-small cell lung cancer (NSCLC); ALK (immunohistochemistry)", 20.24, 27.6], ["60042", "Colorectal cancer; MSI (MSH, MLH1, MSH2, MSH6 and PMS2) (immunohistochemistry)", 37.4, 51.0], ["60044", "Analysis of ROS1 by immunohistochemistry (IHC)", 49.5, 67.5], ["60046", "Specific tumor markers (PD-L1) (immunohistochemistry) (by marker, including count)", 125.4, 171.0], ["60050", "Special coloring", 26.4, 36.0], ["60051", "Special coloring: large format blade", 35.2, 48.0], ["60090", "Routine coloring, waxed tissue, large slide", 22.0, 30.0], ["60100", "Cassette with or without assistance to the pathologist, resident or assistant pathologist", 1.32, 1.8], ["60101", "Assistance for biopsy sampling (for pathology or cytology) (excluding travel)", 13.53, 18.45], ["60120", "Description of placenta (cassette not included)", 33.0, 45.0], ["60122", "Macroscopic description of complex surgical parts performed by a medical technologist or assistant-pathologi", 14.19, 19.35], ["60124", "Macroscopic description of non-complex surgical parts performed by a medical technologist or assistant-patho", 3.85, 5.25], ["60128", "Macroscopic description of very complex surgical parts performed by a medical technologist or assistant-path", 56.1, 76.5], ["60130", "Coronavirus (SARS-CoV-2); Detection by chromogenic in situ hybridization (RNA Scope)", 207.9, 283.5], ["60140", "Embedding in agar and fixation for micro-specimen", 5.06, 6.9], ["60141", "Extemporaneous examination (staining included)", 13.86, 18.9], ["60142", "Extemporaneous examination exclusively for MOH’S surgery", 31.9, 43.5], ["60148", "Immunohisto / cytochemistry (double labelling) (immunohistochemistry) (controls included)", 30.8, 42.0], ["60150", "Immunofluorescence on tissue", 29.7, 40.5], ["60151", "Immunohisto / cytochemistry (immunohistochemistry) (controls included)", 23.1, 31.5], ["60162", "Preparation of a straw purchased from a bank for insemination (washed and unwashed)", 29.7, 40.5], ["60163", "Preparation of straw for insemination (spouse's sperm) (washed and unwashed)", 11.99, 16.35], ["60168", "Preparation of paraffin tissue ribbons for nucleic acid extraction", 5.72, 7.8], ["60178", "Preparation of white slides (for sending technical slides outside the facility or for preservation of precious tissu", 2.86, 3.9], ["60180", "Macroscopic photograph for surgery or autopsy (filed in the file) performed by a medical technologist or assist", 2.97, 4.05], ["60189", "Immunohistochemical biomarkers (for therapeutic purposes) (by marker, including count)", 25.3, 34.5], ["60190", "X-ray of surgical parts or blocks (excluding displacement)", 7.7, 10.5], ["60200", "Routine coloring, waxed tissue", 4.07, 5.55], ["60301", "Histo-enzymology (muscle or nerve)", 101.2, 138.0], ["60351", "Nerve, without micro dissection", 52.8, 72.0], ["60352", "Histomorphometric analysis of a non-decalcified bone specimen", 904.2, 1233.0], ["60441", "Gynecological cytology in liquid medium (preparation)", 12.87, 17.55], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["60442", "Non-gynecological cytology in liquid medium (preparation)", 14.85, 20.25], ["60470", "Pap smears (including liquid medium) (read only by cytologist)", 9.79, 13.35], ["60471", "Non-gynecological smear or cytocentrifugation (preparation and staining)", 10.78, 14.7], ["60472", "Non-gynecological smear or cytocentrifugation (including liquid medium) (read only by cytologist)", 8.91, 12.15], ["60473", "Pap smears (preparation and staining)", 3.41, 4.65], ["60490", "Ploidy in fresh or frozen tissue", 72.6, 99.0], ["60500", "X-ray of a body (autopsy) (excluding displacement)", 47.3, 64.5], ["60543", "Lymph node research by degreasing performed by a medical technologist or assistant-pathologist", 53.9, 73.5], ["60544", "Search for lymph nodes by palpation performed by a medical technologist or assistant-pathologist", 62.7, 85.5], ["60570", "Specific tumor markers (HER 2 / neu) (immunohistochemistry) (by marker, including count)", 71.5, 97.5], ["60572", "Electron microscopy: from semi-fine to close", 273.9, 373.5], ["60573", "Electron microscopy: up to spon embedding", 150.7, 205.5], ["60589", "Brain sampling", 66.0, 90.0], ["60590", "Ploidy on waxed tissue", 179.3, 244.5], ["60591", "Complete spinal cord harvest", 44.0, 60.0], ["60594", "Spermoconcentration and stimulation (sperm wash-gradient)", 71.5, 97.5], ["60595", "Complete Computer Assisted Spermogram (CASA)", 27.5, 37.5], ["60596", "Sperm viability (eosin - negrosin staining)", 6.38, 8.7], ["60611", "Macroscopic description without production of slide, block or cassette", 4.84, 6.6], ["60631", "Spermoconcentration and stimulation (sperm washing - SWIMM-UP)", 42.9, 58.5], ["60632", "Complete spermogram (fertility test) or vaso-vasostomy", 41.8, 57.0], ["60633", "Partial spermogram (post-vasectomy)", 19.58, 26.7], ["60700", "Slide scanning (digital pathology), performed by a medical technologist", 3.96, 5.4], ["60701", "Creation of a file in a digital image processing system (digital pathology)", 9.9, 13.5], ["60702", "Macroscopic image capture (filed in the file) (telepathology)", 2.42, 3.3], ["60705", "Macroscopic session of surgical parts (telepathology), performed by a medical technologist (cassette setting n", 17.82, 24.3], ["65000", "Breast cancer; prognostic test for tumors (ProsignaTM) (RNA hybridization)", 3092.1, 4216.5], ["65001", "Breast cancer; tumor prognostic test (Endopredict®) (TAAN)", 3285.7, 4480.5], ["65002", "Cancers; BRAF, detection of the Val600Glu mutation (NAAT)", 110.0, 150.0], ["65003", "Colorectal cancer, KRAS, NRAS (codon 12, 13, 59, 61, 117, 146), BRAF (codon 600) (SNG)", 442.2, 603.0], ["65004", "Colon Cancer; (instability of microsatellites, consensus 5 markers)", 267.3, 364.5], ["65005", "Ovarian cancer, BRCA1 and BRCA2 - screening for mutations in solid tumors (SNG)", 653.4, 891.0], ["65006", "Lung cancer; EGFR (exons 18 - 21) somatic mutation panel (NAAT)", 224.4, 306.0], ["65007", "Prostate cancer, BRCA1 and BRCA2 - screening for mutations in solid tumors (SNG)", 653.4, 891.0], ["65008", "Breast and stomach cancer, detection (ERBB2 or HER2 / neu) (FISH) (by marker, including count)", 218.9, 298.5], ["65010", "Renal carcinoma (t (X; 1) PRCC-TFE3) (tissue NAAT)", 337.7, 460.5], ["65011", "Non-small cell lung cancer (NSCLC); EGFR; Thr790Met mutation (exon 20) on circulating tumor DNA (liquid b", 79.2, 108.0], ["65012", "Renal carcinoma (t (6; 11) alpha-TFEB) (tissue NAAT)", 313.5, 427.5], ["65013", "Breast cancer; PIK3CA; search for 11 mutations (exons 7, 9 and 20) (TAAN)", 309.1, 421.5], ["65014", "Myxoid chondrosarcoma (t (9; 22) EWSR1-TEC and t (9; 17) TAF2N-TEC) (tissue NAAT)", 337.7, 460.5], ["65016", "B light chain lymphocyte clonality (NAAT, BIOMED-2 method)", 216.7, 295.5], ["65018", "Heavy chain B lymphocyte clonality (NAAT, BIOMED-2 method)", 143.0, 195.0], ["65020", "T lymphocyte clonality B, G and D chains (NAAT, BIOMED-2 method)", 289.3, 394.5], ["65022", "Co deletion - chromosome 1p and 19q (FISH)", 254.1, 346.5], ["65030", "Dermato-Fibrosarcoma (COL1A1-PDGFB from t (17; 22) (NAAT on tissue)", 295.9, 403.5], ["65032", "Identification of the BCR-ABL1 breakpoint by t (9; 22) multiplex PCR (NAAT)", 108.9, 148.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["65034", "Fibrous dysplasia / McCune-Albright syndrome, mutations in the Arg201 and Gln227 codons of the GNAS1 ge", 150.7, 205.5], ["65036", "Dihydropyrimidine dehydrogenase (DPYD), mutations c.1905 + 1G> A (DPYD * 2A), c.2846A> T, c.1679T> G", 39.6, 54.0], ["65040", "Congenital t (12; 15) fibrosarcoma (NAAT)", 191.4, 261.0], ["65042", "Lymphoplasmacytic lymphoma, MYD88, detection of Leu265Pro mutation (NAAT)", 79.2, 108.0], ["65050", "GIST: CKIT and PDGFRA (12 sequencing)", 456.5, 622.5], ["65065", "Brain cancer; IDH1 (R132), IDH2 (R172) (NAAT, individual mutations)", 190.3, 259.5], ["65070", "Colon Cancer; KRAS, search for targeted mutations (exons 2, 3, 4) (NAAT)", 145.2, 198.0], ["65080", "Leukemia ALL (2 amplifications) detection of translocations (NAAT)", 191.4, 261.0], ["65082", "Leukemia LLC, Igh Vh (sequencing)", 203.5, 277.5], ["65084", "AML leukemia, t (8; 21) 2 amplification translocation detection (NAAT)", 116.6, 159.0], ["65086", "AML leukemia, detection of reversal (16) 2 amplifications (NAAT)", 114.4, 156.0], ["65088", "AML leukemia (FLT3 / ITD mutation)", 82.5, 112.5], ["65090", "AML leukemia (FLT3 / TKD mutation) (NAAT)", 124.3, 169.5], ["65091", "AML leukemia, prognostic stratification, 6-gene panel (SNG)", 878.9, 1198.5], ["65092", "CML and ALL leukemia (BCR-ABL1 from t (9; 22)) (quantitative NAAT)", 114.4, 156.0], ["65094", "Leukemia APL (FAB-M3), single amplified t (15; 17) PML / RAR (quantitative NAAT)", 125.4, 171.0], ["65096", "Leukemia APL (FAB-M3), t (15; 17) PML / RAR (NAAT nested)", 33.0, 45.0], ["65098", "AML leukemia (C / EPBa mutation) (sequencing)", 735.9, 1003.5], ["65120", "Leukemia - familial predisposition, RUNX1 gene (sequencing)", 258.5, 352.5], ["65121", "Leukemia - familial predisposition, PAX5 gene (sequencing)", 304.7, 415.5], ["65122", "Germline mutations - familial predisposition, TP53 gene (sequencing)", 328.9, 448.5], ["65128", "Leukemia and solid tumors: translocation validation (TAAN)", 400.4, 546.0], ["65130", "Myxoid liposarcoma (t (12; 16) FUS-CHOP, t (12; 22) EWRS1-CHOP) (NAAT) on tissue", 337.7, 460.5], ["65132", "Mantle cell lymphoma (BCL-1) (NAAT)", 110.0, 150.0], ["65134", "Large t cell lymphoma (2; 5) (NAAT)", 191.4, 261.0], ["65136", "Burkitt's lymphoma for cMYC translocation (NAAT)", 220.0, 300.0], ["65138", "Follicular lymphoma, search for translocation (BCL-2 of t (14; 18)) (NAAT)", 139.7, 190.5], ["65145", "CALR gene mutation, exon 9 (NAAT)", 15.62, 21.3], ["65147", "Methylation of the O-6-methylguanine-DNA methyltransferase (MGMT) gene", 161.7, 220.5], ["65148", "Primary myelofibrosis and essential thrombocythemia; MPL; mutations Trp515Leu, Trp515Lys, Trp515Ala and", 13.75, 18.75], ["65149", "Colon Cancer; NRAS, screening for targeted mutations (exons 2, 3, 4; codons 12, 13, 61 and 146) (NAAT)", 239.8, 327.0], ["65150", "Leukemia AML, nucleophosmin gene NPM1 (exon 12) (NAAT)", 150.7, 205.5], ["65155", "Polycythemia vera (JAK2-Val617Phe mutation) (NAAT)", 168.3, 229.5], ["65156", "Polycythemia vera; JAK2; exon 12 mutations (NAAT)", 39.6, 54.0], ["65160", "Search for Kappa, Lambda or EBV light chains by chromogenic in situ hybridization (CISH)", 160.6, 219.0], ["65162", "Alveolar rhabdomyosarcoma t (1; 13) t (2; 13) (NAAT)", 228.8, 312.0], ["65164", "Clear cell sarcoma or angiomatoid fibrous histiocytoma (FUS-ATF1 from t (12; 16), EWSR1-CREB1 from t (1", 381.7, 520.5], ["65166", "Alveolar soft tissue sarcoma (t (X; 17) ASPL-TFE3 (NAAT)", 295.9, 403.5], ["65168", "Ewing sarcoma EWS / FL1 t (11; 22) and EWS / ERG t (21; 22) (NAAT)", 225.5, 307.5], ["65170", "Low-grade fibromyxoid sarcoma (FUS-CREB3L2 from t (7; 16), FUS-CREB3L1 from t (11; 16)) (NAAT)", 360.8, 492.0], ["65172", "Synovial sarcoma t (x; 18) (NAAT)", 229.9, 313.5], ["65174", "Soft tissue and bone sarcoma; translocation analysis (SNG)", 995.5, 1357.5], ["65180", "Hypereosinophilic syndrome (4q12 deletion FIP1L1-PDGFRA) (NAAT)", 182.6, 249.0], ["65182", "Myelo-proliferative neoplasia NMP / MDS (ETV6-PDGFRB) of t (5; 12) (NAAT)", 243.1, 331.5], ["65196", "Desmoplastic Small Cell Tumor EWS / WT1 (NAAT)", 169.4, 231.0], ["65198", "Brain tumors; H3F3A (Lys27Met and Gly34Val / Arg mutations) and HIST1H3B (Lys27Met mutation) (sequenc", 199.1, 271.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["65199", "Non-small cell lung cancer (NSCLC); ALK rearrangement (FISH)", 192.5, 262.5], ["65200", "Analysis of ROS1 by fluorescence in situ hybridization (FISH)", 192.5, 262.5], ["65210", "Cell, marrow and tissue preparation in oncology", 56.1, 76.5], ["65217", "Virtual panel of targeted pediatric leukemia and tumor genes, analyzed from transcriptome sequencing data (i", 218.9, 298.5], ["65218", "Targeted virtual panel of pediatric leukemia and tumor genes, analyzed from tumor exome sequencing data (i", 218.9, 298.5], ["65220", "Multi-gene panel for diagnostic, prognostic or predictive purposes for bronchopulmonary cancer (NGS)", 635.8, 867.0], ["65222", "Multi-gene panel for diagnostic, prognostic or predictive purposes in colorectal cancer (SNG) (Focus Panel)", 665.5, 907.5], ["65224", "Multi-gene panel for diagnostic, prognostic or predictive purposes in thyroid cancer (SNG) (Focus Panel)", 665.5, 907.5], ["65226", "Multi-gene panel for diagnostic, prognostic or predictive purposes in urothelial carcinoma (NGC) (Focus Panel", 665.5, 907.5], ["65228", "Multi-gene panel for diagnostic, prognostic or predictive purposes in melanoma (SNG) (Focus Panel)", 665.5, 907.5], ["65230", "Multi-gene panel for diagnostic, prognostic or predictive purposes for gastrointestinal stromal tumor (GIST) (S", 665.5, 907.5], ["65232", "Multi-gene panel for diagnostic, prognostic or predictive purposes in breast cancer (SNG) (Focus Panel)", 665.5, 907.5], ["65240", "Tumor transcriptome sequencing (pediatric cancer) (SNG)", 1622.5, 2212.5], ["65241", "Tumor exome sequencing (pediatric cancer) (SNG)", 1796.3, 2449.5], ["65242", "Exome sequencing normal material (paired) (pediatric cancer) (SNG)", 448.8, 612.0], ["65245", "Panel testing for myeloid mutations (MDS, NMP and CCUS) (SNG)", 936.1, 1276.5], ["70002", "Intergrappe send outs (to a laboratory of another establishment)", 2.97, 4.05], ["70003", "Intragrappe send outs (between laboratories of the same establishment)", 2.09, 2.85], ["70005", "Sending or returning of slide / block / cassette", 0.11, 0.15], ["70006", "Shipping outside Quebec (by establishment)", 122.1, 166.5], ["70007", "Intra-Quebec Air send outs", 246.4, 336.0], ["70008", "Shipment on dry ice", 6.6, 9.0], ["70019", "Collection of the breath test for the detection of Helicobacter pylori with 13 carbon-labelled urea", 40.7, 55.5], ["70020", "Biological sampling (excluding blood and reception)", 12.65, 17.25], ["70021", "Capillary collection", 25.3, 34.5], ["70022", "Collection of a unit of whole blood, autologous donations or a travelling donor program", 27.5, 37.5], ["70023", "Venous collection", 11.33, 15.45], ["70024", "Pediatric venous collection <7 years (including collection assistance)", 25.3, 34.5], ["70026", "Support for bone marrow harvesting in SOP", 179.3, 244.5], ["70027", "Support for bone marrow or other specimen (excluding displacement)", 67.1, 91.5], ["70028", "Pyruvic acid (bedside sampling and deproteinization)", 47.3, 64.5], ["70029", "Therapeutic phlebotomy (bleeding)", 19.36, 26.4], ["70030", "Dressing with personal protective equipment (PPE) in isolation wards", 0.0, 0.0], ["75004", "Maternal Contamination (NAAT)", 166.1, 226.5], ["75006", "DNA or RNA extraction from a clinical specimen", 21.12, 28.8], ["75008", "DNA or RNA extraction from paraffin-embedded tissue", 53.9, 73.5], ["75010", "Microsatellite analysis technique (for uniparental disomy)", 348.7, 475.5], ["75020", "Germline exome sequencing for the investigation of genetic diseases (NGS)", 448.8, 612.0], ["75025", "Reclassification of variations of uncertain significance for a given panel (virtual or not) (1-2 variations)", 108.9, 148.5], ["75026", "Reclassification of variations of uncertain significance for a given panel (virtual or not) (>2 variations)", 218.9, 298.5], ["75027", "Panel reinterpretation (virtual or not) depending on the number of genes analyzed (2-20 genes)", 239.8, 327.0], ["75028", "Panel reinterpretation (virtual or not) depending on the number of genes analyzed (21-100 genes)", 267.3, 364.5], ["75029", "Re-interpretation of panels (virtual or not) according to the number of genes analyzed (101-500 genes)", 294.8, 402.0], ["75030", "Re-interpretation of panels (virtual or not) according to the number of genes analyzed (>500 genes)", 322.3, 439.5], ["80007", "Alcohols (acetone, ethanol, isopropanol methanol) (serum / urine) (GC-MS)", 56.1, 76.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["80008", "Alprazolam (serum) (LC-MS-MS)", 95.7, 130.5], ["80009", "Aluminum (serum)", 55.0, 75.0], ["80010", "Amitriptyline and nortriptyline (serum) (LC-MS-MS)", 95.7, 130.5], ["80012", "Amphetamines (serum / urine) (LC-MS-MS) includes 10 substances", 107.8, 147.0], ["80013", "Tricyclic antidepressants (serum) (LC-MS-MS) includes 11 substances", 107.8, 147.0], ["80014", "Antipsychotic and non-tricyclic antidepressants (serum) (LC-MS-MS) includes 14 substances", 107.8, 147.0], ["80015", "SSRI antidepressants (serum) (LC-MS-MS) includes 11 substances", 107.8, 147.0], ["80016", "Antimony (urine / blood / serum) (ICP-MS)", 55.0, 75.0], ["80017", "Silver (urine / blood) (ICP-MS)", 55.0, 75.0], ["80018", "Total arsenic (urine / blood) (ICP-MS)", 55.0, 75.0], ["80020", "Benzodiazepines (urine) (LC-MS-MS) includes 25 substances", 107.8, 147.0], ["80024", "Polychlorinated biphenyls (PCBs), polybrominated (PBDEs), toxaphenes and organochlorine pesticides (plasm", 211.2, 288.0], ["80025", "Qualitative bromazepam (serum) (LC-MS-MS)", 71.5, 97.5], ["80027", "Cadmium (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80028", "Cannabis (Delta9-tetrahydrocannabinol, Cannabidiol, Cannabinol, Carboxy-delta9-tetrahydrocannabinol, 11-Hy", 90.2, 123.0], ["80030", "Chromium (blood / serum / urine)", 55.0, 75.0], ["80031", "Citalopram (Celexa®) (serum) (LC-MS-MS)", 95.7, 130.5], ["80033", "Clomipramine (serum) (LC-MS-MS)", 95.7, 130.5], ["80034", "Clozapine (serum) (LC-MS-MS)", 95.7, 130.5], ["80036", "Cobalt (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80037", "Qualitative cocaine (blood / plasma) (LC-MS-MS) includes 4 substances", 71.5, 97.5], ["80038", "Cotinine (serum / urine) (LC-MS-MS)", 112.2, 153.0], ["80039", "Copper (serum) (ICP-MS)", 55.0, 75.0], ["80040", "Cyanide (blood) (GC-MS)", 163.9, 223.5], ["80041", "Desipramine (Norpramin®) (serum) (LC-MS-MS)", 95.7, 130.5], ["80049", "Diazepam (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80050", "Doxepin (serum) (LC-MS-MS)", 95.7, 130.5], ["80052", "Ethylene glycol (serum) (GC-MS)", 83.6, 114.0], ["80054", "Iron (biopsies) (ICP-MS)", 151.8, 207.0], ["80055", "Fluoride (serum / urine)", 55.0, 75.0], ["80057", "Fluoxetine (Prozac®) (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80059", "GHB (gamma hydroxybutyrate) (urine) (GC-MS)", 89.1, 121.5], ["80060", "Imipramine (serum) (LC-MS-MS)", 95.7, 130.5], ["80061", "Isopropanol (serum / urine) (GC-MS)", 56.1, 76.5], ["80063", "Lorazepam (Ativan®) (serum) (LC-MS-MS)", 95.7, 130.5], ["80065", "Manganese (blood / serum / urine)", 55.0, 75.0], ["80066", "Maprotiline (Ludiomil®) (serum) (LC-MS-MS)", 95.7, 130.5], ["80068", "Total mercury (blood / urine)", 55.0, 75.0], ["80069", "Metals (quantitative screening in blood and urine) (ICP-MS)", 155.1, 211.5], ["80074", "Nickel (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80075", "Nitrazepam (Mogadon®) (serum) (LC-MS-MS)", 95.7, 130.5], ["80078", "Nortriptyline (serum) (LC-MS-MS)", 95.7, 130.5], ["80080", "Opiates (urine) (GC-MS) includes 8 substances", 107.8, 147.0], ["80081", "Gold (serum) (ICP-MS)", 187.0, 255.0], ["80082", "Oxazepam (serum) (LC-MS-MS)", 95.7, 130.5], ["80084", "Paroxetine (serum) (LC-MS-MS)", 95.7, 130.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["80085", "Phencyclidine (PCP) (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80088", "Lead (blood) (ICP-MS)", 48.4, 66.0], ["80092", "Risperidone (Risperdal®) (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80093", "Selenium (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80094", "Sertraline (serum) (LC-MS-MS)", 95.7, 130.5], ["80095", "Tellurium (urine) (ICP-MS)", 55.0, 75.0], ["80096", "Thallium (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80099", "Qualitative drug and drug screening (serum / urine / gastric fluid) (GC-MS)", 101.2, 138.0], ["80100", "Trazodone (Desyrel®) (serum) (LC-MS-MS)", 95.7, 130.5], ["80102", "Triazolam (serum) (LC-MS-MS)", 95.7, 130.5], ["80104", "Trimipramine (serum) (LC-MS-MS)", 95.7, 130.5], ["80105", "Venlafaxine (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80106", "Zinc (serum) (ICP-MS)", 55.0, 75.0], ["80109", "Acebutolol (serum) (LC-MS-MS)", 95.7, 130.5], ["80110", "Acetone (serum / urine) (GC-MS)", 56.1, 76.5], ["80112", "Antimony (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80113", "Silver (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80114", "Total arsenic (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80115", "Barium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80116", "Barium (urine / blood / serum) (ICP-MS)", 55.0, 75.0], ["80118", "Beryllium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80119", "Beryllium (blood / serum) (ICP-MS)", 55.0, 75.0], ["80120", "Beryllium (urine) (ICP-MS)", 55.0, 75.0], ["80121", "Bismuth (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80122", "Bismuth (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80126", "Cadmium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80128", "Chromium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80129", "Clobazam (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80130", "Clonazepam (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80131", "Cobalt (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80132", "Copper (Biopsies) (ICP-MS)", 151.8, 207.0], ["80133", "Copper (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80134", "Copper (blood / urine) (ICP-MS)", 55.0, 75.0], ["80135", "Diltiazem (serum) (LC-MS-MS)", 95.7, 130.5], ["80136", "Tin (Tissues) (ICP-MS)", 88.0, 120.0], ["80137", "Tin (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80138", "Iron (Tissues) (ICP-MS)", 88.0, 120.0], ["80139", "Flurazepam (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80142", "Iodine (urine) (ICP-MS)", 84.7, 115.5], ["80143", "Lithium (hair) (ICP-MS)", 88.0, 120.0], ["80144", "Lithium (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80145", "Magnesium (tissue) (ICP-MS)", 88.0, 120.0], ["80147", "Manganese (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80148", "Total mercury (hair / tissue)", 88.0, 120.0], ["80149", "Metals (quantitative screening in hair, nails and tissue) (ICP-MS)", 151.8, 207.0], ["80150", "Methanol (serum / urine) (GC-MS)", 56.1, 76.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["80151", "Molybdenum (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80152", "Molybdenum (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80154", "Nickel (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80159", "Platinum (urine) (ICP-MS)", 55.0, 75.0], ["80160", "Lead (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80161", "Lead (urine) (ICP-MS)", 55.0, 75.0], ["80162", "Propranolol (serum) (LC-MS-MS)", 95.7, 130.5], ["80163", "Selenium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80166", "Tellurium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80167", "Temazepam (serum) (LC-MS-MS)", 95.7, 130.5], ["80168", "Thallium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80170", "Uranium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80171", "Uranium (blood / serum / urine) (ICP-MS)", 55.0, 75.0], ["80172", "Vanadium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80173", "Vanadium (urine) (ICP-MS)", 55.0, 75.0], ["80175", "Zinc (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80176", "Zinc (blood / urine) (ICP-MS)", 55.0, 75.0], ["80177", "Zinc protoporphyrin (ZPP) (blood)", 31.9, 43.5], ["80180", "Amiodarone (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80181", "Inorganic arsenic (urine) (ICP-MS)", 75.9, 103.5], ["80183", "Chlorpromazine (serum) (LC-MS-MS)", 95.7, 130.5], ["80185", "Urinary creatinine", 6.6, 9.0], ["80186", "Cyclobenzaprine (serum) (LC-MS-MS)", 95.7, 130.5], ["80187", "Urinary density (refractometer)", 6.6, 9.0], ["80188", "Qualitative drug and medication screening in non-biological environment (GC-MS)", 132.0, 180.0], ["80190", "Diphenhydramine (serum) (LC-MS-MS)", 95.7, 130.5], ["80191", "Street drugs by enzyme immunoassay (amphetamines, barbiturates, benzodiazepines, cannabis, cocaine, ED", 27.5, 37.5], ["80194", "Ketamine (serum) (LC-MS-MS)", 95.7, 130.5], ["80196", "Methotrimeprazine (serum) (GC-MS)", 95.7, 130.5], ["80200", "pH (pH meter)", 6.6, 9.0], ["80201", "Procyclidine (serum) (LC-MS-MS)", 95.7, 130.5], ["80202", "Promethazine (serum) (LC-MS-MS)", 95.7, 130.5], ["80206", "Antineoplastics (5-fluorouracil, cyclophosphamide, gemcitabine, ifosphamide, irinotecan, methotrexate, paclita", 72.6, 99.0], ["80208", "Amphetamine (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80210", "Chlordiazepoxide (serum) (LC-MS-MS)", 95.7, 130.5], ["80211", "Dextrometorphan (urine) (GC-MS)", 95.7, 130.5], ["80212", "Dextrorphan (urine) (GC-MS)", 95.7, 130.5], ["80213", "Ephedrine / pseudoephedrine (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80214", "Ethanol (serum / urine) (GC-MS)", 56.1, 76.5], ["80216", "Flunitrazepam (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80218", "MDA (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80219", "MDEA (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80220", "MDMA and MDA (serum / urine) (ecstasy) (LC-MS-MS)", 95.7, 130.5], ["80221", "Methamphetamine and amphetamine (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80224", "Midazolam (serum) (LC-MS-MS)", 95.7, 130.5], ["80226", "Oxymorphone (urine) (GC-MS)", 95.7, 130.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["80227", "PMA (serum / urine) (LC-MS-MS)", 95.7, 130.5], ["80248", "Muconic acid, S-Phenylmercapturic acid (S-PMA) (urine) (benzene) (LC-MS-MS)", 73.7, 100.5], ["80255", "Bupropion (serum) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80256", "Cannabis (metabolite: THC Delta-9-COOH) (urine) (LC / MS / MS)", 125.4, 171.0], ["80266", "Iodine (blood / serum) (ICP-MS)", 55.0, 75.0], ["80270", "Mirtazapine (serum) (LC-MS-MS)", 95.7, 130.5], ["80277", "Olanzapine (serum) (LC-MS-MS)", 95.7, 130.5], ["80284", "Quetiapine (serum) (LC-MS-MS)", 95.7, 130.5], ["80286", "Arsenic speciation (arsenocholine + arsenobetaine, As +3, As +5, dimethylarsinic acid, monomethylarsonic ac", 188.1, 256.5], ["80287", "Tellurium (blood / serum) (ICP-MS)", 55.0, 75.0], ["80288", "6-acetylmorphine (urine) (LC-MS-MS)", 95.7, 130.5], ["80289", "Aluminum (blood, urine) (ICP-MS)", 55.0, 75.0], ["80291", "Fentanyl and norfentanyl (urine / serum) (LC-MS-MS)", 95.7, 130.5], ["80293", "Iodine (hair / tissue) (ICP-MS)", 151.8, 207.0], ["80294", "Qualitative Levamisol (Urine) (LC-MS-MS)", 71.5, 97.5], ["80299", "Methadone and EDDP (urine) (LC-MS-MS)", 95.7, 130.5], ["80302", "S-Benzylmercapturic acid (toluene) (urine) (LC-MS-MS)", 73.7, 100.5], ["80304", "Perfluorinated compounds (PFBS, PFHxS, PFOS, PFBA, PFHxA, PFOA, PFNA, PFDA, PFUDA (plasma) (LC", 79.2, 108.0], ["80305", "Phthalate metabolites (MMP, MEP, 2-OH-MiBP, MiBP, MnBP, MCHP, MCHpP, MBzP, MEHP, MEHHP, MEO", 125.4, 171.0], ["80307", "1-Hydroxypyrene (urine) (GC-MS-MS)", 121.0, 165.0], ["80310", "Benzodiazepines (serum) (LC-MS-MS) includes 21 substances", 107.8, 147.0], ["80312", "Duloxetine (serum) (LC-MS-MS)", 95.7, 130.5], ["80317", "9-hydroxyrisperidone (Paliperidone or Invega) (serum) (LC-MS-MS)", 95.7, 130.5], ["80319", "Antineoplastics (cyclophosphamide, ifosphamide, alpha-fluoro-beta-alanine, methotrexate) (urine)(LC-MS-MS)", 82.5, 112.5], ["80346", "Cocaine (includes the metabolites: benzoylecgonine and ecgonine methyl ester) (quantitative) (urine) (LC-MS-", 95.7, 130.5], ["80347", "Pyrethroid metabolites (cis-DCCA, trans-DCCA, cis-DBCA, 4-F-3-PBA, 3-PBA) (urine) (GC-MS)", 0.0, 0.0], ["80350", "Alkylphosphates (DEDTP, DEP, DETP, DMDTP, DMP, DMTP) (urine) (GC-MS-MS)", 74.8, 102.0], ["80351", "Boron (urine) (ICP-MS-MS)", 83.6, 114.0], ["80352", "Buprenorphine, metabolites and qualitative naloxone (urine) (LC-MS-MS)", 71.5, 97.5], ["80353", "Qualitative screening for xenobiotics and metabolites (blood / serum / plasma / urine / fluids) (LC-MS-MS) incl", 89.1, 121.5], ["80362", "Qualitative synthetic cannabinoids (urine) (LC-MS-MS) includes 24 substances", 136.4, 186.0], ["80363", "Escitalopram (serum) (LC-MS-MS)", 95.7, 130.5], ["80365", "Hallucinogens and psychedelics (qualitative) (blood / serum / urine) (LC-MS-MS), includes LSD, LSZ, 25B, 25", 71.5, 97.5], ["80367", "Qualitative mytragynin (blood / serum / urine) (LC-MS-MS)", 71.5, 97.5], ["80368", "Qualitative Methylphenidate and Ritalinic Acid (Blood / Serum / Urine) (LC-MS-MS)", 71.5, 97.5], ["80369", "Qualitative methaqualone (blood / serum / urine) (LC-MS-MS)", 71.5, 97.5], ["80371", "New synthetic opioids (qualitative) (blood / serum / urine) (LC-MS-MS) includes AH-7921, desomorphine, MT-", 71.5, 97.5], ["80372", "6-acetylmorphine (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80373", "Acetylfentanyl (qualitative) (blood / serum / plasma) (LC-MS-MS)", 71.5, 97.5], ["80374", "Qualitative buprenorphine (blood / serum / plasma) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80375", "Butorphanol (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80376", "Codeine (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80377", "Dextrometorphan (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80378", "Dextrorphan / levorphanol (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80379", "Dihydrocodeine (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["80380", "Fentanyl (blood / serum / plasma) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80381", "Hydrocodone (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80382", "Hydromorphone (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80383", "Meperidine (blood / serum / plasma) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80384", "Methadone (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80385", "Morphine (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80386", "Naloxone (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80387", "Naltrexone (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80388", "Oxycodone (blood / serum / plasma) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80389", "Oxymorphone (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80390", "Pentazocine (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80391", "Propoxyphene (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80392", "Tapentadol (blood / serum / plasma) (LC-MS-MS)", 95.7, 130.5], ["80393", "Tramadol (blood / serum / plasma) (LC-MS-MS) includes 2 substances", 95.7, 130.5], ["80394", "Mercury (methykmercury) speciation (GC-ICP-MS)", 96.8, 132.0], ["80395", "Total arsenic (serum) (ICP-MS)", 55.0, 75.0], ["80396", "Platinum (hair) (ICP-MS)", 88.0, 120.0], ["80397", "Thorium (hair / tissue) (ICP-MS)", 88.0, 120.0], ["80398", "Tungsten (urine) (ICP-MS)", 55.0, 75.0], ["80399", "Vanadium (blood / serum) (ICP-MS)", 55.0, 75.0], ["80400", "Aripiprazole (serum) (LC-MS-MS)", 95.7, 130.5], ["80401", "Qualitative Carfentanil (Blood / Serum) (LC-MS-MS)", 71.5, 97.5], ["80402", "Qualitative Carfentanil and Norcarfentanil (Urine) (LC-MS-MS)", 71.5, 97.5], ["80403", "Qualitative furanylfentanyl (urine) (LC-MS-MS)", 71.5, 97.5], ["80404", "U-47700 qualitative (urine) (LC-MS-MS)", 71.5, 97.5], ["80405", "Qualitative PCP, 3-MeO-PCP and 4-MeO-PCP (urine) (LC-MS-MS)", 71.5, 97.5], ["80406", "MDPV (qualitative) (bath salts) (serum / urine) (LC-MS-MS)", 71.5, 97.5], ["80408", "Tungsten (tissue) (ICP-MS)", 88.0, 120.0], ["80409", "Thorium (blood / urine) (ICP-MS)", 55.0, 75.0], ["80410", "High sensitivity screening for opioids, fentanyl and derivatives (qualitative) (blood / serum / urine) (LC-MS-MS)", 89.1, 121.5], ["80411", "Tetrabromobisphenol A,Tetrachlorobisphenol A, DHDPE) (urine) (LC-MS-MS)", 0.0, 0.0], ["80412", "Glyphosate, glufosinate and their metabolites (AMPA and 3-MPPA) (urine) (LC-MS-MS)", 122.1, 166.5], ["80413", "Aluminum (dialysate)", 165.0, 225.0], ["80414", "Fluoride (serum)", 113.3, 154.5], ["80415", "Benzene and Toluene Metabolites (Urine) (LC-MS-MS)", 134.2, 183.0], ["80416", "Free cholesterol and phospholipids (serum) (enzyme immunoassay; Indiko Plus analyzer)", 46.2, 63.0], ["80417", "Free Opioids (Blood / Serum / Plasma) (UPLC-MS-MS)", 107.8, 147.0], ["80419", "Cerium (urine) (ICP-MS-MS)", 55.0, 75.0], ["80420", "Lanthanum (urine) (ICP-MS-MS)", 55.0, 75.0], ["80421", "Yttrium (urine) (ICP-MS-MS)", 55.0, 75.0], ["80422", "Praseodymium (urine) (ICP-MS-MS)", 55.0, 75.0], ["80423", "Neodymium (urine) (ICP-MS-MS)", 55.0, 75.0], ["80424", "Gadolinium (urine) (ICP-MS-MS)", 55.0, 75.0], ["80425", "Bromine (blood) (ICP-MS-MS)", 55.0, 75.0], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["80426", "Copper and iron (biopsy) (ICP-MS-MS)", 151.8, 207.0], ["80427", "", 0.0, 0.0], ["80428", "Medication and drug confirmation", 95.7, 130.5], ["81000", "Bacterial identification (16S RNA) on clinical specimen with negative culture", 93.5, 127.5], ["81001", "Gram negative fermentative rod (enteric); identification (phenotype, sequencing)", 1.1, 1.5], ["81002", "Gram negative fermentative rod (enteric); antibiogram (microdilution in broth, epsilometry)", 1.1, 1.5], ["81003", "Non-fermentative Gram negative rod (BNF); identification (mass spectrometry - MALDI-TOF, sequencing)", 1.1, 1.5], ["81004", "Non-fermentative Gram negative rod (BNF); antibiogram (microdilution in broth, epsilometry)", 1.1, 1.5], ["81005", "Gram negative carbapenemase producing rod (BGNPC); discordant strain analysis (NAAT)", 29.7, 40.5], ["81006", "Gram negative carbapenemase producing rod (BGNPC); monitoring program", 1.1, 1.5], ["81010", "Gram positive rod (other than anaerobic); identification (sequencing)", 1.1, 1.5], ["81011", "Gram positive rod (other than anaerobic); antibiogram (microdilution in broth)", 1.1, 1.5], ["81015", "Gram positive cocci (other than anaerobic, S. aureus and S. pneumoniae); identification (sequencing)", 1.1, 1.5], ["81016", "Gram positive cocci (other than anaerobic, S. aureus and S. pneumoniae); antibiogram (dilution in broth)", 1.1, 1.5], ["81017", "Gram negative cocci (other than anaerobic and Neisseriaceae); identification (sequencing)", 1.1, 1.5], ["81020", "Anaerobes; identification (sequencing)", 18.81, 25.65], ["81021", "Anaerobes; antibiogram (dilution in agar)", 40.7, 55.5], ["81024", "Bacterial identification (16S RNA) (sequencing) on colony", 63.8, 87.0], ["81030", "Campylobacter spp .; confirmation (mass spectrometry - MALDI-TOF, sequencing)", 1.1, 1.5], ["81031", "Escherichia coli producer of Shiga-toxins (STEC); O157: H7 and non-mobile O157H; monitoring program", 1.1, 1.5], ["81032", "Listeria monocytogenes; monitoring program", 1.1, 1.5], ["81033", "Salmonella spp .; monitoring program", 1.1, 1.5], ["81034", "Shigella spp .; identification (serotyping, whole genome sequencing)", 1.1, 1.5], ["81035", "Vibrio cholerae; identification and serogrouping (phenotypy)", 1.1, 1.5], ["81036", "Vibrio cholerae; antibiogram (epsilometry)", 1.1, 1.5], ["81038", "Escherichia coli producer of Shiga-toxins (STEC) other than O157; isolation, identification (NAAT, serotyping)", 1.1, 1.5], ["81040", "Enterococcus spp .; identification (sequencing)", 1.1, 1.5], ["81041", "Enterococcus spp .; antibiogram (microdilution in broth)", 1.1, 1.5], ["81042", "Enterococcus spp. ; detection of van A-G genes (NAAT)", 1.1, 1.5], ["81043", "Clostridioides difficile (Clostridium difficile) confirmation (NAAT and ribotyping)", 1.1, 1.5], ["81044", "Clostridioides difficile (Clostridium difficile); outbreak investigation (typing, EGCP)", 1.1, 1.5], ["81045", "Clostridioides difficile (Clostridium difficile); monitoring program", 1.1, 1.5], ["81050", "Staphylococcus aureus; mecA and mecC detection (MRSA) (NAAT)", 1.1, 1.5], ["81051", "Staphylococcus aureus; PVL detection (NAAT)", 1.1, 1.5], ["81052", "Staphylococcus aureus; SARM-AC confirmation (spa typing)", 1.1, 1.5], ["81053", "Staphylococcus aureus; tsst-1 toxin detection (NAAT)", 1.1, 1.5], ["81054", "Staphylococcus aureus (including MRSA); antibiogram - vancomycin only (microdilution in broth)", 1.1, 1.5], ["81055", "Staphylococcus aureus (including MRSA); antibiogram - full panel (microdilution in broth)", 1.1, 1.5], ["81056", "Staphylococcus aureus (including MRSA); outbreak investigation (typing, EGCP)", 1.1, 1.5], ["81057", "Staphylococcus aureus; MRSA surveillance program", 1.1, 1.5], ["81060", "Streptococcus pyogenes; monitoring program (emm sequencing)", 1.1, 1.5], ["81063", "Neisseria meningitidis; detection (NAAT) on primary specimen", 1.1, 1.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["81064", "Neisseria meningitidis; identification (phenotypy) on colony", 1.1, 1.5], ["81065", "Neisseria meningitidis; serogrouping (agglutination)", 1.1, 1.5], ["81066", "Neisseria meningitidis; antibiogram (microdilution in broth)", 1.1, 1.5], ["81067", "Neisseria meningitidis; monitoring program", 1.1, 1.5], ["81069", "Neisseria gonorrhoeae; confirmation (NAAT) on primary specimen", 25.3, 34.5], ["81070", "Neisseria gonorrhoeae; identification (phenotypy) on colony", 1.1, 1.5], ["81071", "Neisseria gonorrhoeae; antibiogram (dilution in agar)", 93.5, 127.5], ["81072", "Neisseria gonorrhoeae; monitoring program", 1.1, 1.5], ["81073", "Neisseria spp. other than N. gonorrhoeae and N. meningitidis; identification (phenotypy) on colony", 1.1, 1.5], ["81074", "Neisseria spp. other than N. gonorrhoeae and N. meningitidis; antibiogram (microdilution in broth)", 1.1, 1.5], ["81076", "Neisseria gonorrhoeae; detection (NAAT) on sterile biological fluid", 1.1, 1.5], ["81080", "Legionella spp .; detection (NAAT) on primary specimen", 1.1, 1.5], ["81081", "Legionella spp .; identification (NAAT, mass spectrometry - MALDI-TOF, serogrouping) on colony", 1.1, 1.5], ["81082", "Legionella spp.; outbreak investigation", 1.1, 1.5], ["81086", "Bordetella pertussis; identification (phenotypy)", 1.1, 1.5], ["81087", "Haemophilus influenzae; detection (NAAT) on primary specimen", 1.1, 1.5], ["81088", "Haemophilus influenzae; capsular type determination (NAAT)", 1.1, 1.5], ["81089", "Haemophilus influenzae; monitoring program", 1.1, 1.5], ["81090", "Streptococcus pneumoniae; detection (NAAT) on primary specimen", 1.1, 1.5], ["81091", "Streptococcus pneumoniae; serotyping (Quellung) on colony", 1.1, 1.5], ["81092", "Streptococcus pneumoniae; identification (sequencing) on colony", 1.1, 1.5], ["81093", "Streptococcus pneumoniae; antibiogram (microdilution in broth)", 1.1, 1.5], ["81094", "Streptococcus pneumoniae; monitoring program", 1.1, 1.5], ["81099", "Bacterial outbreak investigation (other than S. aureus, C.difficile, Legionella, enteropathogenic) (EGCP, FTIR)", 1.1, 1.5], ["82001", "Bacillus anthracis; detection (NAAT) on primary specimen", 1.1, 1.5], ["82002", "Bacillus anthracis; identification (NAAT, bacteriophage) on culture * GR3 *", 1.1, 1.5], ["82003", "Brucella spp .; identification (NAAT, bacteriophage) on culture * GR3 *", 1.1, 1.5], ["82004", "Brucella spp .; detection (antibody)", 1.1, 1.5], ["82005", "Burkholderia pseudomallei; detection (NAAT) on primary specimen", 1.1, 1.5], ["82006", "Burkholderia pseudomallei; identification (sequencing) on culture * GR3 *", 1.1, 1.5], ["82007", "Francisella tularensis; detection (NAAT) on primary specimen", 1.1, 1.5], ["82008", "Francisella tularensis; identification (NAAT) on culture * GR3 *", 1.1, 1.5], ["82009", "Francisella tularensis; detection (antibody)", 1.1, 1.5], ["82010", "Yersinia pestis; detection (NAAT) on primary specimen", 1.1, 1.5], ["82011", "Yersinia pestis; identification (TAAN, IF) on culture * GR3 *", 1.1, 1.5], ["82012", "Yersinia spp .; detection (antibody)", 1.1, 1.5], ["82013", "Clostridium botulinum; isolation, identification, toxinotyping (neutralization)", 1.1, 1.5], ["82014", "Brucella spp .; detection (NAAT) on primary specimen", 1.1, 1.5], ["82015", "Corynebacterium diphtheriae; toxin research and production (NAAT, Elek test)", 1.1, 1.5], ["82016", "Borrelia burgdorferi (Lyme disease acquired in North America); confirmation (IgG immunoblot)", 47.3, 64.5], ["82017", "Borrelia burgdorferi (Lyme disease acquired in North America); confirmation (IgM immunoblot)", 46.2, 63.0], ["82018", "Borrelia garinii and Borrelia afzelii (Lyme disease acquired in Europe or Asia); confirmation (IgG immunoblot)", 69.3, 94.5], ["82020", "Borrelia burgdorferi (Lyme disease acquired in North America); detection (ELISA IgM/IgG) on serum", 7.92, 10.8], ["82021", "Borrelia burgdorferi (Lyme); cerebrospinal fluid (CSF) detection (ELISA IgG)", 1.1, 1.5], ["82022", "Borrelia burgdoferi (Lyme); detection and genotyping (NAAT) on primary specimen", 1.1, 1.5], ["82023", "Borrelia garinii and Borrelia afzelii (Lyme disease acquired in Europe); detection (ELISA IgM/IgG) on serum", 7.92, 10.8], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["82025", "Recurrent borreliosis; detection of the genus Borrelia including B. hermsii and B. miyamotoi (NAAT)", 1.1, 1.5], ["82026", "Leptospira spp .; detection (antibody)", 1.1, 1.5], ["82027", "Leptospira spp .; detection (NAAT)", 1.1, 1.5], ["82028", "Coxiella burnetii (Q fever); detection (NAAT)", 1.1, 1.5], ["82029", "Bartonella spp .; detection (NAAT) on primary specimen", 1.1, 1.5], ["82030", "Orientia tsutsugamushi; detection (antibody)", 1.1, 1.5], ["82031", "Rickettsia spp. (group of purple fevers); detection (antibody)", 1.1, 1.5], ["82032", "Rickettsia spp. (group of purple fevers); detection (NAAT)", 1.1, 1.5], ["82033", "Rickettsia spp. (typhus group); detection (antibody)", 1.1, 1.5], ["82034", "Rickettsia spp. (typhus group); detection (NAAT)", 1.1, 1.5], ["82035", "Anaplasma phagocytophilum; detection (antibody)", 1.1, 1.5], ["82036", "Anaplasma phagocytophilum; detection (NAAT)", 22.0, 30.0], ["82037", "Ehrlichia chaffeensis; detection (antibody)", 1.1, 1.5], ["82038", "Ehrlichia chaffeensis; detection (NAAT)", 1.1, 1.5], ["82040", "Syphilis; confirmation (antibody) on serum", 1.1, 1.5], ["82041", "Syphilis; detection (VDRL) on LCR", 1.1, 1.5], ["82042", "Syphilis; detection (NAAT)", 1.1, 1.5], ["82050", "Chlamydia trachomatis LGV; detection and genotyping (NAAT) on primary specimen", 29.7, 40.5], ["82051", "Chlamydophila pneumoniae; detection (NAAT) on respiratory specimen", 1.1, 1.5], ["82052", "Chlamydophila psittaci; detection (NAAT) on primary specimen", 1.1, 1.5], ["82059", "Haemophilus ducreyi; detection (NAAT)", 1.1, 1.5], ["82061", "Mycoplasma genitalium; resistance detection (NAAT) on primary specimen", 1.1, 1.5], ["83002", "Adenovirus; genotyping (sequencing) on viral isolates", 1.1, 1.5], ["83003", "Zika, Dengue, Chikungunya; multiplex detection (NAAT) (multiplex) on serum, CSF, urine, amniotic fluid", 30.8, 42.0], ["83004", "Zika; detection (NAAT) on specimens on placenta", 1.1, 1.5], ["83005", "Zika; detection (antibody)", 59.4, 81.0], ["83006", "Dengue; detection (antibody)", 46.2, 63.0], ["83007", "Chikungunya; detection (ELISA IgM) on serum", 22.0, 30.0], ["83008", "Chikungunya; detection (ELISA IgG) on serum", 25.3, 34.5], ["83009", "West Nile virus (WNV); detection (antibody)", 1.1, 1.5], ["83010", "West Nile virus (WNV); detection (NAAT) on clinical specimen", 1.1, 1.5], ["83011", "California serogroup (Jamestown canyon, Snowshoe hare); detection (antibody)", 1.1, 1.5], ["83012", "Cache Valley; detection (antibody)", 1.1, 1.5], ["83013", "Powassan; detection (antibody)", 1.1, 1.5], ["83014", "Lymphocytic choriomeningitis (VCML); detection (antibody)", 1.1, 1.5], ["83015", "Lymphocytic choriomeningitis (VCML); detection (NAAT)", 1.1, 1.5], ["83016", "Tick-borne encephalitis; detection (antibody)", 1.1, 1.5], ["83017", "Eastern equine encephalitis; detection (antibody)", 1.1, 1.5], ["83018", "Japanese encephalitis; detection (antibody)", 1.1, 1.5], ["83019", "Yellow fever; detection (antibody)", 1.1, 1.5], ["83020", "Hantavirus; detection (antibody)", 1.1, 1.5], ["83030", "Hepatitis A (HAV); genotyping (sequencing)", 1.1, 1.5], ["83031", "Hepatitis B (HBV); additional test (anti-HBc) (antibody)", 1.1, 1.5], ["83032", "Hepatitis B (HBV); confirmation (HBsAg) (antigen)", 1.1, 1.5], ["83033", "Hepatitis B (HBV); genotyping (sequencing)", 1.1, 1.5], ["83034", "Hepatitis B (HBV); resistance to antivirals (sequencing)", 1.1, 1.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["83035", "Hepatitis C (HCV); confirmation (anti-HCV) (antibody)", 1.1, 1.5], ["83036", "Hepatitis C (HCV); genotyping (sequencing)", 1.1, 1.5], ["83037", "Hepatitis C (HCV); resistance to antivirals (sequencing)", 1.1, 1.5], ["83038", "Hepatitis D (VHD); detection (NAAT)", 1.1, 1.5], ["83039", "Hepatitis D (VHD); viral load (quantitative NAAT)", 1.1, 1.5], ["83040", "Hepatitis E (HEV); detection (antibody)", 1.1, 1.5], ["83041", "Hepatitis E (HEV); genotyping (sequencing)", 1.1, 1.5], ["83042", "Hepatitis D (HDV); detection (antibody)", 1.1, 1.5], ["83043", "RITA: Laboratory Tests Algorithm for Identifying Recent HIV Infections", 45.1, 61.5], ["83044", "Human immunodeficiency virus (HIV); confirmation (antibody and / or antigen) on serum", 1.1, 1.5], ["83046", "Human immunodeficiency virus (HIV); detection and confirmation (p24 antigen)", 1.1, 1.5], ["83047", "Human immunodeficiency virus (HIV-1); Proviral DNA (NAAT)", 1.1, 1.5], ["83048", "Human immunodeficiency virus (HIV-2); viral load (NAAT)", 1.1, 1.5], ["83049", "HTLV 1 and 2; confirmation (antibody)", 1.1, 1.5], ["83050", "Influenza A and B; detection (NAAT) on clinical specimen", 1.1, 1.5], ["83051", "Influenza A; subtyping (NAAT) on clinical specimen", 26.4, 36.0], ["83052", "Influenza A; antigenic characterization (inhibition of haemagglutination)", 1.1, 1.5], ["83053", "Avian influenza A (H5, H7, H9); detection (NAAT) on clinical specimen", 1.1, 1.5], ["83054", "Coronavirus (MERS-CoV); detection (NAAT) on clinical specimen", 1.1, 1.5], ["83055", "Coronavirus (SARS-CoV-2); detection (NAAT) on clinical specimen", 23.1, 31.5], ["83056", "Respiratory pathogens; multiplex detection of 18 viruses and 3 bacteria (approved NAAT); monitoring program", 1.1, 1.5], ["83058", "Coronavirus (SARS-CoV-2); confirmation (IgG antibodies) on serum", 27.5, 37.5], ["83060", "Viral-looking gastroenteritis; enteric virus detection (NAAT) (multiplex) on clinical specimen", 1.1, 1.5], ["83061", "Enteric pathogens; multiplex detection (viruses, bacteria and parasites) (approved NAAT) on clinical specimen", 196.9, 268.5], ["83065", "BK / JC polyomavirus; detection (NAAT) on CSF, biopsy", 1.1, 1.5], ["83069", "Enterovirus; detection and genotyping (except poliovirus) (NAAT) on clinical specimen", 1.1, 1.5], ["83070", "Poliovirus; detection and genotyping (sequencing) on clinical specimen", 1.1, 1.5], ["83075", "Herpes B; detection (NAAT)", 1.1, 1.5], ["83076", "Varicella Zoster Virus (VZV): Vaccine Strain Genotyping (NAAT)", 1.1, 1.5], ["83085", "Measles; genotyping (NAAT) on clinical specimen", 1.1, 1.5], ["83086", "Rubella; (IgG) (measure of avidity)", 1.1, 1.5], ["83087", "Rubella; detection and genotyping (NAAT)", 1.1, 1.5], ["83088", "Mumps; detection and genotyping (NAAT) on clinical specimen", 1.1, 1.5], ["83089", "Simian orthopoxvirus; detection (TAAN)", 51.7, 70.5], ["83090", "Molluscum contagiosum; detection (NAAT) on clinical specimen", 1.1, 1.5], ["83091", "Rage; detection (antibody)", 1.1, 1.5], ["83092", "Coronavirus (SARS-CoV-2): confirmation (NAAT) on clinical specimen", 1.1, 1.5], ["83093", "Coronavirus (SARS-CoV-2): screening for enhanced surveillance variant", 1.1, 1.5], ["83094", "Coronavirus (SARS-CoV-2): priority sequencing", 1.1, 1.5], ["84001", "Aerobic actinomycetes; identification (sequencing)", 1.1, 1.5], ["84002", "Aerobic actinomycetes; antibiogram (microdilution in broth)", 1.1, 1.5], ["84003", "Nocardia spp; identification (sequencing)", 1.1, 1.5], ["84004", "Nocardia spp; antibiogram (microdilution in broth)", 1.1, 1.5], ["84005", "Mycobacterium tuberculosis; confirmation (deletion, sequencing) on culture * GR3 *", 1.1, 1.5], ["84006", "Mycobacterium tuberculosis; antibiogram (critical concentration) on culture * GR3 *", 1.1, 1.5], ["84007", "Mycobacterium tuberculosis; rifampicin resistance detection (NAAT) on primary specimen", 83.6, 114.0], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["84008", "Mycobacterium tuberculosis; detection of resistance genes (sequencing)", 1.1, 1.5], ["84009", "Mycobacterium tuberculosis; molecular typing (sequencing) on culture * GR3 *", 1.1, 1.5], ["84010", "Non-tuberculous mycobacteria; identification (deletion, sequencing)", 1.1, 1.5], ["84011", "Non-tuberculous mycobacteria; antibiogram (microdilution in broth)", 1.1, 1.5], ["86001", "Intestinal parasites; identification (other than microsporidia) (microscopy)", 1.1, 1.5], ["86002", "Cryptosporidium spp .; identification (microscopy)", 1.1, 1.5], ["86003", "Cryptosporidium spp .; outbreak investigation (typing)", 1.1, 1.5], ["86004", "Microsporidia; identification (microscopy)", 1.1, 1.5], ["86005", "Entamoeba histolytica / dispar (amebiasis); detection (NAAT) on clinical specimen", 1.1, 1.5], ["86006", "Entamoeba histolytica (amebiasis); detection (antibody)", 1.1, 1.5], ["86010", "Worms; identification (microscopy)", 1.1, 1.5], ["86011", "Ectoparasites (mites, ticks, lice, fleas, bugs, fly larvae); identification (microscopy)", 1.1, 1.5], ["86023", "Baylisascaris procyonis; detection (antibody)", 1.1, 1.5], ["86027", "Taenia solium (cysticercosis); detection (antibody)", 1.1, 1.5], ["86028", "Taenia solium (cysticercosis); detection (NAAT)", 1.1, 1.5], ["86029", "Echinococcus granulosus; identification (microscopy)", 1.1, 1.5], ["86030", "Echinococcus granulosus; detection (antibody)", 1.1, 1.5], ["86031", "Echinococcus granulosus; detection (NAAT) on clinical specimen", 1.1, 1.5], ["86032", "Paragonimus spp .; detection (antibody)", 1.1, 1.5], ["86033", "Strongyloides stercoralis; detection (antibody)", 1.1, 1.5], ["86035", "Gnathostoma spinigerum; detection (antibody)", 1.1, 1.5], ["86036", "Fasciola hepatica; detection (antibody)", 1.1, 1.5], ["86051", "Plasmodium sp (malaria); detection (NAAT)", 1.1, 1.5], ["86052", "Plasmodium sp (malaria); detection (antibody)", 1.1, 1.5], ["86054", "Babesia microti; detection (antibody)", 1.1, 1.5], ["86055", "Babesia spp .; detection (NAAT)", 1.1, 1.5], ["86064", "Filaria (filariasis): detection (antibody)", 1.1, 1.5], ["86069", "Leishmania spp. (culture)", 1.1, 1.5], ["86070", "Leishmania spp .; detection (antibody)", 1.1, 1.5], ["86071", "Leishmania spp .; detection (NAAT)", 1.1, 1.5], ["86072", "Schistosoma spp; identification (microscopy) on primary specimen", 1.1, 1.5], ["86073", "Schistosoma spp .; detection (antibody)", 1.1, 1.5], ["86074", "Toxocara spp .; detection (antibody)", 1.1, 1.5], ["86075", "Trichinella spp .; detection (antibody)", 1.1, 1.5], ["86076", "Trypanosoma brucei (African trypanosomiasis); detection (antibody)", 1.1, 1.5], ["86077", "Trypanosoma brucei (African trypanosomiasis); detection (NAAT)", 1.1, 1.5], ["86078", "Trypanosoma cruzi (American trypanosomiasis); detection (antibody)", 1.1, 1.5], ["86079", "Trypanosoma cruzi (American trypanosomiasis); detection (NAAT)", 1.1, 1.5], ["86080", "Toxoplasma gondii; confirmation (IgG-IgM) (antibody)", 1.1, 1.5], ["86081", "Toxoplasma gondii; avidity (IgG) (antibody)", 1.1, 1.5], ["86082", "Toxoplasma gondii; detection (NAAT) on clinical specimen", 1.1, 1.5], ["87001", "Yeasts; identification (mass spectrometry - MALDI-TOF, sequencing)", 1.1, 1.5], ["87002", "Yeasts; antifongigram (microdilution in broth)", 1.1, 1.5], ["87003", "Multidrug-resistant yeast (Candida auris); confirmation (phenotypy)", 1.1, 1.5], ["87004", "Yeasts; outbreak investigation (typing)", 1.1, 1.5], ["87018", "(1-3)-β-D-glucan in serum (assay)", 1.1, 1.5], ["Code_ 2023-", "Description_English", 0.0, 0.0], ["2024", "", 0.0, 0.0], ["87020", "Filamentous fungi; identification (microscopy, sequencing)", 1.1, 1.5], ["87021", "Filamentous fungi; antifongigram (microdilution in broth)", 1.1, 1.5], ["87022", "Filamentous fungi; outbreak investigation (typing)", 1.1, 1.5], ["87030", "Dimorphic mushrooms; detection (NAAT) on primary specimen * GR3 *", 1.1, 1.5], ["87031", "Dimorphic mushrooms; identification (NAAT, microscopy) on colony * GR3 *", 1.1, 1.5], ["87034", "Coccidioides immitis; detection (antibody)", 69.3, 94.5], ["87050", "Pneumocystis; detection (quantitative NAAT)", 57.2, 78.0], ["87051", "Pneumocystis; outbreak investigation (genotyping)", 1.1, 1.5], ["88002", "Dialysis and purified water; bacterial count (filter membrane)", 24.2, 33.0], ["88003", "Dialysis and purified water; bacterial endotoxins (LAL Gel-Clot)", 20.68, 28.2], ["88004", "Dialysis and purified water; anions (ion chromatography)", 27.5, 37.5], ["88005", "Dialysis and purified water; total residual chlorine (titrimetry)", 14.85, 20.25], ["88006", "Dialysis and purified water; total organic carbon (oxidation)", 34.1, 46.5], ["88007", "Dialysis and purified water; metals (subcontracted)", 147.4, 201.0], ["88008", "Dialysis and purified water; pH (electrometry)", 19.25, 26.25], ["88009", "Dialysis and purified water; conductivity (electrometry)", 7.7, 10.5], ["88010", "Dialysis and purified water; reactive silica (colorimetry)", 19.47, 26.55], ["88011", "Dialysis and purified water; total hardness (outsourced)", 51.7, 70.5], ["90000", "Unlisted procedures (PNR)", 1.1, 1.5], ["95000", "Unlisted procedures cost in $$", 1.1, 1.5]];

var REB = {sci:634, eth:6348, annMon:634, siteAuth:1904, annAuth:634, amend:634};

var ACT_GROUPS = [
  {label:'Startup', cls:'startup-grp', type:'startup', items:['Review of Protocol','Source Document Preparation','Questionnaire Development','REB Document Preparation','Health Canada Regulatory Document Preparation and Submission','Budget Development and Negotiations','Contract Review, Negotiation, Amendment','Site Agreement Negotiation','Recruitment Planning','Time for site initiation visits','Study Finance Management and Financial Tracking','Equipment and Facilities Setup','Advertisement of the Study']},
  {label:'General — Study Conduct', cls:'general-grp', type:'general', items:['Field Administration','Communication with Sponsor','Follow-up Unscheduled Visits','Query Resolutions','Monitoring Visit (internal team monitors)','FDA / Health Canada Audit','Adverse Events Review and Reporting','SAE Review and Reporting','Confirm Ongoing Consent','Medication Administration and Accountability','Distribute Questionnaire','Collect Questionnaire','Phone Call Visit: Visit Prep and Clean-Up','Phone Call Visit: Concomitant Meds, AEs, SAEs, Documentation','Phone Call Visit: Track Participants and Update Database','Phone Call Visit: Data Entry and Chart Review','Data Entry','CRF Completion']},
  {label:'General — Closeout', cls:'general-grp', type:'general', items:['Site Closure','Site Close-out Visits (personnel time)','Verification that all source documents are complete','Reconciliation of study drug / device accountability','Final lab sample reconciliation and storage','Database lock, final QC checks, and validation','Archiving of study documents (personnel time)','Completion of eCRF / CTMS / eTMF close-out tasks','Submission of final reports to regulators, ethics boards, and sponsors','Ethics board notification of trial closure','Submission of final safety reports or study results to regulators','Staff time for close-out, data verification, and documentation','Shipping of samples, documents, or study materials back to sponsor or archive','Disposal or return of study product / devices','Final payments to vendors, labs, or service providers','Project Management (internal meetings, PM, and admin)']},
  {label:'General — Training', cls:'general-grp', type:'general', items:['Primary team training','GCP training for site staff','Sponsor-required training modules','Protocol-specific training (lab procedures, patient assessments)','Site training','Training / Supervision of data entry']},
  {label:'General — Data and Statistics (BCU)', cls:'general-grp', type:'general', items:['Logistical Consultation with Investigator / Sponsor; Project Management','Trial design development / Methodology','Development of Data Management Plan','Development of Statistical Analysis Plan','Development of Randomization Plan and Randomization Coding','CRF Development and User Guide Development','Design, Build, Test and Document eCRF Database','CRF Quality Control Review of Study Database','Data Clarification Items to Sites','MedDRA Coding of Adverse Events','Manage Local Lab Normal Ranges','DSMB Activities (safety evaluation plan, reports, meetings)','Import and Reconciliation of Results','Statistical Analysis Reports and Tables','Consultation / Supervision of Statistical Analysis','Review of Statistical Tables','Study Closure Activities (database lock and data archiving)','Manuscript Preparation / Review']},
  {label:'Per Participant — Visit Activities', cls:'perpt-grp', type:'perpt', items:['Visit Preparations','Recruiting and Informed Consent','Chart Review','Screening — Review Eligibility Criteria','Medical History and Demographic Data Collection','Full Physical Examination (vital signs, weight, height)','Recording of Concomitant Medications','Blood Collection','Specimen Collection','Study Product Administration and Accountability','Adverse Events Review and Reporting (per visit)','Data Entry (per visit)','CRF Completion (per visit)']},
  {label:'Per Participant — Equipment and Tests', cls:'perpt-grp', type:'perpt', items:['Electrocardiogram','MRI','CT Scan','Pulmonary Function Testing','Functional tests (Berg balance, sit to stand, other)','Muscle strength and endurance assessment (Biodex)','Bioelectrical impedance analysis','Dual X-ray Absorptiometry (DXA)','Bronchoscopy, Gastroscopy or Endoscopy','Sleep Lab','Operating Room','Out-patient Tests / Procedures','In-patient Tests / Procedures']}
];

var TEMPLATES = {
  'ind-rct': {
    funding: 'ind',
    startup: ['Protocol review and feasibility assessment','REB/IRB initial submission','Site initiation visit — preparation','Delegation log and staff training','IP receipt and accountability setup','Clinical trial agreement and contract review','Regulatory authority notification (Health Canada CTA)','Quebec public trial registry submission'],
    general: ['Safety monitoring and DSMB report preparation','Monitoring visit coordination (CRO/sponsor)','Data query resolution','Pharmacy/IP reconciliation','Protocol amendment management','Site close-out'],
    perpt: ['Screening visit','Enrolment and randomisation','Study visit — scheduled assessment','IP dispensing and accountability','Adverse event review and reporting','Protocol deviation assessment','End of treatment visit','Follow-up contact']
  },
  'iit': {
    funding: 'iit',
    startup: ['Protocol development and writing','REB initial submission and revisions','DSMB establishment and first meeting','Grant application preparation','Quebec public trial registry submission','Study staff training'],
    general: ['Interim analysis coordination','Monitoring visit (internal)','Annual REB renewal','DSMB annual report','Data management and query resolution','Publication preparation'],
    perpt: ['Eligibility screening','Informed consent process','Baseline assessment','Randomisation','Treatment/intervention delivery','Follow-up visit — clinical assessment','Safety monitoring contact','End of study assessment']
  },
  'obs': {
    funding: null,
    startup: ['Protocol and statistical analysis plan','REB submission','Recruitment strategy and materials','Database build (REDCap or equivalent)'],
    general: ['Data cleaning and lock','Statistical analysis','Annual REB renewal','Manuscript preparation'],
    perpt: ['Recruitment and consent','Baseline questionnaire / assessment','Follow-up contact','Data entry and verification','Lost-to-follow-up tracing']
  },
  'chart': {
    funding: null,
    startup: ['REB submission (minimal risk)','Data access agreement with medical records','Case identification query (EMR/OACIS)','Data extraction template development'],
    general: ['Data cleaning and query resolution','Statistical analysis','Manuscript preparation'],
    perpt: ['Chart identification and eligibility check','Data abstraction — primary variables','Data abstraction — secondary variables','Source document verification (10% QC sample)','Inter-rater reliability assessment']
  },
  'phase1': {
    funding: 'ind',
    startup: ['Protocol development (Phase I dose escalation)','IND/CTA submission to Health Canada','REB submission','Pharmacy — IP preparation protocol and validation','Safety Review Committee establishment','DSMB charter','Site qualification visit preparation','Quebec public trial registry','Staff GCP training (refresher)'],
    general: ['Dose escalation committee meetings','DSMB review','Safety data reconciliation','Health Canada GCP Inspection readiness','Regulatory correspondence','Site close-out and IP destruction accountability'],
    perpt: ['Screening and eligibility (labs, ECG, imaging)','Enrolment and baseline','IP administration visit','Intensive PK/PD sampling','Safety assessment — AE/SAE review','Dose escalation committee data package preparation','End of study / safety follow-up','SAE narrative writing']
  }
};

// ════════════════════════════════════════
// STATE
// ════════════════════════════════════════
var funding     = null;
var oh          = 0;
var staffCtr    = 0;
var otherCtr    = 0;
var contLevel   = 'mod';
var CONT_DEF    = {low:9, mod:11, high:13.5};
var matrixData  = {};
var matrixRowCtr = 0;
var currentSection = 's-profile';
var svcsRendered = false;
var labRendered  = false;
var AUTOSAVE_KEY = 'rimuhc_budget_v1';
var autosaveTimer = null;

// ════════════════════════════════════════
// SECTION NAVIGATION
// ════════════════════════════════════════
function showSection(id) {
  currentSection = id;
  var sections = document.querySelectorAll('.bt-section');
  var buttons  = document.querySelectorAll('.sid-btn');
  for (var i = 0; i < sections.length; i++) sections[i].classList.remove('active');
  for (var i = 0; i < buttons.length; i++) buttons[i].classList.remove('active');
  var s = document.getElementById(id);
  var b = document.getElementById('sb-' + id);
  if (s) s.classList.add('active');
  if (b) b.classList.add('active');
  updateSectionStatus();
}

function updateSectionStatus() {
  var titleEl  = document.getElementById('study-title');
  var staffIds = getActiveStaffIds();
  var profileDone = !!(titleEl && titleEl.value.trim() && funding);
  var teamDone    = staffIds.length > 0;
  var workDone    = Object.keys(matrixData).length > 0;
  var costsDone   = getSvcTotal() > 0;

  function setSt(id, done, active) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = done ? '✓' : (active ? '●' : '○');
    el.style.color  = done ? 'var(--green)' : (active ? 'var(--teal)' : 'var(--textd)');
  }
  setSt('sst-profile', profileDone, currentSection === 's-profile');
  setSt('sst-team',    teamDone,    currentSection === 's-team');
  setSt('sst-work',    workDone,    currentSection === 's-work');
  setSt('sst-costs',   costsDone,   currentSection === 's-costs');
  setSt('sst-review',  false,       currentSection === 's-review');
}

// ════════════════════════════════════════
// FUNDING
// ════════════════════════════════════════
function selectFunding(type) {
  funding = type;
  var chips = ['iit','found','ind'];
  for (var i = 0; i < chips.length; i++) {
    document.getElementById('fc-' + chips[i]).className = 'fund-card';
  }
  document.getElementById('fc-' + type).className = 'fund-card sel-' + type;

  if (type === 'iit') {
    oh = 0;
  } else if (type === 'found') {
    var foundPct = parseFloat(document.getElementById('found-oh-pct').value) || 27;
    oh = foundPct / 100;
  } else {
    oh = 0.30;
  }

  var se = function(id, show) { var el = document.getElementById(id); if (el) el.style.display = show ? '' : 'none'; };
  se('ind-note',        type === 'ind');
  se('pi-notice',       type === 'ind');
  se('pi-notice-team',  type === 'ind');
  se('found-oh-field',  type === 'found');
  se('reb-iit-note',    type !== 'ind');

  if (labRendered) updateLabPrices();
  updateTravelRows();
  renderSvcs();
  updateSummary();
}

function updateFoundOH() {
  if (funding === 'found') {
    var foundPct = parseFloat(document.getElementById('found-oh-pct').value) || 27;
    oh = foundPct / 100;
    updateSummary();
  }
}

// ════════════════════════════════════════
// STAFF TABLE
// ════════════════════════════════════════
function roleOptions() {
  var h = '<option value="">Select a role…</option>';
  for (var i = 0; i < ROLES.length; i++) {
    h += '<option value="' + i + '">' + ROLES[i].r + '</option>';
  }
  return h;
}

function addStaffRow() {
  staffCtr++;
  var id = staffCtr;
  var tr = document.createElement('tr');
  tr.id = 'sr-' + id;
  tr.setAttribute('data-staff-id', String(id));
  tr.innerHTML =
    '<td><select class="fs" id="s-role-' + id + '" onchange="staffRoleChange(' + id + ')">' + roleOptions() + '</select></td>' +
    '<td><input type="text" class="fi" id="s-name-' + id + '" placeholder="e.g. CRC_1" oninput="refreshMatrixColumnLabel(' + id + ')"></td>' +
    '<td><input type="text" inputmode="decimal" class="fi" id="s-sal-' + id + '" placeholder="0" oninput="staffSalChange(' + id + ')"></td>' +
    '<td class="st-fte-col"><input type="text" inputmode="decimal" class="fi" id="s-fte-' + id + '" value="100" oninput="updateSummary()"></td>' +
    '<td><span class="st-rate" id="sc-hr-' + id + '">—</span></td>' +
    '<td class="st-rm"><button class="st-rm-btn" onclick="removeStaff(' + id + ')">×</button></td>';
  document.getElementById('staff-tbody').appendChild(tr);
  addMatrixColumn(String(id));
  updateSummary();
}

function removeStaff(id) {
  var el = document.getElementById('sr-' + id);
  if (el) el.parentNode.removeChild(el);
  removeMatrixColumn(String(id));
  updateSummary();
}

function staffRoleChange(id) {
  var v = document.getElementById('s-role-' + id).value;
  if (v === '') return;
  var r = ROLES[parseInt(v)];
  document.getElementById('s-sal-' + id).value = r.sal || '';
  staffCalc(id, r.sal || 0, r.hr || null);
}

function staffSalChange(id) {
  staffCalc(id, parseFloat(document.getElementById('s-sal-' + id).value) || 0, null);
}

function getStaffHourlyRate(id) {
  var sal  = parseFloat(document.getElementById('s-sal-' + id).value) || 0;
  var rv   = document.getElementById('s-role-' + id).value;
  var fixHr = (rv !== '') ? (ROLES[parseInt(rv)].hr || null) : null;
  var tot  = sal * 1.19;
  return fixHr ? fixHr : tot / 1820;
}

function staffCalc(id, sal, fixedHr) {
  var ben = sal * 0.19;
  var tot = sal + ben;
  var hr  = fixedHr ? fixedHr : tot / 1820;
  var hrEl = document.getElementById('sc-hr-' + id);
  if (hrEl) hrEl.textContent = hr > 0 ? ('$' + hr.toFixed(2) + '/hr') : '—';
  refreshMatrixColumnLabel(id);
  updateSummary();
}

function getStaffFTECost(id) {
  var sal   = parseFloat(document.getElementById('s-sal-' + id).value) || 0;
  var rv    = document.getElementById('s-role-' + id).value;
  var fixHr = (rv !== '') ? (ROLES[parseInt(rv)].hr || null) : null;
  var tot   = sal * 1.19;
  var fteEl = document.getElementById('s-fte-' + id);
  var fte   = fteEl ? (parseFloat(fteEl.value) || 100) / 100 : 1;
  if (fixHr) return fixHr * 1820 * fte;
  return tot * fte;
}

function getStaffTotal() {
  var staffIds = getActiveStaffIds();
  if (!staffIds.length) return 0;
  var years = parseInt(document.getElementById('study-years').value) || 1;
  var cola  = document.getElementById('multiyear').value === 'yes';

  var teTotal = getTEStaffTotal();
  if (teTotal > 0) {
    if (cola && years > 1) {
      var teMultiYear = 0;
      for (var y = 0; y < years; y++) teMultiYear += teTotal * Math.pow(1.05, y);
      return teMultiYear;
    }
    return teTotal * years;
  }

  var total = 0;
  for (var i = 0; i < staffIds.length; i++) {
    var id = staffIds[i];
    var yrCost = getStaffFTECost(id);
    var studyCost = 0;
    if (cola && years > 1) {
      for (var y = 0; y < years; y++) studyCost += yrCost * Math.pow(1.05, y);
    } else {
      studyCost = yrCost * years;
    }
    total += studyCost;
  }
  return total;
}

function getActiveStaffIds() {
  var rows = document.querySelectorAll('#staff-tbody tr[data-staff-id]');
  var ids = [];
  for (var i = 0; i < rows.length; i++) {
    ids.push(rows[i].getAttribute('data-staff-id'));
  }
  return ids;
}

function getStaffLabel(id) {
  var nameEl = document.getElementById('s-name-' + id);
  var roleEl = document.getElementById('s-role-' + id);
  if (nameEl && nameEl.value.trim()) return nameEl.value.trim();
  if (roleEl && roleEl.value !== '') return ROLES[parseInt(roleEl.value)].r;
  return 'Staff ' + id;
}

// ════════════════════════════════════════
// WORK PLAN MATRIX
// ════════════════════════════════════════
function showMatrix() {
  var wrap    = document.getElementById('mc-wrap');
  var picker  = document.getElementById('mc-tpl-picker');
  var actions = document.getElementById('mc-actions');
  if (wrap)    wrap.style.display    = '';
  if (picker)  picker.style.display  = 'none';
  if (actions) actions.style.display = 'flex';
}

function showTemplatePicker() {
  var wrap    = document.getElementById('mc-wrap');
  var picker  = document.getElementById('mc-tpl-picker');
  var actions = document.getElementById('mc-actions');
  if (wrap)    wrap.style.display    = 'none';
  if (picker)  picker.style.display  = 'block';
  if (actions) actions.style.display = 'none';
}

function hideTemplatePicker() {
  showMatrix();
}

function addMatrixColumn(staffId) {
  var label = getStaffLabel(staffId);
  var hr    = getStaffHourlyRate(staffId);

  var headRow = document.getElementById('mc-head-row');
  if (headRow) {
    var totalTh = headRow.querySelector('.mc-total-th');
    var th = document.createElement('th');
    th.id = 'mc-th-' + staffId;
    th.setAttribute('data-staff-id', staffId);
    th.style.minWidth = '90px';
    th.innerHTML = label + '<span class="mc-th-unit">hrs</span>';
    headRow.insertBefore(th, totalTh);
  }

  var rateRow = document.getElementById('mc-rate-row');
  if (rateRow) {
    var totalRateTh = rateRow.querySelector('.mc-total-th');
    var rateTh = document.createElement('th');
    rateTh.id = 'mc-rate-' + staffId;
    rateTh.setAttribute('data-staff-id', staffId);
    rateTh.textContent = '$' + hr.toFixed(2) + '/hr';
    rateRow.insertBefore(rateTh, totalRateTh);
  }

  var rowIds = Object.keys(matrixData);
  for (var i = 0; i < rowIds.length; i++) {
    var rowId = rowIds[i];
    var tr = document.getElementById('mc-row-' + rowId);
    if (!tr) continue;
    var totalTd = tr.querySelector('.mc-computed');
    var td = document.createElement('td');
    td.className = 'mc-input-cell';
    td.setAttribute('data-staff-id', staffId);
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.setAttribute('inputmode', 'decimal');
    inp.id = 'mc-' + rowId + '-' + staffId;
    inp.setAttribute('data-row', rowId);
    inp.setAttribute('data-staff', staffId);
    inp.setAttribute('oninput', 'calcMatrixCell("' + rowId + '","' + staffId + '")');
    td.appendChild(inp);
    tr.insertBefore(td, totalTd);
  }

  var tfootHrs  = document.getElementById('mc-tfoot-hrs');
  var tfootCost = document.getElementById('mc-tfoot-cost');
  if (tfootHrs) {
    var grandTd = document.getElementById('mc-grand-hrs');
    var fh = document.createElement('td');
    fh.id = 'mc-fhrs-' + staffId;
    fh.setAttribute('data-staff-id', staffId);
    fh.textContent = '—';
    tfootHrs.insertBefore(fh, grandTd);
  }
  if (tfootCost) {
    var grandCostTd = document.getElementById('mc-grand-cost');
    var fc = document.createElement('td');
    fc.id = 'mc-fcost-' + staffId;
    fc.setAttribute('data-staff-id', staffId);
    fc.textContent = '—';
    tfootCost.insertBefore(fc, grandCostTd);
  }
}

function removeMatrixColumn(staffId) {
  var th     = document.getElementById('mc-th-' + staffId);
  var rateTh = document.getElementById('mc-rate-' + staffId);
  var fhrs   = document.getElementById('mc-fhrs-' + staffId);
  var fcost  = document.getElementById('mc-fcost-' + staffId);
  if (th)     th.parentNode.removeChild(th);
  if (rateTh) rateTh.parentNode.removeChild(rateTh);
  if (fhrs)   fhrs.parentNode.removeChild(fhrs);
  if (fcost)  fcost.parentNode.removeChild(fcost);

  var rowIds = Object.keys(matrixData);
  for (var i = 0; i < rowIds.length; i++) {
    var rowId = rowIds[i];
    var td = document.querySelector('#mc-row-' + rowId + ' td[data-staff-id="' + staffId + '"]');
    if (td) td.parentNode.removeChild(td);
    delete matrixData[rowId].hours[staffId];
  }

  for (var i = 0; i < rowIds.length; i++) updateMatrixRowTotal(rowIds[i]);
  updateMatrixFooter();
}

function appendMatrixRow(rowId, type, name, isTemplate) {
  var staffIds = getActiveStaffIds();
  var tbody    = document.getElementById('mc-tbody-' + type);
  if (!tbody) return;
  var addRow = tbody.querySelector('.mc-add-row');

  var tr = document.createElement('tr');
  tr.id = 'mc-row-' + rowId;
  tr.setAttribute('data-row-id', rowId);
  tr.setAttribute('data-type', type);

  var typeClsMap = {startup:'mc-type-startup', general:'mc-type-general', perpt:'mc-type-perpt'};
  var nameTd = document.createElement('td');
  nameTd.className = 'mc-name-cell';
  var safeName = (name || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  nameTd.innerHTML =
    '<div class="mc-name-wrap">' +
      '<select class="mc-type-sel ' + (typeClsMap[type] || '') + '" id="mc-type-' + rowId + '" ' +
        'onchange="changeRowType(\'' + rowId + '\',this.value)">' +
        '<option value="startup"' + (type === 'startup' ? ' selected' : '') + '>Startup</option>' +
        '<option value="general"' + (type === 'general' ? ' selected' : '') + '>General</option>' +
        '<option value="perpt"'   + (type === 'perpt'   ? ' selected' : '') + '>Per pt</option>' +
      '</select>' +
      '<input type="text" class="mc-name-inp' + (isTemplate ? ' tpl-unreviewed' : '') + '" ' +
        'id="mc-name-' + rowId + '" value="' + safeName + '" placeholder="Activity name" ' +
        'oninput="updateMatrixRowName(\'' + rowId + '\',this.value)" ' +
        'onfocus="this.classList.remove(\'tpl-unreviewed\')">' +
      '<button class="mc-act-rm" onclick="removeMatrixRow(\'' + rowId + '\')" title="Remove">×</button>' +
    '</div>';
  tr.appendChild(nameTd);

  for (var i = 0; i < staffIds.length; i++) {
    var staffId = staffIds[i];
    var inputTd = document.createElement('td');
    inputTd.className = 'mc-input-cell';
    inputTd.setAttribute('data-staff-id', staffId);
    var inp = document.createElement('input');
    inp.type = 'text';
    inp.setAttribute('inputmode', 'decimal');
    inp.id = 'mc-' + rowId + '-' + staffId;
    inp.setAttribute('data-row', rowId);
    inp.setAttribute('data-staff', staffId);
    inp.setAttribute('oninput', 'calcMatrixCell("' + rowId + '","' + staffId + '")');
    inputTd.appendChild(inp);
    tr.appendChild(inputTd);
  }

  var totalTd = document.createElement('td');
  totalTd.className = 'mc-computed';
  totalTd.id = 'mc-rtot-' + rowId;
  totalTd.textContent = '—';
  tr.appendChild(totalTd);

  if (addRow) tbody.insertBefore(tr, addRow);
  else tbody.appendChild(tr);
}

function addMatrixRow(type, nameOpt, isTemplate) {
  matrixRowCtr++;
  var rowId = 'r' + matrixRowCtr;
  matrixData[rowId] = {type: type, name: nameOpt || '', hours: {}};
  appendMatrixRow(rowId, type, nameOpt || '', isTemplate);
  showMatrix();
  updateMatrixFooter();
  updateSummary();
  return rowId;
}

function removeMatrixRow(rowId) {
  var row = document.getElementById('mc-row-' + rowId);
  if (row) row.parentNode.removeChild(row);
  delete matrixData[rowId];
  updateMatrixFooter();
  updateSummary();
  if (Object.keys(matrixData).length === 0) showTemplatePicker();
}

function calcMatrixCell(rowId, staffId) {
  var inp = document.getElementById('mc-' + rowId + '-' + staffId);
  if (!inp || !matrixData[rowId]) return;
  var hrs = parseFloat(inp.value) || 0;
  matrixData[rowId].hours[staffId] = hrs > 0 ? inp.value : '';
  updateMatrixRowTotal(rowId);
  updateMatrixFooter();
  updateSummary();
}

function updateMatrixRowTotal(rowId) {
  var el  = document.getElementById('mc-rtot-' + rowId);
  var row = matrixData[rowId];
  if (!el || !row) return;
  var nPt = parseInt(document.getElementById('study-n').value) || 0;
  var total = 0;
  var sIds = Object.keys(row.hours);
  for (var i = 0; i < sIds.length; i++) {
    var hrs = parseFloat(row.hours[sIds[i]]) || 0;
    total += hrs * getStaffHourlyRate(sIds[i]);
  }
  if (row.type === 'perpt') total *= nPt;
  el.textContent = total > 0 ? ('$' + Math.round(total).toLocaleString()) : '—';
}

function updateMatrixFooter() {
  var staffIds = getActiveStaffIds();
  var nPt = parseInt(document.getElementById('study-n').value) || 0;
  var grandHrs = 0, grandCost = 0;

  for (var s = 0; s < staffIds.length; s++) {
    var staffId  = staffIds[s];
    var colHrs   = 0;
    var colCost  = 0;
    var rowIds   = Object.keys(matrixData);
    for (var r = 0; r < rowIds.length; r++) {
      var rowId = rowIds[r];
      var row   = matrixData[rowId];
      var hrs   = parseFloat(row.hours[staffId]) || 0;
      var mult  = (row.type === 'perpt') ? nPt : 1;
      colHrs  += hrs * mult;
      colCost += hrs * getStaffHourlyRate(staffId) * mult;
    }
    var hrsCell  = document.getElementById('mc-fhrs-'  + staffId);
    var costCell = document.getElementById('mc-fcost-' + staffId);
    if (hrsCell)  hrsCell.textContent  = colHrs  > 0 ? (Math.round(colHrs * 10) / 10 + ' h') : '—';
    if (costCell) costCell.textContent = colCost > 0 ? ('$' + Math.round(colCost).toLocaleString()) : '—';
    grandHrs  += colHrs;
    grandCost += colCost;
  }

  var ghEl = document.getElementById('mc-grand-hrs');
  var gcEl = document.getElementById('mc-grand-cost');
  if (ghEl) ghEl.textContent = grandHrs  > 0 ? (Math.round(grandHrs * 10) / 10 + ' h') : '—';
  if (gcEl) gcEl.textContent = grandCost > 0 ? ('$' + Math.round(grandCost).toLocaleString()) : '—';
}

function updateMatrixGroupHeaders() {
  var n = parseInt(document.getElementById('study-n').value) || 0;
  var el = document.getElementById('mc-perpt-n');
  if (el) el.textContent = n + (n === 1 ? ' participant' : ' participants');
  // Recalculate perpt row totals since N changed
  var rowIds = Object.keys(matrixData);
  for (var i = 0; i < rowIds.length; i++) {
    if (matrixData[rowIds[i]].type === 'perpt') updateMatrixRowTotal(rowIds[i]);
  }
  updateMatrixFooter();
}

function toggleMatrixGroup(type) {
  var tbody = document.getElementById('mc-tbody-' + type);
  if (!tbody) return;
  var isCollapsed = tbody.classList.toggle('mc-collapsed');
  var rows = tbody.querySelectorAll('tr[data-row-id]');
  for (var i = 0; i < rows.length; i++) {
    rows[i].style.display = isCollapsed ? 'none' : '';
  }
}

function changeRowType(rowId, newType) {
  var row = matrixData[rowId];
  if (!row) return;
  var oldType = row.type;
  if (oldType === newType) return;
  row.type = newType;

  var tr = document.getElementById('mc-row-' + rowId);
  if (!tr) return;
  tr.setAttribute('data-type', newType);

  var newTbody = document.getElementById('mc-tbody-' + newType);
  if (!newTbody) return;
  var addRow = newTbody.querySelector('.mc-add-row');
  if (addRow) newTbody.insertBefore(tr, addRow);
  else newTbody.appendChild(tr);

  var selEl = document.getElementById('mc-type-' + rowId);
  if (selEl) {
    var typeClsMap = {startup:'mc-type-startup', general:'mc-type-general', perpt:'mc-type-perpt'};
    selEl.className = 'mc-type-sel ' + (typeClsMap[newType] || '');
  }

  updateMatrixRowTotal(rowId);
  updateMatrixFooter();
  updateSummary();
}

function updateMatrixRowName(rowId, name) {
  if (matrixData[rowId]) matrixData[rowId].name = name;
}

function refreshMatrixColumnLabel(staffId) {
  var label  = getStaffLabel(staffId);
  var hr     = getStaffHourlyRate(staffId);
  var thEl   = document.getElementById('mc-th-'   + staffId);
  var rateEl = document.getElementById('mc-rate-' + staffId);
  if (thEl)   thEl.textContent   = label;
  if (rateEl) rateEl.textContent = '$' + hr.toFixed(2) + '/hr';
}

function getTEStaffTotal() {
  var rowIds = Object.keys(matrixData);
  if (!rowIds.length) return 0;
  var nPt   = parseInt(document.getElementById('study-n').value) || 0;
  var total = 0;
  for (var i = 0; i < rowIds.length; i++) {
    var row   = matrixData[rowIds[i]];
    var sIds  = Object.keys(row.hours);
    var rowT  = 0;
    for (var j = 0; j < sIds.length; j++) {
      rowT += (parseFloat(row.hours[sIds[j]]) || 0) * getStaffHourlyRate(sIds[j]);
    }
    total += (row.type === 'perpt') ? rowT * nPt : rowT;
  }
  return total;
}

function getTEStartupTotal() {
  var rowIds = Object.keys(matrixData);
  var total  = 0;
  for (var i = 0; i < rowIds.length; i++) {
    var row = matrixData[rowIds[i]];
    if (row.type !== 'startup') continue;
    var sIds = Object.keys(row.hours);
    for (var j = 0; j < sIds.length; j++) {
      total += (parseFloat(row.hours[sIds[j]]) || 0) * getStaffHourlyRate(sIds[j]);
    }
  }
  return total;
}

function getStartupMultiYear() {
  var years    = parseInt(document.getElementById('study-years').value) || 1;
  var cola     = document.getElementById('multiyear').value === 'yes';
  var startupY1 = getTEStartupTotal();
  if (cola && years > 1) {
    var total = 0;
    for (var y = 0; y < years; y++) total += startupY1 * Math.pow(1.05, y);
    return total;
  }
  return startupY1 * years;
}

function applyTemplate(tplId) {
  var tpl = TEMPLATES[tplId];
  if (!tpl) return;

  if (tpl.funding) selectFunding(tpl.funding);

  matrixData    = {};
  matrixRowCtr  = 0;
  var tbodyIds = ['mc-tbody-startup','mc-tbody-general','mc-tbody-perpt'];
  for (var t = 0; t < tbodyIds.length; t++) {
    var tb = document.getElementById(tbodyIds[t]);
    if (!tb) continue;
    var rows = tb.querySelectorAll('tr[data-row-id]');
    for (var i = 0; i < rows.length; i++) rows[i].parentNode.removeChild(rows[i]);
  }

  var types = ['startup', 'general', 'perpt'];
  for (var t = 0; t < types.length; t++) {
    var items = tpl[types[t]] || [];
    for (var i = 0; i < items.length; i++) {
      addMatrixRow(types[t], items[i], true);
    }
  }
  showMatrix();
  updateSummary();
}

// ════════════════════════════════════════
// SERVICES
// ════════════════════════════════════════
function renderSvcs() {
  if (svcsRendered) { updateSvcPrices(); return; }
  svcsRendered = true;
  var cont  = document.getElementById('svc-cim-accordion');
  if (!cont) return;
  var isInd = (funding === 'ind');
  var html  = '';

  html += '<div class="svc-top-head">CIM — Centre for Innovative Medicine</div>';
  for (var g = 0; g < SVC_CIM_DATA.length; g++) {
    var grp = SVC_CIM_DATA[g];
    html += '<div class="svc-acc-group" id="svc-grp-' + g + '">';
    html += '<div class="svc-acc-head" onclick="toggleSvcGroup(' + g + ')"><span>' + grp.label + '</span><span class="svc-acc-chevron">▼</span></div>';
    html += '<div class="svc-acc-body" id="svc-body-' + g + '" style="display:none">';
    html += '<div class="svc-hdr"><span>Service</span><span>Unit price</span><span>Qty</span><span>Subtotal</span></div>';
    for (var i = 0; i < grp.items.length; i++) html += makeSvcRow(grp.items[i], isInd);
    html += '</div></div>';
  }

  html += '<div class="svc-top-head">MUHC Pharmacy</div>';
  html += '<div class="svc-acc-group" id="svc-grp-pharma"><div class="svc-acc-head" onclick="toggleSvcGroup(&quot;pharma&quot;)"><span>Pharmacy Services</span><span class="svc-acc-chevron">▼</span></div>';
  html += '<div class="svc-acc-body" id="svc-body-pharma" style="display:none"><div class="svc-hdr"><span>Service</span><span>Unit price</span><span>Qty</span><span>Subtotal</span></div>';
  for (var i = 0; i < SVC_PHARMA.length; i++) html += makeSvcRow(SVC_PHARMA[i], isInd);
  html += '</div></div>';

  html += '<div class="svc-top-head">MUHC IT Services</div>';
  html += '<div class="svc-acc-group" id="svc-grp-it"><div class="svc-acc-head" onclick="toggleSvcGroup(&quot;it&quot;)"><span>IT Services</span><span class="svc-acc-chevron">▼</span></div>';
  html += '<div class="svc-acc-body" id="svc-body-it" style="display:none"><div class="svc-hdr"><span>Service</span><span>Unit price</span><span>Qty</span><span>Subtotal</span></div>';
  for (var i = 0; i < SVC_IT.length; i++) html += makeSvcRow(SVC_IT[i], isInd);
  html += '</div></div>';

  if (isInd) {
    html += '<div class="svc-top-head">MUHC Clinical Services <span style="font-size:9px;font-weight:700;letter-spacing:.07em;background:var(--amber-l);color:#7a4f00;padding:2px 7px;border-radius:9999px;margin-left:8px">INDUSTRY ONLY</span></div>';
    html += '<div class="svc-acc-group" id="svc-grp-muhc"><div class="svc-acc-head" onclick="toggleSvcGroup(&quot;muhc&quot;)"><span>MUHC Clinical Services</span><span class="svc-acc-chevron">▼</span></div>';
    html += '<div class="svc-acc-body" id="svc-body-muhc" style="display:none"><div class="svc-hdr"><span>Service</span><span>Unit price</span><span>Qty</span><span>Subtotal</span></div>';
    for (var i = 0; i < SVC_MUHC.length; i++) html += makeSvcRow(SVC_MUHC[i], true);
    html += '</div></div>';
  }

  cont.innerHTML = html;
}

function makeSvcRow(it, isInd) {
  var name    = it[0], priceNI = it[1], priceI = it[2];
  var price   = isInd ? (priceI !== null && priceI !== undefined ? priceI : priceNI)
                      : (priceNI !== null && priceNI !== undefined ? priceNI : priceI);
  var pStr    = (price === null || price === undefined) ? 'Quote' : ('$' + price);
  var dis     = (price === null || price === undefined) ? ' disabled' : '';
  var dp      = (price === null || price === undefined) ? 0 : price;
  var niStr   = (priceNI !== null && priceNI !== undefined) ? priceNI : '';
  var indStr  = (priceI  !== null && priceI  !== undefined) ? priceI  : '';
  return '<div class="svc-row" data-ni="' + niStr + '" data-ind="' + indStr + '">' +
    '<span class="svc-name">' + name + '</span>' +
    '<span class="svc-price">' + pStr + '</span>' +
    '<div class="svc-qty"><input type="number" min="0" value="0" data-price="' + dp + '"' + dis + ' oninput="svcCalc(this)"></div>' +
    '<span class="svc-sub">$0</span>' +
    '</div>';
}

function toggleSvcGroup(id) {
  var body = document.getElementById('svc-body-' + id);
  var head = document.querySelector('#svc-grp-' + id + ' .svc-acc-head');
  if (!body) return;
  var closed = body.style.display === 'none';
  body.style.display = closed ? 'block' : 'none';
  if (head) head.classList.toggle('svc-acc-open', closed);
  if (id === 'lab' && closed && !labRendered) renderLab();
}

function svcCalc(inp) {
  var price = parseFloat(inp.getAttribute('data-price')) || 0;
  var qty   = parseFloat(inp.value) || 0;
  var row   = inp.closest ? inp.closest('.svc-row') : inp.parentNode.parentNode;
  if (row) {
    var sub = row.querySelector('.svc-sub');
    if (sub) sub.textContent = '$' + Math.round(price * qty).toLocaleString();
  }
  updateSummary();
}

function getSvcTotal() {
  var total = 0;
  var inputs = document.querySelectorAll('#svc-cim-accordion .svc-qty input');
  for (var i = 0; i < inputs.length; i++) {
    total += (parseFloat(inputs[i].getAttribute('data-price')) || 0) * (parseFloat(inputs[i].value) || 0);
  }
  var oAmts = document.querySelectorAll('.oa');
  for (var j = 0; j < oAmts.length; j++) total += parseFloat(oAmts[j].value) || 0;
  total += getLabTotal();
  total += getPtTotal();
  total += getTravelTotal();
  return total;
}

function addOther() {
  otherCtr++;
  var id   = otherCtr;
  var cont = document.getElementById('other-list');
  var d    = document.createElement('div');
  d.className = 'other-row';
  d.id = 'ot-' + id;
  d.innerHTML =
    '<input type="text" class="fi" style="font-size:12.5px;padding:6px 8px" placeholder="Description">' +
    '<input type="number" class="fi oa" min="0" value="0" placeholder="$" style="text-align:right;font-size:13px;padding:6px 8px" oninput="updateSummary()">' +
    '<button class="st-rm-btn" onclick="removeOther(' + id + ')" style="white-space:nowrap">×</button>';
  cont.appendChild(d);
}

function removeOther(id) {
  var el = document.getElementById('ot-' + id);
  if (el) el.parentNode.removeChild(el);
  updateSummary();
}

function updateSvcPrices() {
  var isInd = (funding === 'ind');
  var rows  = document.querySelectorAll('#svc-cim-accordion .svc-row');
  for (var i = 0; i < rows.length; i++) {
    var r      = rows[i];
    var inp    = r.querySelector('.svc-qty input');
    var priceEl = r.querySelector('.svc-price');
    if (!inp || !priceEl) continue;
    var ni  = r.getAttribute('data-ni')  !== '' ? parseFloat(r.getAttribute('data-ni'))  : NaN;
    var ind = r.getAttribute('data-ind') !== '' ? parseFloat(r.getAttribute('data-ind')) : NaN;
    var price = isInd ? (!isNaN(ind) ? ind : ni) : (!isNaN(ni) ? ni : ind);
    var pStr  = isNaN(price) ? 'Quote' : ('$' + price);
    var dp    = isNaN(price) ? 0 : price;
    priceEl.textContent = pStr;
    inp.setAttribute('data-price', dp);
    inp.disabled = isNaN(price) || price <= 0;
    var sub = r.querySelector('.svc-sub');
    if (sub) sub.textContent = '$' + Math.round((parseFloat(inp.value) || 0) * dp).toLocaleString();
  }
  var muhcGrp = document.getElementById('svc-grp-muhc');
  if (isInd && !muhcGrp) {
    svcsRendered = false; renderSvcs();
  } else if (!isInd && muhcGrp) {
    var prev = muhcGrp.previousElementSibling;
    muhcGrp.parentNode.removeChild(muhcGrp);
    if (prev && prev.classList.contains('svc-top-head')) prev.parentNode.removeChild(prev);
  }
  updateSummary();
}

function expandAllSvc() {
  for (var g = 0; g < SVC_CIM_DATA.length; g++) {
    var body = document.getElementById('svc-body-' + g);
    var head = document.querySelector('#svc-grp-' + g + ' .svc-acc-head');
    if (body && body.style.display === 'none') {
      body.style.display = 'block';
      if (head) head.classList.add('svc-acc-open');
    }
  }
  var extras = ['pharma', 'it', 'muhc', 'lab'];
  for (var i = 0; i < extras.length; i++) {
    var body = document.getElementById('svc-body-' + extras[i]);
    var head = document.querySelector('#svc-grp-' + extras[i] + ' .svc-acc-head');
    if (body && body.style.display === 'none') {
      body.style.display = 'block';
      if (head) head.classList.add('svc-acc-open');
      if (extras[i] === 'lab' && !labRendered) renderLab();
    }
  }
}

// ════════════════════════════════════════
// LAB PRICELIST
// ════════════════════════════════════════
function renderLab() {
  if (labRendered) { updateLabPrices(); return; }
  labRendered = true;
  var cont  = document.getElementById('svc-lab');
  if (!cont) return;
  var isInd = (funding === 'ind');
  var html  = '';
  for (var i = 0; i < LAB_DATA.length; i++) {
    var row    = LAB_DATA[i];
    var code   = row[0], name = row[1], priceNI = row[2], priceI = row[3];
    var price  = isInd ? priceI : priceNI;
    var pStr   = price > 0 ? ('$' + price.toFixed(2)) : 'Quote';
    var dp     = price > 0 ? price : 0;
    var dis    = price <= 0 ? ' disabled' : '';
    html += '<div class="svc-row lab-row" data-code="' + code + '" data-name="' + name.toLowerCase() + '" data-ni="' + priceNI + '" data-i="' + priceI + '">' +
      '<span class="svc-name"><span class="svc-code">' + code + '</span>' + name + '</span>' +
      '<span class="svc-price lab-price">' + pStr + '</span>' +
      '<div class="svc-qty"><input type="number" min="0" value="0" data-price="' + dp + '"' + dis + ' oninput="svcCalc(this)"></div>' +
      '<span class="svc-sub">$0</span>' +
      '</div>';
  }
  cont.innerHTML = html;
  var lcEl = document.getElementById('lab-count');
  if (lcEl) lcEl.textContent = LAB_DATA.length + ' tests';
}

function updateLabPrices() {
  var isInd = (funding === 'ind');
  var rows  = document.querySelectorAll('.lab-row');
  for (var i = 0; i < rows.length; i++) {
    var r       = rows[i];
    var priceNI = parseFloat(r.getAttribute('data-ni')) || 0;
    var priceI  = parseFloat(r.getAttribute('data-i'))  || 0;
    var price   = isInd ? priceI : priceNI;
    var pStr    = price > 0 ? ('$' + price.toFixed(2)) : 'Quote';
    var inp     = r.querySelector('input');
    var priceEl = r.querySelector('.lab-price');
    if (priceEl) priceEl.textContent = pStr;
    if (inp) {
      inp.setAttribute('data-price', price > 0 ? price : 0);
      inp.disabled = price <= 0;
      var sub = r.querySelector('.svc-sub');
      if (sub) sub.textContent = '$' + Math.round((parseFloat(inp.value) || 0) * (price > 0 ? price : 0)).toLocaleString();
    }
  }
}

function filterLab() {
  if (!labRendered) {
    renderLab();
    var body = document.getElementById('svc-body-lab');
    var head = document.querySelector('#svc-grp-lab .svc-acc-head');
    if (body) body.style.display = 'block';
    if (head) head.classList.add('svc-acc-open');
  }
  var q    = document.getElementById('lab-search').value.trim().toLowerCase();
  var rows = document.querySelectorAll('.lab-row');
  var shown = 0;
  for (var i = 0; i < rows.length; i++) {
    var r     = rows[i];
    var code  = r.getAttribute('data-code');
    var name  = r.getAttribute('data-name');
    var match = !q || code.indexOf(q) !== -1 || name.indexOf(q) !== -1;
    r.classList.toggle('lab-hidden', !match);
    if (match) shown++;
  }
  var countEl = document.getElementById('lab-count');
  var emptyEl = document.getElementById('lab-empty');
  if (countEl) countEl.textContent = q ? (shown + ' of ' + LAB_DATA.length + ' tests') : (LAB_DATA.length + ' tests');
  if (emptyEl) emptyEl.style.display = (shown === 0 && q) ? 'block' : 'none';
}

function getLabTotal() {
  var total  = 0;
  var inputs = document.querySelectorAll('.lab-row input');
  for (var i = 0; i < inputs.length; i++) {
    total += (parseFloat(inputs[i].getAttribute('data-price')) || 0) * (parseFloat(inputs[i].value) || 0);
  }
  return total;
}

// ════════════════════════════════════════
// PARTICIPANT COSTS
// ════════════════════════════════════════
function calcPtCost() {
  var n   = parseInt(document.getElementById('study-n').value) || 0;
  var ptN = document.getElementById('pt-n-display');
  if (ptN) ptN.textContent = n;

  var items = [
    {amt:'pt-stip-amt',  visits:'pt-stip-visits',  price:'pt-stip-price',  sub:'pt-stip-sub'},
    {amt:'pt-trans-amt', visits:'pt-trans-visits',  price:'pt-trans-price', sub:'pt-trans-sub'},
    {amt:'pt-park-amt',  visits:'pt-park-visits',   price:'pt-park-price',  sub:'pt-park-sub'}
  ];
  for (var i = 0; i < items.length; i++) {
    var it  = items[i];
    var amt    = parseFloat(document.getElementById(it.amt).value)    || 0;
    var visits = parseFloat(document.getElementById(it.visits).value) || 0;
    var priceEl = document.getElementById(it.price);
    var subEl   = document.getElementById(it.sub);
    if (priceEl) priceEl.textContent = '$' + amt.toFixed(2) + ' / visit';
    if (subEl)   subEl.textContent   = '$' + Math.round(amt * visits * n).toLocaleString();
  }
  var otherAmt = parseFloat(document.getElementById('pt-other-amt').value) || 0;
  var otherSub = document.getElementById('pt-other-sub');
  if (otherSub) otherSub.textContent = '$' + Math.round(otherAmt).toLocaleString();
  updateSummary();
}

function getPtTotal() {
  var n      = parseInt(document.getElementById('study-n').value) || 0;
  var stipAmt  = parseFloat(document.getElementById('pt-stip-amt').value)    || 0;
  var stipV    = parseFloat(document.getElementById('pt-stip-visits').value) || 0;
  var transAmt = parseFloat(document.getElementById('pt-trans-amt').value)   || 0;
  var transV   = parseFloat(document.getElementById('pt-trans-visits').value)|| 0;
  var parkAmt  = parseFloat(document.getElementById('pt-park-amt').value)    || 0;
  var parkV    = parseFloat(document.getElementById('pt-park-visits').value) || 0;
  var otherAmt = parseFloat(document.getElementById('pt-other-amt').value)   || 0;
  return (stipAmt * stipV * n) + (transAmt * transV * n) + (parkAmt * parkV * n) + otherAmt;
}

// ════════════════════════════════════════
// TRAVEL
// ════════════════════════════════════════
function updateTravelRows() {
  var monRow = document.getElementById('tv-mon-row');
  if (monRow) monRow.style.display = (funding === 'iit') ? '' : 'none';
  updateTravelSubs();
}

function updateTravelSubs() {
  var ids = ['tv-inv', 'tv-mon', 'tv-other'];
  for (var i = 0; i < ids.length; i++) {
    var inp = document.getElementById(ids[i]);
    var sub = document.getElementById(ids[i] + '-sub');
    if (inp && sub) sub.textContent = '$' + Math.round(parseFloat(inp.value) || 0).toLocaleString();
  }
}

function getTravelTotal() {
  var ids   = ['tv-inv', 'tv-mon', 'tv-other'];
  var total = 0;
  for (var i = 0; i < ids.length; i++) {
    var inp = document.getElementById(ids[i]);
    total += inp ? (parseFloat(inp.value) || 0) : 0;
  }
  return total;
}

// ════════════════════════════════════════
// REB
// ════════════════════════════════════════
function suggestRenewals() {
  var years     = parseInt(document.getElementById('study-years').value) || 1;
  var renewalsEl = document.getElementById('reb-renewals');
  if (renewalsEl && (renewalsEl.value === '0' || renewalsEl.value === '')) {
    renewalsEl.value = Math.max(0, years - 1);
    calcREB();
  }
}

function calcREB() {
  var sites    = Math.min(parseInt(document.getElementById('study-sites').value) || 1, 15);
  var renewals = parseInt(document.getElementById('reb-renewals').value) || 0;
  var amends   = parseInt(document.getElementById('reb-amendments').value) || 0;
  var capSites = Math.min(sites, 10);
  var siteAuth = REB.siteAuth * sites;
  var annMon   = REB.annMon * capSites * renewals;
  var annAuth  = REB.annAuth * sites * renewals;
  var amAmt    = REB.amend * amends;
  var rebTot   = REB.sci + REB.eth + siteAuth + annMon + annAuth + amAmt;

  var html = '';
  html += rebRow('Scientific review (one per project)', REB.sci);
  html += rebRow('Ethical review (one per project)', REB.eth);
  html += rebRow('Site authorization (' + sites + ' institution' + (sites > 1 ? 's' : '') + ')', siteAuth);
  if (renewals > 0) {
    html += rebRow('Annual ethics monitoring (' + renewals + ' renewal' + (renewals > 1 ? 's' : '') + ' × ' + capSites + ' site' + (capSites > 1 ? 's' : '') + ')', annMon);
    html += rebRow('Annual authorization monitoring (' + renewals + ' × ' + sites + ' site' + (sites > 1 ? 's' : '') + ')', annAuth);
  }
  if (amends > 0) html += rebRow('Major protocol amendments (' + amends + ')', amAmt);
  html += '<div class="reb-total-row"><span class="reb-tl">REB total</span><span class="reb-ta">$' + rebTot.toLocaleString() + '</span></div>';

  var grandEst = (getStaffTotal() + getSvcTotal()) * (1 + oh + getContPct());
  if (grandEst > 0 && grandEst < 19039) {
    html += '<div style="padding:10px 18px;font-size:12px;color:var(--teal);border-top:1px solid var(--bdr-soft);line-height:1.5">' +
      '<strong>Possible exemption:</strong> Your estimated total ($' + Math.round(grandEst).toLocaleString() + ') appears to be below the $19,039 MSSS threshold. Confirm with your REB.' +
      '</div>';
  }

  var boxEl = document.getElementById('reb-box');
  if (boxEl) boxEl.innerHTML = html;
  updateSummary();
}

function rebRow(label, amt) {
  return '<div class="reb-fee-row"><span class="reb-fn">' + label + '</span><span class="reb-fa">$' + amt.toLocaleString() + '</span></div>';
}

function getRebAmt() {
  var sites    = Math.min(parseInt(document.getElementById('study-sites').value) || 1, 15);
  var renewals = parseInt(document.getElementById('reb-renewals').value) || 0;
  var amends   = parseInt(document.getElementById('reb-amendments').value) || 0;
  var capSites = Math.min(sites, 10);
  return REB.sci + REB.eth + REB.siteAuth * sites + REB.annMon * capSites * renewals + REB.annAuth * sites * renewals + REB.amend * amends;
}

// ════════════════════════════════════════
// CONTINGENCY
// ════════════════════════════════════════
function selectCont(lv) {
  contLevel = lv;
  var lvs = ['low', 'mod', 'high'];
  for (var i = 0; i < lvs.length; i++) {
    var el = document.getElementById('cc-' + lvs[i]);
    if (el) el.className = 'cont-card';
  }
  var sel = document.getElementById('cc-' + lv);
  if (sel) sel.className = 'cont-card cc-sel-' + lv;
  var pctEl = document.getElementById('cont-pct');
  if (pctEl) pctEl.value = '';
  updateSummary();
}

function getContPct() {
  var ov = parseFloat(document.getElementById('cont-pct').value);
  return (isNaN(ov) || ov <= 0) ? CONT_DEF[contLevel] / 100 : ov / 100;
}

// ════════════════════════════════════════
// SUMMARY + REVIEW
// ════════════════════════════════════════
function updateSummary() {
  var multiEl = document.getElementById('multiyear');
  var colaEl  = document.getElementById('cola-notice');
  if (multiEl && colaEl) colaEl.style.display = (multiEl.value === 'yes') ? 'block' : 'none';

  updateMatrixGroupHeaders();

  var staffAmt = getStaffTotal();
  var svcAmt   = getSvcTotal();
  var contPct  = getContPct();
  var subTotal = staffAmt + svcAmt;
  var contAmt  = subTotal * contPct;
  var rebAmt   = getRebAmt();
  var rebIncEl = document.getElementById('reb-include');
  var rebInc   = rebIncEl ? rebIncEl.value === 'yes' : true;

  var startupMultiYear = (funding === 'ind') ? getStartupMultiYear() : 0;
  var ohAmt;
  if (funding === 'ind' && startupMultiYear > 0) {
    ohAmt = Math.max(0, staffAmt - startupMultiYear) * oh + svcAmt * oh;
  } else {
    ohAmt = subTotal * oh;
  }
  var grand = subTotal + ohAmt + contAmt + (rebInc ? rebAmt : 0);

  // Sticky header
  var titleEl  = document.getElementById('study-title');
  var bthTitle = document.getElementById('bth-title');
  var bthGrand = document.getElementById('bth-grand');
  if (bthTitle) bthTitle.textContent = (titleEl && titleEl.value.trim()) ? titleEl.value.trim() : 'Untitled study';
  if (bthGrand) bthGrand.textContent = '$' + Math.round(grand).toLocaleString();

  // Print header
  var prtTitle = document.getElementById('prt-study-title');
  var prtProto = document.getElementById('prt-protocol');
  var prtDate  = document.getElementById('prt-date');
  var protoEl  = document.getElementById('study-protocol');
  if (prtTitle) prtTitle.textContent = (titleEl && titleEl.value.trim()) ? titleEl.value.trim() : 'Untitled study';
  if (prtProto && protoEl) prtProto.textContent = protoEl.value || '—';
  if (prtDate)  prtDate.textContent  = new Date().toLocaleDateString();

  // Participant count in costs section
  var n   = parseInt(document.getElementById('study-n').value) || 0;
  var ptN = document.getElementById('pt-n-display');
  if (ptN) ptN.textContent = n;

  // Travel subtotals
  updateTravelSubs();

  // No-staff message
  var staffIds  = getActiveStaffIds();
  var noStaffMsg = document.getElementById('te-no-staff-msg');
  if (noStaffMsg) noStaffMsg.style.display = staffIds.length ? 'none' : 'block';

  // Review table
  renderReviewTable(staffAmt, svcAmt, contAmt, ohAmt, rebAmt, rebInc, grand);

  // CIHR
  updateCIHR(staffAmt, svcAmt, contAmt, getTravelTotal(), getOtherCostsTotal());

  // Section status
  updateSectionStatus();

  scheduleAutoSave();
}

function renderReviewTable(staffAmt, svcAmt, contAmt, ohAmt, rebAmt, rebInc, grand) {
  var el = document.getElementById('rv-table');
  if (!el) return;

  // Recalculate if not passed
  if (staffAmt === undefined) {
    staffAmt = getStaffTotal();
    svcAmt   = getSvcTotal();
    contAmt  = (staffAmt + svcAmt) * getContPct();
    rebAmt   = getRebAmt();
    rebInc   = document.getElementById('reb-include').value === 'yes';
    var startupMY = (funding === 'ind') ? getStartupMultiYear() : 0;
    ohAmt = (funding === 'ind' && startupMY > 0)
      ? (Math.max(0, staffAmt - startupMY) + svcAmt) * oh
      : (staffAmt + svcAmt) * oh;
    grand = staffAmt + svcAmt + ohAmt + contAmt + (rebInc ? rebAmt : 0);
  }

  var n      = parseInt(document.getElementById('study-n').value) || 0;
  var teTotal = getTEStaffTotal();

  function fmt(v) { return '$' + Math.round(v).toLocaleString(); }
  function row(lbl, val, cls) {
    return '<div class="rv-row' + (cls ? ' ' + cls : '') + '"><span>' + lbl + '</span><span>' + fmt(val) + '</span></div>';
  }

  var labAmt   = getLabTotal();
  var ptAmt    = getPtTotal();
  var travAmt  = getTravelTotal();
  var otherAmt = getOtherCostsTotal();
  var svcOnly  = Math.max(0, svcAmt - labAmt - ptAmt - travAmt - otherAmt);

  var html = '';
  html += '<div class="rv-section-head">Personnel</div>';
  if (teTotal > 0) {
    var startupMY = getStartupMultiYear();
    html += row('Startup activities' + (funding === 'ind' ? ' (0% overhead)' : ''), startupMY);
    html += row('General & per-participant activities', staffAmt - startupMY);
    html += row('Staff subtotal', staffAmt, 'rv-row-strong');
  } else {
    html += row('Staff (FTE estimate)', staffAmt, 'rv-row-strong');
  }

  html += '<div class="rv-section-head">Study Costs</div>';
  if (svcOnly  > 0) html += row('Institutional services', svcOnly);
  if (labAmt   > 0) html += row('Laboratory tests', labAmt);
  if (ptAmt    > 0) html += row('Participant costs', ptAmt);
  if (travAmt  > 0) html += row('Travel', travAmt);
  if (otherAmt > 0) html += row('Other costs', otherAmt);
  if (svcAmt   > 0) html += row('Study costs subtotal', svcAmt, 'rv-row-strong');

  html += '<div class="rv-divider"></div>';
  html += row('Direct Cost Subtotal', staffAmt + svcAmt, 'rv-row-strong');
  if (ohAmt > 0) html += row('Overhead (' + Math.round(oh * 100) + '%)', ohAmt);
  html += row('Contingency (' + Math.round(getContPct() * 100) + '%)', contAmt);
  if (rebAmt > 0) html += row('REB Fees' + (rebInc ? ' (included in total)' : ' (reference only)'), rebAmt, rebInc ? '' : 'rv-row-indent');
  html += '<div class="rv-grand"><span>Grand Total</span><span>' + fmt(grand) + '</span></div>';
  if (n > 0 && grand > 0) {
    html += '<div class="rv-cpp">Per participant: ' + fmt(grand / n) + ' &bull; ' + n + ' participants</div>';
  }

  // Year-by-year breakdown
  var years = parseInt(document.getElementById('study-years').value) || 1;
  var cola  = document.getElementById('multiyear').value === 'yes';
  if (years > 1 && teTotal > 0) {
    html += '<div class="rv-section-head">Year-by-year staff costs</div>';
    html += '<div class="rv-yearly">';
    for (var y = 0; y < years; y++) {
      var yrAmt = cola ? teTotal * Math.pow(1.05, y) : teTotal;
      var pctStr = (cola && y > 0) ? ' (+' + ((Math.pow(1.05, y) - 1) * 100).toFixed(1) + '%)' : '';
      html += '<div class="rv-yr-row"><span>Year ' + (y + 1) + pctStr + '</span><span>$' + Math.round(yrAmt).toLocaleString() + '</span></div>';
    }
    html += '</div>';
  }

  el.innerHTML = html;
}

function renderPrintSections() {
  renderReviewTable();
  var prtTitle = document.getElementById('prt-study-title');
  var titleEl  = document.getElementById('study-title');
  var prtDate  = document.getElementById('prt-date');
  if (prtTitle && titleEl) prtTitle.textContent = titleEl.value.trim() || 'Untitled study';
  if (prtDate) prtDate.textContent = new Date().toLocaleDateString();
  var btPrint = document.getElementById('bt-print-header');
  if (btPrint) btPrint.style.display = 'block';
}

function toggleCIHRFormat() {
  var block = document.getElementById('cihr-block');
  if (!block) return;
  block.style.display = (block.style.display === 'none' || !block.style.display) ? 'block' : 'none';
}

function updateCIHR(staffAmt, svcAmt, contAmt, travelAmt, otherAmt) {
  var personnel = staffAmt;
  var matsup    = svcAmt - travelAmt - otherAmt;
  var travel    = travelAmt;
  var kt        = 0;
  var other     = contAmt + otherAmt;
  var total     = personnel + matsup + travel + kt + other;

  function fmt(n) { return '$' + Math.round(n).toLocaleString(); }
  var se = function(id, v) { var el = document.getElementById(id); if (el) el.textContent = fmt(v); };
  se('cihr-personnel', personnel);
  se('cihr-matsup',    matsup);
  se('cihr-travel',    travel);
  se('cihr-kt',        kt);
  se('cihr-other',     other);
  se('cihr-total',     total);
}

// ════════════════════════════════════════
// ACTIVITY PICKER
// ════════════════════════════════════════
function getAddedActivityNames() {
  var names   = {};
  var nameEls = document.querySelectorAll('[id^="mc-name-"]');
  for (var i = 0; i < nameEls.length; i++) {
    var v = nameEls[i].value.trim().toLowerCase();
    if (v) names[v] = true;
  }
  return names;
}

function buildActPicker() {
  var body = document.getElementById('act-picker-body');
  if (!body) return;
  var addedNames = getAddedActivityNames();
  var html = '';
  for (var g = 0; g < ACT_GROUPS.length; g++) {
    var grp = ACT_GROUPS[g];
    html += '<div class="ap-group" id="apg-' + g + '">' +
      '<div class="ap-group-head ' + grp.cls + '" onclick="toggleApGroup(' + g + ')">' +
      '<span>' + grp.label + '</span><span class="ap-group-chevron">&#9660;</span></div>' +
      '<div class="ap-group-items" id="apgi-' + g + '">';
    for (var i = 0; i < grp.items.length; i++) {
      var alreadyAdded = addedNames[grp.items[i].toLowerCase()] ? true : false;
      var badge = alreadyAdded ? '<span style="font-size:10px;color:#1d9e75;font-weight:700;flex-shrink:0;margin-left:auto;padding-left:10px">&#10003; Added</span>' : '';
      html += '<label class="ap-item" for="apc-' + g + '-' + i + '">' +
        '<input type="checkbox" id="apc-' + g + '-' + i + '" onchange="apSelChange()">' +
        '<span class="ap-item-name">' + grp.items[i] + '</span>' + badge + '</label>';
    }
    html += '</div></div>';
  }
  body.innerHTML = html;
}

function toggleApGroup(g) {
  var items = document.getElementById('apgi-' + g);
  var head  = document.querySelector('#apg-' + g + ' .ap-group-head');
  if (!items) return;
  var isOpen = items.classList.contains('open');
  items.classList.toggle('open', !isOpen);
  if (head) head.classList.toggle('open', !isOpen);
}

function openActPicker() {
  var overlay = document.getElementById('act-picker-overlay');
  var picker  = document.getElementById('act-picker');
  buildActPicker();
  if (overlay) overlay.style.display = 'block';
  if (picker)  picker.style.display  = 'flex';
  var searchEl = document.getElementById('act-picker-search');
  if (searchEl) searchEl.value = '';
  var firstItems = document.getElementById('apgi-0');
  var firstHead  = document.querySelector('#apg-0 .ap-group-head');
  if (firstItems && !firstItems.classList.contains('open')) {
    firstItems.classList.add('open');
    if (firstHead) firstHead.classList.add('open');
  }
  apSelChange();
}

function closeActPicker() {
  var overlay = document.getElementById('act-picker-overlay');
  var picker  = document.getElementById('act-picker');
  if (overlay) overlay.style.display = 'none';
  if (picker)  picker.style.display  = 'none';
}

function apSelChange() {
  var checked  = document.querySelectorAll('#act-picker-body input[type=checkbox]:checked');
  var countEl  = document.getElementById('act-picker-count');
  if (countEl) countEl.textContent = checked.length + ' selected';
  var allItems = document.querySelectorAll('.ap-item');
  for (var i = 0; i < allItems.length; i++) {
    var cb = allItems[i].querySelector('input[type=checkbox]');
    allItems[i].classList.toggle('ap-sel', cb && cb.checked);
  }
}

function filterActPicker() {
  var q        = document.getElementById('act-picker-search').value.trim().toLowerCase();
  var allItems = document.querySelectorAll('.ap-item');
  for (var i = 0; i < allItems.length; i++) {
    var name  = allItems[i].querySelector('.ap-item-name');
    var match = !q || (name && name.textContent.toLowerCase().indexOf(q) !== -1);
    allItems[i].classList.toggle('ap-hidden', !match);
  }
  if (q) {
    for (var g = 0; g < ACT_GROUPS.length; g++) {
      var groupItems = document.querySelectorAll('#apgi-' + g + ' .ap-item:not(.ap-hidden)');
      var itemsEl    = document.getElementById('apgi-' + g);
      var head       = document.querySelector('#apg-' + g + ' .ap-group-head');
      if (groupItems.length > 0) {
        if (itemsEl) itemsEl.classList.add('open');
        if (head)    head.classList.add('open');
      }
    }
  }
}

function addSelectedActivities() {
  var checked = document.querySelectorAll('#act-picker-body input[type=checkbox]:checked');
  if (!checked.length) { closeActPicker(); return; }
  for (var i = 0; i < checked.length; i++) {
    var cb     = checked[i];
    var label  = cb.parentNode.querySelector('.ap-item-name');
    var name   = label ? label.textContent : '';
    var idParts = cb.id.replace('apc-', '').split('-');
    var gIdx    = parseInt(idParts[0]);
    var type    = ACT_GROUPS[gIdx] ? ACT_GROUPS[gIdx].type : 'general';
    addMatrixRow(type, name);
  }
  closeActPicker();
  updateSummary();
}

// ════════════════════════════════════════
// BUDGET STATE — SAVE / RESTORE / AUTOSAVE
// ════════════════════════════════════════
function serializeMatrix() {
  var result = [];
  var rowIds = Object.keys(matrixData);
  for (var i = 0; i < rowIds.length; i++) {
    var rowId = rowIds[i];
    var row   = matrixData[rowId];
    var hrs   = {};
    var sIds  = Object.keys(row.hours);
    for (var j = 0; j < sIds.length; j++) hrs[sIds[j]] = row.hours[sIds[j]];
    result.push({id: rowId, type: row.type, name: row.name, hours: hrs});
  }
  return result;
}

function getBudgetState() {
  var state = {v: 1, saved: new Date().toISOString()};

  var setupIds = ['study-title','study-protocol','study-years','study-n','study-sites','study-type','multiyear','found-oh-pct'];
  state.setup = {};
  for (var i = 0; i < setupIds.length; i++) {
    var el = document.getElementById(setupIds[i]);
    if (el) state.setup[setupIds[i]] = el.value;
  }
  state.funding = funding;

  state.staff = [];
  var staffRows = document.querySelectorAll('#staff-tbody tr[data-staff-id]');
  for (var i = 0; i < staffRows.length; i++) {
    var id = staffRows[i].getAttribute('data-staff-id');
    state.staff.push({
      role: document.getElementById('s-role-' + id) ? document.getElementById('s-role-' + id).value : '',
      name: document.getElementById('s-name-' + id) ? document.getElementById('s-name-' + id).value : '',
      sal:  document.getElementById('s-sal-'  + id) ? document.getElementById('s-sal-'  + id).value : '',
      fte:  document.getElementById('s-fte-'  + id) ? document.getElementById('s-fte-'  + id).value : '100'
    });
  }

  state.activities = serializeMatrix();

  state.svcQtys = [];
  var svcInputs = document.querySelectorAll('#svc-cim-accordion .svc-qty input');
  for (var i = 0; i < svcInputs.length; i++) {
    if (parseFloat(svcInputs[i].value) > 0) state.svcQtys.push({idx: i, val: svcInputs[i].value});
  }

  state.labQtys = [];
  var labInputs = document.querySelectorAll('.lab-row input');
  for (var i = 0; i < labInputs.length; i++) {
    if (parseFloat(labInputs[i].value) > 0) {
      var row = labInputs[i].closest ? labInputs[i].closest('.lab-row') : labInputs[i].parentNode.parentNode;
      state.labQtys.push({code: row ? row.getAttribute('data-code') : i, val: labInputs[i].value});
    }
  }

  var ptIds = ['pt-stip-amt','pt-stip-visits','pt-trans-amt','pt-trans-visits','pt-park-amt','pt-park-visits','pt-other-amt'];
  state.participant = {};
  for (var i = 0; i < ptIds.length; i++) {
    var el = document.getElementById(ptIds[i]);
    if (el) state.participant[ptIds[i]] = el.value;
  }

  state.travel = {};
  var tvIds = ['tv-inv','tv-mon','tv-other'];
  for (var i = 0; i < tvIds.length; i++) {
    var el = document.getElementById(tvIds[i]);
    if (el) state.travel[tvIds[i]] = el.value;
  }

  state.others = [];
  var otherRows = document.querySelectorAll('#other-list .other-row');
  for (var i = 0; i < otherRows.length; i++) {
    var inputs = otherRows[i].querySelectorAll('input');
    state.others.push({desc: inputs[0] ? inputs[0].value : '', amt: inputs[1] ? inputs[1].value : '0'});
  }

  state.reb = {
    renewals:   document.getElementById('reb-renewals')   ? document.getElementById('reb-renewals').value   : '0',
    amendments: document.getElementById('reb-amendments') ? document.getElementById('reb-amendments').value : '0',
    include:    document.getElementById('reb-include')    ? document.getElementById('reb-include').value    : 'yes'
  };

  state.contingency = {
    level: contLevel,
    pct:   document.getElementById('cont-pct') ? document.getElementById('cont-pct').value : ''
  };

  return state;
}

function setBudgetState(state) {
  if (!state || state.v !== 1) return;

  if (state.setup) {
    var setupIds = ['study-title','study-protocol','study-years','study-n','study-sites','study-type','multiyear'];
    for (var i = 0; i < setupIds.length; i++) {
      var el = document.getElementById(setupIds[i]);
      if (el && state.setup[setupIds[i]] !== undefined) el.value = state.setup[setupIds[i]];
    }
    if (state.setup['found-oh-pct']) {
      var fohEl = document.getElementById('found-oh-pct');
      if (fohEl) fohEl.value = state.setup['found-oh-pct'];
    }
  }

  if (state.funding) selectFunding(state.funding);

  // Clear staff and matrix
  var tbody = document.getElementById('staff-tbody');
  if (tbody) tbody.innerHTML = '';
  staffCtr = 0;

  // Clear matrix header columns
  var headRow = document.getElementById('mc-head-row');
  if (headRow) {
    var oldCols = headRow.querySelectorAll('th[data-staff-id]');
    for (var i = 0; i < oldCols.length; i++) oldCols[i].parentNode.removeChild(oldCols[i]);
  }
  var rateRow = document.getElementById('mc-rate-row');
  if (rateRow) {
    var oldRateCols = rateRow.querySelectorAll('th[data-staff-id]');
    for (var i = 0; i < oldRateCols.length; i++) oldRateCols[i].parentNode.removeChild(oldRateCols[i]);
  }
  var tfootHrs  = document.getElementById('mc-tfoot-hrs');
  var tfootCost = document.getElementById('mc-tfoot-cost');
  if (tfootHrs)  { var fc = tfootHrs.querySelectorAll('td[data-staff-id]');  for (var i=0;i<fc.length;i++) fc[i].parentNode.removeChild(fc[i]); }
  if (tfootCost) { var fc = tfootCost.querySelectorAll('td[data-staff-id]'); for (var i=0;i<fc.length;i++) fc[i].parentNode.removeChild(fc[i]); }

  // Clear matrix data and activity rows
  matrixData   = {};
  matrixRowCtr = 0;
  var tbodyIds = ['mc-tbody-startup','mc-tbody-general','mc-tbody-perpt'];
  for (var t = 0; t < tbodyIds.length; t++) {
    var mtb = document.getElementById(tbodyIds[t]);
    if (!mtb) continue;
    var rows = mtb.querySelectorAll('tr[data-row-id]');
    for (var i = 0; i < rows.length; i++) rows[i].parentNode.removeChild(rows[i]);
  }

  // Restore staff
  if (state.staff && state.staff.length) {
    for (var i = 0; i < state.staff.length; i++) {
      addStaffRow();
      var id = staffCtr;
      var s  = state.staff[i];
      if (s.role !== undefined) {
        var roleEl = document.getElementById('s-role-' + id);
        if (roleEl) { roleEl.value = s.role; if (s.role !== '') staffRoleChange(id); }
      }
      if (s.name !== undefined) { var nel = document.getElementById('s-name-' + id); if (nel) nel.value = s.name; }
      if (s.sal  !== undefined) { var sel = document.getElementById('s-sal-'  + id); if (sel) { sel.value = s.sal; staffSalChange(id); } }
      if (s.fte  !== undefined) { var fel = document.getElementById('s-fte-'  + id); if (fel) fel.value = s.fte || '100'; }
    }
  }

  // Restore activities
  if (state.activities && state.activities.length) {
    for (var i = 0; i < state.activities.length; i++) {
      var act   = state.activities[i];
      var rowId;
      if (act.id) {
        rowId = act.id;
        var n = parseInt(act.id.replace('r', ''));
        if (!isNaN(n) && n >= matrixRowCtr) matrixRowCtr = n;
      } else {
        matrixRowCtr++;
        rowId = 'r' + matrixRowCtr;
      }
      matrixData[rowId] = {type: act.type || 'general', name: act.name || '', hours: {}};
      appendMatrixRow(rowId, act.type || 'general', act.name || '');
      if (act.hours) {
        var hKeys = Object.keys(act.hours);
        for (var j = 0; j < hKeys.length; j++) {
          var staffId = hKeys[j];
          var hrs     = act.hours[staffId];
          if (hrs && parseFloat(hrs) > 0) {
            matrixData[rowId].hours[staffId] = hrs;
            var inp = document.getElementById('mc-' + rowId + '-' + staffId);
            if (inp) inp.value = hrs;
          }
        }
      }
    }
    showMatrix();
    var rIds = Object.keys(matrixData);
    for (var i = 0; i < rIds.length; i++) updateMatrixRowTotal(rIds[i]);
    updateMatrixFooter();
  }

  // Restore services
  if (state.svcQtys && state.svcQtys.length) {
    var svcInputs = document.querySelectorAll('#svc-cim-accordion .svc-qty input');
    for (var i = 0; i < state.svcQtys.length; i++) {
      var entry = state.svcQtys[i];
      if (svcInputs[entry.idx]) { svcInputs[entry.idx].value = entry.val; svcCalc(svcInputs[entry.idx]); }
    }
  }

  // Restore lab
  if (state.labQtys && state.labQtys.length) {
    if (!labRendered) renderLab();
    for (var i = 0; i < state.labQtys.length; i++) {
      var entry = state.labQtys[i];
      var row = document.querySelector('.lab-row[data-code="' + entry.code + '"]');
      if (row) { var inp = row.querySelector('input'); if (inp) { inp.value = entry.val; svcCalc(inp); } }
    }
  }

  // Restore participant costs
  if (state.participant) {
    var ptIds = ['pt-stip-amt','pt-stip-visits','pt-trans-amt','pt-trans-visits','pt-park-amt','pt-park-visits','pt-other-amt'];
    for (var i = 0; i < ptIds.length; i++) {
      var el = document.getElementById(ptIds[i]);
      if (el && state.participant[ptIds[i]] !== undefined) el.value = state.participant[ptIds[i]];
    }
    calcPtCost();
  }

  // Restore travel
  if (state.travel) {
    var tvIds = ['tv-inv','tv-mon','tv-other'];
    for (var i = 0; i < tvIds.length; i++) {
      var el = document.getElementById(tvIds[i]);
      if (el && state.travel[tvIds[i]] !== undefined) el.value = state.travel[tvIds[i]];
    }
  }

  // Restore other costs
  if (state.others && state.others.length) {
    for (var i = 0; i < state.others.length; i++) {
      addOther();
      var id   = otherCtr;
      var oRow = document.getElementById('ot-' + id);
      if (oRow) {
        var inputs = oRow.querySelectorAll('input');
        if (inputs[0]) inputs[0].value = state.others[i].desc;
        if (inputs[1]) inputs[1].value = state.others[i].amt;
      }
    }
  }

  // Restore REB
  if (state.reb) {
    if (document.getElementById('reb-renewals'))   document.getElementById('reb-renewals').value   = state.reb.renewals;
    if (document.getElementById('reb-amendments')) document.getElementById('reb-amendments').value = state.reb.amendments;
    if (document.getElementById('reb-include'))    document.getElementById('reb-include').value    = state.reb.include;
    calcREB();
  }

  // Restore contingency
  if (state.contingency) {
    selectCont(state.contingency.level || 'mod');
    if (state.contingency.pct) {
      var pctEl = document.getElementById('cont-pct');
      if (pctEl) pctEl.value = state.contingency.pct;
    }
  }

  updateSummary();
}

function autoSave() {
  try {
    var state = getBudgetState();
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(state));
    var t   = new Date();
    var msg = 'Auto-saved ' + t.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    var n1  = document.getElementById('autosave-notice');
    var n2  = document.getElementById('autosave-notice-rv');
    var n3  = document.getElementById('bth-saved-hdr');
    if (n1) { n1.textContent = msg; }
    if (n2) { n2.textContent = msg; }
    if (n3) { n3.textContent = msg; }
  } catch(e) {}
}

function scheduleAutoSave() {
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(autoSave, 1500);
}

function exportBudget() {
  var state  = getBudgetState();
  var titleEl = document.getElementById('study-title');
  var title  = (titleEl && titleEl.value ? titleEl.value : 'budget').replace(/[^a-z0-9]/gi, '_').toLowerCase();
  var fname  = 'rimuhc_budget_' + title + '.json';
  var blob   = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
  var url    = URL.createObjectURL(blob);
  var a      = document.createElement('a');
  a.href = url; a.download = fname; a.click();
  URL.revokeObjectURL(url);
}

function importBudget(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var state = JSON.parse(e.target.result);
      setBudgetState(state);
      var msg = 'Budget loaded from file';
      var n1  = document.getElementById('autosave-notice');
      var n2  = document.getElementById('autosave-notice-rv');
      if (n1) n1.textContent = msg;
      if (n2) n2.textContent = msg;
    } catch(err) {
      alert('Could not load file. Please make sure it is a valid budget file saved from this tool.');
    }
    input.value = '';
  };
  reader.readAsText(file);
}

function checkAutoSave() {
  try {
    var saved = localStorage.getItem(AUTOSAVE_KEY);
    if (!saved) return;
    var state = JSON.parse(saved);
    if (!state || !state.saved) return;
    var savedDate = new Date(state.saved);
    var title     = (state.setup && state.setup['study-title']) ? state.setup['study-title'] : 'untitled budget';
    var msg       = 'A saved budget was found: "' + title + '" (saved ' + savedDate.toLocaleString() + ').\n\nRestore it?';
    if (confirm(msg)) {
      setBudgetState(state);
      var n1 = document.getElementById('autosave-notice');
      var n2 = document.getElementById('autosave-notice-rv');
      if (n1) n1.textContent = 'Budget restored from auto-save';
      if (n2) n2.textContent = 'Budget restored from auto-save';
    }
  } catch(e) {}
}

// ════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════
function getOtherCostsTotal() {
  var total = 0;
  var oAmts = document.querySelectorAll('.oa');
  for (var i = 0; i < oAmts.length; i++) total += parseFloat(oAmts[i].value) || 0;
  return total;
}

function syncStudyType() {
  var sitesEl = document.getElementById('study-sites');
  var typeEl  = document.getElementById('study-type');
  if (!sitesEl || !typeEl) return;
  typeEl.value = (parseInt(sitesEl.value) || 1) > 1 ? 'multi' : 'single';
}

function syncStudySites() {
  var sitesEl = document.getElementById('study-sites');
  var typeEl  = document.getElementById('study-type');
  if (!sitesEl || !typeEl) return;
  if (typeEl.value === 'multi') {
    var current = parseInt(sitesEl.value) || 1;
    if (current < 2) { sitesEl.value = 2; calcREB(); }
  } else {
    sitesEl.value = 1; calcREB();
  }
}

// ════════════════════════════════════════
// INIT
// ════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function() {
  renderSvcs();
  calcREB();
  calcPtCost();
  selectCont('mod');
  updateSummary();
  checkAutoSave();
  window.addEventListener('beforeprint', renderPrintSections);
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeActPicker();
      document.activeElement.blur();
    }
  });
  // Column highlight: tint active column cells when an input is focused
  document.addEventListener('focusin', function(e) {
    var matrix = document.getElementById('te-matrix');
    if (!matrix || !matrix.contains(e.target)) return;
    var td = e.target.closest ? e.target.closest('td[data-staff-id]') : null;
    if (!td) return;
    var sid = td.getAttribute('data-staff-id');
    var cells = matrix.querySelectorAll('td.mc-input-cell[data-staff-id="' + sid + '"]');
    for (var i = 0; i < cells.length; i++) cells[i].classList.add('mc-col-active');
  });
  document.addEventListener('focusout', function(e) {
    var matrix = document.getElementById('te-matrix');
    if (!matrix) return;
    var active = matrix.querySelectorAll('.mc-col-active');
    for (var i = 0; i < active.length; i++) active[i].classList.remove('mc-col-active');
  });
});
