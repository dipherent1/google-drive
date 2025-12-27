import type { File, Folder } from "~/lib/mock-data";

import { useState } from "react";
import {
  ChevronRight,
  File as fileIcons,
  Folder as folderIcons,
  Download,
  UploadIcon,
  FileIcon,
  FolderIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";

export function FileRow(props: { file: File }) {
  const { file } = props;
  return (
    <div
      key={file.id}
      className="hover:bg-muted hover:border-border grid grid-cols-12 items-center gap-4 rounded-lg border border-transparent px-4 py-3 transition-colors"
    >
      <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
        {file.name ?? "—"}
      </div>
      <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
        {"modified" in file ? (file.modified as string) : "—"}
      </div>
      <div className="text-muted-foreground md:text-foregroun2d col-span-6 text-sm md:col-span-2">
        {file.size ?? "—"}
      </div>
      <div className="col-span-6 flex justify-end md:col-span-2">
        <a href={file.url ?? "#"} target="_blank" rel="noopener noreferrer">
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Download</span>
          </Button>
        </a>
      </div>
    </div>
  );
}

export function FolderRow(props: {
  folder: Folder;
  handleFolderClick: () => void;
}) {
  const { folder, handleFolderClick } = props;
  return(
  <div
    key={folder.id}
    className="hover:bg-muted hover:border-border grid grid-cols-12 items-center gap-4 rounded-lg border border-transparent px-4 py-3 transition-colors"
  >
    <div
      className="group col-span-12 flex cursor-pointer items-center gap-3 md:col-span-6"
      onClick={() => handleFolderClick()}
    >
      <FolderIcon className="h-5 w-5 flex-shrink-0 text-blue-500" />
      <span
        className={`text-sm ${"text-foreground font-medium group-hover:text-blue-500"}`}
      >
        {folder.name}
      </span>
    </div>
    <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
      {/* Since files don't have a modified date in your data, we show a dash */}
      {folder.modified ?? "—"}
    </div>
    <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
      {/* Folders don't have a size, so show a dash */}
      {"-"}
    </div>
  </div>
  );
}
