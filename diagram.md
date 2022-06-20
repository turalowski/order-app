````
Table Users as U {
  id int [pk, increment] // auto-increment
  fullName varchar
  companyName varchar
  email varchar
  password varchar
  avatar varchar
  date timestamp
}

Table Relations as R {
  id int [pk, increment] // auto-increment
  user varchar
  name varchar
  type int
  category [int]
  company varchar
  position varchar
  iban varchar
  description varchar
  email varchar
  website varchar
  address varchar
  phoneNumber varchar
  created_at timestamp
}

Table Stock as S {
  id int [pk, increment] // auto-increment
  user varchar
  name varchar
  address varchar
  description varchar
  createdAt timestamp
}

Table Catalogs as C {
  id int [pk, increment] // auto-increment
  user varchar
  name varchar
  type int
  description varchar
  createdAt timestamp
}

Table Products as P {
  id int [pk, increment] // auto-increment
  user varchar
  name varchar
  catalog varchar
  manufacturer varchar
  price int
  currency varchar
  description varchar
  barcode varchar
  createdAt timestamp
}

Table Operations as O {
  id int [pk, increment] // auto-increment
  user varchar
  invoice varchar
  type int
  counterparty varchar
  currency varchar
  products operation_items
  description varchar
  createdAt timestamp
}

Table operation_items {
  id int [ref: > O.products] // inline relationship (many-to-one)
  price int
  amount int
}
Ref: S.user > U.id
Ref: R.user > U.id
Ref: C.user > U.id
Ref: P.user > U.id
Ref: P.catalog > C.id
Ref: P.manufacturer > R.id```
````
