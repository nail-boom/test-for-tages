import fetch from "node-fetch";
globalThis.fetch = fetch

async function load(){

    let response= await fetch("http://jsonplaceholder.typicode.com/users")
    let users=await response.json()    
    let response1= await fetch("http://jsonplaceholder.typicode.com/posts")
    let allPosts=await response1.json()
    
   
    users.map(oneUser=>{
      delete oneUser.username;
      oneUser.address=`${oneUser.address.city}, ${oneUser.address.street}, ${oneUser.address.suite}`
      delete oneUser.phone;
      oneUser.website=`https://${oneUser.website}`;
      oneUser.company=oneUser.company.name;
      oneUser.posts=[];

      allPosts.map( onePost=>{
        if(oneUser.id===onePost.userId){
        delete onePost.userId;
        onePost.title_crop=`${onePost.title.substr(0, 20)}...`
        oneUser.posts.push(onePost)

      }})
        
    })

    console.log(users);

}
load();


