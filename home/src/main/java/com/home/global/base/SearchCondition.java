package com.home.global.base;

public enum SearchCondition {

  eq, // equal ( = )
  ne, // not equal ( <> )
  lt, // is less than ( < )
  le, // is less or equal to ( <= )
  gt, // greater ( > )
  ge, // greater or equal ( >= )

  in, // is in
  ni, // is not in

  bw, // begins with ( LIKE val% )
  bn, // does not begin with
  ew, // ends with (LIKE %val )
  en, // does not end with

  cn, // contain (LIKE %val% )
  nc, // does not contain

  nu, // is null (IS NULL)
  nn, // is not null (IS NOT NULL)
}
