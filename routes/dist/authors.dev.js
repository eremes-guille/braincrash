"use strict";

var express = require('express');

var author = require('../models/author');

var router = express.Router();

var Author = require('../models/author'); //All Authors Route


router.get('/', function _callee(req, res) {
  var searchOptions, authors;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          searchOptions = {};

          if (req.query.name != null && req.query.name !== '') {
            searchOptions.name = new RegExp(req.query.name, 'i');
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(Author.find(searchOptions));

        case 5:
          authors = _context.sent;
          res.render('authors/index', {
            authors: authors,
            searchOptions: req.query
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.redirect('/');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
}); //New Authors Route

router.get('/new', function (req, res) {
  res.render('authors/new', {
    author: new Author()
  });
}); //Create Author Route

router.post('/', function _callee2(req, res) {
  var author, newAuthor;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          author = new Author({
            name: req.body.name
          });
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(author.save());

        case 4:
          newAuthor = _context2.sent;
          res.redirect("authors");
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;