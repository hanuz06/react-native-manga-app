class Book {
  id: string;
  author: string;
  categories: string[];
  chapters: [];
  description: string;
  image: string;
  last_chapter_date: number;
  released: number;
  title: string;
  url: string;
  constructor(
    id: string,
    author: string,
    categories: string[],
    chapters: [],
    description: string,
    image: string,
    last_chapter_date: number,
    released: number,
    title: string,
    url: string
  ) {
    this.id = id;
    this.author = author;
    this.categories = categories;
    this.chapters = chapters;
    this.description = description;
    this.image = image;
    this.last_chapter_date = last_chapter_date;
    this.released = released;
    this.title = title;
    this.url = url;
  }
}

export default Book;
