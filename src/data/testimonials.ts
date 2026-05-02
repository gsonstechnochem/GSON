export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Patel',
    role: 'Civil Contractor',
    company: 'Patel Construction',
    content: 'We have been using G Son\'s products for over 5 years now. The quality is consistent and the bonding strength of their tile adhesives is exceptional. Highly recommended for any construction project.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Priya Shah',
    role: 'Interior Designer',
    company: 'Design Studio',
    content: 'The epoxy grout from G Son\'s Technochem transformed our bathroom projects. The color consistency and stain resistance are outstanding. Our clients are always impressed with the results.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Amit Mehta',
    role: 'Site Engineer',
    company: 'Mega Infra Projects',
    content: 'For our large-scale commercial projects, we trust only G Son\'s Technochem. Their GS 300 adhesive handles large format tiles perfectly, and the technical support team is always helpful.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Sneha Joshi',
    role: 'Architect',
    company: 'Urban Architects',
    content: 'The waterproofing solutions from G Son\'s have saved us from many potential issues. Their products are reliable, easy to apply, and provide long-lasting protection. A trusted partner for our firm.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'Tile Contractor',
    company: 'Singh Tiles & Marble',
    content: 'I\'ve been in the tile installation business for 15 years, and G Son\'s products are among the best I\'ve used. The adhesives have excellent workability and the grouts never disappoint.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '6',
    name: 'Kavita Desai',
    role: 'Homeowner',
    company: 'Residential Project',
    content: 'We renovated our entire home using G Son\'s products. From tile adhesive to waterproofing, everything worked perfectly. The team was very helpful in guiding us through product selection.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  }
]
