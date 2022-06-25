
## Features

- Express + Sqlite
- Request validation with joi
- Authentication and Authorization
- Request validation with joi
- CORS enabled
- Linting with eslint (In Progress)
- Tests with mocha, supertest and assert
- Swagger API Documentation(In Progress)

## Getting Started

#### Clone the repo

```bash
git clone https://github.com/intkiran/summaryapi.git
cd summaryapi
```

#### Install dependencies

```bash
npm install
```

## Running Server Locally

```bash
 npm run start
```

Open <http://localhost:3000> with your browser to see the result.

## Running Test cases

```bash
# run all tests with Mocha
npm test
```

## Running Docker

```bash
npm docker:dev
```

## REST API Endpoints

| method   | resource | description | Authentication|  Authorization|
|:-----------|:-----------|:-----------|:-----------|:-----------|
| `GET`       | `/api/employees` | Employee List| Everyone| Everyone                                                |
| `POST`              | `/api/employees`         | Add Employee in the DB  | Valid Token| admin role|
| `GET`              | `/api/employees/:name`   | Get the specified name employee                                                                  | Valid Token| user role|
| `DELETE`             | `/api/employees/:id`         | deletes a user from the DB| Valid Token| admin role|
| `GET`              | `/api/employees/summary`     | Summary Statistics of all records    | Valid Token| admin role|
| `GET`              | `/api/employees/summaryByContract`     | Summary Statistics of all records with on_records=true | Valid Token| user role|
| `GET`              | `/api/employees/summaryByDept`     | Summary Statistics of all records  by department  | Valid Token| user role|
| `GET`              | `/api/employees/summaryByDeptAndSub`     | Summary Statistics of all records  by Department and Sub Department  | Valid Token| user role|

### Authentication and Authorization

**Authentication** : valid username and password are required to authenticate and generate the token.
**Authorization**: Valid user with roles Admin and User

| Roles   | Description |
|:-----------|:-----------|
|User| user role|
|Admin| Admin role contains admin role|

## `GET /api/employee`

List of Employees from a Dataset.

### Request

Empty Request

### Authorization

Public and No Authorization

#### 500 Internal Server error

```json
{
"status": "error",
"message": "Internal Server Error"
}
```

#### 200 OK

 Valid `JSON` is returned http status is 200

 ```json
{
  "status": "success",
  "message": "Retrieved all Employees",
  "data": [
    {
      "id": 1,
      "name": "asdfasd1",
      "salary": 20000,
      "currency": "INR",
      "department": "Engineering",
      "sub_department": "Platform",
      "on_contract": "false"
    }
  ]
}
```

### `POST /api/employee`

Add Employee into Dataset in database

```json
{
  "name": "testuser",
  "salary": 1000,
  "currency": "INR",
  "department": "Sales",
  "sub_department": "Online Sales",
  "on_contract": "false"
}
```

#### Validation Criteria

- **name**: string (Required)
- **salary**: integer (Required)
- **department**: string (Required)
- **sub_department**:  string array (Required)
- **on_contract**:  string array (Optional)
- **Currency**:  string array (Optional)

#### On validation error: `400 BAD REQUEST`

An array of errors is returned

```json
{
  "code": 400,
  "message": "Validation Error",
  "errors": [
    {
      "field": "name",
      "location": "body",
      "messages": [
        "\"name\" is required"
      ],
      "types": [
        "any.required"
      ]
    },
    {
      "field": "salary",
      "location": "body",
      "messages": [
        "\"salary\" is required"
      ],
      "types": [
        "any.required"
      ]
    },
    {
      "field": "department",
      "location": "body",
      "messages": [
        "\"department\" is required"
      ],
      "types": [
        "any.required"
      ]
    },
    {
      "field": "sub_department",
      "location": "body",
      "messages": [
        "\"sub_department\" is required"
      ],
      "types": [
        "any.required"
      ]
    }
  ]
}
```

#### 409 Duplicate Record

```json
{
"status": "error",
"message": "Duplicate Employee with Name exists"
}
```

#### 401 UnAuthorized

```json
{
"status": "error",
"message": "Invalid Token"
}
```

#### 403 Forbidden

```
{
"status": "error",
"message": "User Role is not authorized"
}
```

#### 200 OK

 `JSON` is returned with status - success

```json
{
"status": "success",
"message": "New Employee is added"
}
```

### `GET /api/employee/:name`

Retrieve Employee record with the name

#### 200 OK

```json
{
  "status": "success",
  "message": "success",
  "data": {
    "id": 10,
    "name": "testuser",
    "salary": 200000000,
    "currency": "INR",
    "department": "Engineering",
    "sub_department": "Platform",
    "on_contract": "true"
  }
}

```

#### 401 UnAuthorized

```json
{
"status": "error",
"message": "Invalid Token"
}
```

#### 403 Forbidden

```json
{
"status": "error",
"message": "User Role is not authorized"
}
```

### `DELETE /api/employee/:id`

#### 400 Bad Request

The below error throws if the request parameter is not numeric.

```json
{
  "code": 400,
  "message": "Validation Error",
  "errors": [
    {
      "field": "id",
      "location": "params",
      "messages": [
        ""id" must be a number"
      ],
      "types": [
        "number.base"
      ],
      
    }
  ],
  
}
```

#### 200 Success

```json
{
"status": "success",
"message": "Deleted Employee"
}
```

### `GET /api/employee/summary`

Get Summary Statistics of employees

## 200 Success

```json
{
  "status": "success",
  "message": "success",
  "data": {
    "sum": 200655090,
    "mean": 22295010,
    "max": 200000000,
    "min": 30
  }
}
```

### `GET /api/employee/summaryByContract`

Get Summary Statistics of employees with on_contract=true

## 200 Success

```json
{
  "status": "success",
  "message": "success",
  "data": {
    "sum": 200655090,
    "mean": 22295010,
    "max": 200000000,
    "min": 30
  }
}
```

### `GET /api/employee/summaryByDept`

Get Summary Statistics of employees group by Department and Sub Department.

## 200 Success

```json
{
  "status": "success",
  "message": "success",
  "data": [
    {
      "department": "Administration",
      "sum": 30,
      "mean": 30,
      "max": 30,
      "min": 30
    },
    {
      "department": "Banking",
      "sum": 90000,
      "mean": 90000,
      "max": 90000,
      "min": 90000
    },
    {
      "department": "Engineering",
      "sum": 200495030,
      "mean": 40099006,
      "max": 200000000,
      "min": 30
    },
    {
      "department": "Operations",
      "sum": 70030,
      "mean": 35015,
      "max": 70000,
      "min": 30
    }
  ]
}
```

### `GET /api/employee/summaryByDeptAndSub`

Get Summary Statistics of employees group by Department and Sub Department.

## 200 Success

```json
{
  "status": "success",
  "message": "success",
  "data": [
    {
      "department": "Administration",
      "sub_department": "Agriculture",
      "count(*)": 1,
      "sum": 30,
      "mean": 30,
      "max": 30,
      "min": 30
    },
    {
      "department": "Banking",
      "sub_department": "Loan",
      "count(*)": 1,
      "sum": 90000,
      "mean": 90000,
      "max": 90000,
      "min": 90000
    },
    {
      "department": "Engineering",
      "sub_department": "Platform",
      "count(*)": 5,
      "sum": 200495030,
      "mean": 40099006,
      "max": 200000000,
      "min": 30
    },
    {
      "department": "Operations",
      "sub_department": "CustomerOnboarding",
      "count(*)": 2,
      "sum": 70030,
      "mean": 35015,
      "max": 70000,
      "min": 30
    }
  ]
}
```
