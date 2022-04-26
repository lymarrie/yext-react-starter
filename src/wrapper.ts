export const reactWrapper = (
  data: any,
  name: string,
  filename: string,
  template: string,
  hydrate: boolean
): string => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Page Usings Plugin</title>
        <script>window.__INITIAL__DATA__ = ${JSON.stringify(data)}</script>
        ${getCssTags(filename, data).join("\n")}
    </head>
    <body>
        <div id="reactele">${template}</div>${hydrate ? `<script type="module" src="/assets/hydrate/${getHydrationFilename(filename, data)}.js" defer></script>` : ""
    }
    </body>
    </html>`;
};

const getCssTags = (name: string, data: any) => {
  const { __meta } = data;
  for (const [file, info] of Object.entries(__meta.manifest.bundlerManifest)) {
    if (file !== `src/templates/${name}`) {
      continue;
    }
    const cssFiles = (info as ManifestInfo).css || [];
    return cssFiles.map((file) => `<link rel="stylesheet" href="/${file}"/>`);
  }

  return []
};

const getHydrationFilename = (name: string, data: any) => {
  const { __meta } = data;
  for (const [file, info] of Object.entries(
    __meta.manifest.bundlerManifest
  )) {
    if (file !== `.yext/hydration_templates/${name}`) {
      continue;
    }
    const originalFile = (info as ManifestInfo).file;
    const filenameIndex = originalFile.lastIndexOf("/") + 1;
    const filename = originalFile.substring(filenameIndex);
    return filename.split(".").slice(0, -1).join(".");
  }
};

type ManifestInfo = {
  file: string;
  src: string;
  isEntry: boolean;
  imports: string[];
  css: string[];
};