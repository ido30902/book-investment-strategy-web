
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const BooksSection = () => {
  const books = [
    {
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      image: "https://m.media-amazon.com/images/I/91+t0Di07FL._SL1500_.jpg",
      amazonLink: "https://www.amazon.com/Intelligent-Investor-Definitive-Investing-Essentials/dp/0060555661",
      description: "The definitive book on value investing, this revised edition includes updated commentary by financial journalist Jason Zweig. Graham's philosophy of 'value investing' has made The Intelligent Investor the stock market bible ever since its original publication in 1949.",
      authorBio: "Benjamin Graham (1894-1976) was an American economist and professional investor. Graham is considered the first proponent of value investing, an investment approach he began teaching at Columbia Business School in 1928. He was the mentor of legendary investor Warren Buffett."
    },
    {
      title: "The Little Book That Beats the Market",
      author: "Joel Greenblatt",
      image: "https://m.media-amazon.com/images/I/41vQ4DGr0fL._SX309_BO1,204,203,200_.jpg",
      amazonLink: "https://www.amazon.com/Little-Book-Still-Beats-Market/dp/0470624159",
      description: "Greenblatt explains his simple-to-follow, effective formula for a successful investment strategy. It's accessible even to those with minimal knowledge of stocks, and has proven to beat market averages. The 'Magic Formula' ranks companies based on their earnings yield and return on capital.",
      authorBio: "Joel Greenblatt is an American investor, hedge fund manager, and professor at Columbia Business School. He is the founder of Gotham Capital, which has averaged 40% annualized returns over more than 20 years. Greenblatt developed the 'Magic Formula' - a quantitative method for buying good companies at bargain prices."
    }
  ];

  return (
    <section id="books" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-investment-blue mb-12 text-center">
          Investment Strategy Books
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          {books.map((book) => (
            <Card key={book.title} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 flex justify-center">
                    <a 
                      href={book.amazonLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-transform duration-300 hover:scale-105"
                    >
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-48 h-auto object-cover rounded-md shadow-lg"
                      />
                    </a>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold text-investment-blue-dark mb-2">{book.title}</h3>
                    <p className="text-gray-600 mb-4">by <span className="text-investment-blue font-medium">{book.author}</span></p>
                    <p className="text-gray-700 mb-4">{book.description}</p>
                    <div>
                      <h4 className="text-lg font-medium text-investment-blue-dark mb-2">About the Author</h4>
                      <p className="text-gray-700">{book.authorBio}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-100 p-4">
                <a 
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center text-investment-blue hover:text-investment-blue-dark font-medium"
                >
                  View on Amazon
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BooksSection;
