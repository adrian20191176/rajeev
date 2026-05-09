export type Category = {
	slug: string;
	name: string;
	shortName: string;
	summary: string;
	description: string;
	imageLabel: string;
	status: string;
	tags: string[];
};

export type Product = {
	slug: string;
	sku: string;
	name: string;
	categorySlug: string;
	series: string;
	variant: string;
	description: string;
	imageLabel: string;
	tags: string[];
	searchText: string;
};

export const contact = {
	phone: "+94 766 559 249",
	phoneHref: "tel:+94766559249",
	whatsapp: "https://wa.me/94766559249",
	email: "info@royalcrownbearings.com",
	emailHref: "mailto:info@royalcrownbearings.com",
	website: "www.royalcrownbearings.com",
	hours: "24/7 service",
};

export const categories: Category[] = [
	{
		slug: "deep-groove-ball-bearings",
		name: "Deep Groove Ball Bearings",
		shortName: "Deep Groove",
		summary: "Active product catalog with ZZ, 2RS, NR and C3 variants.",
		description:
			"Versatile radial ball bearings for motors, pumps, machinery, and general rotating assemblies.",
		imageLabel: "DGB",
		status: "Products available",
		tags: ["bearings", "ball bearings", "6000", "6200", "6300", "zz", "2rs", "nr", "c3"],
	},
	{
		slug: "miniature-extra-small-ball-bearings",
		name: "Miniature and Extra Small Ball Bearings",
		shortName: "Miniature",
		summary: "Compact bearing options for precise small assemblies.",
		description: "Small-format ball bearings for compact equipment, tools, instruments, and light mechanisms.",
		imageLabel: "MB",
		status: "Contact for stock",
		tags: ["bearings", "miniature", "small", "precision"],
	},
	{
		slug: "angular-contact-ball-bearings",
		name: "Angular Contact Ball Bearings",
		shortName: "Angular Contact",
		summary: "Bearing designs for combined radial and axial loads.",
		description: "Angular contact bearings for spindles, pumps, gearboxes, and high-speed assemblies.",
		imageLabel: "AC",
		status: "Contact for stock",
		tags: ["bearings", "angular contact", "axial", "radial"],
	},
	{
		slug: "self-aligning-ball-bearings",
		name: "Self-aligning Ball Bearings",
		shortName: "Self-aligning",
		summary: "Stable operation where shaft misalignment is expected.",
		description: "Self-aligning designs for applications that need tolerance for mounting or shaft deflection.",
		imageLabel: "SA",
		status: "Contact for stock",
		tags: ["bearings", "self aligning", "misalignment"],
	},
	{
		slug: "cylindrical-roller-bearings",
		name: "Cylindrical Roller Bearings",
		shortName: "Cylindrical Roller",
		summary: "High radial load capacity for industrial machinery.",
		description: "Roller bearings suited to heavy radial loads in motors, compressors, and machine tools.",
		imageLabel: "CR",
		status: "Contact for stock",
		tags: ["bearings", "roller", "cylindrical", "radial"],
	},
	{
		slug: "needle-roller-bearings",
		name: "Needle Roller Bearings",
		shortName: "Needle Roller",
		summary: "Slim roller designs for compact mechanisms.",
		description: "Needle roller bearings for limited-space applications that still need strong load support.",
		imageLabel: "NR",
		status: "Contact for stock",
		tags: ["bearings", "needle", "roller", "compact"],
	},
	{
		slug: "tapered-roller-bearings",
		name: "Tapered Roller Bearings",
		shortName: "Tapered Roller",
		summary: "Reliable support for heavy automotive and industrial loads.",
		description: "Tapered roller bearings for wheel hubs, gearboxes, and combined radial-axial load points.",
		imageLabel: "TR",
		status: "Contact for stock",
		tags: ["bearings", "tapered", "roller", "automotive"],
	},
	{
		slug: "spherical-roller-bearings",
		name: "Spherical Roller Bearings",
		shortName: "Spherical Roller",
		summary: "Durable performance for demanding shaft applications.",
		description: "Heavy-duty roller bearings for industrial equipment with demanding loads and alignment needs.",
		imageLabel: "SR",
		status: "Contact for stock",
		tags: ["bearings", "spherical", "roller", "heavy duty"],
	},
	{
		slug: "thrust-bearings",
		name: "Thrust Bearings",
		shortName: "Thrust",
		summary: "Axial load support for rotating equipment.",
		description: "Thrust bearing options for assemblies where axial force control is the primary requirement.",
		imageLabel: "TH",
		status: "Contact for stock",
		tags: ["bearings", "thrust", "axial"],
	},
	{
		slug: "v-belts-a-b-c-d",
		name: "V-Belts Type A, B, C, D",
		shortName: "V-Belts A-D",
		summary: "Classical V-belt profiles for power transmission.",
		description: "Classical belt profiles for pulleys, drives, and general industrial transmission systems.",
		imageLabel: "VB",
		status: "Contact for stock",
		tags: ["belts", "v belts", "a", "b", "c", "d"],
	},
	{
		slug: "v-belts-spa-spb-spc",
		name: "V-Belts Type SPA, SPB, SPC",
		shortName: "V-Belts SP",
		summary: "Narrow wedge V-belts for efficient drive systems.",
		description: "Narrow profile belts for compact, high-efficiency power transmission applications.",
		imageLabel: "SP",
		status: "Contact for stock",
		tags: ["belts", "v belts", "spa", "spb", "spc"],
	},
	{
		slug: "tooth-belts-l-h",
		name: "Tooth Belts Type L, H",
		shortName: "Tooth Belts L-H",
		summary: "Timing belt profiles for synchronized motion.",
		description: "Tooth belt profiles for machinery that needs controlled, synchronized drive movement.",
		imageLabel: "LH",
		status: "Contact for stock",
		tags: ["belts", "tooth belts", "timing", "l", "h"],
	},
	{
		slug: "v-belts-zpa-zpb-zpc",
		name: "V-Belts Type ZPA, ZPB, ZPC",
		shortName: "V-Belts ZP",
		summary: "High-performance V-belt profiles for industrial drives.",
		description: "Industrial belt profiles for demanding transmission setups and equipment maintenance.",
		imageLabel: "ZP",
		status: "Contact for stock",
		tags: ["belts", "v belts", "zpa", "zpb", "zpc"],
	},
	{
		slug: "tooth-belts-3m-5m-8m",
		name: "Tooth Belts Type 3M, 5M, 8M",
		shortName: "Tooth Belts M",
		summary: "Metric tooth belt profiles for accurate drive timing.",
		description: "Metric timing belts for compact machines, drives, and controlled motion equipment.",
		imageLabel: "5M",
		status: "Contact for stock",
		tags: ["belts", "tooth belts", "timing", "3m", "5m", "8m"],
	},
	{
		slug: "tooth-belts-t5-t10",
		name: "Tooth Belts Type T5, T10",
		shortName: "Tooth Belts T",
		summary: "T-profile timing belts for repeatable positioning.",
		description: "T-profile tooth belts for equipment requiring predictable timing and movement.",
		imageLabel: "T5",
		status: "Contact for stock",
		tags: ["belts", "tooth belts", "timing", "t5", "t10"],
	},
	{
		slug: "oil-seals",
		name: "Oil Seals",
		shortName: "Oil Seals",
		summary: "Sealing products for rotating and moving assemblies.",
		description: "Oil seals for shafts, housings, and machines where lubricant retention matters.",
		imageLabel: "OS",
		status: "Contact for stock",
		tags: ["oil seals", "seals", "shaft", "lubrication"],
	},
	{
		slug: "housings",
		name: "Housings Type UCP, UCF, UCFC, UCT",
		shortName: "Housings",
		summary: "Mounted bearing housings for industrial installations.",
		description: "UCP, UCF, UCFC, and UCT housing types for mounted bearing assemblies.",
		imageLabel: "UC",
		status: "Contact for stock",
		tags: ["housings", "ucp", "ucf", "ucfc", "uct", "mounted"],
	},
	{
		slug: "uc-bearings",
		name: "UC Bearings",
		shortName: "UC Bearings",
		summary: "Insert bearings for mounted bearing units.",
		description: "UC insert bearings for mounted units, housings, and equipment support points.",
		imageLabel: "UC",
		status: "Contact for stock",
		tags: ["uc bearings", "insert bearings", "mounted"],
	},
];

