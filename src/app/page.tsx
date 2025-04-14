import Image from 'next/image';
// import HeroImage from '/HeroImage.avif'
import { Wand2, Sparkles, PaintBucket, ChevronRight, Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            width={1920}
            height={1080}
            src='/HeroImage.avif'
            alt="Modern interior" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-6 z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Rediseña tu espacio con el poder de la IA
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Transforma tu hogar en minutos con nuestra tecnología de inteligencia artificial. 
              Diseños personalizados, realistas y sorprendentes.
            </p>
            <a href="/dashboard">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-all">
                Comenzar ahora
                <ChevronRight className="w-5 h-5" />
              </button>
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">¿Por qué elegir nuestro servicio?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Wand2 className="w-8 h-8 text-indigo-600" />}
              title="Diseño instantáneo"
              description="Obtén múltiples diseños en segundos, no en semanas."
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-indigo-600" />}
              title="Personalización total"
              description="Adapta cada aspecto a tu estilo y preferencias."
            />
            <FeatureCard 
              icon={<PaintBucket className="w-8 h-8 text-indigo-600" />}
              title="Estilos ilimitados"
              description="Explora infinitas posibilidades de diseño."
            />
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">¿Cómo funciona?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Step number={1} title="Sube tus fotos" description="Toma fotos de tu espacio actual desde diferentes ángulos." />
            <Step number={2} title="Describe tu visión" description="Cuéntanos tu estilo ideal y preferencias de diseño." />
            <Step number={3} title="Recibe diseños" description="Obtén múltiples propuestas generadas por IA en minutos." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Comienza a transformar tu espacio hoy
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya han renovado sus espacios con nuestra tecnología de IA
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-all">
            Pruébalo gratis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">IA Interior</h3>
              <p className="text-sm">Transformando espacios con inteligencia artificial</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm">
                <li>Diseño de interiores</li>
                <li>Consultoría</li>
                <li>Visualización 3D</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>Sobre nosotros</li>
                <li>Contacto</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>Privacidad</li>
                <li>Términos</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © 2024 IA Interior Design. Hecho con ❤️ por David Patiño.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function Step({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}


function Testimonial({ text, author, role }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-600 mb-4">{text}</p>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  );
}