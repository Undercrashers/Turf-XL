export const MOCK_TURFS = {
  1: {
    id: 1,
    name: 'Salt Lake Arena',
    tagline: 'Premium',
    location: 'Sector V, Kolkata',
    address: 'Sector V, Salt Lake, Kolkata',
    price: 1200,
    sportPricing: { football: 1200, cricket: 1400 },
    format: '5v5 Format',
    size: '30m x 20m',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAMNUMOvFYITmVisHHSN8X6PODyo8Zgi0lO61EKDvF8ZxZLcsIy7xzIxm4_qfzLfPKNWMBri2iLAD2wPiUPTrOSK9xu4on9PbgipXqh0Wk5bon6PjIMQKgy0agyOZgD0KlGs_QXHV62ECV0AL_-eP4j7VRARGXHLfyqDZJ2W26QKBI2kNZE9rB2DFiIE5_x8sn0_PhlMHJ8s5z1jQxKsLzcBgkrYlgYbPGG9oYdML0HGRwI0bTLiOrcOtt1eVR3DBI_vmv1kRL8BB7q',
    about: [
      'Salt Lake Arena is the go-to evening destination for 5v5 football in Sector V. The FIFA-certified 4G turf delivers a consistent roll and fast pace, perfect for quick transitions and tight-space play.',
      'Floodlit, fully netted and climate-shielded, the arena stays match-ready through monsoons and heatwaves alike.',
    ],
    amenities: [
      { icon: 'directions_car', label: 'Free Parking' },
      { icon: 'wb_incandescent', label: 'LED Floodlights' },
      { icon: 'wc', label: 'Washrooms' },
      { icon: 'local_drink', label: 'Water Station' },
    ],
  },
  2: {
    id: 2,
    name: 'Elite Sports Hub',
    tagline: 'Flagship',
    location: 'New Town, Kolkata',
    address: 'Action Area II, New Town, Kolkata',
    price: 1500,
    sportPricing: { football: 1500, cricket: 1800 },
    format: '7v7 Format',
    size: '50m x 30m',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVXR-3XpIMZHKJUcaosiFf3GhsEoJRrsBr5x2SU0dqlsCZ9GohtYV9aYOEBRXWASmCn7bHby-oWJsB-1QOraiDLs5vzBVZhL3rs-g8RE-d-fZdPN0VwOto0HZeUqX83lZmljfRi43S6uofEMzSdkbGMGbdRZevULxd-F3rZOklTkqBFNc6t85x6gxVBc2MIFy-AGOp34XmWypbV8ypw-kYbsEOz9UBAKNm34NtRrlcREsYw7yh7Tqd9eiCCOs4HneLufdhd7j-xQvA',
    about: [
      'Elite Sports Hub is a dual-sport flagship venue in New Town, sized for 7v7 football and box cricket with dedicated stumps and crease markings. The high-pile turf is cushioned for sliding and long-format play.',
      'Dressing rooms, air-cooled rest areas and an on-site cafeteria make it the pick for tournaments and corporate bookings.',
    ],
    amenities: [
      { icon: 'sports', label: 'Dressing Rooms' },
      { icon: 'ac_unit', label: 'AC Rest Area' },
      { icon: 'local_cafe', label: 'Cafeteria' },
      { icon: 'videocam', label: 'Match Recording' },
    ],
  },
  3: {
    id: 3,
    name: 'Park Circus Pitch',
    tagline: 'Classic',
    location: 'Park Circus, Kolkata',
    address: '7 Point Crossing, Park Circus, Kolkata',
    price: 1000,
    sportPricing: { football: 1000, cricket: 1100 },
    format: 'Box Format',
    size: '28m x 18m',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDHKlcuZwVXzONiXuEI2lVkP69aw30Orz3KGxmU_KLSDcqz91LiblkyrfTAFATLWObXCenj1Tz-2ienlWCzW-MdcMgG-x1eiiBNozYEdTiuaJjt2BO9tQkEn9qPO1jPd72JR6-tCenfcXBiGhjsHanySobDbtnELR37QUSDtblYxbEVnTaX56PO6PY62EHcCrK27QfZkdVKDoUAOSsJ0D1Wari2oTSHThTIPcerqS8mkC6EtlyS17nDiBhx_RlQTCB0AMWqWZKeB0gY',
    about: [
      'A compact, community-favourite box arena tucked behind 7 Point. The tight dimensions and rebound walls make for frantic, high-touch games — ideal for quick weeknight fixtures.',
      'Budget-friendly pricing without compromising on surface quality: same 4G turf, re-infilled quarterly.',
    ],
    amenities: [
      { icon: 'two_wheeler', label: 'Bike Parking' },
      { icon: 'wb_incandescent', label: 'LED Floodlights' },
      { icon: 'shower', label: 'Showers' },
      { icon: 'local_drink', label: 'Water Station' },
    ],
  },
};

export const getTurfById = (id) => MOCK_TURFS[Number(id)];
