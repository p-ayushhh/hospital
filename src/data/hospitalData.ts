export interface Doctor {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  qualification: string;
  experience: string;
  department: string;
  availableDays: string[];
  timings: string;
  consultationFee: number;
  available: boolean;
  rating: number;
}

export const doctors: Doctor[] = [
  {
    id: 'D001',
    name: 'Dr. Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&auto=format',
    specialization: 'Cardiologist',
    qualification: 'MBBS, MD (Cardiology), DM – AIIMS New Delhi',
    experience: '15 years',
    department: 'Cardiology',
    availableDays: ['Mon', 'Wed', 'Fri'],
    timings: '9:00 AM – 1:00 PM',
    consultationFee: 800,
    available: true,
    rating: 4.9,
  },
  {
    id: 'D002',
    name: 'Dr. Rajesh Kumar',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&auto=format',
    specialization: 'Neurologist',
    qualification: 'MBBS, MD (Neurology), DM – PGI Chandigarh',
    experience: '12 years',
    department: 'Neurology',
    availableDays: ['Tue', 'Thu', 'Sat'],
    timings: '10:00 AM – 2:00 PM',
    consultationFee: 900,
    available: true,
    rating: 4.8,
  },
  {
    id: 'D003',
    name: 'Dr. Anita Patel',
    photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&auto=format',
    specialization: 'Pediatrician',
    qualification: 'MBBS, MD (Pediatrics) – JIPMER Puducherry',
    experience: '10 years',
    department: 'Pediatrics',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu'],
    timings: '8:00 AM – 12:00 PM',
    consultationFee: 600,
    available: true,
    rating: 4.9,
  },
  {
    id: 'D004',
    name: 'Dr. Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&auto=format',
    specialization: 'Orthopedic Surgeon',
    qualification: 'MBBS, MS (Orthopaedics) – KEM Hospital Mumbai',
    experience: '18 years',
    department: 'Orthopedics',
    availableDays: ['Mon', 'Wed', 'Fri'],
    timings: '11:00 AM – 3:00 PM',
    consultationFee: 1000,
    available: false,
    rating: 4.7,
  },
  {
    id: 'D005',
    name: 'Dr. Meera Nair',
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&auto=format',
    specialization: 'Dermatologist',
    qualification: 'MBBS, MD (Dermatology) – Maulana Azad Medical College',
    experience: '8 years',
    department: 'Dermatology',
    availableDays: ['Tue', 'Thu'],
    timings: '2:00 PM – 6:00 PM',
    consultationFee: 700,
    available: true,
    rating: 4.8,
  },
  {
    id: 'D006',
    name: 'Dr. Arjun Mehta',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&auto=format',
    specialization: 'General Surgeon',
    qualification: 'MBBS, MS (General Surgery) – MAMC New Delhi',
    experience: '20 years',
    department: 'Surgery',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timings: '9:00 AM – 1:00 PM',
    consultationFee: 850,
    available: true,
    rating: 4.9,
  },
];

export interface Employee {
  id: string;
  name: string;
  photo: string;
  designation: string;
  department: string;
  qualification: string;
  contact: string;
  joiningDate: string;
  status: 'Active' | 'On Leave';
}

