const Employee = require('../models/employee');

const { mongooseToObject } = require('../../util/mongoose');
class employeeController {
  //[GET] /  /create
  create(req, res, next) {
    res.render('employees/create');
  }
  //[POST] /  /create
  store(req, res, next) {
    const employee = new Employee(req.body);
    employee
      .save()
      .then(() => res.redirect('/me/stored/employees'))
      .catch((err) => {});
  }
  //[GET] /movies/:id/edit
  edit(req, res, next) {
    Employee.findById(req.params.id)
      .then((employee) =>
        res.render('employees/edit', {
          employee: mongooseToObject(employee),
        })
      )
      .catch(next);
  } //[PUT] /movies/:id
  update(req, res, next) {
    Employee.updateOne({ _id: req.params.id }, req.body).then(() =>
      res.redirect('/me/stored/employees')
    ).catch;
  }
  destroy(req, res, next) {
    Employee.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[DELETE] /  /:id/force
  forceDestroy(req, res, next) {
    Employee.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
  //[PATCH] /movie/:id/restore
  restore(req, res, next) {
    Employee.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new employeeController();
