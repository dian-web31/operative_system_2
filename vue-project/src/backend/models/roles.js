// src/backend/models/roles.js
const roles = {
    admin: ['all'],
    editor: ['file-system', 'text-editor', 'media-viewer'],
    viewer: ['media-viewer'],
  };
  
  module.exports = roles;
  