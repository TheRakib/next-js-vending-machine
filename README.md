# Project Setup

steps:-

warning: boot up the databse before starting the app.

for database:-

1. go to `mysql-db` and open up terminal and type `docker compose up`

for app:-

1. go to app dir and `yarn install` to install deps
2. on terminal type `npx prisma generate`
3. go to `localhost:3000` and create an account as a seller
4. now add some products. You can also modify and remove products
5. now sign out by going to `localhost:3000` and pressing sign out button
6. create a buyer account
7. test purchase product and deposit product

# Project Requirement

What is this?
The following instructions and requirements in this repository represent a step in the Match community onboarding process. It's a (hopefully) simple take home exercise to be later used as a conversation starter in our technical discussion. It should also help us in reducing the number of technical challenges a client wants you to go through.

Exercise brief
Design an API for a vending machine, allowing users with a “seller” role to add, update or remove products, while users with a “buyer” role can deposit coins into the machine and make purchases. Your vending machine should only accept 5, 10, 20, 50 and 100 cent coins

Tasks

- [x] REST API should be implemented consuming and producing “application/json”
- [x] Implement product model with amountAvailable, cost (should be in multiples of 5), productName and sellerId fields
- [x] Implement user model with username, password, deposit and role fields
- [x] Implement an authentication method (basic, oAuth, JWT or something else, the choice is yours)
- All of the endpoints should be authenticated unless stated otherwise
- [x] Implement CRUD for users (POST /user should not require authentication to allow new user registration)
- [x] Implement CRUD for a product model (GET can be called by anyone, while POST, PUT and DELETE can be called only by the seller user who created the product)
- [x] Implement /deposit endpoint so users with a “buyer” role can deposit only 5, 10, 20, 50 and 100 cent coins into their vending machine account (one coin at the time)
- [x] Implement /buy endpoint (accepts productId, amount of products) so users with a “buyer” role can buy a product (shouldn't be able to buy multiple different products at the same time) with the money they’ve deposited. API should return total they’ve spent, the product they’ve purchased and their change if there’s any (in an array of 5, 10, 20, 50 and 100 cent coins)
- [x] Implement /reset endpoint so users with a “buyer” role can reset their deposit back to 0
- [x] Take time to think about possible edge cases and access issues that should be solved

Evaluation criteria:

Language/Framework of choice best practices
Edge cases covered
Write tests for /deposit, /buy and one CRUD endpoint of your choice
Code readability and optimization
Bonus:

If somebody is already logged in with the same credentials, the user should be given a message "There is already an active session using your account". In this case the user should be able to terminate all the active sessions on their account via an endpoint i.e. /logout/all
Attention to security
