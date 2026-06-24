export type StackBlitzProject = {
  title: string;
  description: string;
  template: 'node';
  files: Record<string, string>;
};

export function buildJsSrcdoc(code: string): string {
  const safe = code.replace(/<\/script/gi, '<\\/script');
  return (
    '<!doctype html><html><head><meta charset="utf-8">' +
    '<style>body{font-family:ui-monospace,SFMono-Regular,monospace;font-size:.85rem;margin:.6rem;white-space:pre-wrap;color:#111;background:#fff}</style></head>' +
    '<body><pre id="__out"></pre><script>(async function(){' +
    'var o=document.getElementById("__out");' +
    'function f(a){try{return typeof a==="object"?JSON.stringify(a):String(a)}catch(e){return String(a)}}' +
    'function w(){o.textContent+=Array.prototype.map.call(arguments,f).join(" ")+"\\n";}' +
    'console.log=w;console.info=w;console.warn=w;console.error=w;console.debug=w;' +
    'window.onerror=function(m){w("Error: "+m);return true;};' +
    'window.onunhandledrejection=function(e){var r=e&&e.reason;w("Error: "+((r&&r.message)||r||e));};' +
    'try{\n' + safe + '\n}catch(e){w("Error: "+((e&&e.message)||e));}' +
    '})();</script></body></html>'
  );
}

export function buildStorageProject(code: string): StackBlitzProject {
  const sharedWorker =
    "// SharedWorker: one instance shared across every tab on this origin.\n" +
    "let count = 0;\n" +
    "const ports = [];\n" +
    "self.onconnect = (e) => {\n" +
    "  const port = e.ports[0];\n" +
    "  ports.push(port);\n" +
    "  port.onmessage = (ev) => {\n" +
    "    if (ev.data === 'inc') count++;\n" +
    "    // Broadcast the latest count to every connected tab.\n" +
    "    for (const p of ports) p.postMessage({ count });\n" +
    "  };\n" +
    "  port.start();\n" +
    "  port.postMessage({ count });\n" +
    "};\n";

  const main =
    "const worker = new SharedWorker('shared-worker.js');\n" +
    "const out = document.getElementById('out');\n" +
    "function log(msg) { out.textContent += msg + '\\n'; }\n" +
    "worker.port.onmessage = (e) => log('count = ' + e.data.count);\n" +
    "worker.port.start();\n" +
    "document.getElementById('inc').addEventListener('click', () => worker.port.postMessage('inc'));\n" +
    "log('Connected. Open this URL in a second tab and watch the count stay in sync.');\n";

  const indexHtml =
    "<!doctype html>\n" +
    "<html>\n" +
    "  <head><meta charset=\"utf-8\"><title>SharedWorker multi-tab demo</title></head>\n" +
    "  <body>\n" +
    "    <h1>SharedWorker multi-tab demo</h1>\n" +
    "    <button id=\"inc\">Increment shared counter</button>\n" +
    "    <pre id=\"out\"></pre>\n" +
    "    <script src=\"main.js\"></script>\n" +
    "  </body>\n" +
    "</html>\n";

  return {
    title: 'SharedWorker multi-tab demo',
    description: 'Browser Storage & Data — SharedWorker / cross-tab example',
    template: 'node',
    files: {
      'package.json': JSON.stringify(
        { name: 'sharedworker-demo', type: 'module', scripts: { start: 'serve .' }, dependencies: { serve: 'latest' } },
        null, 2,
      ),
      'index.html': indexHtml,
      'main.js': main,
      'shared-worker.js': sharedWorker,
      // The editable lesson snippet is preserved alongside the demo for reference.
      'snippet.js': code,
    },
  };
}
