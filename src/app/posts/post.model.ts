export interface Post {
  slug?: string;
  id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: string;
  favorited?: boolean;
  favoritesCount?: number;
}
