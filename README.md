# Express TypeScript Wallet API

A wallet API built with Express.js and TypeScript.

## Features

- **User Registration & Authentication**: Register users with email and phone validation
- **Wallet Management**: Automatic wallet creation for each user
- **Transaction Tracking**: Record and manage user transactions
- **JWT Authentication**: Secure token-based authentication with expiration
- **Password Security**: Bcrypt-based password hashing
- **Input Validation**: Zod schema validation for all requests
- **Type Safety**: Full TypeScript support with strict typing

## Note

**Successful transactions always return a generic message (Transaction successful / Transaction initiated)**

**Transaction request must include an idempotency key from the client and old keys would return the generic message (Transaction successful / Transaction initiated)**