export const brands = [
	"NTN",
	"NSK",
	"NACHI",
	"FAG",
	"SKF",
	"FBJ",
	"MITSUBOSHI",
	"FENNER",
	"TIMKEN",
	"KOYO",
	"FYH",
	"ASAHI",
];

export const values = [
	"Quality assurance",
	"Reliable supply",
	"Customer satisfaction",
	"Integrity in business",
	"Continuous improvement",
];

export const advantages = [
	"Competitive pricing",
	"Reliable product quality",
	"Fast availability and delivery",
	"Technical product knowledge",
	"Customer-focused service",
];

const variants = ["ZZ", "2RS", "NR", "ZZ/C3", "2RS/C3"];
const productSeries = [
	{ label: "6000 series", start: 6000, end: 6025, note: "Light 60 series" },
	{ label: "6200 series", start: 6200, end: 6225, note: "Medium 62 series" },
	{ label: "6300 series", start: 6300, end: 6319, note: "Heavy 63 series" },
];

const makeRange = (start: number, end: number) =>
	Array.from({ length: end - start + 1 }, (_, index) => String(start + index));

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

export const deepGrooveProducts: Product[] = productSeries.flatMap((series) =>
	makeRange(series.start, series.end).flatMap((size) =>
		variants.map((variant) => {
			const sku = `${size}-${variant}`;
			const name = `${sku} Deep Groove Ball Bearing`;

			return {
				slug: slugify(sku),
				sku,
				name,
				categorySlug: "deep-groove-ball-bearings",
				series: series.label,
				variant,
				description: `${series.note} deep groove ball bearing with ${variant} configuration.`,
				imageLabel: size.slice(0, 2),
				tags: [size, variant, series.label, "deep groove", "ball bearing"],
				searchText: `${sku} ${name} ${size} ${variant} ${series.label} ${series.note}`.toLowerCase(),
			};
		}),
	),
);

export const productsByCategory: Record<string, Product[]> = {
	"deep-groove-ball-bearings": deepGrooveProducts,
};

export const searchableItems = [
	...categories.map((category) => ({
		type: "Category",
		title: category.name,
		description: category.summary,
		url: `/categories/${category.slug}/`,
		searchText: `${category.name} ${category.summary} ${category.description} ${category.tags.join(" ")}`.toLowerCase(),
	})),
	...deepGrooveProducts.map((product) => ({
		type: "Product",
		title: product.sku,
		description: product.name,
		url: `/categories/${product.categorySlug}/?q=${encodeURIComponent(product.sku)}`,
		searchText: product.searchText,
	})),
];

export const getCategoryProducts = (slug: string) => productsByCategory[slug] ?? [];
