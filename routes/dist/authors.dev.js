"use strict";

var express = require('express');

var author = require('../models/author');

var router = express.Router();

var Author = require('../models/author');

var Book = require('../models/book'); //All Authors Route


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
          res.redirect("authors/".concat(newAuthor.id));
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
router.get('/:id', function _callee3(req, res) {
  var _author, books;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          _author = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(Book.find({
            author: _author.id
          }).limit(6).exec());

        case 6:
          books = _context3.sent;
          res.render('authors/show', {
            author: _author,
            booksByAuthor: books
          });
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          res.redirect('/');

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router.get('/:id/edit', function _callee4(req, res) {
  var _author2;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          _author2 = _context4.sent;
          res.render('authors/edit', {
            author: _author2
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.redirect('/authors');

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
router.put('/:id', function _callee5(req, res) {
  var author;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          author = _context5.sent;
          author.name = req.body.name;
          _context5.next = 7;
          return regeneratorRuntime.awrap(author.save());

        case 7:
          res.redirect("/authors/".concat(author.id));
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);

          if (author == null) {
            res.redirect('/');
          } else {
            res.render('authors/edit', {
              author: author,
              errorMessage: 'Error creating Author'
            });
          }

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
router["delete"]('/:id', function _callee6(req, res) {
  var author;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Author.findById(req.params.id));

        case 3:
          author = _context6.sent;
          _context6.next = 6;
          return regeneratorRuntime.awrap(author.remove());

        case 6:
          res.redirect('/authors');
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);

          if (author == null) {
            res.redirect('/');
          } else {
            res.redirect("/authors/".concat(author.id));
          }

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = router;