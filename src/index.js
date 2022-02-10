// Models Import
import Post from '@models/Post';

// Styles Import
// import '@styles/styles.css';
import '@sass/main.sass';

// Main App
const post = new Post('Webpack Example');

let obj1 = { name: 'First value' };

let obj2 = obj1;

obj2 = { name: 'Upadated' };

console.log(obj1);

// console.log('Post to string', post.toString());
//console.log('JSON:', json);
