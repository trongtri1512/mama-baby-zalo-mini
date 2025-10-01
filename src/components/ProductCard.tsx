import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  discount?: number;
}

export const ProductCard = ({
  name,
  image,
  price,
  originalPrice,
  rating = 4.5,
  reviews = 0,
  isNew,
  discount,
}: ProductCardProps) => {
  return (
    <div className="group relative bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-accent text-accent-foreground font-medium">
            Mới
          </Badge>
        )}
        {discount && (
          <Badge className="bg-primary text-primary-foreground font-medium">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* Wishlist */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-background/80 backdrop-blur-sm hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-4 w-4" />
      </Button>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
          {reviews > 0 && (
            <span className="text-muted-foreground">({reviews})</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {price.toLocaleString("vi-VN")}₫
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toLocaleString("vi-VN")}₫
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button className="w-full opacity-0 group-hover:opacity-100 transition-opacity" size="sm">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};
