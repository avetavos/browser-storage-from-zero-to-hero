import { describe, it, expect } from 'vitest';
import { buildJsSrcdoc, buildStorageProject } from '../src/components/storage-project';

describe('buildJsSrcdoc', () => {
  it('embeds the user code and an output sink', () => {
    const doc = buildJsSrcdoc("console.log('hi')");
    expect(doc).toContain("console.log('hi')");
    expect(doc).toContain('__out');
    expect(doc).toContain('console.log');
  });
  it('captures unhandled promise rejections', () => {
    expect(buildJsSrcdoc('')).toContain('onunhandledrejection');
  });
  it('neutralizes a nested </script> in user code', () => {
    expect(buildJsSrcdoc("var s='</script>'")).not.toContain("'</script>'");
  });
});

describe('buildStorageProject', () => {
  it('builds a SharedWorker multi-tab demo', () => {
    const p = buildStorageProject("console.log(1)");
    expect(p.files['index.html']).toContain('main.js');
    expect(p.files['shared-worker.js']).toContain('onconnect');
    expect(p.files['main.js']).toContain("new SharedWorker('shared-worker.js')");
    expect(p.files['package.json']).toContain('serve');
    expect(p.files['snippet.js']).toBe('console.log(1)');
  });
});
