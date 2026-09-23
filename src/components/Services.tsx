import { services, departments } from '../data/hospitalData'

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">What We Offer</span>
          <h2 className="font-display text-primary text-4xl lg:text-5xl mt-2 mb-4">
            Comprehensive Healthcare Services
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From emergency care to rehabilitation, Carewell Hospital provides a full spectrum of medical services under one roof — staffed by specialists who care.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={i} className="group p-6 bg-surface rounded-2xl hover:bg-primary hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-default">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-sm">
                {service.icon}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-white text-lg mb-2 transition-colors">{service.title}</h3>
              <p className="text-gray-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors">{service.description}</p>
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">About Us</span>
            <h2 className="font-display text-primary text-3xl lg:text-4xl mt-2 mb-4">
              Three Decades of<br />Medical Excellence
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded in 1994, Carewell Hospital has grown into the region's premier healthcare institution. Our 450-bed facility is equipped with the latest medical technology, including robotic surgery suites, hybrid operating rooms, and a state-of-the-art diagnostic imaging center.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are accredited by the Joint Commission International (JCI) and hold ISO 9001:2015 certification for quality management. Our dedicated staff of over 800 healthcare professionals works around the clock to deliver compassionate, evidence-based care.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                JCI Accredited
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                ISO 9001:2015 Certified
              </div>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</span>
                NABH Accredited
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&h=500&fit=crop&auto=format"
              alt="Carewell Hospital Medical Facility"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
              <p className="text-3xl font-display text-primary">450+</p>
              <p className="text-sm text-gray-500">Hospital Beds</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-accent rounded-xl shadow-lg p-4 text-white">
              <p className="text-3xl font-display">24/7</p>
              <p className="text-sm opacity-90">Emergency</p>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div>
          <div className="text-center mb-10">
            <span className="text-accent text-sm font-semibold uppercase tracking-widest">Specializations</span>
            <h2 className="font-display text-primary text-3xl lg:text-4xl mt-2">Our Departments</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {departments.map((dept, i) => (
              <a
                key={i}
                href="#doctors"
                className="group flex flex-col items-center p-5 bg-surface rounded-2xl hover:bg-primary hover:shadow-lg transition-all duration-300 text-center"
              >
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{dept.icon}</span>
                <h3 className="font-semibold text-gray-800 group-hover:text-white text-sm mb-1 transition-colors">{dept.name}</h3>
                <p className="text-xs text-gray-400 group-hover:text-white/70 transition-colors">{dept.doctors} Doctors</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
