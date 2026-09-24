export const servicesData = {
  purifier: {
    id: 'purifier',
    slug: 'purifier',
    title: 'Puroaqua Domestic Water Purifier (RO + UF + Alkaline)',
    tag: 'WATER PURIFIER',
    tagClass: 'tag-purifier',
    imageSrc: '/product_puroaqua_black.jpg',
    badge: 'Dual Mode RO / SN Technology',
    subtitle: '6-Stage Advanced Household & Villa Water Purification System',
    description: 'Engineered specifically for Kerala groundwater and municipal supply variations. Dual mode selector allows switching between RO mode (for high TDS borewell water) and SN/UF mode (for low TDS municipal water), preserving natural minerals while eliminating 100% of bacteria, heavy metals, and dissolved impurities.',
    heroDesc: 'Advanced 6-stage domestic drinking water purifiers with dual-mode TDS selection and alkaline mineral enrichment for homes and villas across Kozhikode.',
    specs: [
      { label: 'Purification Stages', val: '6 Stage (Pre-Filter, Sediment, Carbon, RO Membrane, UF, Alkaline)' },
      { label: 'Flow Rate Capacity', val: '15 Litres / Hour (10 Litre Food-Grade Storage Tank)' },
      { label: 'Filtration Accuracy', val: '0.0001 Micron (RO Membrane) + 0.01 Micron (UF Membrane)' },
      { label: 'TDS Adjustment', val: 'Smart TDS Blender & Mineral Enricher' },
      { label: 'Power Consumption', val: 'Ultra-Low 30W Power Rating' },
      { label: 'Warranty & Support', val: '1 Year Comprehensive Warranty + Free Quarterly Checks' }
    ],
    applications: ['Residential Villas', 'Apartment Kitchens', 'Private Clinics', 'Small Offices'],
    process: ['Raw Water Inlet', 'Multi-Stage Pre-Filtration', 'RO / UF Purification', 'Alkaline Mineralization', 'Pure Water Storage'],
    highlights: [
      'Dual-mode operation for well water & municipal tap water',
      'Food-grade antibacterial 10L storage tank',
      'Enriches drinking water with essential calcium & magnesium minerals',
      'Automatic shut-off & low pressure protection'
    ]
  },
  wtp: {
    id: 'wtp',
    slug: 'wtp',
    title: 'Commercial & Industrial Water Treatment Plants (WTP)',
    tag: 'WTP PLANT',
    tagClass: 'tag-wtp',
    imageSrc: '/wtp_plant.png',
    badge: 'Heavy-Duty Potable Water Facilities',
    subtitle: 'Custom Skid-Mounted Filtration, Softening & Desalination Systems',
    description: 'Heavy-duty water treatment facilities designed to purify raw well water, river water, or high-hardness borewell supply. Features multi-pot pressure filter vessels, activated carbon adsorbers, catalytic manganese iron removers, and industrial RO membranes to deliver IS 10500 compliant drinking and operational water.',
    heroDesc: 'Turnkey industrial and commercial water treatment plants engineered for hospitals, hotels, resorts, and residential complexes.',
    specs: [
      { label: 'Plant Capacity', val: '1,000 LPH to 50,000+ LPH (Litres Per Hour)' },
      { label: 'Pre-Filtration Vessels', val: 'FRP / SS 304 Pressure Vessels with Multiport Valves' },
      { label: 'Iron & Heavy Metal Removal', val: 'Manganese Dioxide Catalytic Oxidation Media' },
      { label: 'Hardness Neutralization', val: 'Ion-Exchange Food-Grade Softener Resin' },
      { label: 'Frame & Structure', val: 'Heavy Duty SS 304 Skid Chassis' },
      { label: 'Water Standards', val: 'IS 10500 Compliant Drinking & Boiler Water Quality' }
    ],
    applications: ['Hotels & Resorts', 'Hospitals & Healthcare', 'Commercial Towers', 'Gated Communities', 'Schools & Colleges'],
    process: ['Raw Water Aeration', 'Pressure Sand Filter', 'Iron Oxidation Vessel', 'Activated Carbon Adsorber', 'Softener / RO Skid', 'Clean Water Storage'],
    highlights: [
      'Multi-stage filtration vessels for iron, turbidity, and salinity',
      'Corrosion-resistant SS 304 skid frame and food-grade piping',
      'Automatic or manual backwash multiport valve controls',
      'Full compliance with IS 10500 drinking water parameters'
    ]
  },
  stp: {
    id: 'stp',
    slug: 'stp',
    title: 'Sewage Treatment Plants (STP) - Biological Recycling',
    tag: 'STP PLANT',
    tagClass: 'tag-stp',
    imageSrc: '/stp_plant.png',
    badge: 'KSPCB Compliant Wastewater Recycling',
    subtitle: 'Advanced MBR / MBBR Bioreactor Sewage Purification Plants',
    description: 'Eco-friendly sewage treatment plants engineered to process domestic wastewater from toilets, bathrooms, and kitchens. Utilizing high-efficiency MBBR (Moving Bed Biofilm Reactor) and MBR (Membrane Bioreactor) technology, our STPs produce clear, odor-free recycled water suitable for flushing, gardening, and cooling towers.',
    heroDesc: 'Turnkey sewage treatment plants with MBR/MBBR bioreactor technology ensuring 100% Pollution Control Board compliance and water recycling.',
    specs: [
      { label: 'Treatment Technology', val: 'MBBR / MBR Bioreactor + Submerged Aeration' },
      { label: 'Treated Water Metrics', val: 'BOD < 10 mg/L, COD < 50 mg/L, TSS < 10 mg/L' },
      { label: 'Disinfection System', val: 'Online Chlorination & High-Intensity UV Disinfection' },
      { label: 'Sludge Management', val: 'Automatic Filter Press Dewatering Assembly' },
      { label: 'Compliance Guarantee', val: '100% KSPCB & CPCB Pollution Control Board Norms' },
      { label: 'Odor Control', val: 'Sealed Tank Design with Activated Carbon Scrubbers' }
    ],
    applications: ['Apartment Complexes', 'Shopping Malls', 'Resorts & Hotels', 'IT Parks & Campuses', 'Hospitals'],
    process: ['Bar Screening', 'Equalization Tank', 'Anoxic & Aeration Bioreactor', 'Secondary Clarifier', 'Pressure Media Filter', 'UV/Chlorine Disinfection', 'Recycled Water Reuse'],
    highlights: [
      'High-efficiency MBR / MBBR biofilm media technology',
      'Odorless, clear recycled water output for toilet flushing & landscaping',
      'Guaranteed clearance from Kerala State Pollution Control Board (KSPCB)',
      'Compact footprint with low operational power costs'
    ]
  },
  etp: {
    id: 'etp',
    slug: 'etp',
    title: 'Effluent Treatment Plants (ETP) & ZLD Systems',
    tag: 'ETP PLANT',
    tagClass: 'tag-etp',
    imageSrc: '/etp_plant.png',
    badge: 'Industrial Wastewater & Zero Liquid Discharge',
    subtitle: 'Chemical Coagulation, Neutralization & Evaporator Facilities',
    description: 'Specialized industrial effluent treatment facilities engineered to treat toxic chemical wastewater, heavy metals, oils, dyes, and organic pollutants from factories. Built-in Zero Liquid Discharge (ZLD) configurations recover over 95% of water for manufacturing reuse.',
    heroDesc: 'Heavy-duty industrial effluent treatment plants with ZLD concentrate recovery for factories, laundries, and chemical manufacturing.',
    specs: [
      { label: 'Plant Capacity', val: '5 KLD to 500+ KLD (Kilo Litres Per Day)' },
      { label: 'Treatment Process', val: 'Physico-Chemical Coagulation + Biological Oxidation' },
      { label: 'Heavy Metal Removal', val: 'Chemical Precipitation & DAF (Dissolved Air Flotation)' },
      { label: 'ZLD System', val: 'High-Pressure RO Concentrate Recovery + Thermal Evaporator' },
      { label: 'Automation Panel', val: 'PLC Automation with Auto Dosing & pH/ORP Monitors' },
      { label: 'Environmental Clearance', val: 'Guaranteed KSPCB & CPCB Discharge Approval' }
    ],
    applications: ['Commercial Laundries', 'Textile Dyeing Units', 'Food & Beverage Processing', 'Pharmaceutical Plants', 'Auto Service Stations'],
    process: ['Collection & pH Neutralization', 'Chemical Dosing & Flocculation', 'Primary Clarifier', 'Biological Oxidation', 'UF/RO Concentrate Recovery', 'ZLD Evaporator & Dry Sludge Handling'],
    highlights: [
      'Physico-chemical coagulation & Dissolved Air Flotation (DAF)',
      'Zero Liquid Discharge (ZLD) configurations with thermal evaporators',
      'Automatic PLC control panel with pH/ORP dosing sensors',
      'Meets all industrial KSPCB & CPCB environmental discharge standards'
    ]
  }
};
