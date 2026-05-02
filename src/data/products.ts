export interface Product {
  id: string
  slug: string
  name: string
  category: string
  shortDescription: string
  description: string
  price: number
  packSize: string
  image: string
  advantages: string[]
  recommendedFor: string[]
  applicationGuidelines: string[]
  stock: number
  featured: boolean
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'gs-100-tile-adhesive',
    name: 'GS 100 Tile Adhesive',
    category: 'Tile Adhesive',
    shortDescription: 'Premium polymer-modified tile adhesive for interior applications',
    description: 'GS 100 is a high-quality polymer-modified tile adhesive designed for interior wall and floor tile installations. It provides excellent bonding strength and is suitable for ceramic tiles, vitrified tiles, and stone tiles.',
    price: 350,
    packSize: '20 KG',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    advantages: [
      'High bonding strength',
      'Easy to mix and apply',
      'Water-resistant',
      'Long working time',
      'Suitable for interior use'
    ],
    recommendedFor: [
      'Interior wall tiles',
      'Interior floor tiles',
      'Ceramic tiles',
      'Vitrified tiles',
      'Stone tiles'
    ],
    applicationGuidelines: [
      'Mix with clean water in ratio 1:4 (adhesive:water)',
      'Stir for 3-5 minutes until lump-free',
      'Apply 3-5mm thickness with notched trowel',
      'Place tiles within 15 minutes of application',
      'Allow 24 hours for initial curing'
    ],
    stock: 100,
    featured: true
  },
  {
    id: '2',
    slug: 'gs-200-tile-adhesive',
    name: 'GS 200 Tile Adhesive',
    category: 'Tile Adhesive',
    shortDescription: 'Heavy-duty tile adhesive for exterior and wet areas',
    description: 'GS 200 is a premium grade tile adhesive formulated for exterior applications and wet areas like bathrooms and kitchens. It offers superior water resistance and bonding strength for demanding conditions.',
    price: 450,
    packSize: '20 KG',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    advantages: [
      'Superior water resistance',
      'High bonding strength',
      'Frost resistant',
      'Suitable for exterior use',
      'Anti-fungal properties'
    ],
    recommendedFor: [
      'Exterior wall tiles',
      'Bathroom tiles',
      'Kitchen backsplashes',
      'Swimming pools',
      'Wet areas'
    ],
    applicationGuidelines: [
      'Mix with clean water in ratio 1:3.5 (adhesive:water)',
      'Stir for 5 minutes until smooth paste',
      'Apply 4-6mm thickness with notched trowel',
      'Place tiles within 10 minutes of application',
      'Allow 48 hours for full curing in wet areas'
    ],
    stock: 80,
    featured: true
  },
  {
    id: '3',
    slug: 'gs-300-tile-adhesive',
    name: 'GS 300 Tile Adhesive',
    category: 'Tile Adhesive',
    shortDescription: 'Professional grade adhesive for large format tiles',
    description: 'GS 300 is a professional-grade tile adhesive specifically designed for large format tiles and heavy stone installations. It provides exceptional bonding strength and non-slip properties for challenging installations.',
    price: 550,
    packSize: '20 KG',
    image: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=600&fit=crop',
    advantages: [
      'Non-slip formula',
      'Extra high bonding strength',
      'Suitable for large format tiles',
      'Extended open time',
      'Reduced tile lippage'
    ],
    recommendedFor: [
      'Large format tiles (60x60cm and above)',
      'Heavy stone tiles',
      'Marble and granite',
      'Commercial installations',
      'High-traffic areas'
    ],
    applicationGuidelines: [
      'Mix with clean water in ratio 1:3 (adhesive:water)',
      'Stir for 5-7 minutes until lump-free',
      'Apply 6-8mm thickness with notched trowel',
      'Use back-buttering for large tiles',
      'Allow 48-72 hours for full curing'
    ],
    stock: 60,
    featured: true
  },
  {
    id: '4',
    slug: 'gs-400-tile-adhesive',
    name: 'GS 400 Tile Adhesive',
    category: 'Tile Adhesive',
    shortDescription: 'Ultra-premium adhesive for specialized applications',
    description: 'GS 400 is our ultra-premium tile adhesive designed for the most demanding applications including industrial floors, chemical environments, and extreme conditions. It offers unmatched durability and performance.',
    price: 650,
    packSize: '20 KG',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop',
    advantages: [
      'Chemical resistant',
      'Extreme durability',
      'Temperature resistant',
      'Industrial grade',
      'Zero shrinkage'
    ],
    recommendedFor: [
      'Industrial floors',
      'Chemical plants',
      'High-temperature areas',
      'Heavy machinery bases',
      'Specialized installations'
    ],
    applicationGuidelines: [
      'Mix with clean water in ratio 1:2.5 (adhesive:water)',
      'Stir for 7-10 minutes until smooth',
      'Apply 8-10mm thickness with notched trowel',
      'Use mechanical mixing for best results',
      'Allow 72 hours for full curing'
    ],
    stock: 40,
    featured: false
  },
  {
    id: '5',
    slug: '3-part-epoxy-grout',
    name: '3 Part Epoxy Grout',
    category: 'Epoxy Grout',
    shortDescription: 'Premium epoxy grout for stain and chemical resistance',
    description: 'Our 3 Part Epoxy Grout is a premium grouting solution that provides exceptional stain resistance, chemical resistance, and durability. Perfect for high-end residential and commercial applications where appearance and performance matter.',
    price: 1200,
    packSize: '1 KG / 5 KG',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    advantages: [
      'Stain resistant',
      'Chemical resistant',
      'Waterproof',
      'Color consistent',
      'Anti-bacterial'
    ],
    recommendedFor: [
      'Kitchen countertops',
      'Bathroom walls and floors',
      'Commercial kitchens',
      'Hospitals',
      'Swimming pools'
    ],
    applicationGuidelines: [
      'Mix Part A, B, and C in specified ratio',
      'Stir thoroughly for 3-5 minutes',
      'Apply with rubber float',
      'Clean excess within 20 minutes',
      'Allow 24 hours for full cure'
    ],
    stock: 50,
    featured: true
  },
  {
    id: '6',
    slug: 'cement-grout',
    name: 'Cement Grout',
    category: 'Cement Grout',
    shortDescription: 'High-quality cement-based grout for general applications',
    description: 'Our Cement Grout is a premium cement-based grout suitable for general tile grouting applications. It provides excellent workability, color consistency, and durability for residential and light commercial use.',
    price: 180,
    packSize: '5 KG',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    advantages: [
      'Easy to apply',
      'Color consistent',
      'Good workability',
      'Cost effective',
      'Durable finish'
    ],
    recommendedFor: [
      'Residential floors',
      'Wall tiles',
      'Light commercial use',
      'Interior applications',
      'Standard tile joints'
    ],
    applicationGuidelines: [
      'Mix with clean water to paste consistency',
      'Stir for 3-5 minutes',
      'Apply with rubber float at 45° angle',
      'Clean excess within 15 minutes',
      'Allow 24 hours for curing'
    ],
    stock: 150,
    featured: false
  },
  {
    id: '7',
    slug: 'waterproofing-membrane',
    name: 'Waterproofing Membrane',
    category: 'Waterproofing',
    shortDescription: 'Advanced waterproofing solution for roofs and wet areas',
    description: 'Our Waterproofing Membrane is an advanced liquid-applied waterproofing solution that provides superior protection against water ingress. Ideal for roofs, terraces, bathrooms, and other wet areas.',
    price: 850,
    packSize: '20 L',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    advantages: [
      'Excellent waterproofing',
      'Flexible and crack-resistant',
      'UV resistant',
      'Easy application',
      'Long-lasting protection'
    ],
    recommendedFor: [
      'Roof terraces',
      'Bathrooms',
      'Balconies',
      'Water tanks',
      'Foundations'
    ],
    applicationGuidelines: [
      'Clean and prime surface',
      'Apply first coat with brush/roller',
      'Allow 4-6 hours drying time',
      'Apply second coat perpendicular to first',
      'Allow 24 hours before tiling'
    ],
    stock: 70,
    featured: true
  },
  {
    id: '8',
    slug: 'waterproofing-additive',
    name: 'Waterproofing Additive',
    category: 'Waterproofing',
    shortDescription: 'Chemical admixture for waterproof concrete and mortar',
    description: 'Our Waterproofing Additive is a chemical admixture that makes concrete and mortar waterproof from within. It reduces permeability and increases durability of concrete structures.',
    price: 450,
    packSize: '5 L',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    advantages: [
      'Internal waterproofing',
      'Reduces permeability',
      'Increases durability',
      'Easy to use',
      'Cost effective'
    ],
    recommendedFor: [
      'Foundations',
      'Water tanks',
      'Basements',
      'Sumps',
      'Concrete structures'
    ],
    applicationGuidelines: [
      'Add to mixing water at 1% by weight of cement',
      'Mix thoroughly with concrete/mortar',
      'Ensure proper curing for 7 days',
      'Compatible with all cement types',
      'No special equipment needed'
    ],
    stock: 90,
    featured: false
  }
]
