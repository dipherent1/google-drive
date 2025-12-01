"use client";

import { useState } from "react";
import { ChevronRight, File, Folder, Download, UploadIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  modified: string;
  url?: string;
  children?: FileItem[];
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Projects",
    type: "folder",
    modified: "Nov 28, 2025",
    children: [
      {
        id: "1-1",
        name: "Website Redesign",
        type: "folder",
        modified: "Nov 25, 2025",
        children: [
          {
            id: "1-1-1",
            name: "Design Mockups",
            type: "file",
            size: "12.5 MB",
            modified: "Nov 24, 2025",
            url: "https://example.com/design-mockups.pdf",
          },
          {
            id: "1-1-2",
            name: "Wireframes",
            type: "file",
            size: "3.2 MB",
            modified: "Nov 23, 2025",
            url: "https://example.com/wireframes.pdf",
          },
        ],
      },
      {
        id: "1-2",
        name: "Mobile App",
        type: "folder",
        modified: "Nov 20, 2025",
        children: [
          {
            id: "1-2-1",
            name: "App Prototype",
            type: "file",
            size: "8.7 MB",
            modified: "Nov 20, 2025",
            url: "https://example.com/app-prototype.fig",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Documents",
    type: "folder",
    modified: "Nov 26, 2025",
    children: [
      {
        id: "2-1",
        name: "Quarterly Report",
        type: "file",
        size: "2.1 MB",
        modified: "Nov 26, 2025",
        url: "https://example.com/quarterly-report.pdf",
      },
      {
        id: "2-2",
        name: "Budget Spreadsheet",
        type: "file",
        size: "1.3 MB",
        modified: "Nov 24, 2025",
        url: "https://example.com/budget.xlsx",
      },
    ],
  },
  {
    id: "3",
    name: "Presentation.pptx",
    type: "file",
    size: "5.8 MB",
    modified: "Nov 27, 2025",
    url: "https://example.com/presentation.pptx",
  },
];

export default function DriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData);

  const getCurrentItems = (): FileItem[] => {
    let items = mockData;
    for (const id of currentPath) {
      const item = items.find((i) => i.id === id);
      if (item && item.type === "folder" && item.children) {
        items = item.children;
      }
    }
    return items;
  };

  const navigateToFolder = (folderId: string) => {
    setCurrentPath([...currentPath, folderId]);
  };

  const goBack = (index: number) => {
    setCurrentPath(currentPath.slice(0, index));
  };

  const getBreadcrumbItems = () => {
    const items = [{ id: "root", name: "My Drive" }];
    let current = mockData;

    for (const id of currentPath) {
      const item = current.find((i) => i.id === id);
      if (item) {
        items.push({ id: item.id, name: item.name });
        if (item.children) {
          current = item.children;
        }
      }
    }

    return items;
  };

  const items = getCurrentItems();
  const breadcrumbs = getBreadcrumbItems();

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500">
                <File className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-foreground text-2xl font-semibold">Drive</h1>
            </div>
            <Button className="gap-2">
              <UploadIcon className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="border-border bg-card border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1">
            {breadcrumbs.map((item, index) => (
              <div key={item.id} className="flex items-center gap-1">
                {index > 0 && (
                  <ChevronRight className="text-muted-foreground h-4 w-4" />
                )}
                <button
                  onClick={() => goBack(index)}
                  className={`hover:bg-muted rounded px-2 py-1 transition-colors ${
                    index === breadcrumbs.length - 1
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Folder className="text-muted-foreground mb-4 h-16 w-16" />
            <p className="text-muted-foreground">This folder is empty</p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* Header Row */}
            <div className="text-muted-foreground border-border hidden grid-cols-12 gap-4 border-b px-4 py-2 text-sm font-medium md:grid">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Action</div>
            </div>

            {/* File/Folder List */}
            {items.map((item) => (
              <div
                key={item.id}
                className="hover:bg-muted hover:border-border grid grid-cols-12 items-center gap-4 rounded-lg border border-transparent px-4 py-3 transition-colors"
              >
                <div
                  className="group col-span-12 flex cursor-pointer items-center gap-3 md:col-span-6"
                  onClick={() =>
                    item.type === "folder" && navigateToFolder(item.id)
                  }
                >
                  {item.type === "folder" ? (
                    <Folder className="h-5 w-5 flex-shrink-0 text-blue-500" />
                  ) : (
                    <File className="text-muted-foreground h-5 w-5 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${item.type === "folder" ? "text-foreground font-medium group-hover:text-blue-500" : "text-foreground"}`}
                  >
                    {item.name}
                  </span>
                </div>
                <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
                  {item.modified}
                </div>
                <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
                  {item.size || "—"}
                </div>
                <div className="col-span-6 flex justify-end md:col-span-2">
                  {item.type === "file" && item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        <span className="hidden md:inline">Download</span>
                      </Button>
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-xs">
                      Folder
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
