export const BUSINESS = {
  name: "Royal Crown Bearings",
  tagline: "Powering Performance, Ensuring Reliability",
  founded: 2026,
  phone: "+94 766 550 249",
  email: "info@royalcrownbearings.com",
  website: "www.royalcrownbearings.com",
  hours: "24/7 Service",
  whatsapp: "+94766550249",
  mission: "Deliver high-quality, durable, and cost-effective bearing solutions that ensure smooth performance and long-term reliability.",
  vision: "Become a leading and trusted bearing supplier in Sri Lanka by combining quality products, technical expertise, and excellent customer service.",
  values: ["Quality Assurance", "Reliability", "Customer Satisfaction", "Business Integrity", "Continuous Improvement"],
};

export const BRANDS = [
  { name: "NTN",        logo: "/brands/ntn.svg"        },
  { name: "NSK",        logo: "/brands/nsk.svg"        },
  { name: "NACHI",      logo: "/brands/nachi.svg"      },
  { name: "KOYO",       logo: "/brands/koyo.svg"       },
  { name: "FAG",        logo: "/brands/fag.svg"        },
  { name: "SKF",        logo: "/brands/skf.svg"        },
  { name: "TIMKEN",     logo: "/brands/timken.svg"     },
  { name: "INA",        logo: "/brands/ina.svg"        },
  { name: "FBJ",        logo: "/brands/fbj.svg"        },
  { name: "FYH",        logo: "/brands/fyh.svg"        },
  { name: "ASAHI",      logo: "/brands/asahi.svg"      },
  { name: "IKO",        logo: "/brands/iko.svg"        },
  { name: "MITSUBOSHI", logo: "/brands/mitsuboshi.svg" },
  { name: "MEGADYNE",   logo: "/brands/megadyne.svg"   },
  { name: "FENNER",     logo: "/brands/fenner.svg"     },
  { name: "KSM",        logo: "/brands/ksm.svg"        },
  { name: "RHP",        logo: "/brands/rhp.svg"        },
  { name: "HIWIN",      logo: "/brands/hiwin.svg"      },
  { name: "OPTIBELT",   logo: "/brands/optibelt.svg"   },
];

