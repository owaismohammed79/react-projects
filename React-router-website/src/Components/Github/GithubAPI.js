
//This has to be in a separate file because 


export default async function githubInfoLoader(id){
    const res = await fetch(`https://api.github.com/users/${id}`);
    const data = await res.json();
    return data;
}