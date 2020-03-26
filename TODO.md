useIdentity
  *identity
  setIdentity
  clearIdentity
useAlert
  *alert
  alertSuccess
  alertError
  alertWarning
useBackendApi
  login
  logout
  forgotPassword
  resetPassword
  updateProfile
  getUsers
  updateUser
  createUser
  deleteUser

# Todo
```yml
# integrate elastic ui
# remove react-hot-loader, fix hmr
# remove package @babel/polyfill
# remove materialui packages
# integrate i18n library
integrate with backend api
  login page
  register page
  forgot password page
  reset password page
  logout button
  user
    list
    create
    update
    delete
enable runtime language switching
integrate typescript
use graphql with library graphql-request
configure ci/cd with bitbucket pipeline
host assets in CDN
# use swr for data fetching
# use sass css module for styling
```


## integrate elastic ui
```yml
# implement layout
  # admin layout
    # devine layout to components
    # left navigation
    # header
    # page loading animation
  # guest layout
    # display login page in kibana
    # implement layout component based on kibana layout
    # alert: success, error, warning
# login page
# forgot password
# reset password
# register page
# profile page
user management
  # list
    # display data in grid
    # pagination
    # header sort
    # bulk actions
    # search box
    # action column
  # add
  # update
  delete popup
log out
```


Actors:
  Customer
  Administrator

Customer
  Customer mobile app (???)
  Api for mobile app
    Sign up with email, social media (16)
    View articles (in Highlight section) (8)
    View event list (8)
    View event detail (8)
    View organizer/speaker list (4)
    View organizer/speaker detail (4)
    Book tickets for events (24)
      Select seats
      Make payment
      Receive e-ticket & receipt
    View purchased tickets (8)
    Ecommerce module
      View product list (filter, sort) (8)
      Create cart / update cart (16)
      Making order (+ do payment) (12)
    Communication module (40)

Administrator
  Admin mobile app (???)
    Scan e-ticket to validate
  Admin web app (+api)
    Manage articles: crud, upload images, videos (32)
    Manage organization's detail: crud (24)
    Manage events: shedule (assign seats, prepare tickets), update, view (40)
    Manage customer: manual customer submit (create), update, view, export (40)
    Manage bookings: manual booking submit (create), update status, view (40)
    Ecommerce module
      Manage products (32)
      Manage categories (16)
      Manage orders: manual booking submit (create), update status, view (40)
    Communication module (40)

Additional Tasks
  Design database (12)
  Set up source code repositories (8)
  Set up CI/CD for every repositories (16)
  Set up deployment environments: test, staging, production (24)
  Set up domain name and ssl for each environments (12)

Tech stack:
  Customer mobile app: React Native
  Admin mobile app: React Native
  Admin web app: ReactJs
  Backend api: Nodejs, GraphQL, MongoDB, Docker
  Infastructure: AWS EC2, ECS, CloudFront, S3