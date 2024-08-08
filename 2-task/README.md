## Task 2: Implement Mortage Calculator using React

### Description

Build a simple mortgage calculator widget that takes in a loan amount, interest
rate, loan term, and calculates the monthly mortgage payment, total payment
amount, and total interest paid.

### Requirements

- The user should be able to enter:
    - Loan amount ($)
    - Annual interest rate (%). This is also known as the annual percentage
      rate (APR)
    - Loan term (in years)
- Using the inputs, the calculator should compute the following and display the
  results to the user:
    - Monthly mortgage payment
    - Total payment amount
    - Total interest paid

- If a non-numerical string is entered into any input field, the calculator
  should display an error message. Additionally, the calculator should handle
  any other invalid inputs that may arise.
- Round the result amounts to 2 decimal places.

- Formula to calculate the monthly mortgage payment:
  ```
  M = P[r(1+r)^n]/[(1+r)^n - 1]
  ```
  Where:
    - M = Monthly mortgage payment
    - P = Loan amount
    - r = Monthly interest rate (annual interest rate / 12)
    - n = Loan term in months

### Example

- Here's an example of Google's mortgage calculator widget for reference:

![img-1.png](../assets/img-1.png)

### How to submit your solution?

1. Create a new directory with the name of the task followed by your name,
   inside the task directory (`/1-task/husam`)

2. Create your own React app using `create-react-app` or  `vite` or any other
   tool you prefer.
3. Use any CSS framework you like or write your own CSS.
