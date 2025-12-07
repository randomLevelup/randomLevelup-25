const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory with custom headers for Unity WebGL
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.gz')) {
            res.set('Content-Encoding', 'gzip');
            
            if (filePath.endsWith('.js.gz')) {
                res.set('Content-Type', 'application/javascript');
            } else if (filePath.endsWith('.wasm.gz')) {
                res.set('Content-Type', 'application/wasm');
            } else if (filePath.endsWith('.data.gz')) {
                res.set('Content-Type', 'application/octet-stream');
            } else if (filePath.endsWith('.symbols.json.gz')) {
                res.set('Content-Type', 'application/json');
            }
        }
    }
}));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
