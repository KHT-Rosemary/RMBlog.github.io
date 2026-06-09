var http = require('http');
var fs = require('fs');     //해당 경로로 불러오는 모듈
var url = require('url');   //모듈 : 비슷한 것 끼리 묶어놓는 것을 말함.
var qs = require('querystring');
var template = require('./lib/template.js')
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){
    var _url = request.url;        // 언더바로 url변수와 모듈을 구별
    var queryData = new URL(_url, `http://${request.headers.host}`);
    var pathname = queryData.pathname;
    var queryId = queryData.searchParams.get('id');

    if(pathname === '/'){
        if(queryId === null){
          fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = "hello, Node.js";
          var list = template.list(filelist);
          var HTML = template.HTML(title, list, `<h2>${title}</h2>${description}`, `<a href="/create">Create</a>`);
        response.writeHead(200);
        response.end(HTML);
      });
    } else {
      fs.readdir('./data', function(error, filelist){
        var filteredID = path.parse(queryId).base;
        fs.readFile(`data/${filteredID}`, 'utf8', function(err, description){
          var title = queryId;
          var sanitizeTitle = sanitizeHtml(title);
          var sanitizeDescription = sanitizeHtml(description);
          var list = template.list(filelist);
          var HTML = template.HTML(title, list, `<h2>${sanitizeTitle}</h2>${sanitizeDescription}`, `<a href="/create">Create</a> <a href="/update?id=${sanitizeTitle}">Update</a>
          <form action="delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizeTitle}">
            <input type="submit" value="Delete">
          </form>`);
          response.writeHead(200);
          response.end(HTML);
    });
   });
 }
} else if(pathname === '/create'){
  fs.readdir('./data', function(error, filelist){
  var title = 'WEB - Create';
  var list = template.list(filelist);
  var HTML = template.HTML(title, list, `
    <form action="/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
      <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
      <input type="Submit">
    </p>
    </form>`, '');
  response.writeHead(200);
  response.end(HTML);
});
} else if(pathname === '/create_process'){
  var body = '';
  request.on('data', function(data){
    body = body + data;
    if (body.lenth > 1e6)
      request.connection.destroy();
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var title = post.title;
    var description = post.description;
    console.log(post.title);
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.writeHead(302, {Location: `/?id=${title}`});
      response.end();
    })
  });
} else if(pathname === '/update'){
fs.readdir('./data', function(error, filelist){
        var filteredID = path.parse(queryId).base;
  fs.readFile(`data/${filteredID}`, 'utf8', function(err, description){
    var title = queryId;
    var list = template.list(filelist);
    var HTML = template.HTML(title, list, `
      <form action="/update_process" method="post">
      <input type="hidden" name="id" value="${title}">
      <p><input type="text" name="title" placeholder="title" value="${title}"></p>
      <p>
        <textarea name="description" placeholder="description">${description}</textarea>
      </p>
      <p>
        <input type="Submit">
      </p>
      </form>`, '');
    response.writeHead(200);
    response.end(HTML);
  })
});
} else if(pathname === '/update_process'){
  var body = '';
  request.on('data', function(data){
    body = body + data;
    if (body.lenth > 1e6)
      request.connection.destroy();
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, function(error){
      fs.writeFile(`data/${title}`, description, 'utf8', function(err){
        response.writeHead(302, {Location: `/?id=${title}`});
        response.end();
      })
    })
  });
} else if(pathname === '/delete_process'){
  var body = '';
  request.on('data', function(data){
    body = body + data;
    if (body.lenth > 1e6)
      request.connection.destroy();
  });
  request.on('end', function(){
    var post = qs.parse(body);
    var id = post.id;
    var filteredID = path.parse(id).base;
    fs.unlink(`data/${filteredID}`, function(error){
      response.writeHead(302, {Location: `/`});
      response.end();
    })
  });
} else {
    response.writeHead(404);
    response.end('Not Found');
  }
  });
  app.listen(3000);          //localhost:3000에서 3000을 담당
