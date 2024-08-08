interface TabsData {
  id: number;
  header: string;
  body: string;
  content: string;
  date: string;
  author: string;
}

export const tabsData: TabsData[] = [
  {
    id: 1,
    header: "Introduction",
    body: "This is the Introduction tab",
    content: "Here is some detailed content for the Introduction tab.",
    date: "2024-08-08",
    author: "John Doe",
  },
  {
    id: 2,
    header: "Features",
    body: "This is the Features tab",
    content: "Here is some detailed content about the features.",
    date: "2024-08-07",
    author: "Jane Smith",
  },
  {
    id: 3,
    header: "Pricing",
    body: "This is the Pricing tab",
    content: "Here is some detailed content about the pricing.",
    date: "2024-08-06",
    author: "James Brown",
  },
  {
    id: 4,
    header: "FAQ",
    body: "This is the FAQ tab",
    content: "Here is some detailed content for the FAQ.",
    date: "2024-08-05",
    author: "Mary Johnson",
  },
  {
    id: 5,
    header: "Contact",
    body: "This is the Contact tab",
    content: "Here is some detailed content for contacting us.",
    date: "2024-08-04",
    author: "David White",
  },
];
