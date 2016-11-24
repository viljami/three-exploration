   var path = require('path');
    module.exports = {
        entry: './index.js',
        output: {
            path: path.join(__dirname, 'src'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                { test: path.join(__dirname, 'src'),
                  loader: 'babel-loader' }
            ]
        }
    };