export const employees: Employee[] = [
  {
    id: 'E001',
    name: 'Sunita Agarwal',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&auto=format',
    designation: 'Chief Executive Officer',
    department: 'Administration',
    qualification: 'MBA (Healthcare Management) – IIM Ahmedabad',
    contact: '+91 98200 10001',
    joiningDate: '2015-03-01',
    status: 'Active',
  },
  {
    id: 'E002',
    name: 'Deepak Verma',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&auto=format',
    designation: 'Chief Financial Officer',
    department: 'Finance',
    qualification: 'CA, MBA (Finance) – FMS Delhi',
    contact: '+91 98200 10002',
    joiningDate: '2016-07-15',
    status: 'Active',
  },
  {
    id: 'E003',
    name: 'Kavitha Rao',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format',
    designation: 'Head Nurse',
    department: 'Nursing',
    qualification: 'B.Sc Nursing, M.Sc Nursing – NIMHANS',
    contact: '+91 98200 10003',
    joiningDate: '2017-01-10',
    status: 'Active',
  },
  {
    id: 'E004',
    name: 'Suresh Pillai',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format',
    designation: 'Lab Manager',
    department: 'Pathology',
    qualification: 'B.Sc (Biochemistry), M.Sc – AIIMS',
    contact: '+91 98200 10004',
    joiningDate: '2018-04-20',
    status: 'Active',
  },
  {
    id: 'E005',
    name: 'Pooja Bhatt',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&auto=format',
    designation: 'HR Manager',
    department: 'Human Resources',
    qualification: 'BBA, MBA (HR) – Symbiosis Pune',
    contact: '+91 98200 10005',
    joiningDate: '2019-09-05',
    status: 'Active',
  },
  {
    id: 'E006',
    name: 'Ramesh Iyer',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format',
    designation: 'Radiology Technician',
    department: 'Radiology',
    qualification: 'B.Sc (Medical Imaging Technology)',
    contact: '+91 98200 10006',
    joiningDate: '2020-02-14',
    status: 'Active',
  },
  {
    id: 'E007',
    name: 'Nalini Krishnan',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&auto=format',
    designation: 'Pharmacist',
    department: 'Pharmacy',
    qualification: 'Pharm.D – JSS College of Pharmacy',
    contact: '+91 98200 10007',
    joiningDate: '2018-11-30',
    status: 'On Leave',
  },
  {
    id: 'E008',
    name: 'Amit Joshi',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&auto=format',
    designation: 'IT Manager',
    department: 'IT & Systems',
    qualification: 'B.Tech (Computer Science) – IIT Bombay',
    contact: '+91 98200 10008',
    joiningDate: '2021-06-01',
    status: 'Active',
  },
];

export type FoodCategory = 'Morning Breakfast' | 'Afternoon Food' | 'Snack Food' | 'Dinner Food';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  description: string;
  price: number;
  image: string;
  calories: number;
  isVeg: boolean;
}

