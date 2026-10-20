import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { load as parseYaml } from 'js-yaml'

// Lets the app `import site from '../content/site.yaml'` — content files are plain YAML
// so they can be edited by hand today and by Decap CMS later.
const yamlPlugin = () => ({
  name: 'content-yaml',
  transform(code, id) {
    if (!/\.ya?ml$/.test(id)) return null
    return { code: `export default ${JSON.stringify(parseYaml(code))}`, map: null }
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), yamlPlugin()],
  server: {
    port: 5173,
    host: true
  }
})
