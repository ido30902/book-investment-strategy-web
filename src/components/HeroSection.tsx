
const HeroSection = () => {
  return (
    <section id="home" className="pt-32 pb-20 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-investment-blue">
          Investment Book Strategies
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
          Explore and compare proven investment methodologies from legendary investors
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <a 
            href="#books"
            className="bg-investment-blue hover:bg-investment-blue-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Explore Books
          </a>
          <a 
            href="#screener"
            className="bg-investment-green hover:bg-investment-green-dark text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Stock Screeners
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