export const foodItems: FoodItem[] = [
  // ── Morning Breakfast ──
  {
    id: 'F001',
    name: 'Idli Sambar',
    category: 'Morning Breakfast',
    description: 'Soft steamed idlis served with fresh sambar and coconut chutney',
    price: 70,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400&h=300&fit=crop&auto=format',
    calories: 280,
    isVeg: true,
  },
  {
    id: 'F002',
    name: 'Masala Dosa',
    category: 'Morning Breakfast',
    description: 'Crispy dosa filled with spiced potato masala, served with sambar and chutney',
    price: 85,
    image: 'https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=400&h=300&fit=crop&auto=format',
    calories: 350,
    isVeg: true,
  },
  {
    id: 'F003',
    name: 'Upma',
    category: 'Morning Breakfast',
    description: 'Soft semolina upma tempered with mustard, curry leaves and vegetables',
    price: 60,
    image: 'https://images.unsplash.com/photo-1665660710687-b44c50751054?w=400&h=300&fit=crop&auto=format',
    calories: 310,
    isVeg: true,
  },
  {
    id: 'F004',
    name: 'Poha',
    category: 'Morning Breakfast',
    description: 'Flattened rice with onions, peas, mustard seeds and lemon squeeze',
    price: 55,
    image: 'https://images.unsplash.com/photo-1572449787192-8747efce277c?w=400&h=300&fit=crop&auto=format',
    calories: 270,
    isVeg: true,
  },

  // ── Afternoon Food ──
  {
    id: 'F005',
    name: 'Dal Khichdi',
    category: 'Afternoon Food',
    description: 'Light moong dal khichdi topped with ghee, served with papad and achar',
    price: 120,
    image: 'https://images.unsplash.com/photo-1728910758653-7e990e489cac?w=400&h=300&fit=crop&auto=format',
    calories: 380,
    isVeg: true,
  },
  {
    id: 'F006',
    name: 'Vegetable Soup',
    category: 'Afternoon Food',
    description: 'Clear mixed vegetable broth with seasonal vegetables and herb garnish',
    price: 90,
    image: 'https://images.unsplash.com/photo-1652088079703-38f4a8d6b981?w=400&h=300&fit=crop&auto=format',
    calories: 180,
    isVeg: true,
  },
  {
    id: 'F007',
    name: 'Veg Thali',
    category: 'Afternoon Food',
    description: 'Complete meal with dal, sabzi, steamed rice, 2 rotis, salad and buttermilk',
    price: 160,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format',
    calories: 550,
    isVeg: true,
  },

  // ── Snack Food ──
  {
    id: 'F008',
    name: 'Fresh Fruit Bowl',
    category: 'Snack Food',
    description: 'Seasonal Indian fruits — papaya, banana, pomegranate and apple',
    price: 75,
    image: 'https://images.unsplash.com/photo-1728034261572-f03a54a3b6d4?w=400&h=300&fit=crop&auto=format',
    calories: 180,
    isVeg: true,
  },
  {
    id: 'F009',
    name: 'Curd & Honey',
    category: 'Snack Food',
    description: 'Fresh dahi (curd) with seasonal fruit and a drizzle of honey',
    price: 65,
    image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400&h=300&fit=crop&auto=format',
    calories: 200,
    isVeg: true,
  },
  {
    id: 'F010',
    name: 'Masala Chai',
    category: 'Snack Food',
    description: 'Ginger-cardamom tea with low-fat milk and jaggery sweetener',
    price: 30,
    image: 'https://images.unsplash.com/photo-1625033405953-f20401c7d848?w=400&h=300&fit=crop&auto=format',
    calories: 80,
    isVeg: true,
  },

  // ── Dinner Food ──
  {
    id: 'F011',
    name: 'Grilled Chicken Thali',
    category: 'Dinner Food',
    description: 'Herb-grilled chicken with steamed rice, dal, sabzi and 2 rotis',
    price: 220,
    image: 'https://images.unsplash.com/photo-1589778655375-3e622a9fc91c?w=400&h=300&fit=crop&auto=format',
    calories: 520,
    isVeg: false,
  },
  {
    id: 'F012',
    name: 'Paneer Butter Masala',
    category: 'Dinner Food',
    description: 'Creamy paneer curry with butter naan, dal makhani and salad',
    price: 180,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format',
    calories: 460,
    isVeg: true,
  },
  {
    id: 'F013',
    name: 'Fresh Coconut Water',
    category: 'Dinner Food',
    description: 'Tender coconut water — natural electrolytes, served chilled',
    price: 50,
    image: 'https://images.unsplash.com/photo-1617611140379-0e0ec17cc45f?w=400&h=300&fit=crop&auto=format',
    calories: 60,
    isVeg: true,
  },
];

export const departments = [
  { name: 'Cardiology', icon: '🫀', description: 'Heart disease diagnosis and treatment', doctors: 4 },
  { name: 'Neurology', icon: '🧠', description: 'Brain and nervous system care', doctors: 3 },
  { name: 'Pediatrics', icon: '👶', description: "Comprehensive children's healthcare", doctors: 5 },
  { name: 'Orthopedics', icon: '🦴', description: 'Bone and joint treatment', doctors: 4 },
  { name: 'Dermatology', icon: '🔬', description: 'Skin care and treatment', doctors: 2 },
  { name: 'Surgery', icon: '🏥', description: 'Advanced surgical procedures', doctors: 6 },
  { name: 'Radiology', icon: '📡', description: 'Imaging and diagnostics', doctors: 3 },
  { name: 'Emergency', icon: '🚨', description: '24/7 emergency care', doctors: 8 },
];

export const services = [
  { title: '24/7 Emergency Care', icon: '🚨', description: 'Round-the-clock emergency services with rapid response teams and trauma specialists.' },
  { title: 'Advanced Diagnostics', icon: '🔬', description: 'State-of-the-art laboratory, MRI, CT scan and imaging facilities for precise diagnosis.' },
  { title: 'Surgical Excellence', icon: '⚕️', description: 'Minimally invasive and complex surgical procedures by experienced surgeons.' },
  { title: 'ICU & Critical Care', icon: '💊', description: 'Specialized intensive care units with continuous monitoring and ventilator support.' },
  { title: 'Telemedicine', icon: '📱', description: 'Virtual consultations from the comfort of your home through our secure platform.' },
  { title: 'Rehabilitation', icon: '🏃', description: 'Comprehensive physical therapy and mental rehabilitation programs for full recovery.' },
];
