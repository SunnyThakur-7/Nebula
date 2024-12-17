import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";
import fs from 'fs';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

let blogs = [];

app.get("/" , (req , res )=>{
    res.render("home.ejs" , {blogs: blogs} );
});

app.get("/blogs/own" , (req , res )=>{
    res.render("own.ejs");
    

});

app.get("/views/persistence.ejs" , (req , res )=>{
    res.render("persistence.ejs");
});

app.get("/views/fashion.ejs" , (req , res )=>{
    res.render("fashion.ejs");
});

app.post("/submit" , (req , res )=>{
    const newBlog = {
        title: req.body.title,
        text : req.body.text,
    }
    blogs.push(newBlog);

    res.redirect("/");
    

});

app.get("/blogs/:id" , (req , res)=>{
    const blog = blogs[req.params.id];
    if(blog){
        res.render("show.ejs" , {blogs : blog , id: req.params.id});
    }else{
        res.status(404).send("Blog post not found");
    }
    
});

app.get("/blogs/:id/edit" , (req , res)=>{
    const blog = blogs[req.params.id];
    if(blog){
        res.render("edit.ejs" , {blogs: blog , id: req.params.id});

    }else {
        res.status(404).send("Blog post not found");
    }
});

app.post("/blogs/:id/edit" , (req , res)=>{
    const blog = blogs[req.params.id];
    if(blog){
        blog.title = req.body.title;
        blog.text = req.body.text;
        res.redirect(`/blogs/${req.params.id}`);
    }else{
        res.status(404).send("Blog post not found");
    }
});

app.post("/blogs/:id/delete" , (req , res)=>{

    if(blogs[req.params.id]){
        blogs.splice(req.params.id , 1);
        res.redirect("/");
    }else{        
        res.status(404).send("Blog post not found");
    }
});




app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`);
});