import { useState } from 'preact/hooks';
import { buildJsSrcdoc, buildStorageProject } from './storage-project';

type SdkLike = { openProject: (p: unknown, o?: unknown) => void };
let sdkPromise: Promise<SdkLike> | null = null;
function loadSdk(): Promise<SdkLike> {
  if (!sdkPromise) sdkPromise = import(/* @vite-ignore */ 'https://esm.sh/@stackblitz/sdk').then((m) => (m.default ?? m) as SdkLike);
  return sdkPromise;
}

export default function StorageRunner({ code, stackblitz = false }: { code: string; stackblitz?: boolean }) {
  const [src, setSrc] = useState(code);
  const [doc, setDoc] = useState('');
  const [ran, setRan] = useState(false);

  function run() { setDoc(buildJsSrcdoc(src)); setRan(true); }
  async function openSb() {
    try {
      const sdk = await loadSdk();
      sdk.openProject(buildStorageProject(src), { openFile: 'index.html', newWindow: true });
    } catch {
      navigator.clipboard.writeText(src);
      window.open('https://stackblitz.com/fork/web-platform', '_blank', 'noopener');
    }
  }

  return (
    <div class="nr">
      <div class="nr__bar">
        <span class="nr__label">{stackblitz ? 'SharedWorker' : 'Browser Storage'}</span>
        <span class="nr__actions">
          {!stackblitz && <button class="nr__run" onClick={run}>Run ▸</button>}
          <button class="nr__open" onClick={openSb}>Open in StackBlitz ▸</button>
        </span>
      </div>
      <textarea class="nr__code" spellcheck={false} value={src}
        onInput={(e) => setSrc((e.target as HTMLTextAreaElement).value)} />
      {stackblitz
        ? <p class="nr__hint">Needs multiple tabs / a SharedWorker context — open in StackBlitz to run.</p>
        : ran && <iframe class="nr__out" sandbox="allow-scripts allow-same-origin" srcdoc={doc} title="Output" />}
    </div>
  );
}
