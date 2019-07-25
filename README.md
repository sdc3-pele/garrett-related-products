# Wawa Melon FEC Project
## Related Products
This is the **Related Products** component of team Galadriel's _Wawa Melon_ FEC project.

Note: _This document is currently a work in progress and instructions below are likely to change_.

# Related Modules
- [https://github.com/fec3-galadriel/mike-photo-carousel]
- [https://github.com/fec3-galadriel/matt-item-summary]
- [https://github.com/fec3-galadriel/Review-component]

# Usage
To set up, run these from the root directory:
- `npm install` to install dependencies
- `npm run reset-db` to set up the database and tables
- `npm run seed` to seed the database with random data
- `npm run start` to run the express server
- `npm run react:dev` to generate the webpack bundle and watch for changes

Then navigate to `http://127.0.0.1:3003/1` to see the related-products app.

# API Endpoints

| HTTP METHOD      | POST               | GET                 | PUT            | DELETE         |
| ---------------- | ---------------    | ------------------- | -------------- | -------------- |
| CRUD             | CREATE             | READ                | UPDATE         | DELETE         |
| /api/product     | create new product | n/a                 | n/a            |   n/a          |
| /api/product/:id | Error              | responds w/ product | update product | delete product |