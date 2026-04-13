// InViewer - PDF-style viewer for InterNovel content
// Used to display Homo Judaicus and other InterNovel projects

export interface NovelProject {
  id: string;
  title: string;
  author: string;
  chapters: Chapter[];
  createdAt: number;
  updatedAt: number;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ViewerProps {
  project: NovelProject;
  showTableOfContents?: boolean;
  allowDownload?: boolean;
}

/**
 * Render a novel project in PDF-style format
 */
export function renderProject(project: NovelProject): string {
  let output = `# ${project.title}\n\n`;
  output += `*By ${project.author}*\n\n`;
  output += `---\n\n`;
  
  const sortedChapters = [...project.chapters].sort((a, b) => a.order - b.order);
  
  for (const chapter of sortedChapters) {
    output += `## ${chapter.title}\n\n`;
    output += `${chapter.content}\n\n`;
    output += `---\n\n`;
  }
  
  return output;
}

/**
 * Export project as PDF-compatible format
 */
export async function exportAsPDF(project: NovelProject): Promise<Blob> {
  // TODO: Implement PDF generation
  console.log(`Exporting "${project.title}" as PDF`);
  return new Blob([renderProject(project)], { type: 'application/pdf' });
}

/**
 * Create a viewer component for displaying novel content
 */
export function createViewer(container: HTMLElement, props: ViewerProps): void {
  container.innerHTML = renderProject(props.project);
  
  if (props.allowDownload) {
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download PDF';
    downloadBtn.onclick = async () => {
      const pdf = await exportAsPDF(props.project);
      const url = URL.createObjectURL(pdf);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${props.project.title}.pdf`;
      a.click();
    };
    container.appendChild(downloadBtn);
  }
}
