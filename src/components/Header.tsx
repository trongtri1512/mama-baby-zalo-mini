import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Header = () => {
  const [cartCount] = useState(3);

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      {/* Promo Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium">
        🎉 Giảm 10% cho đơn hàng đầu tiên! Mã: WELCOME10
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <a href="/" className="text-2xl font-bold text-primary">
            BabyLove
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="pl-10 bg-secondary/50 border-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden lg:block border-t">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 py-3 text-sm">
            <li>
              <Button variant="ghost" size="sm" className="font-medium">
                Tất cả sản phẩm
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Bình sữa & Ti giả
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Chăm sóc da
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Mẹ & Bầu
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Đồ chơi
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Quần áo
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm">
                Tã & Vệ sinh
              </Button>
            </li>
            <li>
              <Button variant="ghost" size="sm" className="text-primary">
                🔥 Khuyến mãi
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
