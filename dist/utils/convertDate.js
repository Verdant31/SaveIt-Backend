"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function convertDate(date) {
  return new Date(date)
    .toLocaleDateString(undefined, {          
      month: "2-digit", day: "2-digit", year: '2-digit'
    });
} exports.convertDate = convertDate;