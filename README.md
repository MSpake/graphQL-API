# GraphQl Challenge  
  
## Author: Morgana Spake  
  
**Deployment:**  
[Heroku](https://graphql-challenge.herokuapp.com/)  
  
**Local Setup**   
**`.env` requirements**  
* `PORT` - Port Number
* `DATABASE_URL` - URL to local postgresql database  
* `DUPLICATES_CHECK_TIME_DELAY` - Time delay in milliseconds, used to check for duplicate payments. Recomend between 30000 and 60000  
  
**Apply database schema**  
* `psql -d <local database name> -f path/to/data/schema.sql`  

#### Running the app
* `npm start`  
* `http://localhost:<Port number>`
  
### Sample Queries/Mutations  
  
```
query {
  getOrders {
    order_number
    description
    total
    balance_due
    payments_applied {
      amount
      order_number
      applied_at
      note
    }
  }
}

query ($order_number: String!){
  getSingleOrder(order_number: $order_number) {
    order_number
    description
    total
    balance_due
    payments_applied {
      amount
      order_number
      applied_at
      note
    }
  }
}

mutation($input: newOrder){
  createNewOrder(input: $input){
    description
    total
  }
}

mutation($input: newPayment){
  createNewPayment(input: $input){
    order_number
    amount
  }
}
```  