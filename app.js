const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { engine } = require('express-handlebars');

const app = express();

// setup for handlebars bcz  is not inbuilt module of express
app.engine('hbs', engine({
    extname: "hbs",
    // defaultLayout: "false",
    // layoutsDir: "views/",
    defaultLayout: "main-layout",
    layoutsDir: "views/layouts/"
}));
app.set("view engine", 'hbs');

// app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: "Page Not Found" });
})

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})

// -------------------- From Scratch - Without Express Js-----------------------------------------------------

// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;
//     if (url === "/") {
//         res.setHeader('Content-Type', 'text/html');
//         res.write('<html>');
//         res.write('<body>');
//         res.write('<form action="/message" method="POST"> <input type="text" name="message"/> <button type="submit">Submit</button> </form>');
//         res.write('</body>');
//         res.write('</html>');
//         return res.end();
//     }
//     if (url === "/message" && method === "POST") {
//         const body = [];
//         req.on('data', chunk => {
//             body.push(chunk);
//         });
//         req.on('end', () => {
//             const parsedBody = Buffer.concat(body).toString();
//             // console.log("parsedBody", parsedBody);
//             // console.log("Buffer", Buffer);
//             const message = parsedBody.split("=")[1];
//             fs.writeFileSync("message.txt", message);
//         });
//         res.writeHead(302, { Location: '/' });
//         return res.end();
//     }
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h1>Hello World!</h1>');
// });

// server.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });