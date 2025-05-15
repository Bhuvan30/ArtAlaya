# 🎨 ArtAlaya - An E-Commerce for Artisans

Welcome to the ArtAlaya GitHub repository for the MERN e-commerce project! This repository contains the source code and assets for the ArtAlaya website, built using the MERN stack.

## 📜 Introduction

ArtAlaya is an online platform that showcases and sells handmade and unique art and craft products. It aims to provide a marketplace for talented artisans and craftsmen to showcase and sell their creations to a wider audience. The project is built using the MERN stack, which includes MongoDB, Express.js, React, and Node.js.

## ✨ Features

- Browse and search for a wide variety of art and craft products.
- View detailed product descriptions, images, and pricing information.
- Add products to your shopping cart for easy purchasing.
- Secure checkout process to complete your purchase.
- User authentication and account management.
- Manage your profile and view order history.
- Contact form to get in touch with the ArtAlaya team.

## 🛠️ Technologies Used

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Stripe

## 🚀 Installation

To run the ArtAlaya MERN e-commerce project locally, follow these steps:

1. Clone this repository to your local machine using the following command:
   ```
   git clone https://github.com/Bhuvan30/ArtAlaya.git
   ```

2. Navigate to the project directory:
   ```
   cd ArtAlaya
   ```

3. Install the dependencies for the backend:
   ```
   cd backend
   npm install
   ```

4. Install the dependencies for the frontend:
   ```
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the root directory and set the following environment variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   MONGO_URI=<your_mongo_uri>
   ```

6. Run the backend frontend and imagerecognition python file server:
   ```
   cd backend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:3000` to view the application.

## 👥 Contributions

Contributions to the project are welcome! If you find a bug, have a feature request, or want to contribute code, please follow these steps:

1. Fork this repository to your GitHub account.
2. Clone the forked repository to your local machine using the following command:
   ```
   git clone https://github.com/Bhuvan30/ArtAlaya.git
   ```
3. Create a new branch using the following command:
   ```
   git checkout -b new-branch-name
   ```
4. Make your changes and commit them to your local repository.
5. Push your changes to your forked repository:
   ```
   git push origin new-branch-name
   ```
6. Open a pull request for review.
