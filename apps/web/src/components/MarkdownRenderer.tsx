import { marked } from 'marked';
import 'github-markdown-css/github-markdown.css';
import type { MarkdownRenderingStrategy } from '../../types/markdown';

interface MarkdownRendererProps {
  content: string;
  strategy?: MarkdownRenderingStrategy;
}

export default function MarkdownRenderer({ content, strategy = 'marked' }: MarkdownRendererProps) {
  // Modular architecture: Switch based on strategy
  // Currently implementing Option 1: marked + github-markdown-css
  
  let htmlContent = '';

  switch (strategy) {
    case 'marked':
      // Option 1: Use marked library with GitHub CSS
      htmlContent = marked.parse(content) as string;
      break;
      
    case 'remark':
      // Option 2: Placeholder for remark/rehype ecosystem
      // TODO: Implement remark processor here
      htmlContent = '<div class="text-gray-500 italic">Remark renderer not yet implemented.</div>';
      break;
      
    case 'typography':
      // Option 3: Placeholder for Tailwind Typography
      // TODO: Implement raw HTML output with prose class wrapper
      htmlContent = '<div class="text-gray-500 italic">Tailwind Typography renderer not yet implemented.</div>';
      break;
      
    default:
      htmlContent = '<div class="text-red-500">Unknown rendering strategy</div>';
  }

  return (
    <div 
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
