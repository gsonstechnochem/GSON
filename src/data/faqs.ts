export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What is the difference between GS 100 and GS 200 tile adhesive?',
    answer: 'GS 100 is designed for interior applications and offers good bonding strength for standard tile installations. GS 200 is a heavy-duty adhesive with superior water resistance, making it suitable for exterior applications and wet areas like bathrooms and kitchens.',
    category: 'Products'
  },
  {
    id: '2',
    question: 'How do I choose the right tile adhesive for my project?',
    answer: 'Consider the location (interior/exterior), substrate type, tile size, and environmental conditions. For interior walls and floors, GS 100 is suitable. For wet areas and exteriors, use GS 200. For large format tiles (60x60cm+), GS 300 is recommended. For industrial applications, choose GS 400.',
    category: 'Products'
  },
  {
    id: '3',
    question: 'What is the coverage area of your tile adhesive?',
    answer: 'Coverage depends on the tile size, notch trowel size, and substrate condition. Generally, a 20KG bag of adhesive covers approximately 25-35 square feet for standard tiles with a 6mm notch trowel. Large format tiles and uneven substrates will require more adhesive.',
    category: 'Technical'
  },
  {
    id: '4',
    question: 'How long does it take for the adhesive to cure?',
    answer: 'Initial curing takes 24 hours. Full curing typically requires 48-72 hours depending on the product, temperature, and humidity. For wet areas and exterior applications, allow 48-72 hours before exposing to water or extreme conditions.',
    category: 'Technical'
  },
  {
    id: '5',
    question: 'Can I use epoxy grout in my bathroom?',
    answer: 'Yes, epoxy grout is excellent for bathrooms due to its superior water resistance, stain resistance, and anti-bacterial properties. It prevents mold and mildew growth and is easy to clean, making it ideal for wet areas.',
    category: 'Products'
  },
  {
    id: '6',
    question: 'What is the difference between cement grout and epoxy grout?',
    answer: 'Cement grout is cement-based, cost-effective, and suitable for general applications. Epoxy grout is resin-based, offers superior stain and chemical resistance, is waterproof, and is ideal for high-end applications where durability and appearance are critical.',
    category: 'Products'
  },
  {
    id: '7',
    question: 'Do you offer bulk pricing for large orders?',
    answer: 'Yes, we offer competitive bulk pricing for large orders. Please contact us through our Bulk Order page or call us directly at 8485998487 to discuss your requirements and get a customized quote.',
    category: 'Orders'
  },
  {
    id: '8',
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including online payments through Razorpay, bank transfers, and Cash on Delivery (COD) for eligible orders. For bulk orders, we can also discuss credit terms for established customers.',
    category: 'Orders'
  },
  {
    id: '9',
    question: 'Do you ship across India?',
    answer: 'Yes, we ship across India through our logistics partners. Shipping charges and delivery times vary based on location and order size. We use reliable courier services to ensure your products reach you safely and on time.',
    category: 'Shipping'
  },
  {
    id: '10',
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking ID and courier partner details via email and SMS. You can track your order using the provided tracking number on the courier partner\'s website or contact us for assistance.',
    category: 'Shipping'
  },
  {
    id: '11',
    question: 'What is your return policy?',
    answer: 'Due to the nature of construction chemicals, we do not accept returns once the product has been opened or used. However, if you receive damaged or incorrect products, please contact us within 48 hours of delivery for replacement or refund.',
    category: 'Orders'
  },
  {
    id: '12',
    question: 'Do you provide technical support for installation?',
    answer: 'Yes, we provide technical support and guidance for product selection and application. You can contact us via phone, WhatsApp, or email for assistance. For large projects, we can also arrange on-site technical consultation.',
    category: 'Support'
  }
]
