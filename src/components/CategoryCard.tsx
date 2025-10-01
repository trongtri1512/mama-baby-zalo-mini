interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export const CategoryCard = ({ title, image, href }: CategoryCardProps) => {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-xl bg-card border hover:shadow-lg transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
    </a>
  );
};
