import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import heroBaby from "@/assets/hero-baby-bath.jpg";
import categoryFeeding from "@/assets/category-feeding.jpg";
import categorySkincare from "@/assets/category-skincare.jpg";
import categoryMaternity from "@/assets/category-maternity.jpg";
import categoryToys from "@/assets/category-toys.jpg";

const Index = () => {
  const categories = [
    { title: "Bình sữa & Ti giả", image: categoryFeeding, href: "#" },
    { title: "Chăm sóc da", image: categorySkincare, href: "#" },
    { title: "Mẹ & Bầu", image: categoryMaternity, href: "#" },
    { title: "Đồ chơi", image: categoryToys, href: "#" },
  ];

  const featuredProducts = [
    {
      name: "Bình sữa Pigeon cổ rộng 240ml",
      image: categoryFeeding,
      price: 299000,
      originalPrice: 399000,
      rating: 4.8,
      reviews: 156,
      discount: 25,
    },
    {
      name: "Kem dưỡng da Baby Lotion 200ml",
      image: categorySkincare,
      price: 189000,
      rating: 4.6,
      reviews: 89,
      isNew: true,
    },
    {
      name: "Máy hút sữa điện đôi",
      image: categoryMaternity,
      price: 2490000,
      originalPrice: 2990000,
      rating: 4.9,
      reviews: 234,
      discount: 17,
    },
    {
      name: "Bộ đồ chơi xúc xắc cho bé",
      image: categoryToys,
      price: 159000,
      rating: 4.5,
      reviews: 67,
      isNew: true,
    },
    {
      name: "Bộ 3 bình sữa Combo",
      image: categoryFeeding,
      price: 699000,
      originalPrice: 899000,
      rating: 4.7,
      reviews: 123,
      discount: 22,
    },
    {
      name: "Sữa tắm gội Baby Wash 400ml",
      image: categorySkincare,
      price: 245000,
      rating: 4.8,
      reviews: 178,
    },
    {
      name: "Áo bầu cotton cao cấp",
      image: categoryMaternity,
      price: 449000,
      originalPrice: 599000,
      rating: 4.6,
      reviews: 45,
      discount: 25,
    },
    {
      name: "Gấu bông an toàn cho trẻ sơ sinh",
      image: categoryToys,
      price: 299000,
      rating: 4.9,
      reviews: 201,
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img
          src={heroBaby}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Sản phẩm chất lượng
                <br />
                cho bé yêu
              </h1>
              <p className="text-lg mb-6 text-white/90">
                Khám phá bộ sưu tập sản phẩm chăm sóc mẹ và bé an toàn, 
                tin cậy từ các thương hiệu hàng đầu
              </p>
              <Button size="lg" className="font-semibold">
                Mua sắm ngay
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Danh mục sản phẩm</h2>
            <Button variant="ghost" className="text-primary">
              Xem tất cả
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                image={category.image}
                href={category.href}
              />
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
              <p className="text-muted-foreground mt-1">
                Những sản phẩm được yêu thích nhất
              </p>
            </div>
            <Button variant="ghost" className="text-primary hidden md:flex">
              Xem thêm
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" className="w-full">
              Xem thêm sản phẩm
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              🎁 Ưu đãi đặc biệt
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Giảm giá lên đến 30% cho các sản phẩm chăm sóc da và bình sữa. 
              Áp dụng từ ngày 01/01 - 31/01/2025
            </p>
            <Button size="lg" className="font-semibold">
              Khám phá ngay
            </Button>
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Tại sao chọn BabyLove?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Sản phẩm chính hãng</h3>
              <p className="text-sm text-muted-foreground">
                100% sản phẩm chính hãng, có nguồn gốc xuất xứ rõ ràng
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold mb-2">Giao hàng nhanh</h3>
              <p className="text-sm text-muted-foreground">
                Giao hàng toàn quốc, nhanh chóng trong 2-3 ngày
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-card border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold mb-2">Đổi trả dễ dàng</h3>
              <p className="text-sm text-muted-foreground">
                Chính sách đổi trả linh hoạt trong vòng 7 ngày
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
