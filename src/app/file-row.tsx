export function FileRow() {
  return;
  // {
  //   directoryItems.map((item) => (
  //     <div
  //       key={item.id}
  //       className="hover:bg-muted hover:border-border grid grid-cols-12 items-center gap-4 rounded-lg border border-transparent px-4 py-3 transition-colors"
  //     >
  //       <div
  //         className="group col-span-12 flex cursor-pointer items-center gap-3 md:col-span-6"
  //         onClick={() => item.type === "folder" && navigateToFolder(item.id)}
  //       >
  //         {item.type === "folder" ? (
  //           <Folder className="h-5 w-5 flex-shrink-0 text-blue-500" />
  //         ) : (
  //           <File className="text-muted-foreground h-5 w-5 flex-shrink-0" />
  //         )}
  //         <span
  //           className={`text-sm ${item.type === "folder" ? "text-foreground font-medium group-hover:text-blue-500" : "text-foreground"}`}
  //         >
  //           {item.name}
  //         </span>
  //       </div>
  //       <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
  //         {/* Since files don't have a modified date in your data, we show a dash */}
  //         {item.type === "folder" ? item.modified : "—"}
  //       </div>
  //       <div className="text-muted-foreground md:text-foreground col-span-6 text-sm md:col-span-2">
  //         {/* Folders don't have a size, so show a dash */}
  //         {item.type === "file" ? item.size : "—"}
  //       </div>
  //       <div className="col-span-6 flex justify-end md:col-span-2">
  //         {item.type === "file" && "url" in item ? (
  //           <a href={item.url} target="_blank" rel="noopener noreferrer">
  //             <Button variant="ghost" size="sm" className="gap-2">
  //               <Download className="h-4 w-4" />
  //               <span className="hidden md:inline">Download</span>
  //             </Button>
  //           </a>
  //         ) : (
  //           // This space is empty for folders
  //           <span />
  //         )}
  //       </div>
  //     </div>
  //   ));
  // }
}

export function FolderRow() {
  return;
}
