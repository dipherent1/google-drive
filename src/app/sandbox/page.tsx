import { mockFile, mockFolder } from "~/lib/mock-data";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div>
      Seed Function{" "}
      <form
        action={async () => {
          "use server";

          const folderInsert = await db.insert(folders).values(
            mockFolder.map((folder, index) => ({
              id: parseInt(folder.id),
              name: folder.name,
              modified: folder.modified,
              parent: folder.parent ? parseInt(folder.parent) : null,
            })),
          );

          const fileInsert = await db.insert(files).values(
            mockFile.map((file, index) => ({
              id: parseInt(file.id),
              name: file.name,
              size: parseFloat(file.size),
              parent: parseInt(file.parent),
              url: file.url,
            })),
          );

          console.log(fileInsert);
          console.log(folderInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
