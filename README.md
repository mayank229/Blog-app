# Blog-app

Description to run project

1. Install npm, Nodejs and mongodb (also add the required mongodb url in the config).
2. Go to project folder and open terminal in it and if nodemodules directory is not cloned, run 'npm install' command in command prompt to install dependencies.
3. Now, run project by command 'node server'
4. After the project is running(server is running), In postman we can go to different links, which are described below



4.1 **localhost:3000/auth/signup**  
First of all we need to register a user, to login and to use different blogs api.
  For signup, we need to go to above route and need to pass these required params in req body(name, email, password) e.g. { "name": "testUser", "email": "testUser@test.com", "password": "123456" }
  ![image](https://user-images.githubusercontent.com/68643754/132987562-e5388ff8-70cf-451a-931b-0d867f061242.png)

  
  
4.2 **localhost:3000/auth/login**
Once registered, we can login with the required correct params in req body e.g. { "email": "testUser@gmail.com", "password": "123456" }, and it will add cookie at   the client side which is required for further protected routes access.
  ![image](https://user-images.githubusercontent.com/68643754/132987697-7cdd6673-f5ff-45c4-acea-9bb5941b0a41.png)

  
  
4.3 **localhost:3000/auth/logout**
To logout and remove the cookie we can use the logout api route
 ![image](https://user-images.githubusercontent.com/68643754/132987722-8e5104a8-adcd-4d9f-81ff-84c0f51c6d67.png)

 
 
4.4 **localhost:3000/blogs/create** (  We require to login successfully to access this route, else it will show the response as login first ) 

  This route is to create a new blog post and it is needed to pass the required data in req.body (title and content) e.g. { "title": "Health blog", "content": "This is the content of blog" }. As this route also required to login first, we are saving the created by and creator info also by fetching the logged in user's info.
 ![image](https://user-images.githubusercontent.com/68643754/132987737-563b497b-f31a-483f-b179-f36ff44003a4.png)
![image](https://user-images.githubusercontent.com/68643754/132987793-9273af15-da28-475c-85aa-caa0f14c84ab.png)

 
 
4.5 **localhost:3000/blogs/home** (  We require to login successfully to access this route, else it will show the response as login first )

  This route will show us all the blog posts
  ![image](https://user-images.githubusercontent.com/68643754/132987829-e606d886-8676-4719-af24-7c18e014b195.png)

  
  
4.6 **localhost:3000/blogs/home/title** (  We require to login successfully to access this route, else it will show the response as login first )

  This route will show us only the specific blog post on the basis of title sent in params, e.g. localhost:3000/blogs/home/Health blog
  ![image](https://user-images.githubusercontent.com/68643754/132987837-38df06ab-8a3d-4420-8c27-41404ac46b96.png)

    
    
    
4.7 **localhost:3000/blogs/delete**  (  We require to login successfully to access this route, else it will show the response as login first )

  This route is to delete a blog post on the basis of title. Need to pass the required data in req.body (title) e.g., { "title": "Health blog" }
  As it require login first, the api will delete the post if and only if the logged in user is requesting to delete his/her own post and it will not allow to delete the post whose owner is some other user.
  ![image](https://user-images.githubusercontent.com/68643754/132987989-8d491812-535a-40e4-9b21-a983d11356ec.png)

  
  If logged in as other user cannot delete the "Heatlh blog"
  ![image](https://user-images.githubusercontent.com/68643754/132987981-f481ad25-8f84-4b28-b097-657aa7280299.png)

  
 
