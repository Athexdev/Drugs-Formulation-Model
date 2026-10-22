export const content = {
  parenteral: {
    title: "Parenteral Preparations",
    definition: "Sterile pharmaceutical preparations administered by injection or infusion, bypassing the alimentary canal.",
    classification: {
      volume: {
        svp: {
          title: "SVP (≤ 100 mL)",
          examples: ["Insulin", "Adrenaline", "Ceftriaxone"]
        },
        lvp: {
          title: "LVP (> 100 mL)",
          examples: ["5% Dextrose", "Normal Saline", "Ringer's Lactate", "Mannitol"]
        }
      },
      formulation: ["Solutions", "Suspensions"],
      routes: [
        { id: "iv", name: "IV", target: "Vein" },
        { id: "im", name: "IM", target: "Muscle" },
        { id: "sc", name: "SC", target: "Under skin" },
        { id: "id", name: "ID", target: "Skin layer" },
        { id: "special", name: "Specialized", target: "Intra-articular / Intrathecal" }
      ]
    },
    preformulation: [
      { id: "solubility", name: "SOLUBILITY + VEHICLE", desc: "Sufficient solubility for uniform dosing; aqueous vehicles are most common." },
      { id: "stability", name: "STABILITY", desc: "Chemical, physical and microbiological stability throughout shelf-life." },
      { id: "ph", name: "pH + ISOTONICITY", desc: "Physiological pH reduces tissue irritation; isotonicity helps prevent pain, hemolysis and tissue damage." },
      { id: "sterility", name: "STERILITY + PYROGENS", desc: "Must be free from viable microorganisms and pyrogens (fever-causing substances)." },
      { id: "compatibility", name: "COMPATIBILITY", desc: "Compatibility with formulation excipients and physiological fluids." },
      { id: "container", name: "CONTAINER + PACKAGING", desc: "Must not interact chemically or physically with the formulation." }
    ],
    components: ["API", "VEHICLE", "BUFFER", "ANTIOXIDANT", "PRESERVATIVE", "TONICITY"],
    additives: [
      { name: "Buffers", desc: "Maintain pH stability." },
      { name: "Antioxidants", desc: "Prevent oxidative degradation." },
      { name: "Preservatives", desc: "Inhibit microbial growth in multiple-dose containers." },
      { name: "Chelating Agents", desc: "Complex with heavy metals to prevent catalysis of oxidation." },
      { name: "Tonicity Agents", desc: "Adjust osmotic pressure to physiological levels." },
      { name: "Surfactants / Solubilizers", desc: "Enhance solubility and stability." }
    ],
    manufacturingFlow: [
      "Planning & Scheduling",
      "Equipment / Facility",
      "Documentation",
      "Personnel",
      "Material Management",
      "Manufacturing",
      "Bulk Analysis",
      "Sterilisation",
      "Aseptic Filling",
      "Q.C. Testing",
      "Visual Inspection",
      "Finishing",
      "Labelling & Packaging",
      "Warehousing"
    ],
    asepticProcessing: [
      { step: "01", name: "FILTER", desc: "0.22 μm filtration for heat-sensitive drugs" },
      { step: "02", name: "STERILIZE COMPONENTS", desc: "Autoclaving, dry heat or gamma radiation" },
      { step: "03", name: "STERILE FILLING", desc: "Under laminar airflow in a controlled cleanroom" },
      { step: "04", name: "SEAL", desc: "Sterile stoppers, caps or seals" },
      { step: "05", name: "MONITOR", desc: "Airborne particles + microorganisms" }
    ],
    dryProducts: {
      methods: ["Sterile Recrystallization", "Lyophilisation", "Spray Drying"],
      lyophilisation: ["FREEZING", "PRIMARY DRYING", "SECONDARY DRYING"]
    },
    containers: {
      glass: ["Ampoules", "Vials"],
      plastics: ["Water bottles / bags"],
      closures: ["Rubber stoppers", "Caps / aluminium seals"]
    }
  },
  ophthalmic: {
    title: "Ophthalmic Preparations",
    definition: "Sterile preparations intended for application to the eye; formulation is driven by sterility, clarity, comfort, stability and compatibility.",
    requirements: [
      { name: "CLARITY", desc: "Must be free from foreign particles." },
      { name: "STERILITY", desc: "Must be sterile to prevent ocular infections." },
      { name: "pH", desc: "Ideally matched to tear fluid (pH 7.4) for comfort." },
      { name: "TONICITY", desc: "Isotonic with tears to prevent irritation and tissue damage." },
      { name: "PRESERVATION", desc: "Multiple-dose containers require antimicrobial preservatives." },
      { name: "VISCOSITY / STABILITY", desc: "Increased viscosity prolongs contact time; requires physical and chemical stability." }
    ],
    components: ["ACTIVE DRUG", "VEHICLE", "PRESERVATIVE", "BUFFER", "TONICITY MODIFIER", "VISCOSITY MODIFIER"],
    preservatives: [
      "Benzalkonium chloride",
      "Chlorhexidine acetate",
      "Phenylmercuric nitrate"
    ],
    ointments: {
      bases: [
        { name: "Yellow soft paraffin", emphasis: false },
        { name: "Liquid paraffin", emphasis: false },
        { name: "Wool fat", emphasis: false },
        { name: "White soft paraffin", emphasis: true } // Emphasized in source
      ],
      process: ["BASE HANDLING", "DRUG INCORPORATION", "FILTER / CLEAN WHERE APPLICABLE", "STERILIZATION / PROCESS CONTROL", "FILLING"]
    },
    lotions: [
      "Sterile solution",
      "Compatible with tear salts / ocular environment",
      "Neutral or suitable pH",
      "Non-irritating",
      "Maintain sterility during preparation and packaging",
      "Example: Sodium chloride eye lotion"
    ]
  },
  qc: [
    { id: "sterility", name: "STERILITY TEST", purpose: "Confirms absence of viable microorganisms in the test sample.", workflow: ["Sample preparation", "Testing according to selected sterility method", "Incubation / observation", "Interpretation against acceptance criteria"] },
    { id: "pyrogen", name: "PYROGEN TEST", purpose: "Detects the presence of pyrogens (fever-producing substances).", workflow: ["Rabbit test or LAL test", "Observation/Measurement", "Interpretation"] },
    { id: "clarity", name: "CLARITY TEST", purpose: "Ensures absence of particulate matter.", workflow: ["Visual inspection under good lighting against black and white backgrounds", "Automated particulate counting"] },
    { id: "leakage", name: "LEAKAGE TEST", purpose: "Ensures container-closure integrity (e.g., ampoules).", workflow: ["Dye bath immersion under vacuum", "Wash and inspect for dye penetration"] },
    { id: "ph", name: "pH TEST", purpose: "Confirms the pH is within specified limits.", workflow: ["Measurement using a calibrated pH meter"] },
    { id: "assay", name: "ASSAY", purpose: "Determines the exact concentration of active pharmaceutical ingredient(s).", workflow: ["Sample preparation", "Analytical measurement (e.g., HPLC, UV)", "Calculation"] }
  ],
  quiz: [
    {
      id: 1,
      type: "mcq",
      question: "Which volume classification applies to preparations > 100 mL?",
      options: ["SVP", "LVP", "Ophthalmic", "Ampoule"],
      answer: 1,
      explanation: "Large Volume Parenterals (LVP) are preparations with a volume strictly greater than 100 mL."
    },
    {
      id: 2,
      type: "tf",
      question: "Ophthalmic preparations must be sterile.",
      options: ["True", "False"],
      answer: 0,
      explanation: "True. Like parenterals, ophthalmic preparations must be sterile to prevent ocular infections."
    },
    {
      id: 3,
      type: "mcq",
      question: "Which test confirms the absence of viable microorganisms?",
      options: ["Pyrogen Test", "Clarity Test", "Sterility Test", "Assay"],
      answer: 2,
      explanation: "The Sterility Test confirms the absence of viable microorganisms."
    },
    {
      id: 4,
      type: "mcq",
      question: "Which is an example of an ophthalmic preservative?",
      options: ["Mannitol", "Benzalkonium chloride", "Yellow soft paraffin", "Ceftriaxone"],
      answer: 1,
      explanation: "Benzalkonium chloride is explicitly listed in the source as an ophthalmic preservative."
    },
    {
      id: 5,
      type: "mcq",
      question: "In lyophilisation, what step follows Freezing?",
      options: ["Primary Drying", "Secondary Drying", "Filling", "Sterilizing"],
      answer: 0,
      explanation: "The sequence is: Freezing -> Primary Drying -> Secondary Drying."
    }
    // I can add more to reach 15-20 in the full quiz module later or handle it in the component.
  ]
};
