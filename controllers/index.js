const post = require("../models/posts");


const create = (req, res, next) => {
    const { title, author, content } = req.body;
    const newPost = new post({
        title,
        author,
        content,
    });

    newPost.save((err) => {
        if (err) {
            return next(err)
        } else {
            return res.status(201).json({
                message: "Post created"
            })
        }
    });
}

const story = (req, res, next) => {
    post.find({}, (err, data) => {
        if (err) next(err)
        if (!data) {
            return res.status(404).json({
                message: "No post found"
            });
        } else {
            return res.status(200).json({ data })
        }
    });
}

const storyOne = (req, res, next) => {
    const id = req.params.id
    post.findOne({_id: id }, (err, data) => {
        if (err) next(err);
        if (!data) {
            return res.status(404).json({
                message: "Post not found"
            })
        } else {
            res.status(200).json({
                Title: data.title,
                WrittenBy: data.author,
                Content: data.content,
                PublishedAt: data.createdAt
            })
        }
    })
}

//*********************************************************************************************************
//#################################  EDITING A POST #######################################################
//`````````````````````````````````````````````````````````````````````````````````````````````````````````
// to edit a post....
// you need to pass in whatever you want to edit in the body of your request
// must be in json format
// e.g "title": "A boy goes to sch"
// the above example will change the title of any post whose id you passed in the url to A boy goes to sch
//*********************************************************************************************************

const edit = (req, res, next) => {
    if (!req.admin) {
        return res.status(401).json({
            message: "You need to be an admin to edit or delete stories"
        });
    } else {
        const id = req.params.id
        const { title, author, content } = req.body
        post.findOne({ _id: id }, (err, data) => {
            if (err) next(err);
            if (!data) {
                return res.status(404).json({
                    message: "Post not found"
                })
            } else {
                if (title) {
                    data.title = title;
                }

                if (author) {
                    data.author = author;
                }

                if (content) {
                    data.content = content;
                }

                data.save((err, editedPost) => {
                    if (err) {
                        next(err)
                    } else {
                        res.status(200).send(editedPost);
                    }
                })
            }
        })
    }
}

const removed = (req, res, next) => {
    if (!req.admin) {
        return res.status(401).json({
            message: "You need to be an admin to edit or delete stories"
        });
    } else {
        const id = req.params.id;
        post.deleteOne({ _id: id }, (err) => {
            if (err) {
                next(err)
            } else {
                res.status(204).json({
                    message: "Story deleted successfully"
                });
            }
        });
    }
}

module.exports = { create, story, storyOne, edit, removed }