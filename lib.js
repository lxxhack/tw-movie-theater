var express = require('express');
var orm = require('orm');
var app = express();
const bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('movies.db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//返回电影分类信息 id+name id用于按类别过滤
app.post('/tag', function (req, res) {
    db.all('select * from genre', function(err, reply) {
        res.send(JSON.stringify(reply));
    });
});

//按关键字、类别、电影ID过滤
app.get('/search', function (req,res) {
    let search_text=req.query.search_text;
    let genre_id=req.query.genre_id;
    let movie_id=req.query.movie_id;
    let sql='select * from movie,genre,movie_genre where movie.id=movie_genre.movie_id and genre.id=movie_genre.genre_id';
    sql+=(genre_id==undefined || genre_id=='')?'':` and genre.id=${genre_id}`;
    sql+=(search_text==undefined || search_text=='')?'':` and movie.title like \'${search_text}\%'`;
    sql+=(movie_id==undefined || movie_id=='')?'':` and movie.id=${movie_id}`;
    console.log(sql);
    db.all(sql,function(err,reply){
        res.send(JSON.stringify(reply));
    });
});
app.listen(8080);