export const CATEGORIES = [
  { slug: "deep-groove-ball",  name: "Deep Groove Ball Bearings",               family: "Ball Bearings",    short: "Versatile workhorse — radial loads, modest thrust.",              description: "Deep groove ball bearings are the most widely used bearing type, suitable for high speeds, radial loads, and limited axial loads in both directions. Sealed, shielded and open variants available across miniature to heavy-duty bores.", iconType: "groove",      image: "https://www.wychbearings.co.uk/user/products/large/bearing_2rs%20FAG.png" },
  { slug: "miniature-ball",    name: "Miniature & Extra Small Ball Bearings",   family: "Ball Bearings",    short: "Precision micro bearings for compact assemblies.",                description: "Miniature and extra small ball bearings serve dental drills, model assemblies, instruments and small motors where precision rotation is critical. Stocked in shielded, sealed and open formats.", iconType: "mini" },
  { slug: "angular-contact",   name: "Angular Contact Ball Bearings",           family: "Ball Bearings",    short: "Combined radial + axial loads in one direction.",                 description: "Angular contact ball bearings carry combined radial and axial loads in a single direction. Ideal for spindles, pumps, and high-speed machine tool applications. Single, paired and matched-set arrangements available.", iconType: "angular" },
  { slug: "self-aligning",     name: "Self-aligning Ball Bearings",             family: "Ball Bearings",    short: "Tolerates shaft misalignment, deflection.",                       description: "Self-aligning ball bearings handle shaft misalignment and shaft deflection due to their two rows of balls running on a common spherical raceway. Common in conveyors, agricultural equipment, and textile machinery.", iconType: "selfalign" },
  { slug: "cylindrical-roller",name: "Cylindrical Roller Bearings",             family: "Roller Bearings",  short: "Heavy radial loads, high speeds.",                               description: "Cylindrical roller bearings carry very heavy radial loads at high speeds. Line contact between rollers and raceways gives them rigidity and durability for gearboxes, electric motors and rolling mills.", iconType: "cylindrical" },
  { slug: "needle-roller",     name: "Needle Roller Bearings",                  family: "Roller Bearings",  short: "Compact section, very high load capacity.",                      description: "Needle roller bearings have a small radial section but very high load-carrying capacity, making them ideal where space is limited — automotive transmissions, universal joints, pumps and compressors.", iconType: "needle" },
  { slug: "tapered-roller",    name: "Tapered Roller Bearings",                 family: "Roller Bearings",  short: "Combined heavy radial + thrust loads.",                          description: "Tapered roller bearings handle simultaneous heavy radial and axial loads. Widely used in vehicle wheel hubs, axle assemblies, gearboxes, and heavy-duty industrial equipment.", iconType: "tapered" },
  { slug: "spherical-roller",  name: "Spherical Roller Bearings",               family: "Roller Bearings",  short: "Self-aligning, very heavy radial loads.",                        description: "Spherical roller bearings deliver self-aligning capability with very high load ratings, perfect for heavy industry — crushers, mining equipment, fans, vibrating screens and paper machinery.", iconType: "spherical" },
  { slug: "thrust",            name: "Thrust Bearings",                         family: "Thrust",           short: "Pure axial loads, single or double direction.",                  description: "Thrust bearings are designed for purely axial loading. Ball, cylindrical and tapered varieties cover everything from steering knuckles to crane hooks and turntables.", iconType: "thrust" },
  { slug: "v-belts-classic",   name: "V-Belts: A, B, C, D",                    family: "Belts",            short: "Classic-section industrial V-belts.",                            description: "Classical V-belts in A, B, C and D sections for general-purpose power transmission across fans, compressors, pumps and machinery drives. Stocked in a wide range of lengths.", iconType: "vbelt" },
  { slug: "v-belts-narrow",    name: "V-Belts: SPA, SPB, SPC",                 family: "Belts",            short: "Narrow-section, higher power density.",                          description: "Narrow-section wedge V-belts (SPA, SPB, SPC) deliver higher power capacity in a smaller drive footprint compared to classical sections. Ideal for compact, high-output drives.", iconType: "vbelt" },
  { slug: "v-belts-raw-edge",  name: "V-Belts: XPA, XPB, XPC",                family: "Belts",            short: "Raw-edge cogged narrow wedge belts.",                            description: "XPA, XPB and XPC raw-edge cogged wedge belts run cooler at high speeds and over small pulleys, extending service life on demanding industrial drives.", iconType: "vbelt" },
  { slug: "tooth-belts-lh",    name: "Tooth Belts: L, H",                      family: "Belts",            short: "Imperial-pitch synchronous belts.",                              description: "Classical L and H pitch synchronous (timing) belts for positive, slip-free power transmission in conveyors, packaging machinery and light industrial drives.", iconType: "tooth" },
  { slug: "tooth-belts-htd",   name: "Tooth Belts: 3M, 5M, 8M",               family: "Belts",            short: "HTD curvilinear-tooth synchronous belts.",                       description: "HTD-profile (3M, 5M, 8M) synchronous belts feature a curvilinear tooth shape for higher load capacity and smoother engagement than classical timing belts.", iconType: "tooth" },
  { slug: "tooth-belts-t",     name: "Tooth Belts: T5, T10",                   family: "Belts",            short: "Metric-pitch trapezoidal timing belts.",                         description: "T5 and T10 metric-pitch timing belts offer precise positioning for linear actuators, automation, machine-tool axes and packaging equipment.", iconType: "tooth" },
  { slug: "oil-seals",         name: "Oil Seals",                              family: "Seals",            short: "Rotary shaft seals — keep lubricant in, contaminants out.",       description: "Oil seals (rotary shaft seals) prevent lubricant leakage and exclude dirt, dust and water from rotating shaft assemblies. Single lip, double lip and metric/imperial sizes stocked.", iconType: "seal" },
  { slug: "housings",          name: "Housings: UCP, UCF, UCFC, UCT",          family: "Housings",         short: "Pillow blocks, flange and take-up units.",                       description: "Cast-iron bearing housings — UCP pillow blocks, UCF four-bolt flanges, UCFC piloted flanges and UCT take-up units — for ready-to-mount shaft support solutions.", iconType: "housing" },
  { slug: "uc-bearings",       name: "UC Bearings",                            family: "Mounted Units",    short: "Insert bearings for housing units.",                             description: "UC insert bearings (with set-screw or eccentric collar locking) drop into UCP, UCF, UCFC and UCT housings to form a complete mounted unit.", iconType: "uc" },
];

