"use strict";

var express = require('express');

var router = express.Router();

var Book = require('../models/book');

var Author = require('../models/author');

var _require = require('express'),
    query = _require.query;

var imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']; //All Book Route

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

router.post('/', function _callee3(req, res) {
  var book, newBook;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          book = new Book({
            title: req.body.title,
            author: req.body.author,
            publishDate: new Date(req.body.publishDate),
            pageCount: req.body.pageCount,
            description: req.body.description
          });
          saveCover(book, req.body.cover);
          _context3.prev = 2;
          _context3.next = 5;
          return regeneratorRuntime.awrap(book.save());

        case 5:
          newBook = _context3.sent;
          // res.redirect(`books/${newBook.id}`)
          res.redirect("books");
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](2);
          renderNewPage(res, book, true);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 9]]);
});

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

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  var cover = JSON.parse(coverEncoded);

  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, 'base64');
    book.coverImageType = cover.type;
  }
}

module.exports = router;