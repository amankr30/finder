# ****************** finder APIs *********************** #

## authRouter
- POST /signUp
- POST /login
- POST /logout

## profileRouter
- GET / profile/view
- PATCH / profile/edit
- PATCH / profile/password

## connectionRequestRouter
- POST/request/send/:status/:UserId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

## userRouter
- GET /user/connection
- GET /user/requests
- GET /user/feed -> Gets the prfile of other users on the platform

Status: accepted, rejected, ignore, interested