# Blog-app

Description to run project

1. Install npm and Nodejs.
2. Go to project folder and open terminal in it and if nodemodules directory is not cloned, run 'npm install' command in command prompt to install dependencies.
3. Now, run project by command 'node server'
4. After the project is running(server is running), In postman we can go to different links, which are described below
  
**localhost:3000/auth/signup**  
First of all we need to register a user, to login and to use different blogs api.
  For signup, we need to go to above route and need to pass these required params in req body(name, email, password) e.g. { "name": "testUser", "email": "testUser@test.com", "password": "123456" }
  
**localhost:3000/auth/login**
Once registered, we can login with the required correct params in req body e.g. { "email": "testUser@gmail.com", "password": "123456" }, and it will add cookie at   the client side which is required for further protected routes access.
  
**localhost:3000/auth/logout**
To logout and remove the cookie we can use the logout api route
 
**localhost:3000/blogs/create** (  We require to login successfully to access this route, else it will show the response as login first ) 
  This route is to create a new blog post and it is needed to pass the required data in req.body (title and content) e.g. { "title": "Health blog", "content": "This is the content of blog" }. As this route also required to login first, we are saving the created by and creator info also by fetching the logged in user's info.
 
  localhost:3000/blogs/home (  We require to login successfully to access this route, else it will show the response as login first )
  This route will show us all the blog posts
  
  localhost:3000/blogs/home/ (  We require to login successfully to access this route, else it will show the response as login first )
  This route will show us only the specific blog post on the basis of title sent in params
  
    
  localhost:3000/blogs/delete (  We require to login successfully to access this route, else it will show the response as login first )
  This route is to delete a blog post on the basis of title and as it require login first, the api will delete the post if and only if the logged in user is requesting to delete his/her own post and it will not allow to delete the post whose owner is some other user.
  
I have also shared the screenshot in project folder showing the json array from time.com