function generateProducts() {
  const list = [];
  let id = 1000;
  const cyc = (arr, i) => arr[i % arr.length];

  CATEGORIES.forEach((cat) => {
    let entries = [];
    if (cat.slug === "deep-groove-ball") {
      entries = [
        { code:"6201-2RS", bore:12, od:32,  w:10,    image:"https://www.wychbearings.co.uk/user/products/large/bearing_2rs%20FAG.png", forceBrand:"FAG" },
        { code:"6202-2RS", bore:15, od:35,  w:11 },
        { code:"6204-ZZ",  bore:20, od:47,  w:14 },
        { code:"6205-2RS", bore:25, od:52,  w:15 },
        { code:"6206-ZZ",  bore:30, od:62,  w:16 },
        { code:"6208-2RS", bore:40, od:80,  w:18 },
        { code:"6305-2RS", bore:25, od:62,  w:17 },
        { code:"6308-ZZ",  bore:40, od:90,  w:23 },
      ];
    } else if (cat.slug === "miniature-ball") {
      entries = [
        { code:"623-ZZ",   bore:3,  od:10, w:4 },
        { code:"624-2RS",  bore:4,  od:13, w:5 },
        { code:"625-ZZ",   bore:5,  od:16, w:5 },
        { code:"686-2RS",  bore:6,  od:13, w:5 },
        { code:"688-ZZ",   bore:8,  od:16, w:5 },
        { code:"6900-2RS", bore:10, od:22, w:6 },
      ];
    } else if (cat.slug === "angular-contact") {
      entries = [
        { code:"7204-B",   bore:20, od:47, w:14 },
        { code:"7205-B",   bore:25, od:52, w:15 },
        { code:"7206-B",   bore:30, od:62, w:16 },
        { code:"7208-B",   bore:40, od:80, w:18 },
        { code:"7305-B",   bore:25, od:62, w:17 },
        { code:"7308-B",   bore:40, od:90, w:23 },
        { code:"3208-2RS", bore:40, od:80, w:30 },
      ];
    } else if (cat.slug === "self-aligning") {
      entries = [
        { code:"1205-K", bore:25, od:52, w:15 },
        { code:"1206-K", bore:30, od:62, w:16 },
        { code:"1208-K", bore:40, od:80, w:18 },
        { code:"2206-K", bore:30, od:62, w:20 },
        { code:"2208-K", bore:40, od:80, w:23 },
        { code:"2210-K", bore:50, od:90, w:23 },
      ];
    } else if (cat.slug === "cylindrical-roller") {
      entries = [
        { code:"NU205", bore:25, od:52, w:15 },
        { code:"NU206", bore:30, od:62, w:16 },
        { code:"NU208", bore:40, od:80, w:18 },
        { code:"NU305", bore:25, od:62, w:17 },
        { code:"NU308", bore:40, od:90, w:23 },
        { code:"NJ206", bore:30, od:62, w:16 },
        { code:"NJ208", bore:40, od:80, w:18 },
      ];
    } else if (cat.slug === "needle-roller") {
      entries = [
        { code:"HK0608",  bore:6,  od:10, w:8  },
        { code:"HK1010",  bore:10, od:14, w:10 },
        { code:"HK1512",  bore:15, od:21, w:12 },
        { code:"HK2016",  bore:20, od:26, w:16 },
        { code:"NK20/16", bore:20, od:28, w:16 },
        { code:"NK25/20", bore:25, od:33, w:20 },
      ];
    } else if (cat.slug === "tapered-roller") {
      entries = [
        { code:"30205", bore:25, od:52, w:16.25 },
        { code:"30206", bore:30, od:62, w:17.25 },
        { code:"30208", bore:40, od:80, w:19.75 },
        { code:"30305", bore:25, od:62, w:18.25 },
        { code:"30308", bore:40, od:90, w:25.25 },
        { code:"32208", bore:40, od:80, w:24.75 },
        { code:"32210", bore:50, od:90, w:24.75 },
      ];
    } else if (cat.slug === "spherical-roller") {
      entries = [
        { code:"22205", bore:25, od:52,  w:18 },
        { code:"22206", bore:30, od:62,  w:20 },
        { code:"22208", bore:40, od:80,  w:23 },
        { code:"22210", bore:50, od:90,  w:23 },
        { code:"22308", bore:40, od:90,  w:33 },
        { code:"22310", bore:50, od:110, w:40 },
      ];
    } else if (cat.slug === "thrust") {
      entries = [
        { code:"51104", bore:20, od:35, w:10 },
        { code:"51105", bore:25, od:42, w:11 },
        { code:"51106", bore:30, od:47, w:11 },
        { code:"51108", bore:40, od:60, w:13 },
        { code:"51208", bore:40, od:68, w:19 },
        { code:"51210", bore:50, od:78, w:22 },
      ];
    } else if (cat.slug === "v-belts-classic") {
      entries = [
        { code:"A-32",  section:"A", length:813  },
        { code:"A-44",  section:"A", length:1118 },
        { code:"B-50",  section:"B", length:1270 },
        { code:"B-66",  section:"B", length:1676 },
        { code:"C-75",  section:"C", length:1905 },
        { code:"C-90",  section:"C", length:2286 },
        { code:"D-120", section:"D", length:3048 },
      ];
    } else if (cat.slug === "v-belts-narrow") {
      entries = [
        { code:"SPA-1107", section:"SPA", length:1107 },
        { code:"SPA-1320", section:"SPA", length:1320 },
        { code:"SPB-1500", section:"SPB", length:1500 },
        { code:"SPB-1900", section:"SPB", length:1900 },
        { code:"SPC-2240", section:"SPC", length:2240 },
        { code:"SPC-3000", section:"SPC", length:3000 },
      ];
    } else if (cat.slug === "v-belts-raw-edge") {
      entries = [
        { code:"XPA-1107", section:"XPA", length:1107 },
        { code:"XPA-1320", section:"XPA", length:1320 },
        { code:"XPB-1500", section:"XPB", length:1500 },
        { code:"XPB-1900", section:"XPB", length:1900 },
        { code:"XPC-2240", section:"XPC", length:2240 },
        { code:"XPC-3000", section:"XPC", length:3000 },
      ];
    } else if (cat.slug === "tooth-belts-lh") {
      entries = [
        { code:"L-150", pitch:"L", length:381  },
        { code:"L-225", pitch:"L", length:572  },
        { code:"H-300", pitch:"H", length:762  },
        { code:"H-450", pitch:"H", length:1143 },
      ];
    } else if (cat.slug === "tooth-belts-htd") {
      entries = [
        { code:"3M-225",  pitch:"3M", length:225  },
        { code:"3M-339",  pitch:"3M", length:339  },
        { code:"5M-450",  pitch:"5M", length:450  },
        { code:"5M-710",  pitch:"5M", length:710  },
        { code:"8M-1200", pitch:"8M", length:1200 },
        { code:"8M-1600", pitch:"8M", length:1600 },
      ];
    } else if (cat.slug === "tooth-belts-t") {
      entries = [
        { code:"T5-260",   pitch:"T5",  length:260  },
        { code:"T5-455",   pitch:"T5",  length:455  },
        { code:"T10-630",  pitch:"T10", length:630  },
        { code:"T10-1010", pitch:"T10", length:1010 },
        { code:"T10-1450", pitch:"T10", length:1450 },
      ];
    } else if (cat.slug === "oil-seals") {
      entries = [
        { code:"OS-25x40x7",  bore:25, od:40, w:7  },
        { code:"OS-30x47x7",  bore:30, od:47, w:7  },
        { code:"OS-35x52x7",  bore:35, od:52, w:7  },
        { code:"OS-40x62x8",  bore:40, od:62, w:8  },
        { code:"OS-50x72x8",  bore:50, od:72, w:8  },
        { code:"OS-60x85x10", bore:60, od:85, w:10 },
      ];
    } else if (cat.slug === "housings") {
      entries = [
        { code:"UCP205",  series:"UCP",  bore:25 },
        { code:"UCP206",  series:"UCP",  bore:30 },
        { code:"UCP208",  series:"UCP",  bore:40 },
        { code:"UCF205",  series:"UCF",  bore:25 },
        { code:"UCF208",  series:"UCF",  bore:40 },
        { code:"UCFC206", series:"UCFC", bore:30 },
        { code:"UCT208",  series:"UCT",  bore:40 },
      ];
    } else if (cat.slug === "uc-bearings") {
      entries = [
        { code:"UC204", bore:20, od:47, w:31 },
        { code:"UC205", bore:25, od:52, w:34 },
        { code:"UC206", bore:30, od:62, w:38 },
        { code:"UC208", bore:40, od:80, w:49 },
        { code:"UC210", bore:50, od:90, w:51 },
      ];
    }

    entries.forEach((e, i) => {
      const brand = e.forceBrand
        ? (BRANDS.find(b => b.name === e.forceBrand) || cyc(BRANDS, id + i))
        : cyc(BRANDS, id + i);

      let diameter = "";
      if (e.bore !== undefined && e.od !== undefined) {
        diameter = `Ø${e.bore} × Ø${e.od} × ${e.w} mm`;
      } else if (e.length !== undefined && e.section) {
        diameter = `${e.section} section · ${e.length} mm pitch length`;
      } else if (e.length !== undefined && e.pitch) {
        diameter = `${e.pitch} pitch · ${e.length} mm length`;
      } else if (e.series && e.bore) {
        diameter = `${e.series} · Ø${e.bore} mm bore`;
      }

      list.push({
        id: id++,
        code: e.code,
        name: `${brand.name} ${e.code}`,
        category: cat.slug,
        brand: brand.name,
        bore: e.bore,
        od: e.od,
        width: e.w,
        section: e.section,
        pitch: e.pitch,
        length: e.length,
        series: e.series,
        diameter,
        family: cat.family,
        iconType: cat.iconType,
        image: e.image || null,
        availability: (id % 5 === 0) ? "Pre-order" : "In Stock",
      });
    });
  });

  return list;
}

export const PRODUCTS = generateProducts();
