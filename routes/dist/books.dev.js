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
          res.redirect("books/".concat(newBook.id));
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
}); // Show Book Route

router.get('/:id', function _callee4(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id).populate('author').exec());

        case 3:
          book = _context4.sent;
          res.render('books/show', {
            book: book
          });
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.redirect('/');

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //Edit Book Route

router.get('/:id/edit', function _callee5(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context5.sent;
          renderEditPage(res, book);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.redirect('/');

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); //Update Book Route

router.put('/:id', function _callee6(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context6.sent;
          book.title = req.body.title;
          book.author = req.body.author;
          book.publishDate = new Date(req.body.publishDate);
          book.pageCount = req.body.pageCount;
          book.description = req.body.description;

          if (req.body.cover != null && req.body.cover !== '') {
            saveCover(book, req.body.cover);
          }

          _context6.next = 12;
          return regeneratorRuntime.awrap(book.save());

        case 12:
          res.redirect("/books/".concat(book.id));
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);

          if (book != null) {
            renderEditPage(res, book, true);
          } else {
            redirect('/');
          }

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 15]]);
}); // Delete Book Page

router["delete"]('/:id', function _callee7(req, res) {
  var book;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Book.findById(req.params.id));

        case 3:
          book = _context7.sent;
          _context7.next = 6;
          return regeneratorRuntime.awrap(book.remove());

        case 6:
          res.redirect('/books');
          _context7.next = 12;
          break;

        case 9:
          _context7.prev = 9;
          _context7.t0 = _context7["catch"](0);

          if (book != null) {
            res.render('books/show', {
              book: book,
              errorMessage: 'Could not remove book'
            });
          } else {
            res.redirect('/');
          }

        case 12:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 9]]);
});

function renderNewPage(res, book) {
  var hasError,
      _args8 = arguments;
  return regeneratorRuntime.async(function renderNewPage$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          hasError = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : false;
          renderFormPage(res, book, 'new', hasError);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function renderEditPage(res, book) {
  var hasError,
      _args9 = arguments;
  return regeneratorRuntime.async(function renderEditPage$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          hasError = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : false;
          renderFormPage(res, book, 'edit', hasError);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function renderFormPage(res, book, form) {
  var hasError,
      authors,
      params,
      _args10 = arguments;
  return regeneratorRuntime.async(function renderFormPage$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          hasError = _args10.length > 3 && _args10[3] !== undefined ? _args10[3] : false;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(Author.find({}));

        case 4:
          authors = _context10.sent;
          params = {
            authors: authors,
            book: book
          };

          if (hasError) {
            if (form === 'edit') {
              params.errorMessage = 'Error Updating Book';
            } else {
              params.errorMessage = 'Error Creating Book';
            }
          }

          res.render("books/".concat(form), params);
          _context10.next = 13;
          break;

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](1);
          res.redirect('/books');

        case 13:
        case "end":
          return _context10.stop();
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