"use strict";

var express = require('express');

var router = express.Router();

var multer = require('multer');

var path = require('path');

var fs = require('fs');

var Book = require('../models/book');

var uploadPath = path.join('public', Book.coverImageBasePath);
var imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

var Author = require('../models/author');

var _require = require('express'),
    query = _require.query;

var upload = multer({
  dest: uploadPath,
  fileFilter: function fileFilter(req, file, callback) {
    callback(null, imageMimeTypes.includes(file.mimetype));
  }
}); //All Book Route

router.get('/', function _callee(req, res) {
  var query, books;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = Book.find();

          if (req.query.title != null && req.query.title != '') {
            query = query.regex('title', new RegExp(req.query.title, 'i'));
          }

          if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
            query = query.lte('publishDate', req.query.publishedBefore);
          }

          if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
            query = query.gte('publishDate', req.query.publishedAfter);
          }

          _context.prev = 4;
          _context.next = 7;
          return regeneratorRuntime.awrap(query.exec());

        case 7:
          books = _context.sent;
          res.render('books/index', {
            books: books,
            searchOptions: req.query
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          res.redirect('/');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); //New Book Route

router.get('/new', function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          renderNewPage(res, new Book());

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Create Book Route

router.post('/', upload.single('cover'), function _callee3(req, res) {
  var fileName, book, newBook;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          fileName = req.file != null ? req.file.filename : null;
          book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            coverImageName: fileName,
            description: req.body.description
          });
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(book.save());

        case 5:
          newBook = _context3.sent;
          // res.redirect(`books/${newBook.id}`)
          res.redirect("books");
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);

          if (book.coverImageName != null) {
            removeBookCover(book.coverImageName);
          }

          renderNewPage(res, book, true);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
});

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), function (err) {
    if (err) console.error(err);
  });
}

function renderNewPage(res, book) {
  var hasError,
      authors,
      params,
      _args4 = arguments;
  return regeneratorRuntime.async(function renderNewPage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          hasError = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Author.find({}));

        case 4:
          authors = _context4.sent;
          params = {
            authors: authors,
            book: book
          };
          if (hasError) params.errorMessage = 'Error Creating Book';
          res.render('books/new', params);
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](1);
          res.redirect('/books');

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

module.exports = router;