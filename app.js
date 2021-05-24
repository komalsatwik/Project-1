const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

const dbURI = 'mongodb+srv://komal:komal1947@nodetuts.fwuu4.mongodb.net/node?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})

    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

const morgan = require('morgan');

app.set('view engine','ejs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
app.use(morgan('dev'));

app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'My Blog 2',
        snippet: 'about my blog',
        body: 'more about blog'
    });
    blog.save()
      .then((result)=>{
          res.send(result);
      })
      .catch((err)=>{
          console.log(err);
      })
})

app.get('/all-blogs',(req,res)=>{
    Blog.find()
      .then((result)=>
      {
          res.send(result);
      })
      .catch((err)=>{
          console.log(err);
      });

});

app.get('/single-blog',(req,res)=>{
    Blog.findById('60a79d541a1cb80648088129')
    .then((result)=>
    {
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    });
});
 

app.use((req,res,next)=>{
    console.log('new request made:');
    console.log('host:',req.hostname);
    console.log('path:',req.path);
    console.log('method: ',req.method);
    next();
})

app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title :'about'});
});

app.get('/contact',(req,res)=>{
    res.render('contact',{title : 'Contact'});
})

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title :'Create a new post'});
});

app.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>
    {
        res.render('index',{title: 'HOME', blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);

    blog.save()
    .then((result)=>
    {
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
})

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
      .then((result)=>{
          res.render('details',{blog : result, title : 'blog Details'});
      })
      .catch((err)=>{
          console.log(err);
      })
})

app.delete('/blogs/:id',(req,res)=>{
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then(result =>{
          res.json({redirect: '/blogs'})
      })
      .catch((err)=>{
          console.log(err);
      })
})
app.use((req,res)=>{
    res.status(404).render('404',{title :'404'});
});