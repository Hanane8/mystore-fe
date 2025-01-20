import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070"
          alt="Stylish clothing collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-xl text-white">
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            New Arrivals Only
          </h1>
          <p className="text-xl mb-8 text-gray-100">
            Collections for Everyone. Discover our latest arrivals featuring timeless pieces 
            designed for your unique style.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium 
                           flex items-center gap-2 hover:bg-gray-100 transition-colors">
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;