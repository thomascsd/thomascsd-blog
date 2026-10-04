export default interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  bgImageUrl?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  tags: string[];
}
