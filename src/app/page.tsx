"use client";

import { useState } from "react";
import { ChevronRight, File, Folder, Download, UploadIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { mockFile, mockFolder } from "~/lib/mock-data";

export default function DriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState<string>("0");

  const getCurrentFiles = () => {
    return mockFile.filter((file) => file.parent === currentFolder);
  };

  const getCurrentSubFolder = () => {
    return mockFolder.filter((folder) => folder.parent === currentFolder);
  };

  const navigateToFolder = (folderId: string) => {
    // Prevent adding the same folder to the path if already there
    if (folderId === currentFolder) return;
    setCurrentPath([...currentPath, folderId]);
    setCurrentFolder(folderId);
  };

  // FIX 1: Implemented the 'goBack' function for breadcrumb navigation
  const goBack = (index: number) => {
    // If the user clicks the last breadcrumb, do nothing
    if (index === currentPath.length) return;

    // Go back to the root
    if (index === 0) {
      setCurrentPath([]);
      setCurrentFolder("0");
      return;
    }

    // Go back to a specific folder in the path
    const newPath = currentPath.slice(0, index);
    setCurrentPath(newPath);
    setCurrentFolder(newPath[newPath.length - 1] || "0");
  };

  // FIX 2: Defined 'breadcrumbs' by calling the 'getBreadcrumbItems' function
  const getBreadcrumbItems = () => {
    const folderPath = [{ id: "0", name: "root" }];

    // Create the full path from the mock data
    for (const id of currentPath) {
      const folder = mockFolder.find((folder) => folder.id === id);
      if (folder) {
        folderPath.push({ id: folder.id, name: folder.name });
      }
    }
    return folderPath;
  };

  const breadcrumbs = getBreadcrumbItems();

  // FIX 3: Defined 'directoryItems' by combining files and folders
  const directoryItems = [...getCurrentSubFolder(), ...getCurrentFiles()];

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
        {directoryItems.length === 0 ? (
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
            {directoryItems.map((item) => (
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
                  {/* Since files don't have a modified date in your data, we show a dash */}
                  {item.type === "folder" ? item.modified : "—"}
                </div>
                <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
                  {/* Folders don't have a size, so show a dash */}
                  {item.type === "file" ? item.size : "—"}
                </div>
                <div className="col-span-6 flex justify-end md:col-span-2">
                  {item.type === "file" && "url" in item ? (
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
                    // This space is empty for folders
                    <span />
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
