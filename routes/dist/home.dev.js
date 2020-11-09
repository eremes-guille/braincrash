"use strict";

var express = require('express');

var router = express.Router();

var Book = require('../models/book');

router.get('/home', function _callee(req, res) {
  var books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Book.find().sort({
            createdAt: 'desc'
          }).limit(9).exec());

        case 3:
          books = _context.sent;
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          books = [];

        case 9:
          res.render('home', {
            books: books
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
});
module.exports = router;