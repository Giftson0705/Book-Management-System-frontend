// import { defineConfig } from 'vite'

// export default defineConfig({
//   build: {
//     rollupOptions: {
//       input: {
//         main: 'index.html',
//         login: 'login.html',
//         signup: 'signup.html',
//         books: 'books.html',
//         mybooks: 'mybooks.html',
//         admin_books: 'admin_books.html',
//         admin_users: 'admin_users.html'
//       }
//     }
//   }
// })

import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "./index.html",
    },
  },
});
