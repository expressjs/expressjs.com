/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/react" />

declare module '*.svg?react' {
  import type { FC, SVGProps } from 'react';
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
