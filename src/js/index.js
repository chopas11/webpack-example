// Models Import
import Post from '@models/Post';

// Styles Import
// import '@styles/styles.css';
import '@sass/main.sass';

// Main App
const post = new Post('Webpack Example');

console.log('Post to string', post.toString());
//console.log('JSON:', json);
