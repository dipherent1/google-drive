export interface File {
  id: string;
  name: string;
  type: "file";
  size: string;
  url: string;
  parent: string;
}

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  modified: string;
  parent: string | null;
};

export const mockFile: File[] = [
  {
    id: "0",
    name: "Presentation.pptx",
    type: "file",
    size: "5.8 MB",
    url: "https://example.com/presentation.pptx",
    parent: "0",
  },

  {
    id: "1",
    name: "Design Mockups",
    type: "file",
    size: "12.5 MB",
    url: "https://example.com/design-mockups.pdf",
    parent: "1",
  },

  {
    id: "2",
    name: "Wireframes",
    type: "file",
    size: "3.2 MB",
    url: "https://example.com/wireframes.pdf",
    parent: "1",
  },

  {
    id: "3",
    name: "App Prototype",
    type: "file",
    size: "8.7 MB",
    url: "https://example.com/app-prototype.fig",
    parent: "2",
  },

  {
    id: "4",
    name: "Quarterly Report",
    type: "file",
    size: "2.1 MB",
    url: "https://example.com/quarterly-report.pdf",
    parent: "3",
  },

  {
    id: "5",
    name: "Budget Spreadsheet",
    type: "file",
    size: "1.3 MB",
    url: "https://example.com/budget.xlsx",
    parent: "3",
  },

  {
    id: "6",
    name: "Presentation.pptx",
    type: "file",
    size: "5.8 MB",
    url: "https://example.com/presentation.pptx",
    parent: "4",
  },
];

export const mockFolder: Folder[] = [
  {
    id: "0",
    name: "root",
    type: "folder",
    modified: "Nov 27, 2025",
    parent: null,
  },
  {
    id: "1",
    name: "Project Alpha",
    type: "folder",
    modified: "Sep 02, 2025",
    parent: "0",
  },
  {
    id: "2",
    name: "Financials",
    type: "folder",
    modified: "Nov 27, 2025",
    parent: "0",
  },
  {
    id: "3",
    name: "Designs",
    type: "folder",
    modified: "Nov 27, 2025",
    parent: "2",
  },
  {
    id: "4",
    name: "Frontend",
    type: "folder",
    modified: "Nov 27, 2025",
    parent: "3",
  },
  {
    id: "5",
    name: "Backend",
    type: "folder",
    modified: "Nov 27, 2025",
    parent: "4",
  },
];
