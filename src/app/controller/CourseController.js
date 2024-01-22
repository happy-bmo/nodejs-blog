const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')
class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('course/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    create(req, res, next) {
        res.render('course/create')
    }

    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(courses => res.render('course/edit', {
                courses: mongooseToObject(courses)
            }))
            .catch(next)
    }

    update(req, res, next) {
        Course.updateOne({
            _id: req.params.id},
            req.body
        )
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
    }

    delete(req, res, next) {
        Course.delete({
            _id: req.params.id
        })
        .then(() => res.redirect('back'))
        .catch(next)
    }

    forceDelete(req, res, next) {
        Course.deleteOne({
            _id: req.params.id
        })
        .then(() => res.redirect('back'))
        .catch(next)
    }
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body)
        course.save()
            .then(() => {
                res.redirect('/me/stored/courses')
            })
            .catch(err => {

            })
        }

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({
                    _id: { $in: req.body.courseIds }
                })
                .then(() => res.redirect('back'))
                .catch(next)
                break;
        
            default:
                res.json({ message: 'Action invalid'})
                break;
        }
    }
}

module.exports = new CourseController()
