module.exports = {
  presets: [
    '@vue/app'
  ],
  "plugins": [
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["prismjs", {
      "languages": ["css", "markup", 'js', "processing", 'py', "java", 'json', 'c', 'cpp', 'md', 'scss', 'regex'],
      "plugins": ["line-numbers"],
      "theme": "okaidia",
      "css": true
    }]
  ],
  
}
